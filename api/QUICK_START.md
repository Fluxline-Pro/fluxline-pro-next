# Quick Reference: Testing Contact API

## ✅ What Just Worked

Your Azure Function **successfully sent an email** using SMTP2Go! 📧

## How to Test (Simple Version)

### Start the API:

```powershell
cd api
.\start-functions.bat
```

A new window opens with the Functions runtime at `http://localhost:7071/api/contact`

### Test with PowerShell:

```powershell
$body = @{
    name = "Your Name"
    email = "your@email.com"
    message = "Your message here"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:7071/api/contact" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### Test with the Frontend:

1. Keep the Functions window open
2. In VS Code terminal: `npm run dev`
3. Go to `http://localhost:3000/contact`
4. Submit the form

**Important:** Your frontend currently calls `/api/contact` which works in production but for local testing you need to temporarily change it to `http://localhost:7071/api/contact`

## Understanding Your Setup

### What happens in production (Azure):

```
User → Next.js Static Site → /api/contact → Azure Function → SMTP2Go → Your Email
                              (Auto-routed by Azure SWA)
```

### What happens locally:

```
User → Next.js (localhost:3000) → http://localhost:7071/api/contact → Azure Function → SMTP2Go → Your Email
                                   (Need full URL for local)
```

### Your API credentials:

- ✅ Stored in `api/local.settings.json` (local)
- ✅ Stored in Azure Portal App Settings (production)
- ✅ Using SMTP2Go server: `mail.smtp2go.com:2525`
- ✅ Sending to: `support@fluxline.pro`

## Files You Need to Know About

| File                                         | Purpose                               |
| -------------------------------------------- | ------------------------------------- |
| `api/contact/index.js`                       | The actual function that sends emails |
| `api/local.settings.json`                    | Your SMTP credentials (local only)    |
| `api/start-functions.bat`                    | Easy way to start the API             |
| `src/app/contact/components/ContactForm.tsx` | The form that calls the API           |

## Common Tasks

### Stop the Functions Runtime

Just close the Functions window or press `Ctrl+C` in it

### View API Logs

The Functions window shows all logs in real-time

### Check if it's running

```powershell
Test-NetConnection -ComputerName localhost -Port 7071
```

### Update SMTP credentials

Edit `api/local.settings.json` → Restart Functions

### Test from frontend locally

In `ContactForm.tsx`, temporarily change:

```typescript
const response = await fetch('http://localhost:7071/api/contact', {
```

## What You've Learned

1. **Azure Functions** run serverless - no "start script" needed in production
2. **Azure Functions Core Tools** (`func.exe`) runs them locally
3. Your API is in the `/api` folder and auto-deploys with your Static Web App
4. Environment variables go in:
   - `local.settings.json` (local)
   - Azure Portal → Configuration (production)
5. The route `/api/contact` is defined in `function.json`

## Next Steps

✅ API works locally  
⬜ Test with your frontend form  
⬜ Deploy to Azure and verify production environment variables  
⬜ Test the live site at `your-site.azurestaticapps.net/api/contact`

**Your contact form is ready to go!** 🚀
