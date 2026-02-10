# Quick Setup Guide - Token-Based Access Control

This is a condensed setup guide for configuring token-based access control after the code has been merged and deployed.

## Prerequisites

- Code merged and deployed to DEV, TEST, and PROD environments
- Access to Azure Portal or Azure CLI
- Secure tokens generated (see below)

## Step 1: Generate Secure Tokens

Generate two different secure tokens (one for DEV, one for TEST):

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

**Important:**

- Use different tokens for DEV and TEST
- Store tokens securely (consider Azure Key Vault)
- Never commit tokens to source control

## Step 2: Configure Azure Static Web Apps

### Option A: Azure Portal

1. Navigate to Azure Portal → Your Static Web App
2. Go to **Settings** → **Configuration**
3. Add environment variables:

**For DEV (flx-develop):**

- Name: `ACCESS_TOKEN`, Value: `<your-dev-token>`
- Name: `ENVIRONMENT`, Value: `dev`

**For TEST (flx-test):**

- Name: `ACCESS_TOKEN`, Value: `<your-test-token>`
- Name: `ENVIRONMENT`, Value: `test`

**For PROD (fluxline.pro):**

- Name: `ENVIRONMENT`, Value: `prod`
- (No ACCESS_TOKEN needed)

4. Click **Save**

### Option B: Azure CLI

```bash
# Configure DEV environment
az staticwebapp appsettings set \
  --name flx-develop \
  --resource-group <your-resource-group> \
  --setting-names ACCESS_TOKEN="<your-dev-token>" ENVIRONMENT="dev"

# Configure TEST environment
az staticwebapp appsettings set \
  --name flx-test \
  --resource-group <your-resource-group> \
  --setting-names ACCESS_TOKEN="<your-test-token>" ENVIRONMENT="test"

# Configure PROD environment
az staticwebapp appsettings set \
  --name flx-prod \
  --resource-group <your-resource-group> \
  --setting-names ENVIRONMENT="prod"
```

## Step 3: Verify Configuration

### Test DEV Environment

1. Visit https://flx-next-dev.fluxline.pro
2. You should see the token gate
3. Enter the DEV token
4. Site should load successfully
5. Refresh the page - should load without re-entering token

### Test TEST Environment

1. Visit https://flx-next-test.fluxline.pro
2. You should see the token gate
3. Enter the TEST token
4. Site should load successfully
5. Refresh the page - should load without re-entering token

### Test PROD Environment

1. Visit https://fluxline.pro
2. Site should load immediately without any token gate

## Step 4: Distribute Tokens

Securely share the tokens with authorized users:

**DEV Token:**

- Development team members
- QA team for feature testing
- Stakeholders who need early access

**TEST Token:**

- QA team for release testing
- Stakeholders for UAT
- Client representatives (if applicable)

**Distribution Methods:**

- Secure password manager (recommended)
- Encrypted communication
- Azure Key Vault (for programmatic access)

## Troubleshooting

### Token gate doesn't appear on DEV/TEST

- Check build logs - ensure `NEXT_PUBLIC_ENVIRONMENT` is set correctly
- Rebuild and redeploy if needed

### "Server configuration error"

- Verify `ACCESS_TOKEN` is set in Azure Static Web Apps configuration
- Check Azure Function logs for errors

### Token validation fails

- Ensure correct token is being used
- Check for typos or extra spaces
- Verify token in Azure matches what you're entering

### Token gate appears on PROD

- Check PROD build workflow has `NEXT_PUBLIC_ENVIRONMENT=prod`
- Rebuild PROD environment

## Changing Tokens

To rotate tokens (recommended every 90 days):

1. Generate new token
2. Update in Azure Static Web Apps configuration
3. Distribute new token to authorized users
4. Old tokens are immediately invalidated

## Removing Access

To revoke a user's access:

- They can clear their browser data
- You can rotate the token (all users will need new token)
- For individual revocation, consider implementing user-based auth

## Support

For detailed documentation, see `TOKEN_ACCESS_README.md` in the repository root.

For issues:

1. Check Azure Function logs in Azure Portal
2. Review browser console for errors
3. Verify environment variables are correct
4. Contact DevOps team

---

**Last Updated:** January 2026
