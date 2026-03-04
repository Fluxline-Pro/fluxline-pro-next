# reCAPTCHA v3 Integration - Implementation Summary

This document summarizes the reCAPTCHA v3 integration and enhanced form validation implemented for the TW.com contact form.

## Overview

Successfully implemented:

1. ✅ Client-side validation (name >10 chars, valid email, message >15 chars)
2. ✅ reCAPTCHA v3 integration with Google
3. ✅ Server-side reCAPTCHA verification in /api/contact
4. ✅ Proper environment configuration and deployment setup

## Changes Made

### 1. Dependencies Added

**Package:** `react-google-recaptcha-v3@1.11.0`

- Installed via `yarn add react-google-recaptcha-v3`
- Added to [package.json](package.json)

### 2. New Components Created

#### ReCaptchaProvider Component

**Location:** [src/components/ReCaptchaProvider/](src/components/ReCaptchaProvider/)

- **ReCaptchaProvider.tsx** - Provider component that wraps the app
- **index.ts** - Barrel export

Features:

- Wraps Google's reCAPTCHA v3 provider
- Graceful degradation when site key is not configured
- Development mode warnings when keys are missing

### 3. Updated Files

#### Frontend

**[src/app/layout.tsx](src/app/layout.tsx)**

- Added `ReCaptchaProvider` import
- Wrapped app with `<ReCaptchaProvider>` to enable reCAPTCHA globally

**[src/app/contact/components/ContactForm.tsx](src/app/contact/components/ContactForm.tsx)**

- Added `useGoogleReCaptcha()` hook
- Enhanced validation:
  - Name: minimum 10 characters
  - Email: valid format (existing)
  - Message: minimum 15 characters, maximum 1000 characters
- Generates reCAPTCHA token on form submission
- Sends token to API with form data
- Error handling for missing reCAPTCHA

#### Backend

**[api/contact/index.js](api/contact/index.js)**

- Added reCAPTCHA verification function using native `https` module
- Verifies token with Google's API
- Validates score threshold (minimum 0.5)
- Enhanced server-side validation:
  - Name: minimum 10 characters
  - Email: valid format
  - Message: minimum 15 characters, maximum 1000 characters
- Graceful degradation when `RECAPTCHA_SECRET_KEY` not configured
- Detailed logging for debugging

#### Configuration

**[.env.example](.env.example)**

- Added reCAPTCHA configuration section
- Documented `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public, build-time)
- Documented `RECAPTCHA_SECRET_KEY` (private, runtime)

**GitHub Actions Workflows**

- [.github/workflows/azure-static-web-apps-dev.yml](.github/workflows/azure-static-web-apps-dev.yml)
- [.github/workflows/azure-static-web-apps-test.yml](.github/workflows/azure-static-web-apps-test.yml)
- [.github/workflows/azure-static-web-apps-prod.yml](.github/workflows/azure-static-web-apps-prod.yml)

Updated build step in all workflows to include:

```yaml
env:
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ${{ secrets.RECAPTCHA_SITE_KEY }}
```

## Setup Instructions

### 1. Get reCAPTCHA Keys from Google

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click **+** to create a new site
3. Configure:
   - **Label:** TW.com Contact Form (or your preferred name)
   - **reCAPTCHA type:** reCAPTCHA v3
   - **Domains:**
     - `terencewaters.com` (production)
     - `localhost` (local development)
     - Your Azure Static Web Apps domains (e.g., `*.azurestaticapps.net`)
4. Accept terms and submit
5. Copy the **Site Key** (public) and **Secret Key** (private)

### 2. Configure Local Development

Create `.env.local` in project root:

```bash
# reCAPTCHA Keys
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
```

### 3. Configure GitHub Secrets

Add to GitHub repository secrets (Settings → Secrets and variables → Actions):

| Secret Name          | Value                   | Usage                             |
| -------------------- | ----------------------- | --------------------------------- |
| `RECAPTCHA_SITE_KEY` | Your reCAPTCHA site key | Build-time (embedded in frontend) |

### 4. Configure Azure Static Web Apps

Add to Azure Static Web Apps Application Settings (for all environments):

| Setting Name           | Value                     | Environment           |
| ---------------------- | ------------------------- | --------------------- |
| `RECAPTCHA_SECRET_KEY` | Your reCAPTCHA secret key | All (Dev, Test, Prod) |

**Steps:**

1. Go to Azure Portal → Your Static Web App
2. Settings → Configuration
3. Click **+ Add** under Application Settings
4. Add `RECAPTCHA_SECRET_KEY` with your secret key value
5. Save changes

### 5. Test Locally

1. Start Next.js dev server:

   ```bash
   yarn dev
   ```

2. Start Azure Functions locally (in another terminal):

   ```bash
   cd api
   func start
   ```

3. Visit `http://localhost:3000/contact`
4. Fill out the form with test data:
   - Name: At least 10 characters (e.g., "John Smith")
   - Email: Valid email format
   - Message: At least 15 characters
