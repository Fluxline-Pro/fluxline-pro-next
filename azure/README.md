# Azure Deployment Guide (Managed Identity)

## 🔐 **Managed Identity Deployment**

This configuration uses **Azure Managed Identity** instead of GitHub tokens for enhanced security and simplified management.

## 🏗️ **Resources Created**

Each environment creates these resources with your naming convention:

### **Resource Names**
- **Static Web App**: `az-fluxline-next-{env}` (with System-Assigned Managed Identity)
- **Storage Account**: `fluxline{env}stg` 
- **Key Vault**: `kv-fluxline-{env}`

### **Environment Mapping**
| Environment | Branch | Static Web App SKU | Storage Redundancy | Managed Identity |
|-------------|--------|-------------------|-------------------|------------------|
| **dev** | `develop` | Free | Standard_LRS | ✅ System-Assigned |
| **test** | `test` | Free | Standard_LRS | ✅ System-Assigned |
| **prod** | `master` | Standard | Standard_ZRS | ✅ System-Assigned |

## 🚀 **Deployment Steps**

### **Prerequisites**
1. **Azure CLI** installed and logged in
2. **GitHub repository** with appropriate branch structure
3. **Azure subscription** with appropriate permissions
4. **Repository Admin** access on GitHub (for connecting Azure)

### **Phase 1: Deploy Azure Resources**

#### **Deploy Development**
```powershell
# Using PowerShell (Windows)
.\azure\deploy.ps1 -Environment dev

# Using Bash (Linux/Mac/WSL)
./azure/deploy.sh dev
```

#### **Deploy Test**
```powershell
.\azure\deploy.ps1 -Environment test
```

#### **Deploy Production**
```powershell
.\azure\deploy.ps1 -Environment prod
```

### **Phase 2: Connect to GitHub (Manual Step)**

After Azure resources are deployed, you need to manually connect each Static Web App to GitHub:

#### **For Each Environment:**

1. **Go to Azure Portal** → Your Static Web App (e.g., `az-fluxline-next-dev`)

2. **Navigate to "Deployment" → "GitHub"**

3. **Click "Connect to GitHub"**
   - Sign in with your GitHub account
   - Select Organization: `Fluxline-Pro`
   - Select Repository: `fluxline-pro-next`
   - Select Branch:
     - **Dev**: `develop`
     - **Test**: `test`
     - **Prod**: `main`

4. **Configure Build Settings**:
   ```json
   App location: /
   Api location: (leave empty)
   Output location: out
   ```

5. **Click "Review + Create"**

#### **Why Manual Connection?**
- **Enhanced Security**: No GitHub tokens stored in ARM templates
- **Managed Identity**: Azure handles authentication automatically
- **Fine-grained Control**: You control exactly which repositories get access
- **Audit Trail**: Clear visibility of who connected what

## � **GitHub Actions Workflow**

Azure will automatically create `.github/workflows/` files in your repository:

```yaml
# Example: .github/workflows/azure-static-web-apps-dev.yml
name: Azure Static Web Apps CI/CD (Dev)

on:
  push:
    branches:
      - develop
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches:
      - develop

jobs:
  build_and_deploy_job:
    if: github.event_name == 'push' || (github.event_name == 'pull_request' && github.event.action != 'closed')
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true
      - name: Build And Deploy
        id: builddeploy
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN_... }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          api_location: ""
          output_location: "out"
```

## 🌐 **Default URLs**

After deployment and GitHub connection, your apps will be available at:
- **Dev**: `https://az-fluxline-next-dev.azurestaticapps.net`
- **Test**: `https://az-fluxline-next-test.azurestaticapps.net`
- **Prod**: `https://az-fluxline-next-prod.azurestaticapps.net`

## 🔐 **Security Benefits of Managed Identity**

