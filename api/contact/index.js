const nodemailer = require('nodemailer');
const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

// Simple rate limiting store (in-memory)
// Note: In-memory rate limiting has limitations in serverless environments due to cold starts
// and multiple instances. For production, consider using Azure Redis Cache or Table Storage.
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour

// Key Vault configuration
const KEY_VAULT_URI = 'https://kv-az-fluxline-next.vault.azure.net/';
let secretClient = null;
const secretsCache = new Map();
const CACHE_TTL = 300000; // 5 minutes in milliseconds

// Initialize Key Vault client
function getSecretClient() {
  if (!secretClient) {
    const credential = new DefaultAzureCredential();
    secretClient = new SecretClient(KEY_VAULT_URI, credential);
  }
  return secretClient;
}

// Get secret from Key Vault with caching
// Returns null if secret doesn't exist, allowing fallback values
async function getSecret(secretName, fallbackValue = null) {
  const now = Date.now();
  const cached = secretsCache.get(secretName);
  
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }
  
  try {
    const client = getSecretClient();
    const secret = await client.getSecret(secretName);
    const value = secret.value;
    
    secretsCache.set(secretName, { value, timestamp: now });
    return value;
  } catch (error) {
    // If secret doesn't exist and a fallback is provided, return fallback
    if (fallbackValue !== null) {
      return fallbackValue;
    }
    throw new Error(`Failed to retrieve secret '${secretName}' from Key Vault: ${error.message}`);
  }
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count += 1;
  return true;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input) {
  // Basic sanitization for email content - removes HTML angle brackets
  // Since we send emails as plain text (not HTML), full XSS sanitization isn't required
  // The angle brackets are removed to prevent potential email client HTML interpretation
  return input.replace(/[<>]/g, '').trim();
}

module.exports = async function (context, req) {
  context.log('Contact form submission received');

  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers,
      body: '',
    };
    return;
  }

  try {
    // Get client IP for rate limiting
    const ip =
      (req.headers && req.headers['x-forwarded-for']) ||
      (req.headers && req.headers['x-client-ip']) ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      context.res = {
        status: 429,
        headers,
        body: JSON.stringify({
          message: 'Too many requests. Please try again later.',
        }),
      };
      return;
    }

    // Parse request body
    const body = req.body;

    if (!body) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ message: 'Request body is required' }),
      };
      return;
    }

    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ message: 'All fields are required' }),
      };
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ message: 'Invalid email address' }),
      };
      return;
    }

    // Validate message length
    if (message.length > 1000) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({
          message: 'Message must be 1000 characters or less',
        }),
      };
      return;
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);

    // Get SMTP configuration from Azure Key Vault
    let smtpHost, smtpPort, smtpUser, smtpPass, smtpFrom, contactEmail;
    
    try {
      // Retrieve secrets from Key Vault (without underscores)
      // Fallback values are provided as second parameter
      smtpHost = await getSecret('SMTPHOST', 'mail.smtp2go.com');
      smtpPort = parseInt(await getSecret('SMTPPORT', '2525'), 10);
      smtpUser = await getSecret('SMTPUSER'); // No fallback - required secret
      smtpPass = await getSecret('SMTPPASS'); // No fallback - required secret
      smtpFrom = await getSecret('SMTPFROM', 'no-reply@fluxline.pro');
      contactEmail = await getSecret('CONTACTEMAIL', 'support@fluxline.pro');
    } catch (error) {
      context.log.error('Failed to retrieve configuration from Key Vault:', error.message);
      context.res = {
        status: 500,
        headers,
        body: JSON.stringify({
          message: 'Email service is not configured. Please try again later.',
        }),
      };
      return;
    }

    // Validate SMTP configuration
    if (!smtpUser || !smtpPass) {
      context.log.error('SMTP credentials not configured in Key Vault');
      context.res = {
        status: 500,
        headers,
        body: JSON.stringify({
          message: 'Email service is not configured. Please try again later.',
        }),
      };
      return;
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: false, // Use TLS on port 2525
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Prepare email content
    const emailContent = `
Name: ${sanitizedName}
Email: ${sanitizedEmail}

Message:
${sanitizedMessage}

---
Submitted at: ${new Date().toISOString()}
IP Address: ${ip}
    `.trim();

    // Send email
    await transporter.sendMail({
      from: smtpFrom,
      to: contactEmail,
      replyTo: sanitizedEmail,
      subject: `Contact Form Submission from ${sanitizedName}`,
      text: emailContent,
    });

    context.log('Email sent successfully');

    context.res = {
      status: 200,
      headers,
      body: JSON.stringify({ message: 'Message sent successfully' }),
    };
  } catch (error) {
    context.log.error('Error processing contact form:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    context.log.error('Error details:', errorMessage);

    context.res = {
      status: 500,
      headers,
      body: JSON.stringify({
        message:
          'Failed to send message. Please try again later or contact us directly.',
      }),
    };
  }
};
