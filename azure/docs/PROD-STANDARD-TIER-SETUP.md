# Standard Tier Azure Static Web App Setup Guide for Production

## 🎯 Objective

Create a new Standard Tier Azure Static Web App to replace the existing PROD environment, properly configured to avoid 403 Forbidden errors with custom 404 handling.

## 📋 Prerequisites

- Azure CLI installed and authenticated
- Access to Azure subscription: `3912d915-b497-49b5-8c04-f9de63a523c1`
- Managed Identity Client ID: `bcea6cc6-3949-4065-8f69-e5879edfe7bf`
- Key Vault: `kv-az-fluxline-next`
- Custom domains: `fluxline.pro` and `www.fluxline.pro`

## 🔑 Key Differences: Free vs Standard Tier

### Why Standard Tier Had 403 Errors:

1. **Stricter Host Header Validation**: Standard tier enforces exact host header matching
2. **Custom Domain Requirements**: Domains must be properly bound with active SSL certificates
3. **Security Policy Enforcement**: More stringent security rules applied
4. **Configuration Sensitivity**: Config file errors cause harder failures

## 🚀 Step-by-Step Setup

### Step 1: Create the Static Web App (Standard Tier)

```bash
# Set variables
$subscriptionId = "3912d915-b497-49b5-8c04-f9de63a523c1"
$resourceGroup = "az-fluxline-rg"
$location = "westus2"
$swaName = "swa-fluxline-pro-prod-v2"
$sku = "Standard"

# Set subscription
az account set --subscription $subscriptionId

# Create Static Web App (Standard Tier, NO auto-deployment)
az staticwebapp create `
  --name $swaName `
  --resource-group $resourceGroup `
  --location $location `
  --sku $sku `
  --source "https://github.com/Fluxline-Pro/fluxline-pro-next" `
  --branch "master" `
  --app-location "out" `
  --api-location "api" `
  --output-location "" `
  --login-with-github false `
  --no-wait
```

### Step 2: Get the Deployment Token

```bash
# Get the deployment token for the new Static Web App
$deploymentToken = az staticwebapp secrets list `
  --name $swaName `
  --resource-group $resourceGroup `
  --query "properties.apiKey" `
  --output tsv

Write-Host "Deployment Token: $deploymentToken"
```

### Step 3: Store Token in Key Vault

```bash
# Store the deployment token in Key Vault
az keyvault secret set `
  --vault-name "kv-az-fluxline-next" `
  --name "swa-api-token-prod-v2" `
  --value $deploymentToken

Write-Host "✅ Token stored in Key Vault as swa-api-token-prod-v2"
```

### Step 4: Configure Managed Identity

```bash
# Enable system-assigned managed identity for the Static Web App
az staticwebapp identity assign `
  --name $swaName `
  --resource-group $resourceGroup

# Get the managed identity principal ID
$principalId = az staticwebapp identity show `
  --name $swaName `
  --resource-group $resourceGroup `
  --query "principalId" `
  --output tsv

Write-Host "Managed Identity Principal ID: $principalId"

# Grant Key Vault access to the managed identity
az keyvault set-policy `
  --name "kv-az-fluxline-next" `
  --object-id $principalId `
  --secret-permissions get list
```

### Step 5: Configure Federated Credentials for GitHub Actions

```bash
# Add federated credential for GitHub Actions (master branch)
az rest --method POST `
  --uri "https://management.azure.com/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/staticSites/$swaName/config/authsettingsV2?api-version=2022-03-01" `
  --body '{
    "properties": {
      "identityProviders": {
        "gitHub": {
          "enabled": true,
          "registration": {
            "clientIdSettingName": "GITHUB_CLIENT_ID",
            "clientSecretSettingName": "GITHUB_CLIENT_SECRET"
          }
        }
      }
    }
  }'

# Note: You'll need to manually configure the federated credential in Entra ID
# for the app registration: bcea6cc6-3949-4065-8f69-e5879edfe7bf
```

### Step 6: Add Custom Domains

```bash
# Add fluxline.pro (apex domain)
az staticwebapp hostname set `
  --name $swaName `
  --resource-group $resourceGroup `
  --hostname "fluxline.pro"

# Add www.fluxline.pro (subdomain)
az staticwebapp hostname set `
  --name $swaName `
  --resource-group $resourceGroup `
  --hostname "www.fluxline.pro"

Write-Host "✅ Custom domains added. Configure DNS records next."
```

### Step 7: Configure DNS Records

You'll need to add these DNS records in your domain registrar:

**For `fluxline.pro` (Apex Domain):**

```
Type: ALIAS or ANAME
Name: @
Value: <your-static-web-app-url>.azurestaticapps.net
```

**For `www.fluxline.pro` (Subdomain):**

```
Type: CNAME
Name: www
Value: <your-static-web-app-url>.azurestaticapps.net
```

**For DNS Validation (if required):**

```
Type: TXT
Name: _dnsauth.fluxline.pro
Value: <validation-token-from-azure>
```

### Step 8: Verify SSL Certificate Provisioning

```bash
# Check SSL certificate status
az staticwebapp hostname show `
  --name $swaName `
  --resource-group $resourceGroup `
  --hostname "fluxline.pro"

az staticwebapp hostname show `
  --name $swaName `
  --resource-group $resourceGroup `
  --hostname "www.fluxline.pro"
