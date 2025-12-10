# Contact Page

This directory contains the contact page and form components.

## Spam Protection

The contact form uses **Google reCAPTCHA v3** for invisible spam protection. The captcha analyzes user behavior without requiring any user interaction.

### Quick Setup

1. **Get reCAPTCHA Keys**:
   - Visit [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin/create)
   - Select reCAPTCHA v3
   - Add domains: `localhost`, `fluxline.pro`
   - Copy Site Key and Secret Key

2. **Configure Environment**:
   ```bash
   # Create .env.local in project root
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
   RECAPTCHA_SECRET_KEY=your_secret_key_here
   ```

3. **Test**:
   ```bash
   yarn dev
   # Visit http://localhost:3000/contact
   # Look for reCAPTCHA badge in bottom-right corner
   ```

For detailed setup instructions, see [RECAPTCHA_SETUP.md](/RECAPTCHA_SETUP.md) in the project root.

## Components

- **ContactForm.tsx** - Main form component with validation and reCAPTCHA
- **page.tsx** - Contact page layout with hero, form, and service cards

## Features

- ✅ Google reCAPTCHA v3 integration
- ✅ Honeypot field for basic spam detection
- ✅ Client-side validation
- ✅ Rate limiting (5 requests per hour per IP)
- ✅ Email validation
- ✅ Character count (1000 max)
- ✅ Accessible form labels and error messages
- ✅ Theme-aware styling

## API Endpoint

Form submissions are sent to `/api/contact` (located at `src/app/api/contact/route.ts`).

The API:
- Verifies reCAPTCHA token
- Validates form data
- Applies rate limiting
- Sanitizes inputs
- Logs email content (TODO: implement actual email sending)

## Privacy

The form includes a privacy notice about reCAPTCHA. Google collects user data for bot detection. Consider adding reCAPTCHA details to your privacy policy.
