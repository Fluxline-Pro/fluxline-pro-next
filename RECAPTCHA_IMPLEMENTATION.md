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
3. **`src/app/api/contact/route.ts`** - Added reCAPTCHA verification
4. **`src/components/index.ts`** - Exported ReCaptchaProvider
5. **`src/app/contact/page.tsx`** - Added privacy notice
6. **`package.json`** - Added react-google-recaptcha-v3 dependency

## Setup Required

### 1. Get reCAPTCHA Keys (Required)

Visit: https://www.google.com/recaptcha/admin/create

- Select **reCAPTCHA v3**
- Add domains:
  - `localhost` (for development)
  - `fluxline.pro` (for production)
- Copy both keys (Site Key + Secret Key)

### 2. Configure Environment Variables (Required)

Create `.env.local` in the project root:

```bash
# Public key (used in frontend)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here

# Secret key (used in backend API)
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important**: Never commit `.env.local` - it's already in `.gitignore`

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
2. Server calls Google to verify the token
3. Google returns a score (0.0 = bot, 1.0 = human)
4. If score ≥ 0.5, form is processed
5. If score < 0.5, submission is rejected

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
- Check `RECAPTCHA_SECRET_KEY` is set in server environment
- Verify domain is added in reCAPTCHA admin
- Check browser console for errors
- Review API route logs

### Localhost Issues
- Add `localhost` to domains in reCAPTCHA admin console
- Some browsers block reCAPTCHA - test in multiple browsers

## Next Steps

1. **Get reCAPTCHA keys** from Google
2. **Configure environment variables** in `.env.local`
3. **Test locally** at http://localhost:3000/contact
4. **Deploy** and configure production environment
5. **Monitor** for spam in contact submissions
6. **Adjust threshold** in API route if needed (currently 0.5)

## Additional Resources

- [Full Setup Guide](RECAPTCHA_SETUP.md)
- [Google reCAPTCHA Docs](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
