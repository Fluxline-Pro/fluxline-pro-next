# Troubleshooting 403 Forbidden Errors in Azure Static Web Apps (Standard Tier)

## 🔍 Problem Overview

**Symptom**: 403 Forbidden errors occur on Azure Static Web Apps Standard tier but not on Free tier with identical code and configuration.

**Root Cause**: Standard tier enforces stricter security policies, particularly around host header validation and custom domain binding.

## 📊 Key Differences: Free vs Standard Tier

| Feature                    | Free Tier       | Standard Tier                     |
| -------------------------- | --------------- | --------------------------------- |
| **Host Header Validation** | Lenient         | Strict - Must match exact domain  |
| **Custom Domain Security** | Basic           | Advanced with SSL/TLS enforcement |
| **Configuration Errors**   | Soft failures   | Hard failures (403)               |
| **Networking Rules**       | Minimal         | Advanced with IP restrictions     |
| **SSL Certificate**        | Auto (flexible) | Strict validation required        |

## 🚨 Common Scenarios & Solutions

### Scenario 1: Custom 404 Page Causes 403

**Problem**: Adding `responseOverrides` for custom 404 page triggers 403 errors in production.

**Root Cause**: The rewrite mechanism in Standard tier enforces stricter host validation.

**Solution**:

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

**Checklist**:

- [ ] Verify `404.html` exists in the `out` folder after build
- [ ] Ensure file is named exactly `404.html` (not `404/index.html`)
- [ ] Confirm custom domains are properly bound
- [ ] Verify SSL certificates are active (not pending)

### Scenario 2: Custom Domain Works in Free but Not Standard

**Problem**: Custom domains (fluxline.pro, www.fluxline.pro) return 403 on Standard tier.

**Root Cause**: Standard tier requires explicit domain binding with active SSL certificates.

**Solution Steps**:

1. **Verify Domain Binding in Azure Portal**:

   ```bash
   az staticwebapp hostname list \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg
   ```

2. **Check SSL Certificate Status**:

   ```bash
   az staticwebapp hostname show \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg \
     --hostname "fluxline.pro"
   ```

   Look for: `"status": "Ready"` (not "Pending" or "Failed")

3. **Verify DNS Records**:

   ```bash
   # Check ALIAS record for apex domain
   nslookup fluxline.pro

   # Check CNAME for www subdomain
   nslookup www.fluxline.pro
   ```

4. **Test Host Header Validation**:

   ```bash
   # Test with correct host header
   curl -I -H "Host: fluxline.pro" https://your-swa.azurestaticapps.net

   # Should return 200, not 403
   ```

### Scenario 3: Native Azure URL Works but Custom Domain Returns 403

**Problem**: The `*.azurestaticapps.net` URL works fine, but custom domains return 403.

**Root Cause**: Domain binding or SSL certificate issue.

**Solution**:

1. **Wait for SSL Provisioning**: SSL certificates can take 5-30 minutes to provision

   ```bash
   # Check certificate status repeatedly
   watch -n 30 'az staticwebapp hostname show \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg \
     --hostname "fluxline.pro" \
     --query "status"'
   ```

2. **Verify TXT Record for DNS Validation**:

   ```bash
   # Get validation token
   az staticwebapp hostname show \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg \
     --hostname "fluxline.pro" \
     --query "validationToken" -o tsv

   # Add TXT record in DNS
   # Name: _dnsauth.fluxline.pro
   # Value: <validation-token>
   ```

3. **Force SSL Certificate Regeneration**:

   ```bash
   # Remove and re-add domain
   az staticwebapp hostname delete \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg \
     --hostname "fluxline.pro"

   az staticwebapp hostname set \
     --name swa-fluxline-pro-prod-v2 \
     --resource-group az-fluxline-rg \
     --hostname "fluxline.pro"
   ```

### Scenario 4: 403 After Deployment

**Problem**: Site works before deployment, but returns 403 after GitHub Actions deployment.

