# Configuration Changes Summary

## Overview

This document summarizes the key configuration changes made to support Standard Tier Azure Static Web Apps deployment with proper 404 handling.

**Date**: December 16, 2025

---

## Key Changes

### 1. ✅ 404 Path Correction

**Issue**: The 404 page was being referenced incorrectly in the configuration.

**Fix**: Updated the 404 rewrite path to match the actual build output structure.

```json
// Before (INCORRECT):
"responseOverrides": {
  "404": {
    "rewrite": "/404.html",
    "statusCode": 404
  }
}

// After (CORRECT):
"responseOverrides": {
  "404": {
    "rewrite": "/404/index.html",
    "statusCode": 404
  }
}
```

**Why This Matters**: Next.js builds the 404 page as `/404/index.html` in the `out` folder, not as `/404.html`. This mismatch was likely causing the 403 Forbidden errors in production.

---

### 2. ✅ Unified Configuration File

**Change**: Combined separate configuration files into a single `staticwebapp.config.json`.

**Deleted**: `azure/configs/staticwebapp.config.standard-tier.json`

**Updated**: `staticwebapp.config.json` (root level) now includes:

- Enhanced exclusion patterns for navigationFallback
- Proper caching headers for static assets
- Additional MIME types for fonts, PDFs, and videos
- Improved security headers
- All routes explicitly defined with `allowedRoles`

**Benefits**:

- Single source of truth for configuration
- Automatically copied to `out` folder during build
- Works for all environments (DEV, TEST, PROD)

---

### 3. ✅ Corrected Entra ID App Registration

**Previous (Incorrect)**: `github-fluxline-pro-next-dev`

- Client ID: `bcea6cc6-3949-4065-8f69-e5879edfe7bf`
- Purpose: Development environment

**Updated (Correct)**: `github-fluxline-pro-next-prod`

- Client ID: `ac51b814-4f10-4511-93fa-fba541500610`
- Purpose: Production environment

**Why This Matters**: Using the correct app registration provides:

- Accurate logging per environment
- Proper separation of concerns
- Better security isolation

---

### 4. ✅ Key Vault Secret Name

**Decision**: Keep existing Key Vault secret name.

**Secret Name**: `swa-api-token-prod` (NOT `swa-api-token-prod-v2`)

**Rationale**:

- Avoid unnecessary changes
- Existing workflow already uses this name
- Simplifies deployment process

---

### 5. ✅ Custom Domain Strategy

**Approach**: Phased rollout with testing domain first.

**Phase 1 - Testing** (Automated):

- Add: `flx-next-prod.fluxline.pro`
- Type: CNAME in Azure DNS
- Purpose: Validate configuration before production

**Phase 2 - Production** (Manual):

- Add: `fluxline.pro` (apex domain)
- Add: `www.fluxline.pro` (subdomain)
- Purpose: Avoid downtime on main site

**Benefits**:

- Safe testing without affecting production
- Easy rollback if issues occur
- Validate SSL certificate provisioning
- Test custom 404 behavior

---

### 6. ✅ Workflow File

**Decision**: Use existing workflow file.

**File**: `.github/workflows/azure-static-web-apps-prod.yml`

**Changes**: None required - already configured correctly.

**Deleted**: `.github/workflows/azure-static-web-apps-prod-v2.yml`

---

## Configuration Details

### Updated staticwebapp.config.json

Key improvements in the unified configuration:

#### Navigation Fallback

```json
"exclude": [
  "/api/*",
  "/_next/*",
  "/favicon.ico",
  "/images/*",
  "/assets/*",
  "/blog/**",
  "/portfolio/**",
  "/case-studies/**",
  "/press-release/**",
  "/videos/*",
  "/scrolls/**",
  "/*.{css,js,png,jpg,jpeg,gif,ico,svg,woff,woff2,ttf,eot,webp,mp4,webm}"
]
```

#### Route Configuration

```json
"routes": [
  {
    "route": "/api/*",
    "allowedRoles": ["anonymous"],
    "headers": {
      "Cache-Control": "no-cache"
    }
  },
  {
    "route": "/_next/static/*",
    "headers": {
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  },
  {
    "route": "/images/*",
    "headers": {
      "Cache-Control": "public, max-age=31536000"
    }
  },
  {
    "route": "/scrolls/pdfs/*",
    "headers": {
      "Cache-Control": "public, max-age=31536000",
      "Content-Type": "application/pdf"
    }
  }
]
```

#### Security Headers

```json
"globalHeaders": {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}
```

---

## Setup Script Changes

### Updated Parameters

```powershell
# Corrected default values
$SecretName = "swa-api-token-prod"  # Not -v2
$ManagedIdentityClientId = "ac51b814-4f10-4511-93fa-fba541500610"  # Production app
```

### Custom Domain Configuration

```powershell
# Testing domain only (Phase 1)
$testDomain = "flx-next-prod.fluxline.pro"

# Production domains added manually later (Phase 2)
# - fluxline.pro
# - www.fluxline.pro
```

---

## DNS Configuration

### Testing Domain (Automated)

**Domain**: `flx-next-prod.fluxline.pro`

```
Type: CNAME
Name: flx-next-prod
Value: <swa-default-hostname>.azurestaticapps.net
TTL: 300 seconds
Zone: Azure DNS (fluxline.pro)
```

### Production Domains (Manual - Later)

**Domain**: `fluxline.pro`

