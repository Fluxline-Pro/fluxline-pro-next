const nodemailer = require('nodemailer');

// Simple rate limiting store (in-memory)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour

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
  // Remove any potentially harmful characters
  return input.replace(/[<>]/g, '');
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

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'mail.smtp2go.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '2525', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM || 'no-reply@fluxline.pro';
    const contactEmail = process.env.CONTACT_EMAIL || 'support@fluxline.pro';

    // Validate SMTP configuration
    if (!smtpUser || !smtpPass) {
      context.log.error('SMTP credentials not configured');
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