**Root Cause**: Build output missing required files or incorrect configuration.

**Solution**:

1. **Verify Build Output**:

   ```bash
   # Check that 404.html exists
   ls -la out/404.html

   # Verify staticwebapp.config.json is in output
   ls -la out/staticwebapp.config.json
   ```

2. **Check Deployment Logs in GitHub Actions**:
   - Look for errors in the "Deploy to Azure Static Web Apps" step
   - Verify that `skip_app_build: true` is set (since we pre-build)
   - Ensure `app_location: 'out'` matches your build output

3. **Validate Configuration File**:

   ```bash
   # Ensure valid JSON
   cat staticwebapp.config.json | jq .

   # Common mistakes:
   # - File named "staticwebapp.json" (missing "config")
   # - Invalid JSON syntax
   # - Missing required fields
   ```

### Scenario 5: IP Restrictions Causing 403

**Problem**: Some users can access the site, others get 403.

**Root Cause**: `networking.allowedIpRanges` configured incorrectly.

**Solution**:

```json
{
  "networking": {
    "allowedIpRanges": [] // Empty array = allow all
  }
}
```

To allow specific IPs only:

```json
{
  "networking": {
    "allowedIpRanges": ["1.2.3.4/32", "5.6.7.0/24"]
  }
}
```

## 🔧 Diagnostic Commands

### Full Diagnostic Script

```bash
#!/bin/bash
# Save as: diagnose-403.sh

SWA_NAME="swa-fluxline-pro-prod-v2"
RESOURCE_GROUP="az-fluxline-rg"
DOMAIN1="fluxline.pro"
DOMAIN2="www.fluxline.pro"

echo "🔍 Azure Static Web App Diagnostics"
echo "===================================="
echo ""

# 1. Check Static Web App exists and status
echo "1️⃣ Static Web App Status:"
az staticwebapp show \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "{name:name, state:state, sku:sku.name, defaultHostname:defaultHostname}" \
  --output table

# 2. List custom hostnames
echo ""
echo "2️⃣ Custom Hostnames:"
az staticwebapp hostname list \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --output table

# 3. Check SSL certificate status for each domain
echo ""
echo "3️⃣ SSL Certificate Status - $DOMAIN1:"
az staticwebapp hostname show \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --hostname $DOMAIN1 \
  --query "{hostname:hostname, status:status, validationToken:validationToken}" \
  --output json

echo ""
echo "4️⃣ SSL Certificate Status - $DOMAIN2:"
az staticwebapp hostname show \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --hostname $DOMAIN2 \
  --query "{hostname:hostname, status:status, validationToken:validationToken}" \
  --output json

# 5. Check DNS resolution
echo ""
echo "5️⃣ DNS Resolution:"
echo "Resolving $DOMAIN1:"
nslookup $DOMAIN1

echo ""
echo "Resolving $DOMAIN2:"
nslookup $DOMAIN2

# 6. Test HTTP response codes
echo ""
echo "6️⃣ HTTP Response Testing:"
DEFAULT_URL=$(az staticwebapp show \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "defaultHostname" -o tsv)

echo "Testing default URL: https://$DEFAULT_URL"
curl -I -s https://$DEFAULT_URL | head -n 1

echo "Testing custom domain: https://$DOMAIN1"
curl -I -s https://$DOMAIN1 | head -n 1

echo "Testing www subdomain: https://$DOMAIN2"
curl -I -s https://$DOMAIN2 | head -n 1

# 7. Check configuration
echo ""
echo "7️⃣ Static Web App Configuration:"
az staticwebapp show \
  --name $SWA_NAME \
  --resource-group $RESOURCE_GROUP \
  --query "buildProperties" \
  --output json

echo ""
echo "✅ Diagnostics complete!"
```

### Quick Health Check

```bash
# Quick one-liner health check
curl -s -o /dev/null -w "%{http_code}" https://fluxline.pro && echo " ✅" || echo " ❌"
```

## 📋 Verification Checklist

Before considering the issue resolved, verify:

