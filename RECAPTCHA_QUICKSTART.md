# Quick Start: Google reCAPTCHA Setup

## 5-Minute Setup

### 1. Get Your Keys (2 minutes)

1. Go to https://www.google.com/recaptcha/admin/create
2. Sign in with Google
3. Register your site:
   - Label: `Fluxline Contact Form`
   - Type: **reCAPTCHA v3**
   - Domains: `localhost`, `fluxline.pro`
4. Copy both keys

### 2. Configure Environment (1 minute)

```bash
# Create .env.local file in project root
cat > .env.local << 'EOF'
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here
EOF
```

Replace `your_site_key_here` and `your_secret_key_here` with the keys from step 1.

### 3. Test Locally (2 minutes)

```bash
# Start dev server
yarn dev

# Open contact page
open http://localhost:3000/contact

# Look for reCAPTCHA badge in bottom-right corner
# Submit a test message - should work without issues
```

## That's It!

Your contact form now has invisible spam protection. The reCAPTCHA badge will appear in the bottom-right corner of all pages.

## Production Deployment

When deploying, add the same environment variables to your hosting platform:

- Vercel: Project Settings → Environment Variables
- Azure: Application Settings → Configuration
- Other platforms: Add to your deployment environment

Make sure your production domain is added to the reCAPTCHA admin console.

## Troubleshooting

**Badge not showing?**

- Check `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
- Restart dev server after adding .env.local

**Form submission fails?**

- Check `RECAPTCHA_SECRET_KEY` is set
- Verify domain is in reCAPTCHA admin console
- Check browser console for errors

For detailed documentation, see [RECAPTCHA_SETUP.md](RECAPTCHA_SETUP.md)
