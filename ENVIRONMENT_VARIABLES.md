# Environment Variables Configuration Guide

## Overview

This project separates environment variables into three distinct scopes:

1. **`.env.example`** - Frontend build-time variables (checked in)
2. **`.env.local.example`** - Local development template (checked in)
3. **`api/local.settings.json`** - Azure Functions runtime secrets (NOT checked in)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Next.js Frontend                          │
│  .env.example / .env.local → NEXT_PUBLIC_* variables embedded  │
└─────────────────────────────────────────────────────────────────┘
                                  ↓
                          fetch('/api/...')
                                  ↓
┌─────────────────────────────────────────────────────────────────┐
│                 Azure Functions Backend (Node.js)               │
│         api/local.settings.json → process.env.* at runtime      │
└─────────────────────────────────────────────────────────────────┘
```

## Variable Scopes

### Frontend Variables (`.env.example`)

**Purpose:** Build-time configuration for Next.js  
**Scope:** Published to browser via `NEXT_PUBLIC_*` prefix  
**Security:** ⚠️ **PUBLIC** - Never put secrets here

| Variable                         | Purpose                 | Example                 |
| -------------------------------- | ----------------------- | ----------------------- |
| `NEXT_PUBLIC_ENVIRONMENT`        | Environment identifier  | `prod`, `test`, `dev`   |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v3 public key | `6LeIx...`              |
| `NEXT_PUBLIC_API_BASE_URL`       | Backend API endpoint    | `http://localhost:7071` |
| `SITE_URL`                       | Canonical site URL      | `https://fluxline.pro`  |

### Local Development Variables (`.env.local.example`)

**Purpose:** Developer overrides for local testing  
**Security:** 🔒 **Private** - Never commit `.env.local` (on .gitignore)

Same as `.env.example` but with local values:

```bash
# .env.local (created from .env.local.example)
NEXT_PUBLIC_ENVIRONMENT=dev
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-dev-key-here
NEXT_PUBLIC_API_BASE_URL=http://localhost:7071
SITE_URL=http://localhost:3000
```

### Backend Variables (`api/local.settings.json`)

**Purpose:** Runtime configuration for Azure Functions  
**Scope:** Server-side only, never exposed to browser  
**Security:** 🔒 **Private** - Contains sensitive secrets

| Variable               | Purpose                    | Used By                                               |
| ---------------------- | -------------------------- | ----------------------------------------------------- |
| `ENVIRONMENT`          | Environment identifier     | All Functions                                         |
| `ACCESS_TOKEN`         | Dev/Test environment auth  | `/api/auth/validate-token`                            |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v3 secret key    | `/api/contact`                                        |
| `SMTP_*`               | Email delivery credentials | `/api/contact`                                        |
| `CONTACT_EMAIL`        | Email destination          | `/api/contact`                                        |
| `YOUTUBE_API_KEY`      | YouTube Data API           | `/api/youtube`                                        |
| `STRIPE_*`             | Stripe payment credentials | `/api/create-checkout-session`, `/api/stripe-webhook` |
| `AZURE_*`              | Azure storage credentials  | `/api/podcasts-episodes`, `/api/podcasts-rss`         |

## Setup Instructions

### 1. Frontend Development (Next.js)

```bash
# Copy the template
cp .env.local.example .env.local

# Edit with your local values
nano .env.local

# Should contain:
# NEXT_PUBLIC_ENVIRONMENT=dev
# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your-test-key>
# NEXT_PUBLIC_API_BASE_URL=http://localhost:7071
# SITE_URL=http://localhost:3000

# Start dev server
yarn dev
```

### 2. Backend Development (Azure Functions)

```bash
# Edit the actual local.settings.json
nano api/local.settings.json

# Should contain all backend secrets:
# ENVIRONMENT=dev
# ACCESS_TOKEN=dev-test-token-12345
# RECAPTCHA_SECRET_KEY=<your-secret-key>
# SMTP_USER=terencewaters
# SMTP_PASS=<your-password>
# ... (all other backend vars)

# Start Azure Functions
cd api
func start
```