5. Submit and check:
   - Browser console for reCAPTCHA token generation
   - Azure Functions terminal for verification logs

### 6. Deploy

```bash
git add .
git commit -m "Add reCAPTCHA v3 integration and enhanced validation"
git push origin your-branch
```

The GitHub Actions workflow will:

1. Build the app with `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` embedded
2. Deploy to Azure Static Web Apps
3. Azure Functions will use `RECAPTCHA_SECRET_KEY` from application settings

## Validation Rules

### Client-Side (ContactForm.tsx)

| Field     | Validation                                               |
| --------- | -------------------------------------------------------- |
| Name      | Required, minimum 10 characters                          |
| Email     | Required, valid email format                             |
| Message   | Required, minimum 15 characters, maximum 1000 characters |
| reCAPTCHA | Token must be generated successfully                     |

### Server-Side (api/contact/index.js)

| Field           | Validation                                               |
| --------------- | -------------------------------------------------------- |
| Name            | Required, minimum 10 characters                          |
| Email           | Required, valid email format                             |
| Message         | Required, minimum 15 characters, maximum 1000 characters |
| reCAPTCHA Token | Required (if `RECAPTCHA_SECRET_KEY` is set), score ≥ 0.5 |

## How It Works

### Client Flow

1. User fills out contact form
2. User clicks Submit
3. Form validates input (name >10 chars, valid email, message >15 chars)
4. If valid, reCAPTCHA token is generated using `executeRecaptcha('contact_form_submit')`
5. Token is sent with form data to `/api/contact`
6. Response is handled and user sees success/error message

### Server Flow

1. Azure Function receives POST request
2. Checks rate limiting (max 5 requests/hour per IP)
3. Verifies reCAPTCHA token with Google's API
4. Checks score (must be ≥ 0.5)
5. Validates form data (name >10 chars, email format, message 15-1000 chars)
6. Sanitizes input
7. Sends email via SMTP
8. Returns success/error response

## Graceful Degradation

### Development Mode

If environment variables are not set:

- **Frontend:** Logs warning, form works without reCAPTCHA
- **Backend:** Logs warning, skips reCAPTCHA verification

### Production Mode

- **Frontend:** If `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is missing, shows error message
- **Backend:** If `RECAPTCHA_SECRET_KEY` is missing, logs warning but continues (not recommended for production)

## Security Considerations

1. **Never commit keys to version control** - Use environment variables
2. **Rotate keys periodically** - Every 6-12 months recommended
3. **Monitor reCAPTCHA admin console** - Watch for abusive traffic
4. **Adjust score threshold if needed** - Current: 0.5 (balance between security and UX)
5. **Use different keys per environment** - Optional but recommended
6. **Whitelist domains carefully** - Only add necessary domains in reCAPTCHA admin

## Troubleshooting

### "Failed to verify reCAPTCHA" Error

**Possible causes:**

- Incorrect site key or secret key
- Domain not whitelisted in reCAPTCHA admin console
- Score below threshold (0.5)
- Network issues reaching Google's API

**Solutions:**

1. Verify keys are correct in all environments
2. Check domain whitelist in reCAPTCHA admin
3. Check Azure Function logs for detailed error message
4. Try temporarily lowering `RECAPTCHA_MIN_SCORE` in `api/contact/index.js`

### reCAPTCHA Badge Not Appearing

**Possible causes:**

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` not set or incorrect
- Build didn't include the environment variable

