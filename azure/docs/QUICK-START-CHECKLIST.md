# Production Deployment - Quick Start Checklist

**Goal**: Deploy Fluxline 2.0 to a new Standard Tier Azure Static Web App without 403 Forbidden errors.

**Time Required**: 1-2 hours (including SSL provisioning wait time)

---

## ✅ Pre-Deployment Checklist

### Azure Access

- [ ] Azure CLI installed and authenticated
- [ ] Access to subscription: `3912d915-b497-49b5-8c04-f9de63a523c1`
- [ ] Contributor role on resource group: `az-fluxline-rg`
- [ ] Access to Key Vault: `kv-az-fluxline-next`

### GitHub Access

- [ ] Admin access to repository: `Fluxline-Pro/fluxline-pro-next`
- [ ] Can add/modify GitHub secrets
- [ ] Can create/modify workflows

### Domain Access

- [ ] Admin access to domain registrar for `fluxline.pro`
- [ ] Can add/modify DNS records (CNAME, ALIAS/ANAME, TXT)

### Documentation

- [ ] Read: `azure/docs/PROD-STANDARD-TIER-SETUP.md`
- [ ] Read: `azure/docs/FREE-VS-STANDARD-COMPARISON.md`
- [ ] Bookmarked: `azure/docs/TROUBLESHOOT-403-FORBIDDEN.md` (for reference)

---

## 🚀 Deployment Steps

### Phase 1: Create Azure Resources (15 minutes)

#### 1.1 Run Setup Script

```powershell
cd azure\scripts\provisioning
.\setup-prod-standard-swa.ps1
```

**Expected Output**:

- ✅ Static Web App created
- ✅ Deployment token retrieved
- ✅ Token stored in Key Vault
- ✅ Managed identity configured
- ✅ Custom domains added (pending SSL)

**Checkpoint**: Script completes without errors

#### 1.2 Verify Resources Created

```powershell
# Verify Static Web App exists
az staticwebapp show `
  --name az-fluxline-next-prod `
  --resource-group az-fluxline-rg `
  --query "{name:name, state:state, sku:sku.name}"

# Verify Key Vault secret
az keyvault secret show `
  --vault-name kv-az-fluxline-next `
  --name swa-api-token-prod `
  --query "value" -o tsv
```

**Checkpoint**: Both commands return valid results

---

### Phase 2: Configure Entra ID (10 minutes)

#### 2.1 Add Federated Credential

**Option A: Azure Portal** (Recommended)

