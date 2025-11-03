# Azure Static Web Apps Setup Guide with Managed Identities

This guide walks you through setting up Azure Static Web Apps for dev, test, and production environments using User-Assigned Managed Identities and Federated Credentials for GitHub Actions.

## 🎯 Architecture Overview

```
GitHub Repository (Fluxline-Pro/fluxline-pro-next)
    │
    ├─── develop branch  → az-fluxline-next-dev  (Free SKU)
    ├─── test branch     → az-fluxline-next-test (Free SKU)
    └─── master branch   → az-fluxline-next-prod (Standard SKU)

Each Static Web App:
    ├─── User-Assigned Managed Identity (az-fluxline-next-{env}-mg)
    ├─── App Registration (for GitHub Actions)
    ├─── Federated Credential (OIDC trust with GitHub)
    └─── Storage Access (azfluxlinewebstorage)

Resource Group: az-fluxline-rg
Storage Account: azfluxlinewebstorage
```

## 🔑 Key Benefits

✅ **No Long-Lived Secrets** - Federated credentials use OIDC tokens (valid for minutes)  
✅ **Automatic Token Rotation** - GitHub generates fresh tokens for each workflow run  
✅ **Least Privilege Access** - Each environment only accesses its own resources  
✅ **Audit Trail** - All Azure operations logged in Activity Log  
✅ **Secure by Default** - No API tokens stored in GitHub or Azure

## 📋 Prerequisites

Before running the provisioning script, ensure you have:

- [ ] **Azure CLI** installed ([Download](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli))
- [ ] **Azure Subscription** with Contributor permissions
- [ ] **Resource Group** `az-fluxline-rg` exists (or will be created)
- [ ] **Storage Account** `azfluxlinewebstorage` exists
- [ ] **GitHub Repository** admin access to `Fluxline-Pro/fluxline-pro-next`
- [ ] **PowerShell** 7+ (for running the provisioning script)

### Verify Azure CLI Installation

```powershell
# Check Azure CLI version
az --version

# Login to Azure
az login

# Set the correct subscription (if you have multiple)
az account set --subscription "YOUR_SUBSCRIPTION_NAME_OR_ID"

# Verify current subscription
az account show
```

## 🚀 Step-by-Step Setup

### Step 1: Verify Storage Account Exists

```powershell
# Check if storage account exists
az storage account show `
    --name azfluxlinewebstorage `
    --resource-group az-fluxline-rg

# If it doesn't exist, create it:
az storage account create `
    --name azfluxlinewebstorage `
    --resource-group az-fluxline-rg `
    --location eastus2 `
    --sku Standard_LRS `
    --kind StorageV2
```

### Step 2: Run the Provisioning Script

```powershell
# Navigate to the Azure directory
cd azure

# Run the provisioning script
.\provision-swa-with-managed-identities.ps1
```

The script will:

1. ✅ Verify/create the resource group
2. ✅ Verify the storage account exists
3. ✅ Create User-Assigned Managed Identities for each environment
4. ✅ Create Static Web Apps for dev/test/prod
5. ✅ Assign Managed Identities to Static Web Apps
6. ✅ Grant Storage Blob Data Contributor permissions
7. ✅ Create App Registrations for GitHub Actions
8. ✅ Configure Federated Credentials (OIDC trust)
9. ✅ Retrieve API tokens for deployment

**Duration:** ~5-10 minutes

### Step 3: Configure GitHub Secrets

After the script completes, it will display all the secrets you need to add to GitHub.

#### Navigate to GitHub Secrets

Go to: `https://github.com/Fluxline-Pro/fluxline-pro-next/settings/secrets/actions`

#### Add Shared Secrets

These are used by all three environments:

| Secret Name             | Description                |
| ----------------------- | -------------------------- |
| `AZURE_TENANT_ID`       | Your Azure AD Tenant ID    |
| `AZURE_SUBSCRIPTION_ID` | Your Azure Subscription ID |

#### Add Environment-Specific Secrets

For each environment (dev, test, prod), add:

| Secret Name                            | Description                         |
| -------------------------------------- | ----------------------------------- |
| `AZURE_CLIENT_ID_DEV`                  | App Registration Client ID for dev  |
| `AZURE_CLIENT_ID_TEST`                 | App Registration Client ID for test |
| `AZURE_CLIENT_ID_PROD`                 | App Registration Client ID for prod |
| `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`  | Static Web App API token for dev    |
| `AZURE_STATIC_WEB_APPS_API_TOKEN_TEST` | Static Web App API token for test   |
| `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD` | Static Web App API token for prod   |

**Total Secrets Required:** 8 (2 shared + 6 environment-specific)

### Step 4: Verify GitHub Workflows

Your GitHub workflows are already configured in:

- `.github/workflows/azure-static-web-apps-dev.yml` (develop branch)
- `.github/workflows/azure-static-web-apps-test.yml` (test branch)
- `.github/workflows/azure-static-web-apps-prod.yml` (master branch)

These workflows use:

1. **Federated Credentials** for Azure authentication (OIDC)
2. **Node.js** for building the Next.js application
3. **Yarn** for dependency management
4. **Azure Static Web Apps Deploy** action for deployment

### Step 5: Test the Deployment

```bash
# Trigger dev deployment
git push origin develop

# Trigger test deployment
git push origin test

# Trigger production deployment
git push origin master
```

Monitor the GitHub Actions workflow runs:
`https://github.com/Fluxline-Pro/fluxline-pro-next/actions`

### Step 6: Verify in Azure Portal

