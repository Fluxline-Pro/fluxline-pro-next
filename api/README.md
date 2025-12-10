# Contact API for Azure Static Web Apps

This directory contains the Azure Functions API for the contact form functionality.

## Setup

### Local Development

1. Copy `local.settings.sample.json` to `local.settings.json`
2. Fill in your SMTP credentials from SMTP2Go:
   - `SMTP_USER`: Your SMTP2Go username
   - `SMTP_PASS`: Your SMTP2Go password

### Azure Deployment

For production deployment, you need to configure the following application settings in your Azure Static Web App:

| Setting               | Description                           | Default Value           | Required |
| --------------------- | ------------------------------------- | ----------------------- | -------- |
| `SMTP_HOST`           | SMTP server hostname                  | mail.smtp2go.com        | No       |
| `SMTP_PORT`           | SMTP server port                      | 2525                    | No       |
| `SMTP_USER`           | SMTP2Go username                      | (Required)              | Yes      |
| `SMTP_PASS`           | SMTP2Go password                      | (Required)              | Yes      |
| `SMTP_FROM`           | Email address to send from            | no-reply@fluxline.pro   | No       |
| `CONTACT_EMAIL`       | Email address to receive contact form | support@fluxline.pro    | No       |
| `RECAPTCHA_SECRET_KEY`| Google reCAPTCHA v3 secret key        | (Required)              | Yes      |

### Setting Environment Variables in Azure

1. Go to your Azure Static Web App in the Azure Portal
2. Navigate to **Configuration** > **Application settings**
3. Add each of the above settings
4. Click **Save**

Alternatively, store sensitive values in Azure Key Vault and reference them:

```bash
az staticwebapp appsettings set \
  --name <your-swa-name> \
  --setting-names SMTP_USER=<username> SMTP_PASS=<password> RECAPTCHA_SECRET_KEY=<secret-key>
```

## Security Features

The contact API includes multiple layers of spam protection:

1. **Google reCAPTCHA v3**: Invisible bot detection with score-based validation (threshold: 0.5)
2. **Rate Limiting**: Maximum 5 requests per IP address per hour
3. **Input Validation**: Email format and message length validation
4. **Input Sanitization**: Removes potentially harmful characters
5. **Honeypot Field**: Hidden field check on the frontend

### reCAPTCHA Integration

The API expects a `recaptchaToken` field in the request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question...",
  "recaptchaToken": "03AGdBq24..."
}
```

The backend verifies the token with Google's API and rejects submissions with a score below 0.5.

**Note**: If `RECAPTCHA_SECRET_KEY` is not configured, the API will log a warning and allow submissions without reCAPTCHA verification. However, other security measures (rate limiting, input validation) will still be active.

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question...",
  "recaptchaToken": "03AGdBq24..."
}
```

**Note**: The `recaptchaToken` field is optional but highly recommended for spam protection.

**Response (Success):**
```json
{
  "message": "Message sent successfully"
}
```

**Response (Error):**
```json
{
  "message": "Error description"
}
```

**Rate Limiting:**
- 5 requests per IP per hour
- Returns 429 status code when exceeded

## Files

- `contact/index.js` - Main Azure Function handler
- `contact/function.json` - Function binding configuration
- `host.json` - Azure Functions host configuration
- `package.json` - Dependencies (nodemailer)
- `local.settings.sample.json` - Template for local development settings
