# Token-Based Access Control Implementation

This document describes the token-based access control system implemented for the Fluxline Pro Next.js application's TEST environment, with PROD remaining publicly accessible.

## Overview

> **⚠️ Scope:** This is **presentation-layer gating, not security.** It keeps casual visitors
> and crawlers out of non-production deployments. It does **not** protect content — every
> gated page is pre-rendered into the static export and is fetchable by URL without a token.
> Read [Security Considerations](#security-considerations) before putting anything
> confidential or commercially valuable behind it.

The implementation provides environment-specific access control to discourage casual access to non-production deployments (currently TEST) while keeping PROD publicly accessible. It uses a simple token-based authentication system that:

- ✅ Runs entirely on Azure Static Web Apps (no additional infrastructure needed)
- ✅ Uses Azure Functions for server-side token validation
- ✅ Stores tokens securely in Azure Static Web Apps environment variables
- ✅ Requires no database or external services
- ✅ Works with Next.js static export (SSG)
- ✅ Persists authentication in browser localStorage
- ✅ Integrates seamlessly with existing Fluent UI theme system

## Architecture

### Components

1. **Azure Function API** (`/api/auth/validate-token`)
   - Server-side token validation endpoint
   - Compares submitted tokens against environment variables
   - Returns validation status

2. **Environment Detection** (`src/lib/environment.ts`)
   - Detects current environment at build time
   - Determines if authentication is required

3. **Access Control Hook** (`src/hooks/useAccessControl.ts`)
   - Client-side hook for token management
   - Handles token validation via API
   - Manages localStorage persistence

4. **AccessGate Component** (`src/components/AccessGate.tsx`)
   - Full-screen authentication gate
   - Token input UI using Fluent UI
   - Wraps entire application in root layout

### Flow

```
1. User visits site
   ↓
2. AccessGate checks environment
   ↓
3a. If PROD → Show site immediately
3b. If TEST → Check localStorage for token
   ↓
4. If no valid token → Show token input form
   ↓
5. User enters token → Validate via API
   ↓
6. If valid → Store in localStorage & show site
7. If invalid → Show error message
```

## Azure Configuration

### 1. Environment Variables in Azure Static Web Apps

For deployed environments, configure these variables in Azure Portal:

**TEST Environment** (flx-next-test.fluxline.pro):

```
ACCESS_TOKEN=your-test-access-token-here
ENVIRONMENT=test
```

**PROD Environment** (fluxline.pro):

```
ENVIRONMENT=prod
```

(No ACCESS_TOKEN needed - PROD is publicly accessible)

### 2. How to Set Environment Variables in Azure

#### Option A: Azure Portal

1. Go to Azure Portal → Your Static Web App
2. Navigate to **Settings** → **Configuration**
3. Under **Application settings**, click **+ Add**
4. Add each variable:
   - Name: `ACCESS_TOKEN`
   - Value: `your-secure-token-here`
5. Click **Save**

#### Option B: Azure CLI

```bash
# Set ACCESS_TOKEN for TEST environment
az staticwebapp appsettings set \
  --name flx-test \
  --setting-names ACCESS_TOKEN="your-test-token" ENVIRONMENT="test"

# Set ENVIRONMENT for PROD (no token needed)
az staticwebapp appsettings set \
  --name flx-prod \
  --setting-names ENVIRONMENT="prod"
```

### 3. Recommended Token Generation

Generate secure, random tokens:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using PowerShell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Security Best Practices:**

- Use a unique token for TEST (and any future non-prod deployment environment)
- Make tokens at least 32 characters long
- Use a mix of letters, numbers, and special characters
- Store tokens securely (Azure Key Vault is recommended)
- Rotate tokens periodically
- Never commit tokens to source control

## Build-Time Configuration

The environment is determined at build time using the `NEXT_PUBLIC_ENVIRONMENT` variable in the GitHub Actions workflows:

### TEST Workflow (`azure-static-web-apps-test.yml`)

```yaml
- name: Build Application
  run: yarn build
  env:
    NEXT_PUBLIC_ENVIRONMENT: test
```

### PROD Workflow (`azure-static-web-apps-prod.yml`)

```yaml
- name: Build Application
  run: yarn build
  env:
    NEXT_PUBLIC_ENVIRONMENT: prod
```

## Local Development

### Testing TEST Mode Locally

1. Create a `.env.local` file:

```bash
NEXT_PUBLIC_ENVIRONMENT=test
```

2. Run the development server:

```bash
yarn dev
```

3. The AccessGate will appear, but API validation won't work locally without Azure Functions running.

### Testing API Locally

1. Install Azure Functions Core Tools
2. Navigate to the `api` directory
3. Create `local.settings.json`:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "ACCESS_TOKEN": "test-token-12345",
    "ENVIRONMENT": "test"
  }
}
```

4. Start the Functions runtime:

```bash
cd api
npm install
func start
```

5. The API will be available at `http://localhost:7071/api/auth/validate-token`

