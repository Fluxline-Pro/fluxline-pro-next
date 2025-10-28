# Azure Managed Identity for GitHub Actions

This directory contains scripts and configuration for setting up Azure Managed Identity authentication for GitHub Actions deployments.

## 🔐 Security Benefits

Using Managed Identity instead of API tokens provides:

- **No long-lived secrets**: Tokens are short-lived and automatically rotated
- **Federated identity**: Uses OpenID Connect (OIDC) for secure authentication
- **Granular permissions**: IAM roles can be precisely controlled
- **Audit trail**: All actions are logged in Azure Activity Log

## 🚀 Setup Process

### 1. Run the Setup Script

```powershell
cd azure
.\setup-managed-identity.ps1
```

This script will:

- Create an Azure AD App Registration
- Create a Service Principal
- Assign Contributor role to the resource group
- Create Federated Identity Credentials for each branch
- Display the required GitHub secrets

### 2. Add GitHub Secrets

Add these three secrets to your GitHub repository:

- `AZURE_CLIENT_ID`: The App Registration ID
- `AZURE_TENANT_ID`: Your Azure AD Tenant ID
- `AZURE_SUBSCRIPTION_ID`: Your Azure Subscription ID

**Location**: Repository → Settings → Secrets and variables → Actions

### 3. Remove Old Secrets (Optional)

Once Managed Identity is working, you can remove these old API token secrets:

- `AZURE_STATIC_WEB_APPS_API_TOKEN_NICE_COAST_056084A1E`
- `AZURE_STATIC_WEB_APPS_API_TOKEN_WITTY_CLIFF_05762941E`

## 🔧 How It Works

1. **GitHub Actions triggers**: When code is pushed to monitored branches
2. **OIDC Authentication**: GitHub requests a token from Azure AD
3. **Federated Identity**: Azure validates the request against configured credentials
4. **Azure Login**: The workflow authenticates using the temporary token
5. **Deployment**: Azure CLI/PowerShell commands run with proper permissions

## 📋 Branch Configuration

The setup creates Federated Identity Credentials for:

- **master branch**: Production deployments
- **develop branch**: Development deployments
- **test branch**: Test deployments
- **Pull requests**: PR preview deployments

## 🛠️ Troubleshooting

### Authentication Errors

- Verify GitHub secrets are correctly set
- Check that branch names match exactly
- Ensure the App Registration has proper permissions

### Permission Denied

- Verify Contributor role is assigned to the resource group
- Check that the subscription ID is correct

### Token Issues

- Ensure `id-token: write` permission is set in workflow
- Verify the issuer URL is correct: `https://token.actions.githubusercontent.com`

## 📚 References

- [Azure Workload Identity Federation](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation)
- [GitHub OIDC with Azure](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)
- [Azure Static Web Apps CLI](https://docs.microsoft.com/en-us/azure/static-web-apps/)
