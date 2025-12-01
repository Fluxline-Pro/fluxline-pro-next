# Testing the Contact API Locally

## Prerequisites

1. **Azure Functions Core Tools** (already installed via winget)
2. **Node.js** (already installed)
3. **SMTP credentials configured** in `local.settings.json`

## Quick Start

### Method 1: Using the Test Script (Recommended)

1. **Start the Azure Functions runtime:**

   ```powershell
   cd api
   npm start
   ```

   You should see output like:

   ```
   Azure Functions Core Tools
   Core Tools Version: 4.x.x
   Function Runtime Version: 4.x.x

   Functions:

   contact: [POST] http://localhost:7071/api/contact
   ```

2. **In a NEW terminal, run the test script:**

   ```powershell
   cd api
   npm test
   ```

   The test script will:
   - Send a valid submission
   - Test validation errors (missing fields, invalid email, etc.)
   - Show you the API responses

3. **Check your email** at `support@fluxline.pro` for the test message!

### Method 2: Using cURL

With the Azure Functions runtime running:

```powershell
curl -X POST http://localhost:7071/api/contact `
  -H "Content-Type: application/json" `
  -d '{\"name\":\"Test User\",\"email\":\"test@example.com\",\"message\":\"Testing from cURL\"}'
```

### Method 3: Using the Frontend

1. **Start the Next.js dev server** (in the root directory):

   ```powershell
   npm run dev
   ```

2. **Start the Azure Functions** (in the api directory):

   ```powershell
   cd api
   npm start
   ```

3. **Navigate to** `http://localhost:3000/contact` and submit the form

   **Note:** You'll need to update the API endpoint in your frontend to use `http://localhost:7071/api/contact` for local testing.

## Understanding the Setup

### How Azure Static Web Apps Works

```
Production (Azure):
┌─────────────────────────────────────┐
│  Azure Static Web App               │
│  ┌─────────────┐  ┌──────────────┐ │
│  │   Next.js   │  │   Azure      │ │
│  │   Frontend  │─→│   Functions  │ │
│  │  (Static)   │  │   (API)      │ │
│  └─────────────┘  └──────────────┘ │
│        ↓                  ↓         │
│   /contact.html      /api/contact   │
└─────────────────────────────────────┘

Local Development:
┌──────────────┐      ┌─────────────────┐
│  Next.js     │      │  Azure Func     │
│  Dev Server  │      │  Core Tools     │
│  :3000       │─────→│  :7071          │
└──────────────┘      └─────────────────┘
  localhost:3000        localhost:7071
  /contact              /api/contact
```

### Key Files

- **`contact/index.js`** - The actual function code
- **`contact/function.json`** - Defines the HTTP trigger and route
- **`host.json`** - Azure Functions host configuration
- **`local.settings.json`** - Local environment variables (SMTP credentials)
- **`package.json`** - Dependencies and scripts

### Environment Variables

**Local (in `local.settings.json`):**

```json
{
  "Values": {
    "SMTP_HOST": "mail.smtp2go.com",
    "SMTP_PORT": "2525",
    "SMTP_USER": "your-username",
    "SMTP_PASS": "your-password",
    "SMTP_FROM": "no-reply@fluxline.pro",
    "CONTACT_EMAIL": "support@fluxline.pro"
  }
}
```

**Production (in Azure Portal):**

- Go to Azure Portal → Your Static Web App
- Settings → Configuration → Application Settings
- Add the same environment variables

## Common Issues

### Issue: "Cannot find module 'nodemailer'"

**Solution:**

```powershell
cd api
npm install
```

### Issue: "Port 7071 is already in use"

**Solution:** Kill the existing process:

```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 7071).OwningProcess | Stop-Process
```

### Issue: "SMTP credentials not configured"

**Solution:** Check your `local.settings.json` has `SMTP_USER` and `SMTP_PASS` filled in.

### Issue: Frontend can't reach the API

**Solution:** Make sure both servers are running:

- Next.js on `http://localhost:3000`
- Azure Functions on `http://localhost:7071`

Update the fetch URL in your frontend code to use the full URL during local dev:

```typescript
const response = await fetch('http://localhost:7071/api/contact', {
  // ... rest of the fetch config
});
```

## Testing Checklist

- [ ] API starts without errors (`npm start`)
- [ ] Test script runs successfully (`npm test`)
- [ ] Valid submission sends email to your inbox
- [ ] Validation errors return appropriate status codes
- [ ] Rate limiting works (try sending 6 requests quickly)
- [ ] Frontend form submission works end-to-end

## Next Steps

Once local testing is complete:

1. Deploy to Azure (this happens automatically via GitHub Actions)
2. Verify environment variables are set in Azure Portal
3. Test the production endpoint: `https://your-site.azurestaticapps.net/api/contact`
4. Check production logs in Azure Portal → Your Static Web App → Functions
