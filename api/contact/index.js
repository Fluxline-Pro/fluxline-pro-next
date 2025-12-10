const nodemailer = require('nodemailer');
const https = require('https');

// Simple rate limiting store (in-memory)
// Note: In-memory rate limiting has limitations in serverless environments due to cold starts
// and multiple instances. For production, consider using Azure Redis Cache or Table Storage.
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
  // Basic sanitization for email content - removes HTML angle brackets
  // Since we send emails as plain text (not HTML), full XSS sanitization isn't required
  // The angle brackets are removed to prevent potential email client HTML interpretation
  return input.replace(/[<>]/g, '').trim();
}

/**
 * Verify reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token from the frontend
 * @param {object} context - Azure Functions context for logging
 * @returns {Promise<{success: boolean, score?: number, error?: string}>}
 */
async function verifyRecaptcha(token, context) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  let scoreThreshold = parseFloat(
    process.env.RECAPTCHA_SCORE_THRESHOLD || '0.5'
  );

  // Validate score threshold
  if (isNaN(scoreThreshold) || scoreThreshold < 0 || scoreThreshold > 1) {
    if (context) {
      context.log.warn(
        `Invalid RECAPTCHA_SCORE_THRESHOLD: ${process.env.RECAPTCHA_SCORE_THRESHOLD}. Using default: 0.5`
      );
    }
    scoreThreshold = 0.5;
  }

  // If no secret key is configured, allow submission with warning
  if (!secretKey) {
    if (context) {
      context.log.warn(
        'RECAPTCHA_SECRET_KEY not configured. Skipping reCAPTCHA verification.'
      );
    }
    return { success: true };
  }

  if (!token) {
    return { success: false, error: 'reCAPTCHA token is missing' };
  }

  return new Promise((resolve, reject) => {
    const postData = `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`;

    const options = {
      hostname: 'www.google.com',
      port: 443,
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
        // Check HTTP status code
        if (res.statusCode !== 200) {
          if (context) {
            context.log.error(
              `reCAPTCHA API returned status ${res.statusCode}: ${data}`
            );
          }
          reject(new Error(`reCAPTCHA API error: HTTP ${res.statusCode}`));
          return;
        }

        try {
          const result = JSON.parse(data);

          // Check if verification was successful and score is above threshold
          // Score ranges from 0.0 (bot) to 1.0 (human)
          // Default threshold is 0.5, configurable via RECAPTCHA_SCORE_THRESHOLD
          if (
            result.success &&
            typeof result.score === 'number' &&
            result.score >= scoreThreshold
          ) {
            resolve({ success: true, score: result.score });
          } else if (result.success && typeof result.score !== 'number') {
            // Handle missing score - log warning and reject based on security policy
            if (context) {
              context.log.warn(
                'reCAPTCHA verification succeeded but score is missing'
              );
            }
            resolve({ success: false, error: 'reCAPTCHA score unavailable' });
          } else {
            resolve({
              success: false,
              score: result.score,
              error: `reCAPTCHA verification failed. Score: ${result.score || 'N/A'} (threshold: ${scoreThreshold})`,
            });
          }
        } catch (error) {
          if (context) {
            context.log.error('Error parsing reCAPTCHA response:', error);
          }
          reject(new Error('Invalid reCAPTCHA response'));
        }
      });
    });

    req.on('error', (error) => {
      if (context) {
        context.log.error('reCAPTCHA verification request error:', error);
      }
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

    const { name, email, message, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (recaptchaToken) {
      context.log('Verifying reCAPTCHA token...');

      try {
        const recaptchaResult = await verifyRecaptcha(recaptchaToken, context);

        if (!recaptchaResult.success) {
          context.log.error(
            'reCAPTCHA verification failed:',
            recaptchaResult.error
          );
          context.res = {
            status: 403,
            headers,
            body: JSON.stringify({
              message:
                'reCAPTCHA verification failed. Please refresh and try again.',
            }),
          };
          return;
        }

        context.log(
          'reCAPTCHA verification successful. Score:',
          recaptchaResult.score
        );
      } catch (error) {
        context.log.error('reCAPTCHA verification error:', error);
        context.res = {
          status: 500,
          headers,
          body: JSON.stringify({
            message: 'Failed to verify reCAPTCHA. Please try again later.',
          }),
        };
        return;
      }
    } else {
      context.log.warn('No reCAPTCHA token provided in request');
    }

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

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
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