### 3. Production Deployment

**GitHub Actions builds the frontend with:**

```yaml
env:
  NEXT_PUBLIC_ENVIRONMENT: ${{ environment }}
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ${{ secrets.RECAPTCHA_SITE_KEY }}
  NEXT_PUBLIC_API_BASE_URL: '' # Empty = uses relative paths
  SITE_URL: ${{ deployment_url }}
```

**Azure Static Web Apps configures backend with:**

- Application Settings → `RECAPTCHA_SECRET_KEY`
- Application Settings → `ACCESS_TOKEN` (for dev/test only)
- Key Vault → Other secrets (SMTP, Stripe, Azure credentials)

## Variable Checklist

### Frontend Building

- [ ] `.env.example` has all `NEXT_PUBLIC_*` vars
- [ ] `.env.local.example` is a template (not committed)
- [ ] `.env.local` is on `.gitignore` ✓
- [ ] No backend secrets in frontend vars

### Backend Runtime

- [ ] `api/local.settings.json` has all backend secrets
- [ ] `api/local.settings.json` is on `.gitignore` ✓
- [ ] `api/local.settings.sample.json` is a template (committed)
- [ ] `ENVIRONMENT` matches `NEXT_PUBLIC_ENVIRONMENT`
- [ ] `ACCESS_TOKEN` is set for dev/test environments

### GitHub Actions

- [ ] `RECAPTCHA_SITE_KEY` secret is set
- [ ] Workflows pass `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- [ ] Workflows pass correct `SITE_URL` per environment
- [ ] Workflows set `NEXT_PUBLIC_API_BASE_URL=''` for deployed

### Azure Static Web Apps

- [ ] Application Settings include `RECAPTCHA_SECRET_KEY`
- [ ] Application Settings include `ACCESS_TOKEN` (dev/test)
- [ ] Key Vault has SMTP, Stripe, and Azure credentials
- [ ] Function permissions allow accessing Key Vault

## Security Best Practices

✅ **DO:**

- ✅ Keep `.env.local` and `api/local.settings.json` on `.gitignore`
- ✅ Use `NEXT_PUBLIC_*` prefix ONLY for public frontend vars
- ✅ Store backend secrets in `api/local.settings.json` locally
- ✅ Store secrets in Azure Key Vault for production
- ✅ Use different tokens/keys per environment (dev/test/prod)
- ✅ Rotate secrets regularly

❌ **DON'T:**

- ❌ Commit `.env.local` or `api/local.settings.json`
- ❌ Put secret keys in `.env.example`
- ❌ Put backend-only vars in `.env` files
- ❌ Use production secrets for local development
- ❌ Commit credentials to any file

## Troubleshooting

### Frontend can't reach API

**Problem:** `NEXT_PUBLIC_API_BASE_URL` is wrong  
**Check:** Is `http://localhost:7071` running? (`func start`)  
**Fix:** Update `.env.local` → `NEXT_PUBLIC_API_BASE_URL=http://localhost:7071`

### Contact form shows "Failed to verify reCAPTCHA"

**Problem:** `RECAPTCHA_SECRET_KEY` not set in `api/local.settings.json`  
**Fix:** Add your secret key to `api/local.settings.json`

### Auth function says "Token is invalid"

**Problem:** `ACCESS_TOKEN` doesn't match  
**Check:** Is token in both frontend request AND `api/local.settings.json`?  
**Fix:** Update to same value in both places

### Azure Functions can't send emails

**Problem:** SMTP credentials missing from Application Settings  
**Fix:** Add `SMTP_USER` and `SMTP_PASS` to Azure Static Web Apps → Application Settings

## Reference

- [Environment Variables Documentation](#)
- [reCAPTCHA Setup Guide](RECAPTCHA_IMPLEMENTATION.md)
- [Azure Static Web Apps Configuration](azure/docs/SETUP-GUIDE.md)
- [GitHub Actions Workflows](.github/workflows/)