1. Go to [Azure Portal](https://portal.azure.com) → Entra ID → App registrations
2. Find app: `github-fluxline-pro-next-prod`
3. Navigate to: Certificates & secrets → Federated credentials
4. Click: "+ Add credential"
5. Configure:
   - Scenario: **GitHub Actions deploying Azure resources**
   - Organization: **Fluxline-Pro**
   - Repository: **fluxline-pro-next**
   - Entity type: **Branch**
   - Branch name: **master**
   - Name: **github-fluxline-pro-next-prod**
6. Click: **Add**

**Option B: Azure CLI**

```powershell
az ad app federated-credential create `
  --id ac51b814-4f10-4511-93fa-fba541500610 `
  --parameters '{
    "name": "github-fluxline-pro-next-prod",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master",
    "description": "GitHub Actions deployment for production",
    "audiences": ["api://AzureADTokenExchange"]
  }'
```

#### 2.2 Verify Federated Credential

```powershell
az ad app federated-credential list `
  --id ac51b814-4f10-4511-93fa-fba541500610 `
  --query "[?name=='github-fluxline-pro-next-prod']" `
  --output table
```

**Checkpoint**: Credential appears in list with correct subject identifier

---

### Phase 3: Configure GitHub (5 minutes)

#### 3.1 Verify GitHub Secrets

Go to: `https://github.com/Fluxline-Pro/fluxline-pro-next/settings/secrets/actions`

Verify these secrets exist:

- [ ] `AZURE_CLIENT_ID_PROD` = `ac51b814-4f10-4511-93fa-fba541500610`
- [ ] `AZURE_TENANT_ID` = `9ebc2060-7a03-47c4-8df4-54d40955cc06`
- [ ] `AZURE_SUBSCRIPTION_ID` = `3912d915-b497-49b5-8c04-f9de63a523c1`

**Note**: If any are missing or incorrect, update them.

#### 3.2 Verify Workflow File

The existing workflow file is already configured correctly:

```yaml
# In .github/workflows/azure-static-web-apps-prod.yml
# Key Vault secret name is already set to:
--name swa-api-token-prod
```

**No changes needed** - The workflow is ready to use.

**Checkpoint**: Workflow file ready for deployment

---

### Phase 4: Configure DNS (10 minutes)

#### 4.1 Get Static Web App Default Hostname

```powershell
$defaultHostname = az staticwebapp show `
  --name az-fluxline-next-prod `
  --resource-group az-fluxline-rg `
  --query "defaultHostname" -o tsv

Write-Host "Default hostname: $defaultHostname"
```

#### 4.2 Add DNS Records in Domain Registrar

**For `fluxline.pro` (Apex Domain)**:

```
Type: ALIAS or ANAME (or A record with IP if required)
Name: @ (or blank)
Value: <default-hostname-from-above>
TTL: 300 (5 minutes)
```

**For `www.fluxline.pro` (Subdomain)**:

```
Type: CNAME
Name: www
Value: <default-hostname-from-above>
TTL: 300 (5 minutes)
```

**For DNS Validation (if required)**:

```powershell
# Get validation token
$validationToken = az staticwebapp hostname show `
  --name az-fluxline-next-prod `
  --resource-group az-fluxline-rg `
  --hostname "flx-next-prod.fluxline.pro" `
  --query "validationToken" -o tsv

Write-Host "Validation token: $validationToken"

# Add TXT record:
Type: TXT
Name: _dnsauth.fluxline.pro (or _dnsauth)
Value: <validation-token-from-above>
TTL: 300 (5 minutes)
```

#### 4.3 Verify DNS Propagation

```powershell
# Check DNS resolution (wait 5-15 minutes after adding records)
nslookup flx-next-prod.fluxline.pro

# Should point to Azure Static Web App
```

**Checkpoint**: DNS records added and propagating

---

### Phase 5: Wait for SSL Provisioning (15-30 minutes)

#### 5.1 Monitor SSL Certificate Status

```powershell
# Run this in a loop every 5 minutes
$domains = @("flx-next-prod.fluxline.pro")
foreach ($domain in $domains) {
    Write-Host "`nChecking SSL for: $domain"

    $status = az staticwebapp hostname show `
        --name az-fluxline-next-prod `
        --resource-group az-fluxline-rg `
        --hostname $domain `
        --query "status" -o tsv

    if ($status -eq "Ready") {
        Write-Host "✅ SSL Ready for $domain" -ForegroundColor Green
    } elseif ($status -eq "Pending") {
        Write-Host "⏳ SSL Pending for $domain (wait 5-30 minutes)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ SSL Failed for $domain - Status: $status" -ForegroundColor Red
    }
}
```

**What to Expect**:

- First 5-10 minutes: Status = "Pending"
- After 10-30 minutes: Status = "Ready"
- If still "Pending" after 60 minutes: Check DNS records and validation

**Checkpoint**: Both domains show "Ready" status

---

### Phase 6: Deploy Application (10 minutes)

#### 6.1 Test Local Build

```powershell
# Build application locally first
yarn install --frozen-lockfile
yarn build

# Verify 404.html exists
Test-Path "out\404.html"  # Should return True

# Verify staticwebapp.config.json
Test-Path "out\staticwebapp.config.json"  # Should return True
```

**Checkpoint**: Build succeeds and required files exist

#### 6.2 Push to Master (Trigger Deployment)

**Option 1**: Use new workflow

```powershell
# Create a test commit to trigger deployment
git add staticwebapp.config.json
git commit -m "Update static web app configuration for Standard tier"
git push origin master

# Monitor workflow at:
# https://github.com/Fluxline-Pro/fluxline-pro-next/actions
```

**Option 2**: Manually trigger workflow

```powershell
# Use GitHub UI to trigger workflow manually
# Go to Actions → Select workflow → Run workflow
```

#### 6.3 Monitor Deployment

Watch GitHub Actions workflow:

1. Build step should complete successfully
2. Azure login should succeed (no authentication errors)
3. Key Vault token retrieval should succeed
4. Deployment should complete without errors

**Checkpoint**: Workflow shows green checkmark

---

### Phase 7: Verification & Testing (15 minutes)

#### 7.1 Test Native Azure URL

```powershell
# Get default URL
$url = az staticwebapp show `
  --name az-fluxline-next-prod `
  --resource-group az-fluxline-rg `
  --query "defaultHostname" -o tsv

Write-Host "Testing: https://$url"

# Test homepage
curl -I "https://$url"
# Should return: HTTP/2 200

# Test 404 page
curl -I "https://$url/nonexistent-page"
# Should return: HTTP/2 404 (with custom page)

# Test API
curl -I "https://$url/api/contact"
# Should return: HTTP/2 404 or 405 (depending on your API implementation)
```

**Checkpoint**: All tests return expected status codes

#### 7.2 Test Custom Domains (After SSL Ready)

```powershell
# Test apex domain
curl -I "https://flx-next-prod.fluxline.pro"
# Should return: HTTP/2 200 (NOT 403!)

# Test custom 404 on testing domain
curl -I "https://flx-next-prod.fluxline.pro/this-page-does-not-exist"
# Should return: HTTP/2 404 with your custom page

# Note: Production domains (fluxline.pro, www.fluxline.pro) will be tested
# after they are added manually in Azure Portal
```

**Checkpoint**: No 403 errors, custom 404 works

#### 7.3 Browser Testing

Open browser and test:

- [ ] https://flx-next-prod.fluxline.pro loads homepage
- [ ] Navigation menu works
- [ ] Visit non-existent page shows custom 404
- [ ] Navigate from 404 page back to site works
- [ ] Test contact form (API function)
- [ ] Check browser console for errors
- [ ] Test on mobile device

**Note**: Production domains will be tested after manual configuration in Azure Portal

**Checkpoint**: All manual tests pass

#### 7.4 Performance & Security Check

```powershell
# Check SSL certificate
curl -v "https://flx-next-prod.fluxline.pro" 2>&1 | Select-String "SSL"

# Check security headers
curl -I "https://flx-next-prod.fluxline.pro" | Select-String "X-"

# Should see:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
```

**Checkpoint**: SSL valid, security headers present

---

## 🎉 Success Criteria

Your deployment is successful when ALL of these are true:

- [x] Static Web App shows "Ready" state in Azure Portal
- [x] Testing domain shows SSL status "Ready"
- [x] GitHub Actions workflow completes successfully
- [x] Native Azure URL (`*.azurestaticapps.net`) returns 200
- [x] Testing domain `flx-next-prod.fluxline.pro` returns 200 (NOT 403)
- [x] Custom 404 page displays correctly
- [x] Navigation from 404 page works
- [x] Contact form API function works
- [x] No console errors in browser
- [x] Mobile testing passes

**Note**: Production domains (`fluxline.pro`, `www.fluxline.pro`) will be added manually after testing is complete.

---

## 🚨 Troubleshooting Quick Reference

### Issue: 403 Forbidden on Custom Domain

**Check**:

```powershell
# 1. SSL status
az staticwebapp hostname show --name az-fluxline-next-prod --resource-group az-fluxline-rg --hostname "flx-next-prod.fluxline.pro" --query "status"

# 2. DNS resolution
nslookup flx-next-prod.fluxline.pro

# 3. Test native URL
curl -I https://<swa-name>.azurestaticapps.net
```

**Solution**: If native URL works but custom domain doesn't, wait for SSL to be "Ready"

### Issue: SSL Stuck in "Pending"

**Check**:

```powershell
# Verify DNS records
nslookup flx-next-prod.fluxline.pro

# Check validation token
az staticwebapp hostname show --name az-fluxline-next-prod --resource-group az-fluxline-rg --hostname "flx-next-prod.fluxline.pro" --query "validationToken"
```

**Solution**: Add TXT validation record if required, or remove and re-add domain

### Issue: GitHub Actions Authentication Fails

**Check**:

```powershell
# Verify federated credential
az ad app federated-credential list --id ac51b814-4f10-4511-93fa-fba541500610 --output table
```

**Solution**: Ensure subject matches: `repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master`

### Issue: Deployment Succeeds but Site Shows Old Content

**Solution**: Wait 2-3 minutes for CDN cache to clear, then force refresh (Ctrl+Shift+R)

---

## 📞 Need Help?

If stuck, refer to:

1. **Troubleshooting Guide**: `azure/docs/TROUBLESHOOT-403-FORBIDDEN.md`
2. **Full Setup Guide**: `azure/docs/PROD-STANDARD-TIER-SETUP.md`
3. **Comparison Guide**: `azure/docs/FREE-VS-STANDARD-COMPARISON.md`
4. **Entra ID Setup**: `azure/docs/ENTRA-ID-FEDERATED-CREDENTIAL-SETUP.md`

---

## 🔄 Rollback Procedure (If Needed)

If something goes wrong:

1. **Revert DNS**: Point back to old Static Web App
2. **Disable New Workflow**: Rename or disable new workflow file
3. **Verify Old Site**: Ensure old site still works
4. **Investigate**: Review logs and troubleshoot issues
5. **Fix and Retry**: Once fixed, try deployment again

---

## ✅ Post-Deployment Tasks

After successful deployment:

- [ ] Monitor site for 24 hours
- [ ] Check Application Insights (if enabled) for errors
- [ ] Update documentation with actual timings and any issues encountered
- [ ] Schedule old Static Web App deletion for 7 days from now
- [ ] Notify team of successful deployment
- [ ] Update runbooks with any lessons learned

---

**Estimated Total Time**: 1-2 hours (mostly waiting for SSL provisioning)

**Last Updated**: December 16, 2025
