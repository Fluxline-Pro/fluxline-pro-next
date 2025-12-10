# Google reCAPTCHA v3 Setup Guide

This guide explains how to set up Google reCAPTCHA v3 for the contact form spam protection.

## What is reCAPTCHA v3?

reCAPTCHA v3 is Google's invisible spam protection that analyzes user behavior without requiring any user interaction (no checkboxes or image challenges). It provides a score (0.0 to 1.0) indicating the likelihood that the user is a bot.

## Setup Instructions

### 1. Get reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
2. Sign in with your Google account
3. Fill in the registration form:
   - **Label**: `Fluxline Contact Form` (or any name you prefer)
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `localhost` (for development)
     - `fluxline.pro` (for production)
     - Any other domains where your site will be hosted
4. Accept the terms and click **Submit**
5. Copy both keys:
   - **Site Key** (public key - used in frontend)
   - **Secret Key** (private key - used in backend)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the project root (if it doesn't exist)
2. Add your reCAPTCHA keys:

```bash
# Copy from .env.example and fill in your keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important:**

- `.env.local` is already in `.gitignore` - never commit this file
- `NEXT_PUBLIC_` prefix makes the site key available in client-side code
- Secret key is only used server-side and is never exposed to the client

### 3. Testing

#### Local Development

1. Start the dev server: `yarn dev`
2. Open the contact form at `http://localhost:3000/contact`
3. The reCAPTCHA badge should appear in the bottom-right corner
4. Submit the form - it should work normally
5. Check browser console for any reCAPTCHA errors

#### Production

1. Deploy to your production environment
2. Ensure domain is added to reCAPTCHA admin console
3. Test form submission
4. Monitor for spam in your contact submissions

## How It Works

### Frontend (ContactForm.tsx)

1. The form uses the `useGoogleReCaptcha` hook
2. When form is submitted, it requests a reCAPTCHA token
3. The token is sent along with form data to the API

### Backend (API Route)

1. API receives the form data and reCAPTCHA token
2. Server sends token to Google for verification
3. Google returns a score (0.0 to 1.0)
4. If score is below threshold (0.5), reject as spam
5. If score is acceptable, process the form submission

## Score Interpretation

- **0.9 - 1.0**: Very likely a human
- **0.7 - 0.9**: Likely a human
- **0.5 - 0.7**: Neutral (could be human or bot)
- **0.0 - 0.5**: Likely a bot (rejected)

Default threshold is set to 0.5, but you can adjust this in `/api/contact/route.ts`.

## Troubleshooting

### reCAPTCHA Badge Not Showing

- Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set in `.env.local`
- Verify the site key is correct
- Check browser console for errors
- Make sure you selected reCAPTCHA v3 (not v2)

### Form Submission Fails

- Check that `RECAPTCHA_SECRET_KEY` is set in `.env.local`
- Verify the secret key is correct
- Check that your domain is added in reCAPTCHA admin console
- Look at API route logs for verification errors

### "Localhost is not supported" Error

- Make sure you added `localhost` to the domains list in reCAPTCHA admin
- For development, you can temporarily disable domain verification in admin settings

## Privacy & Compliance

reCAPTCHA v3 collects user data for bot detection. Consider:

- Adding reCAPTCHA mention to your privacy policy
- The reCAPTCHA badge displays Google's privacy and terms links
- Users can opt out by blocking the reCAPTCHA script (though form won't work)

## Additional Resources

- [reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [react-google-recaptcha-v3 Library](https://github.com/t49tran/react-google-recaptcha-v3)
