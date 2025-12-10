# reCAPTCHA Azure Deployment Guide

This guide provides step-by-step instructions for deploying the contact form with Google reCAPTCHA v3 on Azure Static Web Apps.

## Prerequisites

- Azure Static Web App created and deployed
- Google reCAPTCHA v3 keys (Site Key and Secret Key)
- SMTP credentials (e.g., SMTP2Go)
- Azure CLI installed (optional, for CLI configuration)

## Overview

The contact form uses two layers of backend services:

1. **Next.js API Route** (`/src/app/api/contact/route.ts`): Used during local development
2. **Azure Function** (`/api/contact/index.js`): Used in production on Azure Static Web Apps

Both implementations include identical reCAPTCHA verification logic.

## Step 1: Get Google reCAPTCHA Keys

1. Visit https://www.google.com/recaptcha/admin/create
2. Sign in with your Google account
3. Register a new site:
   - **Label**: "Fluxline Contact Form" (or your preferred name)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add:
     - `localhost` (for local testing)
     - Your production domain (e.g., `fluxline.pro`, `www.fluxline.pro`)
4. Click "Submit"
5. Copy both keys:
   - **Site Key** (starts with `6L...`) - Used in the frontend
   - **Secret Key** (starts with `6L...`) - Used in the backend

## Step 2: Configure Azure Static Web App

### Option A: Azure Portal (Recommended for Production)

1. Navigate to your Azure Static Web App in the Azure Portal
2. Go to **Configuration** → **Application settings**
3. Add the following settings:

   | Name                    | Value                          |
   | ----------------------- | ------------------------------ |
   | `RECAPTCHA_SECRET_KEY`  | Your reCAPTCHA secret key      |
   | `SMTP_HOST`             | `mail.smtp2go.com`             |
   | `SMTP_PORT`             | `2525`                         |
   | `SMTP_USER`             | Your SMTP username             |
   | `SMTP_PASS`             | Your SMTP password             |
   | `SMTP_FROM`             | `no-reply@yourdomain.com`      |
   | `CONTACT_EMAIL`         | `support@yourdomain.com`       |

4. Click **Save** at the top

### Option B: Azure CLI

```bash
# Set resource group and app name
RESOURCE_GROUP="your-resource-group"
APP_NAME="your-static-web-app-name"

# Configure settings
az staticwebapp appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --setting-names \
    RECAPTCHA_SECRET_KEY="your-secret-key" \
    SMTP_HOST="mail.smtp2go.com" \
    SMTP_PORT="2525" \
    SMTP_USER="your-smtp-username" \
    SMTP_PASS="your-smtp-password" \
    SMTP_FROM="no-reply@yourdomain.com" \
    CONTACT_EMAIL="support@yourdomain.com"
```

## Step 3: Configure Frontend Environment Variable

### For GitHub Actions (Recommended)

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add a new repository secret:
   - **Name**: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - **Value**: Your reCAPTCHA site key

4. Update your GitHub Actions workflow (`.github/workflows/azure-static-web-apps-*.yml`):

```yaml
- name: Build And Deploy
  uses: Azure/static-web-apps-deploy@v1
  with:
    # ... other configuration ...
    app_build_command: 'yarn build'
  env:
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ${{ secrets.NEXT_PUBLIC_RECAPTCHA_SITE_KEY }}
```

### Alternative: Azure Static Web App Configuration

You can also add the site key to the Azure Static Web App settings:

```bash
az staticwebapp appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --setting-names NEXT_PUBLIC_RECAPTCHA_SITE_KEY="your-site-key"
```

**Note**: Settings prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Step 4: Deploy Your Application

1. Push your changes to the repository
2. GitHub Actions will automatically trigger a deployment
3. Monitor the deployment in GitHub Actions tab
4. Once deployed, the site will be live with reCAPTCHA protection

## Step 5: Verify Deployment

### Frontend Verification

1. Visit your production site: `https://your-domain.com/contact`
2. Look for the reCAPTCHA badge in the bottom-right corner
3. Open browser DevTools (F12) → Console
4. Check for any reCAPTCHA-related errors
5. Expected console output (if configured correctly): None
6. Expected console output (if not configured): "NEXT_PUBLIC_RECAPTCHA_SITE_KEY not found. reCAPTCHA protection is disabled."

### Backend Verification

1. Fill out the contact form completely
2. Submit the form
3. Check for success message: "Thank you for your message! We'll get back to you soon."
4. Verify email was received at the configured `CONTACT_EMAIL`

### Azure Function Logs Verification

1. In Azure Portal, go to your Static Web App
2. Navigate to **Functions** → **contact**
3. Click **Monitor** or **Logs**
4. Look for log entries showing:
   - "Verifying reCAPTCHA token..."
   - "reCAPTCHA verification successful. Score: 0.X"
   - "Email sent successfully"

