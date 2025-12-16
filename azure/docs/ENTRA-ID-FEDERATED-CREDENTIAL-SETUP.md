# Entra ID Federated Credential Setup for GitHub Actions

## Overview

This guide walks through setting up federated credentials in Microsoft Entra ID (formerly Azure Active Directory) to enable GitHub Actions to authenticate with Azure without storing secrets.

## Prerequisites

- App Registration: `github-fluxline-pro-next-prod`
- Client ID: `[ENTER-CLIENT-ID]`
- Tenant ID: `[ENTER-TENANT-ID]`
- GitHub Repository: `Fluxline-Pro/fluxline-pro-next`

## Why Federated Credentials?

**Benefits**:

- ✅ No secrets to manage or rotate
- ✅ No risk of leaked credentials
- ✅ Automatic authentication from GitHub Actions
- ✅ Enhanced security with OIDC tokens
- ✅ Granular access control per branch/environment

**Traditional Approach (Avoid)**:

- ❌ Store service principal credentials as GitHub secrets
- ❌ Requires periodic secret rotation
- ❌ Risk of credential exposure
- ❌ Complex to manage across environments

## Setup Methods

### Method 1: Azure Portal (Recommended for First-Time Setup)

1. **Navigate to Entra ID**:
   - Go to [Azure Portal](https://portal.azure.com)
   - Search for "Microsoft Entra ID" or "Azure Active Directory"
   - Click to open

2. **Open App Registration**:
   - Click "App registrations" in the left menu
   - Click "All applications"
   - Search for: `github-fluxline-pro-next-dev`
   - Click on the app registration

3. **Add Federated Credential**:
   - In the left menu, click "Certificates & secrets"
   - Click on the "Federated credentials" tab
   - Click "+ Add credential"

4. **Configure Credential - Production (Master Branch)**:

   ```
   Federated credential scenario: GitHub Actions deploying Azure resources

   Organization: Fluxline-Pro
   Repository: fluxline-pro-next
   Entity type: Branch
   Based on selection: master

   Name: github-fluxline-pro-prod-v2
   Description: GitHub Actions deployment for production (master branch)
   Audience: api://AzureADTokenExchange
   ```

5. **Add Additional Credentials (Optional)**:

   **For Pull Requests**:

   ```
   Entity type: Pull request
   Name: github-fluxline-next-prod
   Description: GitHub Actions for pull requests
   ```

   **For Development Branch**:

   ```
   Entity type: Branch
   Based on selection: develop
   Name: github-fluxline-pro-dev
   Description: GitHub Actions deployment for development
   ```

6. **Save and Verify**:
   - Click "Add"
   - Verify the credential appears in the list
   - Note the "Subject identifier" - it should look like:
     `repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master`

### Method 2: Azure CLI

```powershell
# Set variables
$appId = "[ENTER-CLIENT-ID]"
$federatedCredentialName = "github-fluxline-pro-next-prod"

# Add federated credential for master branch
az ad app federated-credential create `
  --id $appId `
  --parameters '{
    "name": "github-fluxline-pro-nextp-prod",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master",
    "description": "GitHub Actions deployment for production",
    "audiences": ["api://AzureADTokenExchange"]
  }'

Write-Host "✅ Federated credential created successfully"

# Verify creation
az ad app federated-credential list --id $appId --query "[].name"
```

### Method 3: Azure PowerShell

```powershell
# Connect to Azure AD
Connect-AzureAD

# Get the application
$app = Get-AzureADApplication -Filter "appId eq 'bcea6cc6-3949-4065-8f69-e5879edfe7bf'"

# Create federated credential parameters
$federatedCredential = @{
    Name = "github-fluxline-pro-next-prod"
    Issuer = "https://token.actions.githubusercontent.com"
    Subject = "repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master"
    Description = "GitHub Actions deployment for production"
    Audiences = @("api://AzureADTokenExchange")
}

# Note: As of 2024, you may need to use az CLI or portal
# PowerShell cmdlets for federated credentials are still being developed
Write-Host "Use Azure CLI or Portal for federated credential creation"
```

## Verification

### Verify Federated Credential Exists

```powershell
# Using Azure CLI
az ad app federated-credential list `
  --id bcea6cc6-3949-4065-8f69-e5879edfe7bf `
  --output table

# Should show:
# Name                              Issuer                                      Subject
# --------------------------------  ------------------------------------------  -----------------------------------------------
# github-fluxline-pro-prod-v2      https://token.actions.githubusercontent.com  repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master
```

### Verify Subject Identifier Format

The subject identifier must match EXACTLY:

```
repo:<OWNER>/<REPOSITORY>:ref:refs/heads/<BRANCH>
```

For production:

```
repo:Fluxline-Pro/fluxline-pro-next:ref:refs/heads/master
```

For pull requests:

```
repo:Fluxline-Pro/fluxline-pro-next:pull_request
```

### Test Authentication from GitHub Actions

Add this test workflow to verify authentication:

```yaml
name: Test Azure Authentication
on: workflow_dispatch

jobs:
  test:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID_PROD }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Test Azure CLI
        run: |
          az account show
          az group list --output table
```

## Required GitHub Secrets

These must be configured in your GitHub repository:

### Navigate to Repository Secrets:

`https://github.com/Fluxline-Pro/fluxline-pro-next/settings/secrets/actions`

### Add/Verify Secrets:

1. **AZURE_CLIENT_ID_PROD**:

   ```
   bcea6cc6-3949-4065-8f69-e5879edfe7bf
   ```

2. **AZURE_TENANT_ID**:

   ```
   9ebc2060-7a03-47c4-8df4-54d40955cc06
   ```

3. **AZURE_SUBSCRIPTION_ID**:
   ```
   3912d915-b497-49b5-8c04-f9de63a523c1
   ```

**Note**: The deployment token is NOT stored in GitHub secrets - it's retrieved from Key Vault during the workflow.

## Workflow Configuration

Your GitHub Actions workflow should include:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Required for OIDC
      contents: read # Required for checkout

    steps:
      - uses: actions/checkout@v4

      - name: Azure Login
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID_PROD }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Get Token from Key Vault
        id: get-token
        run: |
          token=$(az keyvault secret show \
            --vault-name kv-az-fluxline-next \
            --name swa-api-token-prod-v2 \
            --query value -o tsv)
          echo "::add-mask::$token"
          echo "SWA_TOKEN=$token" >> $GITHUB_OUTPUT