### Testing PROD Mode Locally

1. Set environment to prod:

```bash
NEXT_PUBLIC_ENVIRONMENT=prod
```

2. Build and run:

```bash
yarn build
yarn start
```

3. The AccessGate will be disabled and the site will load immediately.

## User Experience

### First Visit (TEST)

1. User navigates to flx-next-test.fluxline.pro
2. Full-screen token gate appears
3. User enters access token
4. On successful validation, site loads immediately
5. Token is stored in browser localStorage

### Return Visits (TEST)

1. User navigates to the site
2. AccessGate checks localStorage
3. If valid token exists, site loads immediately
4. No re-authentication required

### Clearing Access

Users can clear their access by:

1. Clearing browser localStorage
2. Using browser's "Clear Site Data" feature
3. Opening the site in incognito/private mode

## API Endpoints

### POST /api/auth/validate-token

Validates an access token.

**Request:**

```json
{
  "token": "user-submitted-token"
}
```

**Response (Success - 200):**

```json
{
  "valid": true,
  "environment": "test",
  "message": "Token validated successfully"
}
```

**Response (Invalid Token - 401):**

```json
{
  "valid": false,
  "environment": "test",
  "error": "Invalid token"
}
```

**Response (Missing Token - 400):**

```json
{
  "valid": false,
  "environment": "test",
  "error": "Token is required"
}
```

**Response (Production - 200):**

```json
{
  "valid": true,
  "environment": "prod",
  "message": "Production environment - no token required"
}
```

## File Structure

```
├── api/
│   └── auth/
│       ├── function.json          # Azure Function configuration
│       └── index.js                # Token validation logic
├── src/
│   ├── components/
│   │   └── AccessGate.tsx          # Main access gate component
│   ├── hooks/
│   │   └── useAccessControl.ts     # Access control hook
│   └── lib/
│       └── environment.ts          # Environment detection
├── .github/
│   └── workflows/
│       ├── azure-static-web-apps-test.yml  # TEST deployment
│       └── azure-static-web-apps-prod.yml  # PROD deployment
├── .env.example                    # Environment variables template
└── TOKEN_ACCESS_README.md          # This file
```

## Troubleshooting

### Issue: Token gate appears on PROD

**Solution:** Verify `NEXT_PUBLIC_ENVIRONMENT=prod` in the build workflow

### Issue: "Server configuration error"

**Solution:** Ensure `ACCESS_TOKEN` environment variable is set in Azure Static Web Apps

### Issue: Token validation fails

**Possible causes:**

1. Incorrect token entered
2. `ACCESS_TOKEN` not set in Azure
3. API endpoint not deployed
4. CORS issues

**Debug steps:**

1. Check browser console for errors
2. Verify Azure Function is running (check Azure Portal)
3. Test API endpoint directly with Postman/curl
4. Check Azure Function logs in Azure Portal