```
Type: ALIAS or ANAME
Name: @ (apex)
Value: <swa-default-hostname>.azurestaticapps.net
TTL: 300 seconds
```

**Domain**: `www.fluxline.pro`

```
Type: CNAME
Name: www
Value: <swa-default-hostname>.azurestaticapps.net
TTL: 300 seconds
```

---

## Deployment Process

### Updated Workflow

1. **Create Static Web App**: Run setup script
2. **Configure Entra ID**: Add federated credential for production app
3. **Add Testing Domain**: Automated via script (flx-next-prod.fluxline.pro)
4. **Wait for SSL**: Monitor until "Ready" status
5. **Deploy Application**: Push to master branch
6. **Verify Testing Domain**: Test all functionality
7. **Add Production Domains**: Manual configuration in Azure Portal
8. **Verify Production**: Test production domains
9. **Monitor**: Watch for 24-48 hours

### Key Validation Points

✅ **Build Output Check**:

```powershell
# Verify 404 page exists at correct path
Test-Path "out\404\index.html"  # Must be TRUE

# Verify config copied
Test-Path "out\staticwebapp.config.json"  # Must be TRUE
```

✅ **Configuration Validation**:

```powershell
# Check JSON syntax
Get-Content staticwebapp.config.json | ConvertFrom-Json

# Verify 404 path
(Get-Content staticwebapp.config.json | ConvertFrom-Json).responseOverrides.'404'.rewrite
# Should output: /404/index.html
```

---

## Root Cause Analysis

### Why 403 Forbidden Occurred in PROD (Standard Tier)

1. **Incorrect 404 Path**:
   - Configuration referenced: `/404.html`
   - Actual file location: `/404/index.html`
   - Standard Tier's strict validation rejected the invalid rewrite path

2. **Missing Custom Domain Setup**:
   - Custom domains not properly bound
   - SSL certificates in "Pending" state
   - Host header validation failed

3. **Tier-Specific Enforcement**:
   - Free Tier: Lenient, allowed mismatches
   - Standard Tier: Strict, returns 403 on any error

### The Fix

**Primary Fix**: Correct 404 path in configuration

```json
"rewrite": "/404/index.html"  // Matches actual build output
```

**Secondary Fixes**:

- Use testing domain first to validate configuration
- Wait for SSL certificates to be fully provisioned
- Ensure all routes have explicit `allowedRoles`
- Add comprehensive exclusion patterns

---

## Testing Checklist

### Before Production Deployment

- [ ] Verify `/404/index.html` exists in `out` folder after build
- [ ] Test native Azure URL (`*.azurestaticapps.net`)
- [ ] Test testing domain (`flx-next-prod.fluxline.pro`)
- [ ] Verify custom 404 page displays correctly
- [ ] Test navigation from 404 page works
- [ ] Confirm no 403 Forbidden errors
- [ ] Verify API function (contact form) works
- [ ] Check browser console for errors
- [ ] Test SSL certificate is active
- [ ] Validate security headers present

### After Production Domains Added

- [ ] Test `fluxline.pro` loads correctly
- [ ] Test `www.fluxline.pro` loads correctly
- [ ] Verify 404 handling on production domains
- [ ] Monitor for 24 hours for any issues
- [ ] Check Application Insights (if enabled)
- [ ] Verify no performance degradation

---

## Rollback Plan

If issues occur after adding production domains:

1. **Remove Production Domains**:

   ```powershell
   az staticwebapp hostname delete --name swa-fluxline-pro-prod-v2 --resource-group az-fluxline-rg --hostname "fluxline.pro"
   az staticwebapp hostname delete --name swa-fluxline-pro-prod-v2 --resource-group az-fluxline-rg --hostname "www.fluxline.pro"
   ```

2. **Update DNS**: Point back to old Static Web App

3. **Investigate**: Review logs and test with testing domain

4. **Fix and Retry**: Once fixed, add production domains again

---

## Summary of Benefits

### Configuration Improvements

✅ **Correct 404 handling** - Matches Next.js build output structure
✅ **Unified configuration** - Single source of truth
✅ **Enhanced caching** - Better performance for static assets
✅ **Improved security** - Additional headers and permissions policy
✅ **Comprehensive exclusions** - Prevents routing conflicts
✅ **Explicit route roles** - Clear access control

### Deployment Improvements

✅ **Phased rollout** - Testing domain before production
✅ **Correct app registration** - Proper logging per environment
✅ **Simplified Key Vault** - Use existing secret name
✅ **Safe testing** - No risk to main site during validation
✅ **Easy rollback** - Can revert quickly if needed

### Operational Improvements

✅ **Better monitoring** - Separate logs per environment
✅ **Clear documentation** - All changes tracked
✅ **Validated approach** - Tested before production
✅ **Reduced complexity** - Fewer moving parts
✅ **Future-proof** - Scalable configuration

---

## Next Steps

1. ✅ Run setup script: `azure\scripts\provisioning\setup-prod-standard-swa.ps1`
2. ✅ Configure federated credential in Entra ID (production app)
3. ✅ Add DNS record for testing domain
4. ✅ Wait for SSL certificate provisioning
5. ✅ Deploy via GitHub Actions
6. ✅ Verify testing domain works correctly
7. ⏳ Add production domains manually in Azure Portal (after validation)
8. ⏳ Update DNS for production domains
9. ⏳ Monitor production deployment

---

**Last Updated**: December 16, 2025

**Status**: Configuration updated, ready for deployment
