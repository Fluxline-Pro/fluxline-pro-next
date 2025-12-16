# Contact API for Azure Static Web Apps

This directory contains the Azure Functions API for the contact form functionality.

## Setup

### Azure Key Vault Configuration

**All SMTP credentials are now stored in Azure Key Vault** at `https://kv-az-fluxline-next.vault.azure.net/`

The following secrets are stored in Key Vault (without underscores):
- `SMTPHOST` - SMTP server hostname (default: mail.smtp2go.com)
- `SMTPPORT` - SMTP server port (default: 2525)
- `SMTPUSER` - SMTP2Go username (Required)
- `SMTPPASS` - SMTP2Go password (Required)
- `SMTPFROM` - Email address to send from (default: no-reply@fluxline.pro)
- `CONTACTEMAIL` - Email address to receive contact form submissions (default: support@fluxline.pro)

### Local Development

For local development, you have two options:

#### Option 1: Use Azure Key Vault (Recommended)

1. Copy `local.settings.sample.json` to `local.settings.json`
2. Configure Azure credentials in `local.settings.json`:
   ```json
   {
     "Values": {
       "AZURE_CLIENT_ID": "your-client-id",
       "AZURE_TENANT_ID": "your-tenant-id",
       "AZURE_SUBSCRIPTION_ID": "your-subscription-id"
     }
   }
   ```
3. Ensure your Azure identity has "Key Vault Secrets User" role on the Key Vault
4. Run `npm start` - the function will automatically retrieve secrets from Key Vault

#### Option 2: Temporary Local Secrets (Not Recommended)

For quick local testing without Azure access, you can temporarily add environment variables:
1. Copy `local.settings.sample.json` to `local.settings.json`
2. Add the SMTP secrets directly (these will be ignored in production):
   ```json
   {
     "Values": {
       "SMTP_USER": "your-username",
       "SMTP_PASS": "your-password"
     }
   }
   ```

**Note:** Production deployments always use Key Vault, regardless of local.settings.json

### Azure Deployment

For production deployment, the Azure Function uses **Managed Identity** to access Key Vault. No application settings are required in the Azure Portal - all credentials are retrieved from Key Vault automatically.

### Key Vault Access Requirements

The Static Web App's Managed Identity requires:
- Resource: `kv-az-fluxline-next` (Key Vault)
- Role: `Key Vault Secrets User`
- Permissions: `Get` and `List` secrets

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
