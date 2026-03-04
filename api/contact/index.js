const nodemailer = require('nodemailer');
const https = require('https');

// Simple rate limiting store (in-memory)
// Note: In-memory rate limiting has limitations in serverless environments due to cold starts
// and multiple instances. For production, consider using Azure Redis Cache or Table Storage.
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour

// reCAPTCHA configuration
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';
const RECAPTCHA_MIN_SCORE = 0.5; // Minimum score to consider valid (0.0 - 1.0)

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

async function verifyRecaptcha(token) {
  return new Promise((resolve, reject) => {
    const postData = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }).toString();

    const options = {
      hostname: 'www.google.com',
      path: '/recaptcha/api/siteverify',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(new Error('Failed to parse reCAPTCHA response'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

module.exports = async function (context, req) {
  context.log('Contact form submission received');

  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        context.log.warn('reCAPTCHA token missing from request');
        context.res = {
          status: 400,
          headers,
          body: JSON.stringify({ message: 'reCAPTCHA verification required' }),
        };
        return;
      }name length
    if (name.trim().length < 10) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ message: 'Name must be at least 10 characters' }),
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
    if (message.trim().length < 15) {
      context.res = {
        status: 400,
        headers,
        body: JSON.stringify({ message: 'Message must be at least 15 characters' }),
      };
      return;
    }


        if (!verificationResult.success) {
          context.log.warn('reCAPTCHA verification failed:', verificationResult['error-codes']);
          context.res = {
            status: 400,
            headers,
            body: JSON.stringify({
              message: 'Failed to verify reCAPTCHA. Please try again.',
            }),
          };
          return;
        }

        // Check score threshold
        if (verificationResult.score < RECAPTCHA_MIN_SCORE) {
          context.log.warn(
            `reCAPTCHA score too low: ${verificationResult.score} (minimum: ${RECAPTCHA_MIN_SCORE})`
          );
          context.res = {
            status: 400,
            headers,
            body: JSON.stringify({
              message: 'Suspicious activity detected. Please try again later.',
            }),
          };
          return;
        }

        context.log('reCAPTCHA verification successful');
      } catch (error) {
        context.log.error('reCAPTCHA verification error:', error);
        context.res = {
          status: 500,
          headers,
          body: JSON.stringify({
            message: 'Failed to verify reCAPTCHA. Please try again.',
          }),
        };
        return;
      }
    } else {
      context.log.warn('RECAPTCHA_SECRET_KEY not configured, skipping verification');
    }

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