1. **Navigate to Resource Group:** [az-fluxline-rg](https://portal.azure.com/#@/resource/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/az-fluxline-rg)

2. **Check Static Web Apps:**
   - `az-fluxline-next-dev` → https://az-fluxline-next-dev.azurestaticapps.net
   - `az-fluxline-next-test` → https://az-fluxline-next-test.azurestaticapps.net
   - `az-fluxline-next-prod` → https://az-fluxline-next-prod.azurestaticapps.net

3. **Verify Managed Identities:**
   - Go to each Static Web App → Settings → Identity
   - Confirm User-Assigned Managed Identity is attached

4. **Check Storage Permissions:**
   - Go to Storage Account → Access Control (IAM)
   - Verify each Managed Identity has "Storage Blob Data Contributor" role

## 🔐 Security Architecture

### Federated Identity Flow

```
1. GitHub Actions starts workflow
2. GitHub requests JWT token from Azure AD
3. Azure AD validates the federated credential
4. Azure AD issues short-lived access token (~1 hour)
5. GitHub Actions uses token to authenticate Azure CLI
6. Azure CLI deploys to Static Web App
7. Token expires (no long-term secret stored)
```

### Permissions Model

| Identity                          | Scope           | Role                          | Purpose             |
| --------------------------------- | --------------- | ----------------------------- | ------------------- |
| User-Assigned Managed Identity    | Storage Account | Storage Blob Data Contributor | Write static assets |
| App Registration (GitHub Actions) | Static Web App  | Contributor                   | Deploy application  |

### What's NOT Stored

❌ No GitHub Personal Access Tokens  
❌ No Azure Service Principal passwords  
❌ No long-lived API keys  
❌ No credentials in parameter files

## 🛠️ Troubleshooting

### Issue: "AADSTS700016: Application not found"

**Cause:** Federated credential not propagated yet  
**Solution:** Wait 5-10 minutes and retry

### Issue: "Insufficient privileges to complete the operation"

**Cause:** App Registration missing Contributor role  
**Solution:**

```powershell
$appId = "YOUR_APP_CLIENT_ID"
$swaName = "az-fluxline-next-dev"
$resourceGroup = "az-fluxline-rg"
$subscriptionId = (az account show --query id -o tsv)

$swaScope = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Web/staticSites/$swaName"

az role assignment create `
    --assignee $appId `
    --role "Contributor" `
    --scope $swaScope
```

### Issue: "No such host is known" (Storage)

**Cause:** Managed Identity missing Storage permissions  
**Solution:**

```powershell
$principalId = "YOUR_MANAGED_IDENTITY_PRINCIPAL_ID"
$storageScope = "/subscriptions/$subscriptionId/resourceGroups/$resourceGroup/providers/Microsoft.Storage/storageAccounts/azfluxlinewebstorage"

az role assignment create `
    --assignee $principalId `
    --role "Storage Blob Data Contributor" `
    --scope $storageScope
```

### Issue: Workflow fails with "Login failed"

**Cause:** GitHub secrets not configured correctly  
**Solution:**

1. Verify all 8 secrets are added to GitHub
2. Check for trailing spaces in secret values
3. Ensure Client IDs match App Registration (not Managed Identity)

### Verify Federated Credentials

```powershell
# List federated credentials for an app
$appId = "YOUR_APP_CLIENT_ID"
az ad app federated-credential list --id $appId --output table
```

Expected output:

```
Name                    Subject
----------------------  ------------------------------------------------
dev-branch-develop      repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/develop
dev-pull-requests       repo:Fluxline-Pro/fluxline-pro-next:pull_request
```

## 🔄 Updating the Configuration

### Update Branch Names

If you change branch names, update the federated credentials:

```powershell
$appId = "YOUR_APP_CLIENT_ID"
$credName = "dev-branch-develop"

# Delete old credential
az ad app federated-credential delete --id $appId --federated-credential-id $credName

# Create new credential
$newCredential = @{
    name = "dev-branch-main"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/main"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json -Depth 3

az ad app federated-credential create --id $appId --parameters $newCredential
```

### Rotate API Tokens

Static Web App API tokens can be regenerated:

```powershell
az staticwebapp secrets reset-api-key `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg

# Get the new token
az staticwebapp secrets list `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg `
    --query "properties.apiKey" -o tsv
```

Then update the GitHub secret `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`.

## 📊 Monitoring & Logs

### View Deployment History

```powershell
# List deployments
az staticwebapp show `
    --name az-fluxline-next-dev `
    --resource-group az-fluxline-rg `
    --query "buildProperties"
```

### Check Activity Logs

```powershell
# Get recent activity
az monitor activity-log list `
    --resource-group az-fluxline-rg `
    --offset 1d `
    --query "[?contains(authorization.action, 'Microsoft.Web/staticSites')]" `
    --output table
```

### View Static Web App Logs

Azure Portal → Static Web App → Monitoring → Application Insights (if configured)

## 💰 Cost Estimation

| Resource               | SKU/Tier     | Monthly Cost   |
| ---------------------- | ------------ | -------------- |
| Static Web App (dev)   | Free         | $0             |
| Static Web App (test)  | Free         | $0             |
| Static Web App (prod)  | Standard     | ~$9            |
| Managed Identities (3) | N/A          | $0             |
| App Registrations (3)  | N/A          | $0             |
| Storage (minimal)      | Standard LRS | ~$1            |
| **Total**              |              | **~$10/month** |

_Costs are approximate and vary by region and usage_

## 🎯 Best Practices

✅ **Use Free SKU for non-prod** - dev and test don't need Standard features  
✅ **Separate App Registrations** - One per environment for isolation  
✅ **Least Privilege** - Only grant Storage Blob Data Contributor, not Storage Account Contributor  
✅ **Monitor Activity Logs** - Set up alerts for unauthorized access attempts  
✅ **Regular Reviews** - Audit federated credentials quarterly  
✅ **Environment Parity** - Keep dev/test/prod configurations similar

## 📚 Additional Resources

- [Azure Static Web Apps Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
- [Workload Identity Federation](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation)
- [GitHub Actions OIDC](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [Azure CLI Reference](https://docs.microsoft.com/en-us/cli/azure/)

## 🆘 Support

If you encounter issues:

1. Check the [Troubleshooting](#-troubleshooting) section above
2. Review GitHub Actions logs for detailed error messages
3. Verify Azure Activity Logs for permission issues
4. Run the verification script: `.\verify-setup.ps1`

---

**Setup Complete! 🎉**

Your Azure Static Web Apps are now configured with secure, managed identity-based authentication. No long-lived secrets, automatic token rotation, and full audit trails!