```

Wait for SSL certificates to provision (can take 5-15 minutes).

## 🔐 Entra ID Federated Credential Configuration

### Manual Steps in Azure Portal:

1. Go to **Microsoft Entra ID** → **App registrations**
2. Find app: `github-fluxline-pro-next-dev` (Client ID: `bcea6cc6-3949-4065-8f69-e5879edfe7bf`)
3. Navigate to **Certificates & secrets** → **Federated credentials**
4. Click **Add credential**
5. Configure:
   - **Federated credential scenario**: GitHub Actions deploying Azure resources
   - **Organization**: Fluxline-Pro
   - **Repository**: fluxline-pro-next
   - **Entity type**: Branch
   - **GitHub branch name**: master
   - **Name**: github-fluxline-pro-next-prod-v2
   - **Audience**: api://AzureADTokenExchange

## 🔧 GitHub Secrets Configuration

### Required Secrets in GitHub Repository:

Go to: `https://github.com/Fluxline-Pro/fluxline-pro-next/settings/secrets/actions`

**Verify/Update these secrets:**

1. `AZURE_CLIENT_ID_PROD`: `bcea6cc6-3949-4065-8f69-e5879edfe7bf`
2. `AZURE_TENANT_ID`: `9ebc2060-7a03-47c4-8df4-54d40955cc06`
3. `AZURE_SUBSCRIPTION_ID`: `3912d915-b497-49b5-8c04-f9de63a523c1`

Note: The deployment token is now stored in Key Vault, not in GitHub Secrets.

## 📝 Update GitHub Actions Workflow

Update the Key Vault secret name in your workflow from:

```yaml
--name swa-api-token-prod
```

to:

```yaml
--name swa-api-token-prod-v2
```

Or keep using `swa-api-token-prod` and update the Key Vault secret with the new token.

## ✅ Verification Checklist

After setup, verify:

- [ ] Static Web App created in Standard tier
- [ ] Deployment token stored in Key Vault
- [ ] Managed identity configured with Key Vault access
- [ ] Federated credential added in Entra ID
- [ ] GitHub secrets configured correctly
- [ ] Custom domains added (`fluxline.pro`, `www.fluxline.pro`)
- [ ] DNS records updated in domain registrar
- [ ] SSL certificates provisioned and active
- [ ] Test deployment via GitHub Actions
- [ ] Test custom 404 page works correctly
- [ ] Test navigation and routing
- [ ] Test API function (contact form)
- [ ] Verify no 403 Forbidden errors

## 🧪 Testing Procedure

### 1. Test Native Azure URL

```bash
# Get the default URL
az staticwebapp show `
  --name $swaName `
  --resource-group $resourceGroup `
  --query "defaultHostname" `
  --output tsv
```

Visit this URL and test all routes.

### 2. Test Custom Domains

- Visit `https://fluxline.pro`
- Visit `https://www.fluxline.pro`
- Test a non-existent route (should show custom 404)
- Test navigation from 404 page

### 3. Test API Function

Submit the contact form to ensure Azure Function works.

## 🚨 Troubleshooting

### If you still get 403 Forbidden:

1. **Check Host Headers**:

   ```bash
   # Test with specific host header
   curl -I -H "Host: fluxline.pro" https://<your-swa-url>.azurestaticapps.net
   ```

2. **Verify Domain Binding**:

   ```bash
   az staticwebapp hostname list `
     --name $swaName `
     --resource-group $resourceGroup
   ```

3. **Check SSL Status**:
   Ensure SSL certificates are in "Ready" state, not "Pending"

4. **Validate Config File**:
   - Ensure file is named exactly `staticwebapp.config.json`
   - Ensure `/404.html` exists in the `out` folder

5. **Review Deployment Logs**:
   Check GitHub Actions workflow for any deployment errors

### If Custom Domain Shows 403 but Native URL Works:

This indicates a domain binding or SSL issue. Verify:

- DNS records are correct and propagated
- SSL certificate provisioned successfully
- Wait 15-30 minutes for full propagation

## 📊 Post-Deployment Monitoring

### Enable Application Insights (Recommended)

```bash
# Create Application Insights
az monitor app-insights component create `
  --app "ai-fluxline-pro-prod" `
  --location "westus2" `
  --resource-group $resourceGroup `
  --application-type web

# Get instrumentation key
$instrumentationKey = az monitor app-insights component show `
  --app "ai-fluxline-pro-prod" `
  --resource-group $resourceGroup `
  --query "instrumentationKey" `
  --output tsv

# Link to Static Web App
az staticwebapp appsettings set `
  --name $swaName `
  --resource-group $resourceGroup `
  --setting-names APPINSIGHTS_INSTRUMENTATIONKEY=$instrumentationKey
```

## 🔄 Rollback Plan

If issues occur, you can quickly switch back:

1. Update GitHub workflow to use old Key Vault secret: `swa-api-token-prod`
2. Update DNS to point to old Static Web App
3. Deploy to old environment

## 📚 Additional Resources

- [Azure Static Web Apps Configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Custom Domain Setup](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)
- [Managed Identity for Static Web Apps](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization)
- [GitHub Actions Integration](https://learn.microsoft.com/en-us/azure/static-web-apps/github-actions-workflow)

## 🎉 Success Criteria

Your new Standard Tier Static Web App is properly configured when:

1. ✅ All routes accessible via custom domains
2. ✅ Custom 404 page displays correctly
3. ✅ Navigation works from 404 page
4. ✅ Contact form API function works
5. ✅ No 403 Forbidden errors
6. ✅ SSL certificates active on custom domains
7. ✅ GitHub Actions deployment successful

---

**Last Updated**: December 16, 2025
