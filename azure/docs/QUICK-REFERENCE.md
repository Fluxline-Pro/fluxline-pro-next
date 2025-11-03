# Quick Reference - Azure Static Web Apps with Managed Identities

## 🚀 Quick Start

```powershell
# 1. Login to Azure
az login

# 2. Set subscription (if needed)
az account set --subscription "YOUR_SUBSCRIPTION_NAME"

# 3. Navigate to azure directory
cd azure

# 4. Run provisioning script
.\provision-swa-with-managed-identities.ps1

# 5. Verify setup
.\verify-setup.ps1
```

## 📋 Required GitHub Secrets

### Shared Secrets (2)

- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

### Environment-Specific Secrets (6)

- `AZURE_CLIENT_ID_DEV`
- `AZURE_CLIENT_ID_TEST`
- `AZURE_CLIENT_ID_PROD`
- `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`
- `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST`
- `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`

**Add secrets at:** `https://github.com/Fluxline-Pro/fluxline-pro-next/settings/secrets/actions`

## 🏗️ Resource Names

| Environment | Static Web App          | Managed Identity           | Branch    |
| ----------- | ----------------------- | -------------------------- | --------- |
| Dev         | `az-fluxline-next-dev`  | `az-fluxline-next-dev-mg`  | `develop` |
| Test        | `az-fluxline-next-test` | `az-fluxline-next-test-mg` | `test`    |
| Prod        | `az-fluxline-next-prod` | `az-fluxline-next-prod-mg` | `master`  |

**Resource Group:** `az-fluxline-rg`  
**Storage Account:** `azfluxlinewebstorage`

## 🔧 Useful Commands

### View Static Web App Details

```powershell
az staticwebapp show `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg `
    --output table
```

### Get API Token

```powershell
az staticwebapp secrets list `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg `
    --query "properties.apiKey" -o tsv
```

### Reset API Token

```powershell
az staticwebapp secrets reset-api-key `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg
```

### View Managed Identity

```powershell
az identity show `
    --name az-fluxline-next-dev-mg `
    --resource-group az-fluxline-rg
```

### List Federated Credentials

```powershell
# Get the App Registration Client ID first
$appId = "YOUR_APP_CLIENT_ID"

az ad app federated-credential list `
    --id $appId `
    --output table
```

### Check Role Assignments

```powershell
# Storage permissions
az role assignment list `
    --scope "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/az-fluxline-rg/providers/Microsoft.Storage/storageAccounts/azfluxlinewebstorage" `
    --output table

# Static Web App permissions
az role assignment list `
    --scope "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/az-fluxline-rg/providers/Microsoft.Web/staticSites/az-fluxline-next-dev" `
    --output table
```

### Grant Storage Permission (if needed)

```powershell
$principalId = "MANAGED_IDENTITY_PRINCIPAL_ID"
$subscriptionId = (az account show --query id -o tsv)

az role assignment create `
    --assignee $principalId `
    --role "Storage Blob Data Contributor" `
    --scope "/subscriptions/$subscriptionId/resourceGroups/az-fluxline-rg/providers/Microsoft.Storage/storageAccounts/azfluxlinewebstorage"
```

### View Activity Logs

```powershell
az monitor activity-log list `
    --resource-group az-fluxline-rg `
    --offset 1d `
    --output table
```

## 🌐 App URLs

- **Dev:** https://az-fluxline-next-dev.azurestaticapps.net
- **Test:** https://az-fluxline-next-test.azurestaticapps.net
- **Prod:** https://az-fluxline-next-prod.azurestaticapps.net

## 🔄 Trigger Deployments

```bash
# Deploy to dev
git push origin develop

# Deploy to test
git push origin test

# Deploy to production
git push origin master
```

## 🐛 Troubleshooting

### Check GitHub Actions Logs

https://github.com/Fluxline-Pro/fluxline-pro-next/actions

### Verify Secrets are Set

Navigate to: Repository → Settings → Secrets and variables → Actions

### Test Azure Login (Manual)

```powershell
# This simulates what GitHub Actions does
$env:AZURE_CLIENT_ID = "YOUR_CLIENT_ID_DEV"
$env:AZURE_TENANT_ID = "YOUR_TENANT_ID"
$env:AZURE_SUBSCRIPTION_ID = "YOUR_SUBSCRIPTION_ID"

az login --service-principal `
    --username $env:AZURE_CLIENT_ID `
    --tenant $env:AZURE_TENANT_ID `
    --federated-token "$(az account get-access-token --query accessToken -o tsv)"
```

### Common Errors

#### "AADSTS700016: Application not found"

Wait 5-10 minutes for propagation, then retry

#### "Insufficient privileges"

Check role assignments - App Registration needs Contributor on Static Web App

#### "Storage access denied"

Check Managed Identity has "Storage Blob Data Contributor" on storage account

## 📊 Cost Check

```powershell
# View current month's costs for resource group
az consumption usage list `
    --start-date (Get-Date).AddDays(-30).ToString("yyyy-MM-dd") `
    --end-date (Get-Date).ToString("yyyy-MM-dd") `
    | ConvertFrom-Json `
    | Where-Object { $_.instanceId -like "*az-fluxline-rg*" } `
    | Format-Table
```

## 🗑️ Clean Up (if needed)

```powershell
# Delete a specific environment
$env = "dev"
az staticwebapp delete --name "az-fluxline-next-$env" --resource-group az-fluxline-rg --yes
az identity delete --name "az-fluxline-next-$env-mg" --resource-group az-fluxline-rg
az ad app delete --id "APP_CLIENT_ID"

# Delete all resources (CAUTION!)
az group delete --name az-fluxline-rg --yes
```

## 📚 Full Documentation

For comprehensive setup instructions, see:

- **Setup Guide:** `azure/SETUP-GUIDE.md`
- **Verification Script:** `azure/verify-setup.ps1`
- **Provisioning Script:** `azure/provision-swa-with-managed-identities.ps1`

## 🆘 Support Resources

- [Azure Static Web Apps Docs](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Managed Identity Docs](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/)
- [GitHub Actions with Azure](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)
