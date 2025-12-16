# Free vs Standard Tier: Complete Comparison

## 🎯 Quick Answer

**Yes, Standard Tier has stricter enforcement that causes 403 errors with configurations that work fine on Free tier.**

## 📊 Detailed Comparison

| Feature                        | Free Tier                         | Standard Tier                  | Impact on Your Site                                     |
| ------------------------------ | --------------------------------- | ------------------------------ | ------------------------------------------------------- |
| **Host Header Validation**     | Lenient - accepts mismatches      | Strict - must match exactly    | ⚠️ **Critical** - Custom domains must be properly bound |
| **SSL Certificate Management** | Flexible validation               | Strict validation required     | ⚠️ **Critical** - Certificates must be "Ready"          |
| **Configuration File Errors**  | Soft failures, often ignored      | Hard failures, returns 403     | 🔴 **High** - Syntax errors cause immediate failures    |
| **Custom Domain Setup**        | Basic - works with minimal config | Advanced - requires full setup | ⚠️ **Critical** - DNS + SSL must be complete            |
| **404 Rewrite Handling**       | Permissive routing                | Strict validation on rewrite   | 🔴 **High** - This is what broke your site              |
| **Security Headers**           | Optional                          | Enforced                       | 🟡 **Medium** - More strict policy enforcement          |
| **API Route Security**         | Basic                             | Enhanced validation            | 🟢 **Low** - Your API should work fine                  |
| **IP Restrictions**            | Limited                           | Full featured                  | 🟢 **Low** - Not affecting your setup                   |
| **SLA**                        | None                              | 99.95% uptime                  | ℹ️ **Info** - Better reliability                        |
| **Custom Domains**             | 2 free                            | Unlimited                      | ℹ️ **Info** - You only need 2                           |
| **Bandwidth**                  | 100 GB/month                      | Unlimited                      | ℹ️ **Info** - Better for growth                         |
| **Build Minutes**              | Limited                           | Unlimited                      | ℹ️ **Info** - Faster deployments                        |
| **Cost**                       | Free                              | ~$9/month                      | 💰 **Cost** - Budget consideration                      |

## 🔍 Why Your Specific Setup Failed

### What You Changed

```json
{
  "responseOverrides": {
    "404": {
      "rewrite": "/404.html",
      "statusCode": 404
    }
  }
}
```

### What Happened

#### In Free Tier (DEV/TEST) ✅

1. Request comes to non-existent page
2. Azure triggers 404 handling
3. Rewrites to `/404.html` with lenient validation
4. Serves custom 404 page
5. **Works perfectly**

#### In Standard Tier (PROD) ❌

1. Request comes to non-existent page
2. Azure triggers 404 handling
3. Attempts rewrite to `/404/index.html`
4. **Strict host validation kicks in**
5. Checks if requesting domain is properly bound
6. Checks if SSL certificate is active and validated
7. If ANY check fails → **403 Forbidden**
8. User sees Azure's 403 page instead of your 404

### Why Standard Tier Is Stricter

Standard Tier is designed for **enterprise production workloads** where security and compliance are critical:

1. **Security First**: Prevents unauthorized access patterns
2. **Domain Validation**: Ensures only bound domains can serve content
3. **SSL/TLS Enforcement**: Guarantees encrypted connections
4. **Configuration Validation**: Prevents misconfigurations in production

## 🛠️ What You Must Do Differently

### 1. Custom Domain Setup (Critical)

#### Free Tier:

```bash
# Add domain - pretty much works immediately
az staticwebapp hostname set --hostname "fluxline.pro"
# ✅ Works even if DNS isn't fully propagated
```

#### Standard Tier:

```bash
# Add domain
az staticwebapp hostname set --hostname "fluxline.pro"
# ⏳ Wait for DNS propagation (5-15 minutes)
# ⏳ Wait for SSL provisioning (5-30 minutes)
# ⏳ Verify SSL is "Ready" not "Pending"
# ✅ Only then it works without 403 errors
```

**Your Action**:

- Ensure DNS records are correct
- Wait for SSL certificates to be fully provisioned
- Verify status shows "Ready"

### 2. Configuration File Validation

#### Free Tier:

```json
{
  "routes": [
    { "route": "/api/*" } // Missing allowedRoles - ignored
  ]
}
// ✅ Still works, Azure uses defaults
```

#### Standard Tier:

```json
{
  "routes": [
    { "route": "/api/*" } // Missing allowedRoles
  ]
}
// ❌ 403 Forbidden - incomplete configuration rejected
```

**Your Action**:

- Every route must have `"allowedRoles": ["anonymous"]` or `["authenticated"]`
- No syntax errors allowed
- All referenced files (like `404.html`) must exist

### 3. Rewrite Rules