### **✅ What You Get**:
- **No GitHub Tokens**: No need to generate, store, or rotate tokens
- **Automatic Authentication**: Azure handles auth to GitHub automatically
- **Least Privilege**: Each environment only has access to its specific repository/branch
- **Audit Trail**: All connections are logged in Azure Activity Log
- **No Secret Management**: No tokens in parameter files or Key Vault

### **🛡️ Managed Identity Permissions**:
Each Static Web App gets:
- **Repository Access**: Read access to your specific GitHub repository
- **Deployment Permissions**: Can create and manage GitHub Actions workflows
- **Branch-Specific**: Each environment only deploys from its designated branch

## 🔗 **Custom Domain Setup**

### **1. Add Custom Domain in Azure Portal**
1. Go to your Static Web App
2. Navigate to "Custom domains"
3. Click "Add custom domain"
4. Enter your subdomain (e.g., `dev.fluxline.com`)

### **2. Configure DNS Records**
Add these CNAME records in your Azure DNS zone:

```dns
dev.fluxline.com     CNAME   az-fluxline-next-dev.azurestaticapps.net
test.fluxline.com    CNAME   az-fluxline-next-test.azurestaticapps.net
www.fluxline.com     CNAME   az-fluxline-next-prod.azurestaticapps.net
```

## 📊 **Environment Variables**

Each environment automatically gets these variables:

| Variable | Source | Description |
|----------|--------|-------------|
| `AZURE_STORAGE_CONNECTION_STRING` | Key Vault | Storage account connection |
| `AZURE_STORAGE_ACCOUNT_NAME` | Key Vault | Storage account name |
| `NEXT_PUBLIC_ENVIRONMENT` | Key Vault | Environment identifier |
| `NEXT_PUBLIC_API_BASE_URL` | Deployment | App base URL |

## � **Advanced Configuration**

### **Managed Identity Access to Key Vault**
```bash
# Grant Static Web App Managed Identity access to Key Vault
STATIC_WEB_APP_PRINCIPAL_ID=$(az staticwebapp show \
  --name "az-fluxline-next-dev" \
  --query "identity.principalId" -o tsv)

az keyvault set-policy \
  --name "kv-fluxline-dev" \
  --object-id $STATIC_WEB_APP_PRINCIPAL_ID \
  --secret-permissions get list
```

### **Storage Access via Managed Identity**
```bash
# Grant Managed Identity access to Storage Account
az role assignment create \
  --assignee $STATIC_WEB_APP_PRINCIPAL_ID \
  --role "Storage Blob Data Contributor" \
  --scope "/subscriptions/{subscription-id}/resourceGroups/rg-fluxline-dev/providers/Microsoft.Storage/storageAccounts/fluxlinedevstg"
```

## 🛠️ **Troubleshooting**

### **GitHub Connection Issues**
```bash
# Check Managed Identity status
az staticwebapp show --name "az-fluxline-next-dev" --query "identity"

# Reset API token (if needed)
az staticwebapp secrets reset-api-key --name "az-fluxline-next-dev"
```

### **Deployment Status**
```bash
# Check deployment history
az staticwebapp show --name "az-fluxline-next-dev" --query "buildProperties"

# List GitHub workflows
gh workflow list --repo Fluxline-Pro/fluxline-pro-next
```

## 🎯 **Migration from Token-Based**

If you previously used GitHub tokens:

1. **Deploy new Managed Identity resources**
2. **Disconnect old GitHub integration**
3. **Reconnect using Managed Identity**
4. **Remove old GitHub tokens from Key Vault**
5. **Delete old GitHub Action secrets**

## 💰 **Cost Impact**

**Managed Identity has NO additional cost** - it's included with:
- ✅ Azure Static Web Apps (Free/Standard tier)
- ✅ Storage Accounts
- ✅ Key Vault

**Monthly costs remain the same**:
- **Dev**: ~$2-5 
- **Test**: ~$2-5 
- **Prod**: ~$10-20

---

**Your Azure environments now use Managed Identity for enhanced security! 🔐✨**