**Solutions:**

1. Check browser console for ReCaptchaProvider warning
2. Verify GitHub secret `RECAPTCHA_SITE_KEY` is set
3. Rebuild and redeploy the application
4. Hard refresh page (Cmd+Shift+R / Ctrl+Shift+R)

### Validation Errors

**Name or Message Too Short:**

- Ensure client-side validation matches server-side
- Current requirements: name ≥10 chars, message ≥15 chars

**Score Too Low:**

- Review reCAPTCHA admin console analytics
- Consider lowering `RECAPTCHA_MIN_SCORE` if legitimate users are blocked
- Default is 0.5, range is 0.0-1.0

## Files Modified

| File                                                                                                             | Purpose                                                  |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [src/components/ReCaptchaProvider/ReCaptchaProvider.tsx](src/components/ReCaptchaProvider/ReCaptchaProvider.tsx) | reCAPTCHA provider wrapper                               |
| [src/components/ReCaptchaProvider/index.ts](src/components/ReCaptchaProvider/index.ts)                           | Barrel export                                            |
| [src/app/layout.tsx](src/app/layout.tsx)                                                                         | Added ReCaptchaProvider to app                           |
| [src/app/contact/components/ContactForm.tsx](src/app/contact/components/ContactForm.tsx)                         | Enhanced validation + reCAPTCHA token generation         |
| [api/contact/index.js](api/contact/index.js)                                                                     | Server-side reCAPTCHA verification + enhanced validation |
| [.env.example](.env.example)                                                                                     | Environment variable documentation                       |
| [.github/workflows/azure-static-web-apps-dev.yml](.github/workflows/azure-static-web-apps-dev.yml)               | Build-time env var configuration                         |
| [.github/workflows/azure-static-web-apps-test.yml](.github/workflows/azure-static-web-apps-test.yml)             | Build-time env var configuration                         |
| [.github/workflows/azure-static-web-apps-prod.yml](.github/workflows/azure-static-web-apps-prod.yml)             | Build-time env var configuration                         |
| [package.json](package.json)                                                                                     | Added react-google-recaptcha-v3 dependency               |

## Testing Checklist

- [ ] Local development with reCAPTCHA works
- [ ] Form validates name (min 10 chars)
- [ ] Form validates email format
- [ ] Form validates message (min 15 chars, max 1000 chars)
- [ ] reCAPTCHA token is generated on submit
- [ ] Server verifies reCAPTCHA token
- [ ] Server validates all fields
- [ ] Email is sent successfully
- [ ] Rate limiting works (5 requests/hour per IP)
- [ ] Error messages are user-friendly
- [ ] Success message appears after submission
- [ ] Deployment to Azure works
- [ ] Production environment has reCAPTCHA badge
- [ ] Environment variables are set in all environments

## Next Steps

1. **Get reCAPTCHA keys** from Google
2. **Add GitHub secret** (`RECAPTCHA_SITE_KEY`)
3. **Add Azure application setting** (`RECAPTCHA_SECRET_KEY`)
4. **Test locally** to verify everything works
5. **Deploy to dev/test** environment first
6. **Monitor reCAPTCHA admin console** for analytics
7. **Deploy to production** when ready

## References

- [Google reCAPTCHA v3 Documentation](https://developers.google.com/recaptcha/docs/v3)
- [react-google-recaptcha-v3 NPM Package](https://www.npmjs.com/package/react-google-recaptcha-v3)
- [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
- [Azure Static Web Apps Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/application-settings)

---

**Implementation Date:** March 4, 2026  
**Version:** 1.0.0  
**Status:** ✅ Complete