### DNS & Domain Configuration

- [ ] DNS records point to correct Azure endpoint
- [ ] DNS records have propagated (use `nslookup` or `dig`)
- [ ] Both apex domain and www subdomain are configured
- [ ] TXT validation records added (if required)

### SSL/TLS Configuration

- [ ] SSL certificates show "Ready" status (not "Pending")
- [ ] HTTPS works for all domains
- [ ] No SSL/TLS errors in browser
- [ ] Certificate is valid and not expired

### Static Web App Configuration

- [ ] `staticwebapp.config.json` is valid JSON
- [ ] File is named exactly `staticwebapp.config.json`
- [ ] Configuration is in the `out` folder after build
- [ ] `404.html` exists in the `out` folder
- [ ] All routes have `"allowedRoles": ["anonymous"]`

### Build & Deployment

- [ ] `yarn build` completes successfully
- [ ] GitHub Actions workflow completes without errors
- [ ] Deployment token is valid and accessible from Key Vault
- [ ] Build output includes all necessary files

### Azure Resources

- [ ] Static Web App is in "Ready" state
- [ ] SKU is set to "Standard"
- [ ] Custom domains are bound
- [ ] Managed identity has Key Vault access
- [ ] No IP restrictions blocking traffic

## 🛠️ Advanced Troubleshooting

### Enable Detailed Logging

Add this to your GitHub Actions workflow for more detailed logs:

```yaml
- name: Deploy with Verbose Logging
  uses: Azure/static-web-apps-deploy@v1
  with:
    action: 'upload'
    verbose: true
    # ... other parameters
  env:
    ACTIONS_STEP_DEBUG: true
```

### Test with curl

```bash
# Test with specific headers
curl -v -H "Host: fluxline.pro" \
  -H "User-Agent: Mozilla/5.0" \
  -H "Accept: text/html" \
  https://your-swa.azurestaticapps.net

# Test 404 handling
curl -I https://fluxline.pro/nonexistent-page

# Should return 404 with custom page, not 403
```

### Check Azure Resource Health

```bash
# Check for any Azure service issues
az resource-health event list \
  --resource-id "/subscriptions/3912d915-b497-49b5-8c04-f9de63a523c1/resourceGroups/az-fluxline-rg/providers/Microsoft.Web/staticSites/swa-fluxline-pro-prod-v2"
```

### Review Activity Logs

```bash
# Check recent operations
az monitor activity-log list \
  --resource-group az-fluxline-rg \
  --max-events 50 \
  --query "[?contains(resourceId, 'swa-fluxline-pro-prod-v2')]" \
  --output table
```

## 📞 When to Contact Azure Support

Contact Azure Support if:

1. SSL certificates stuck in "Pending" for >1 hour
2. 403 errors persist after verifying all configuration
3. Same configuration works in Free tier but not Standard
4. Azure portal shows errors you can't resolve
5. Deployment succeeds but site immediately returns 403

**Support Ticket Information to Include**:

- Static Web App name and resource group
- Subscription ID
- Deployment timestamp
- Screenshots of 403 error
- Output of diagnostic script above
- GitHub Actions workflow run URL

## 🎯 Quick Fix Summary

For most 403 issues on Standard tier:

1. ✅ Verify SSL certificates are "Ready" (not "Pending")
2. ✅ Ensure custom domains are properly bound
3. ✅ Confirm DNS records are correct and propagated
4. ✅ Check that `404.html` exists in build output
5. ✅ Validate `staticwebapp.config.json` syntax
6. ✅ Wait 15-30 minutes for changes to propagate
7. ✅ Test native Azure URL first, then custom domains

## 🔗 Related Resources

- [Azure Static Web Apps Configuration Reference](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Custom Domain Setup Guide](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)
- [Troubleshooting Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/troubleshooting)
- [Standard vs Free Tier Comparison](https://azure.microsoft.com/en-us/pricing/details/app-service/static/)

---

**Last Updated**: December 16, 2025