#### Free Tier:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": ["/images/*", "/api/*"]
  }
}
// ✅ Works with pattern matching flexibility
```

#### Standard Tier:

```json
{
  "navigationFallback": {
    "rewrite": "/404/index.html",
    "exclude": [
      "/images/*",
      "/api/*",
      // Must be more explicit about all static assets
      "/*.{css,js,png,jpg,jpeg,gif,ico,svg,woff,woff2,ttf,eot}"
    ]
  }
}
// ✅ Requires explicit exclusions to avoid routing conflicts
```

**Your Action**:

- Be more explicit with exclusion patterns
- Document all static asset paths
- Test thoroughly after any routing changes

### 4. SSL/TLS Requirements

#### Free Tier:

- SSL certificates auto-provision in background
- Site works even during "Pending" state (sometimes)
- More forgiving of certificate issues

#### Standard Tier:

- SSL certificates must be fully provisioned
- Site returns 403 if certificate is "Pending" or "Failed"
- Zero tolerance for SSL/TLS issues

**Your Action**:

```powershell
# Check SSL status frequently
az staticwebapp hostname show \
  --name swa-fluxline-pro-prod-v2 \
  --resource-group az-fluxline-rg \
  --hostname "fluxline.pro" \
  --query "status"

# Wait for "Ready" status before declaring success
```

## 📋 Migration Checklist: Free → Standard

When moving from Free to Standard tier:

### Pre-Migration

- [ ] Document all custom domains currently in use
- [ ] Export current `staticwebapp.config.json`
- [ ] Backup deployment tokens
- [ ] Document DNS records

### During Migration

- [ ] Create new Standard tier Static Web App
- [ ] Configure managed identity and Key Vault access
- [ ] Add custom domains one at a time
- [ ] Verify SSL certificate provisioning for each domain
- [ ] Test with native Azure URL first
- [ ] Only then test custom domains

### Post-Migration

- [ ] Verify no 403 errors on any route
- [ ] Test custom 404 page
- [ ] Test API functions
- [ ] Monitor for 24 hours
- [ ] Update DNS to point to new instance
- [ ] Keep old instance running for 7 days (rollback option)

## 🎯 Best Practices for Standard Tier

### 1. Always Verify SSL Status

```powershell
# Don't just add domain and assume it works
# Check status every 5 minutes until "Ready"
$status = "Pending"
while ($status -ne "Ready") {
    $status = az staticwebapp hostname show `
        --name swa-fluxline-pro-next-prod `
        --resource-group az-fluxline-rg `
        --hostname "fluxline.pro" `
        --query "status" -o tsv

    Write-Host "SSL Status: $status"
    Start-Sleep -Seconds 300  # Wait 5 minutes
}
Write-Host "✅ SSL Ready!"
```

### 2. Explicit Route Configuration

```json
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["anonymous"],
      "headers": {
        "Cache-Control": "no-cache"
      }
    },
    {
      "route": "/admin/*",
      "allowedRoles": ["authenticated"]
    },
    {
      "route": "/*",
      "allowedRoles": ["anonymous"]
    }
  ]
}
```

### 3. Comprehensive Testing

```bash
# Test sequence for Standard tier
1. Build locally: yarn build
2. Verify 404.html exists: ls out/404.html
3. Deploy to Azure
4. Wait 5 minutes for propagation
5. Test native URL: curl -I https://[name].azurestaticapps.net
6. Wait for SSL "Ready" status
7. Test custom domain: curl -I https://fluxline.pro
8. Test 404 page: curl -I https://fluxline.pro/nonexistent
9. Test API: curl -X POST https://fluxline.pro/api/contact
```

### 4. Monitor and Alert

```powershell
# Set up monitoring for 403 errors
az monitor metrics alert create \
  --name "swa-403-errors" \
  --resource-group az-fluxline-rg \
  --scopes "/subscriptions/.../staticSites/swa-fluxline-pro-prod-v2" \
  --condition "count Http403 > 5" \
  --window-size 5m \
  --evaluation-frequency 1m
```

## 💡 Key Takeaways

1. **Standard Tier ≠ Free Tier with More Features**
   - It's a fundamentally different platform with stricter enforcement
   - What works on Free might not work on Standard without adjustments

2. **Security is Paramount**
   - Standard tier prioritizes security over convenience
   - Every configuration is validated strictly
   - No "close enough" - it must be exact

3. **SSL/TLS is Critical**
   - Free tier: SSL is nice to have
   - Standard tier: SSL is mandatory and must be active

4. **Configuration Must Be Perfect**
   - Free tier forgives errors
   - Standard tier returns 403 for any misconfiguration

5. **Testing is Essential**
   - Always test in DEV/TEST first
   - But don't assume DEV/TEST success = PROD success
   - Standard tier requires additional validation steps

## 🚀 Your Next Steps

1. Run the setup script: `azure\scripts\provisioning\setup-prod-standard-swa.ps1`
2. Wait for SSL certificates (be patient - 15-30 minutes)
3. Verify all checks pass before switching DNS
4. Keep old PROD running as backup for 7 days
5. Monitor closely for first 48 hours

## 📞 When to Use Each Tier

### Use Free Tier For:

- ✅ Personal projects
- ✅ Development environments
- ✅ Proof of concepts
- ✅ Low-traffic sites (<100 GB/month)
- ✅ Learning and experimentation

### Use Standard Tier For:

- ✅ Production business sites
- ✅ Custom domain with SSL/TLS requirements
- ✅ High-traffic applications
- ✅ SLA requirements
- ✅ Enterprise security needs
- ✅ **Your Fluxline.pro production site**

---

**Bottom Line**: Your 403 errors are expected behavior on Standard tier when SSL/domain setup isn't complete. Follow the setup guide carefully, wait for SSL provisioning, and it will work perfectly.

**Last Updated**: December 16, 2025