### Issue: Token persists after changing

**Solution:** Clear browser localStorage or use incognito mode

### Issue: API returns 500 error

**Solution:** Check Azure Function logs for detailed error messages

## Security Considerations

### Threat model: this is presentation-layer gating, not security

**`AccessGate` hides UI. It does not protect content.**

This site is a Next.js static export (`output: 'export'`). Every page — including every
"gated" one — is pre-rendered to HTML at build time and deployed into `out/`, where Azure
Static Web Apps serves it to anyone who requests the URL. `AccessGate` is a `'use client'`
component: it runs *after* the browser has already downloaded the page. Anyone can:

- Request the page HTML directly and read it, without ever executing the gate
- Read the embedded JSON payload Next.js ships for client hydration
- Fetch any asset under `/public` by its URL (e.g. `/scrolls/pdfs/<name>.pdf`), which is
  served with `"allowedRoles": ["anonymous"]` and a one-year public cache
- Set the `fluxline_access_token` localStorage key by hand to dismiss the gate

Validating the token in an Azure Function makes the **token check** server-side. It does not
make the **content** protected, because the content was never behind that check.

**This is appropriate for:** keeping unfinished DEV/TEST work out of the way of casual
visitors and search crawlers, courtesy walls, and lead capture.

**This is NOT appropriate for:** anything with real confidentiality or commercial value —
paid scrolls, white papers, client deliverables, unreleased pricing, or personal data.
Do not place such assets in `/public` or in a publicly readable blob container and assume
`AccessGate` protects them. It does not.

**To genuinely protect an asset:** serve it through an Azure Function that validates the
token server-side and streams the blob from a private container. The asset must never be
part of the static export.

### Current Implementation

- ✅ Tokens validated server-side (Azure Functions)
- ✅ No tokens in source code
- ✅ HTTPS encryption in transit
- ✅ Environment-specific tokens
- ✅ No token exposure in URLs

### Limitations

- 🚨 **Gated content is publicly fetchable by URL** — the gate hides UI only (see threat model above)
- ⚠️ Tokens stored in localStorage (client-side, and trivially settable by hand)
- ⚠️ No rate limiting (could add with Azure API Management)
- ⚠️ No token expiration (tokens are permanent until changed)
- ⚠️ No user accounts (single token per environment)

### Recommended Enhancements

For higher security requirements:

1. **Serve protected assets from a Function** - Validate server-side and stream from a
   private blob container; keep the asset out of `/public` and out of the static export.
   This is the only item on this list that changes the threat model above.
2. **Add token expiration** - Implement time-based token rotation
3. **Add rate limiting** - Use Azure API Management or custom middleware
4. **Use Azure AD** - Integrate with Azure Active Directory for user-based auth
5. **Add IP allowlisting** - Combine with Azure Front Door or Application Gateway
6. **Implement audit logging** - Track token usage and validation attempts

## Maintenance

### Changing Tokens

1. Generate new token (see Token Generation above)
2. Update in Azure Static Web Apps configuration
3. Distribute new token to authorized users
4. Old tokens are immediately invalidated

### Adding New Environments

1. Create new GitHub workflow file
2. Set `NEXT_PUBLIC_ENVIRONMENT` to unique value
3. Configure corresponding Azure Static Web App
4. Set `ACCESS_TOKEN` and `ENVIRONMENT` variables in Azure

### Removing Token Protection

To make an environment public:

1. Change `NEXT_PUBLIC_ENVIRONMENT` to `prod` in workflow
2. Rebuild and redeploy
3. (Optional) Remove `ACCESS_TOKEN` from Azure configuration

## Support

For issues or questions:

1. Check Azure Function logs in Azure Portal
2. Review browser console for client-side errors
3. Verify environment variables are set correctly
4. Ensure latest code is deployed
5. Contact DevOps team for Azure-specific issues

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Implementation:** Static Export with Azure Functions
