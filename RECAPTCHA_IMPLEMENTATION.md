# reCAPTCHA Integration Summary

## What Was Done

Google reCAPTCHA v3 has been integrated into the contact form to prevent spam submissions. This is an **invisible captcha** that analyzes user behavior without requiring any user interaction.

## Files Changed/Created

### New Files
1. **`src/components/ReCaptchaProvider.tsx`** - Provider component that wraps the app
2. **`.env.example`** - Environment variable template
3. **`RECAPTCHA_SETUP.md`** - Detailed setup guide
4. **`src/app/contact/README.md`** - Contact page documentation

### Modified Files
1. **`src/app/layout.tsx`** - Added ReCaptchaProvider wrapper
2. **`src/app/contact/components/ContactForm.tsx`** - Added reCAPTCHA token generation
3. **`src/app/api/contact/route.ts`** - Added reCAPTCHA verification (Next.js API route)
4. **`api/contact/index.js`** - Added reCAPTCHA verification (Azure Function)
5. **`src/components/index.ts`** - Exported ReCaptchaProvider
6. **`src/app/contact/page.tsx`** - Added privacy notice
7. **`package.json`** - Added react-google-recaptcha-v3 dependency
8. **`api/local.settings.sample.json`** - Added RECAPTCHA_SECRET_KEY configuration
9. **`api/README.md`** - Documented reCAPTCHA setup for Azure Functions

## Setup Required

### 1. Get reCAPTCHA Keys (Required)

Visit: https://www.google.com/recaptcha/admin/create

- Select **reCAPTCHA v3**
- Add domains:
  - `localhost` (for development)
  - `fluxline.pro` (for production)
- Copy both keys (Site Key + Secret Key)

### 2. Configure Environment Variables (Required)

#### For Next.js Development (Local)

Create `.env.local` in the project root:

```bash
# Public key (used in frontend)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here

# Secret key (used in backend API - Next.js API routes)
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

#### For Azure Functions (Production)

Azure Functions require the secret key to be configured in the Azure Static Web App settings:

1. **Local Development**: Copy `api/local.settings.sample.json` to `api/local.settings.json` and add:
   ```json
   {
     "Values": {
       "RECAPTCHA_SECRET_KEY": "your_secret_key_here"
     }
   }
   ```

2. **Azure Portal Configuration**: 
   - Go to your Azure Static Web App
   - Navigate to **Configuration** > **Application settings**
   - Add: `RECAPTCHA_SECRET_KEY` with your secret key value

3. **Azure CLI**:
   ```bash
   az staticwebapp appsettings set \
     --name <your-swa-name> \
     --setting-names RECAPTCHA_SECRET_KEY=<your-secret-key>
   ```

**Important**: 
- Never commit `.env.local` or `api/local.settings.json` - they're in `.gitignore`
- Use the same secret key for both Next.js API routes and Azure Functions
- The site key (`NEXT_PUBLIC_*`) is used in the browser, the secret key is used server-side

### 3. Test the Implementation

```bash
# Start development server
yarn dev

# Visit contact page
open http://localhost:3000/contact

# Check for:
# - reCAPTCHA badge in bottom-right corner
# - Form submits successfully
# - No console errors
```

## How It Works

### Frontend Flow
1. User fills out the contact form
2. On submit, form requests a reCAPTCHA token using `executeRecaptcha()`
3. Token is sent with form data to `/api/contact`

### Backend Flow
1. API receives form data + reCAPTCHA token
2. Server calls Google to verify the token (via HTTPS POST to `https://www.google.com/recaptcha/api/siteverify`)
3. Google returns a score (0.0 = bot, 1.0 = human)
4. If score ≥ 0.5, form is processed
5. If score < 0.5, submission is rejected

**Note**: Both the Next.js API route (`/src/app/api/contact/route.ts`) and the Azure Function (`/api/contact/index.js`) implement reCAPTCHA verification independently. In production on Azure Static Web Apps, the Azure Function will handle contact form submissions.

### Security Layers
1. **reCAPTCHA v3** - Invisible bot detection (score-based)
2. **Honeypot field** - Hidden field that bots tend to fill
3. **Rate limiting** - Max 5 submissions per hour per IP
4. **Input validation** - Email format, length checks
5. **Input sanitization** - Remove harmful characters

## Visual Changes

- Added privacy notice above the form mentioning reCAPTCHA
- reCAPTCHA badge appears in bottom-right corner (automatically by Google)
- No other UI changes

## Fallback Behavior

If reCAPTCHA keys are not configured:
- Form still works normally
- Warning logged to console
- Other security measures (honeypot, rate limiting) still active

This allows development without reCAPTCHA but should be configured for production.

## Testing

### Development Testing
```bash
yarn dev
# Submit form at http://localhost:3000/contact
```

### Production Checklist
- [ ] reCAPTCHA keys configured in production environment
- [ ] Production domain added to reCAPTCHA admin console
- [ ] Form submission works without errors
- [ ] reCAPTCHA badge visible
- [ ] Privacy policy mentions reCAPTCHA (if required)

## Troubleshooting

### Badge Not Showing
- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set
- Verify key is correct
- Ensure reCAPTCHA v3 was selected (not v2)

### Form Submission Fails
- Check `RECAPTCHA_SECRET_KEY` is set in:
  - `.env.local` for Next.js API route
  - `api/local.settings.json` for local Azure Function testing
  - Azure Static Web App configuration for production
- Verify domain is added in reCAPTCHA admin
- Check browser console for errors
- Review API route logs (Next.js) or Azure Function logs

### Localhost Issues
- Add `localhost` to domains in reCAPTCHA admin console
- Some browsers block reCAPTCHA - test in multiple browsers

### Azure Function Specific Issues
- **CORS errors**: Check `staticwebapp.config.json` allows `/api/*` routes
- **Authentication errors**: Ensure Azure Function has `authLevel: "anonymous"` in `function.json`
- **Missing environment variables**: Verify all settings are configured in Azure Portal
- **Cold start delays**: First request after idle time may take longer

## Next Steps

1. **Get reCAPTCHA keys** from Google
2. **Configure environment variables**:
   - `.env.local` for local Next.js development
   - `api/local.settings.json` for local Azure Functions testing
   - Azure Static Web App settings for production
3. **Test locally** at http://localhost:3000/contact
4. **Test Azure Function locally** (optional):
   ```bash
   cd api
   npm install
   func start
   ```
5. **Deploy** and configure production environment in Azure Portal
6. **Monitor** for spam in contact submissions
7. **Adjust threshold** in API routes if needed (currently 0.5 in both implementations)

## Additional Resources

- [Full Setup Guide](RECAPTCHA_SETUP.md)
- [Google reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