```

## Role Assignments

The service principal must have appropriate Azure roles assigned:

### Required Roles

1. **For Key Vault Access**:

   ```powershell
   # Grant Key Vault Secrets User role
   az role assignment create `
     --assignee bcea6cc6-3949-4065-8f69-e5879edfe7bf `
     --role "Key Vault Secrets User" `
     --scope "/subscriptions/3912d915-b497-49b5-8c04-f9de63a523c1/resourceGroups/az-fluxline-rg/providers/Microsoft.KeyVault/vaults/kv-az-fluxline-next"
   ```

2. **For Static Web Apps Deployment**:
   ```powershell
   # Grant Contributor role on resource group
   az role assignment create `
     --assignee bcea6cc6-3949-4065-8f69-e5879edfe7bf `
     --role "Contributor" `
     --scope "/subscriptions/3912d915-b497-49b5-8c04-f9de63a523c1/resourceGroups/az-fluxline-rg"
   ```

### Verify Role Assignments

```powershell
# List all role assignments for the service principal
az role assignment list `
  --assignee bcea6cc6-3949-4065-8f69-e5879edfe7bf `
  --output table
```

## Troubleshooting

### Issue: "Failed to get token" in GitHub Actions

**Possible Causes**:

1. Federated credential not configured
2. Subject identifier mismatch
3. Missing permissions in workflow

**Solution**:

```yaml
# Ensure permissions are set in workflow
permissions:
  id-token: write
  contents: read
```

### Issue: "AADSTS700016: Application not found"

**Cause**: Client ID is incorrect or app registration doesn't exist.

**Solution**: Verify the client ID matches your app registration.

### Issue: "AADSTS70021: Invalid audience"

**Cause**: Audience in federated credential is wrong.

**Solution**: Ensure audience is set to: `api://AzureADTokenExchange`

### Issue: "Unable to access Key Vault"

**Cause**: Service principal lacks Key Vault permissions.

**Solution**: Grant "Key Vault Secrets User" role to the service principal.

## Best Practices

1. **Use Separate Credentials per Environment**:
   - Production: `github-fluxline-pro-prod-v2`
   - Development: `github-fluxline-pro-dev`
   - Pull Requests: `github-fluxline-pro-prod-v2-pr`

2. **Follow Least Privilege Principle**:
   - Grant only necessary roles
   - Use resource-specific scopes
   - Avoid subscription-wide Contributor role if possible

3. **Document Subject Identifiers**:
   - Keep a record of all configured subjects
   - Update documentation when adding new credentials

4. **Monitor and Audit**:
   - Enable logging for app registration
   - Review sign-in logs periodically
   - Set up alerts for authentication failures

5. **Test in Development First**:
   - Verify authentication in dev environment
   - Test role assignments
   - Confirm Key Vault access works

## Security Considerations

- ✅ Federated credentials are more secure than client secrets
- ✅ Tokens are short-lived (typically 1 hour)
- ✅ No secrets to rotate or manage
- ✅ Automatic token refresh by GitHub Actions
- ⚠️ Ensure repository is private or carefully control who can trigger workflows
- ⚠️ Review workflow permissions regularly
- ⚠️ Monitor Azure AD sign-in logs for suspicious activity

## Additional Resources

- [Microsoft Entra Workload Identity Federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation)
- [GitHub Actions OIDC with Azure](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure)
- [Azure Login Action](https://github.com/Azure/login)
- [Workload Identity Federation Best Practices](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation-considerations)

---

**Last Updated**: December 16, 2025
