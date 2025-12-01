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

| Setting        | Description                           | Default Value           |
| -------------- | ------------------------------------- | ----------------------- |
| `SMTP_HOST`    | SMTP server hostname                  | mail.smtp2go.com        |
| `SMTP_PORT`    | SMTP server port                      | 2525                    |
| `SMTP_USER`    | SMTP2Go username                      | (Required)              |
| `SMTP_PASS`    | SMTP2Go password                      | (Required)              |
| `SMTP_FROM`    | Email address to send from            | no-reply@fluxline.pro   |
| `CONTACT_EMAIL`| Email address to receive contact form | support@fluxline.pro    |

### Setting Environment Variables in Azure

1. Go to your Azure Static Web App in the Azure Portal
2. Navigate to **Configuration** > **Application settings**
3. Add each of the above settings
4. Click **Save**

Alternatively, store sensitive values in Azure Key Vault and reference them:

```bash
az staticwebapp appsettings set \
  --name <your-swa-name> \
  --setting-names SMTP_USER=<username> SMTP_PASS=<password>
```

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```

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