## Troubleshooting

### reCAPTCHA Badge Not Showing

**Problem**: The reCAPTCHA badge doesn't appear in the bottom-right corner.

**Solutions**:
- Verify `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is configured in GitHub Secrets or Azure settings
- Ensure the environment variable is passed during the build step
- Clear browser cache and hard reload (Ctrl+Shift+R)
- Check browser console for errors

### Form Submission Returns 403 Error

**Problem**: Form submission fails with "reCAPTCHA verification failed" error.

**Solutions**:
- Verify `RECAPTCHA_SECRET_KEY` is configured in Azure Static Web App settings
- Ensure your production domain is added to the reCAPTCHA admin console
- Check that you selected reCAPTCHA v3 (not v2)
- Wait a few minutes after adding the domain (DNS propagation)

### Email Not Being Sent

**Problem**: Form submits successfully but no email is received.

**Solutions**:
- Verify SMTP credentials are correct in Azure settings
- Check Azure Function logs for errors
- Test SMTP credentials independently
- Check spam folder for test emails
- Verify `CONTACT_EMAIL` is correctly configured

### CORS Errors

**Problem**: Browser shows CORS-related errors when submitting the form.

**Solutions**:
- Verify `staticwebapp.config.json` allows `/api/*` routes
- Ensure Azure Function has correct CORS headers (already configured in `index.js`)
- Check that the function is deployed and accessible

### Azure Function Cold Start Delays

**Problem**: First submission after idle time takes longer than expected.

**Explanation**: Azure Functions in consumption plan have cold start delays. This is normal behavior.

**Solutions**:
- Consider upgrading to a Premium plan for better performance
- Implement retry logic in the frontend (already included)
- Users will see "Sending..." state during submission

## Security Best Practices

### Secure Environment Variables

1. **Never commit secrets** to the repository
2. Use Azure Key Vault for sensitive values (optional):

```bash
# Create Key Vault
az keyvault create \
  --name your-keyvault \
  --resource-group $RESOURCE_GROUP \
  --location eastus

# Store secrets
az keyvault secret set \
  --vault-name your-keyvault \
  --name recaptcha-secret-key \
  --value "your-secret-key"

# Reference in Static Web App
az staticwebapp appsettings set \
  --name $APP_NAME \
  --setting-names RECAPTCHA_SECRET_KEY="@Microsoft.KeyVault(SecretUri=https://your-keyvault.vault.azure.net/secrets/recaptcha-secret-key/)"
```

### Monitoring and Alerts

1. Set up Application Insights for Azure Function monitoring
2. Create alerts for:
   - High number of failed reCAPTCHA verifications (potential attack)
   - Email sending failures
   - Function errors

### Rate Limiting Considerations

The Azure Function includes in-memory rate limiting (5 requests per hour per IP). For production with multiple instances, consider:

1. **Azure Redis Cache** for distributed rate limiting
2. **Azure API Management** for advanced rate limiting and throttling
3. **Azure Front Door** with WAF for DDoS protection

## Testing in Production

### Test the Complete Flow

1. Visit your contact page
2. Fill out the form with test data
3. Check DevTools Network tab for the API request
4. Verify successful submission (200 status code)
5. Check email inbox for the message

### Test reCAPTCHA Protection

To verify reCAPTCHA is working:

1. Open browser DevTools → Console
2. Before submitting, run:
   ```javascript
   // This should exist if reCAPTCHA is loaded
   console.log(typeof grecaptcha);
   ```
3. Expected output: `"object"`

### Monitor reCAPTCHA Scores

1. Check Azure Function logs after form submissions
2. Look for "reCAPTCHA verification successful. Score: X.XX"
3. Scores range from 0.0 (bot) to 1.0 (human)
4. Current threshold: 0.5
5. Adjust threshold in `api/contact/index.js` if needed:
   ```javascript
   if (result.success && result.score >= 0.5) {
   ```

## Rollback Procedure

If issues arise after deployment:

1. **Revert code changes**:
   ```bash
   git revert HEAD
   git push
   ```

2. **Remove reCAPTCHA temporarily**:
   - Delete `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` from GitHub Secrets
   - Redeploy
   - Other security measures (rate limiting, honeypot) remain active

3. **Restore from previous deployment**:
   - In Azure Portal, go to Static Web App → Deployments
   - Select a previous successful deployment
   - Click "Activate"

## Additional Resources

- [Google reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Azure Static Web Apps Documentation](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## Support

For issues specific to this implementation:
1. Check this deployment guide
2. Review RECAPTCHA_IMPLEMENTATION.md for technical details
3. Check Azure Function logs for error messages
4. Review GitHub Issues for known problems

For reCAPTCHA-specific issues:
- [Google reCAPTCHA Support](https://support.google.com/recaptcha/)

For Azure-specific issues:
- [Azure Support Portal](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade)
