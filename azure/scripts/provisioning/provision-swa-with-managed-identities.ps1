# ===================================================================
# Provision Azure Static Web Apps with User-Assigned Managed Identities
# ===================================================================
# This script creates Azure Static Web Apps for dev/test/prod environments
# Each app uses User-Assigned Managed Identity with federated credentials for GitHub Actions
#
# Prerequisites:
# - Azure CLI installed and logged in (az login)
# - Contributor permissions on the Resource Group
# - GitHub repository admin access to configure secrets
#
# Usage:
#   .\provision-swa-with-managed-identities.ps1
# ===================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus2",
    
    [Parameter(Mandatory=$false)]
    [string]$StorageAccountName = "azfluxlinewebstorage",
    
    [Parameter(Mandatory=$false)]
    [string]$KeyVaultName = "kv-az-fluxline-next",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubOwner = "Fluxline-Pro",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubRepo = "fluxline-pro-next"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Fluxline Azure Static Web Apps Setup  " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in to Azure
try {
    $account = az account show | ConvertFrom-Json
    if (-not $account) {
        throw "Not logged in"
    }
    Write-Host "✅ Azure CLI authenticated as: $($account.user.name)" -ForegroundColor Green
    Write-Host "📋 Subscription: $($account.name) ($($account.id))" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Please login to Azure CLI first: az login" -ForegroundColor Red
    exit 1
}

$subscriptionId = $account.id
$tenantId = $account.tenantId

# Environment configurations
$environments = @(
    @{
        Name = "dev"
        AppName = "az-fluxline-next-dev"
        ManagedIdentityName = "az-fluxline-next-dev-mg"
        Branch = "develop"
        Sku = "Free"
        UseSystemAssigned = $true  # Free tier: use System-Assigned
    },
    @{
        Name = "test"
        AppName = "az-fluxline-next-test"
        ManagedIdentityName = "az-fluxline-next-test-mg"
        Branch = "test"
        Sku = "Free"
        UseSystemAssigned = $true  # Free tier: use System-Assigned
    },
    @{
        Name = "prod"
        AppName = "az-fluxline-next-prod"
        ManagedIdentityName = "az-fluxline-next-prod-mg"
        Branch = "master"
        Sku = "Standard"
        UseSystemAssigned = $false  # Standard tier: use User-Assigned
    }
)

# Store managed identity info for later
$managedIdentities = @{}

Write-Host ""
Write-Host "🔍 Verifying Resource Group..." -ForegroundColor Yellow
$rgExists = az group exists --name $ResourceGroup
if ($rgExists -eq "true") {
    Write-Host "✅ Resource Group '$ResourceGroup' exists" -ForegroundColor Green
} else {
    Write-Host "📦 Creating Resource Group '$ResourceGroup'..." -ForegroundColor Yellow
    az group create --name $ResourceGroup --location $Location --output table
    Write-Host "✅ Resource Group created" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔍 Verifying Storage Account..." -ForegroundColor Yellow
$storageExists = az storage account show --name $StorageAccountName --resource-group $ResourceGroup 2>$null
if ($storageExists) {
    Write-Host "✅ Storage Account '$StorageAccountName' exists" -ForegroundColor Green
} else {
    Write-Host "⚠️ Storage Account '$StorageAccountName' not found!" -ForegroundColor Red
    Write-Host "   Please create it or update the StorageAccountName parameter" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔍 Verifying/Creating Key Vault..." -ForegroundColor Yellow
$kvExists = az keyvault show --name $KeyVaultName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
if ($kvExists) {
    Write-Host "✅ Key Vault '$KeyVaultName' exists" -ForegroundColor Green
} else {
    Write-Host "📦 Creating Key Vault '$KeyVaultName'..." -ForegroundColor Yellow
    az keyvault create `
        --name $KeyVaultName `
        --resource-group $ResourceGroup `
        --location $Location `
        --enable-rbac-authorization false `
        --output table
    Write-Host "✅ Key Vault created" -ForegroundColor Green
}

# Process each environment
foreach ($env in $environments) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  Processing Environment: $($env.Name.ToUpper())" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    # 1. Create or verify Managed Identity (System or User-Assigned based on SKU)
    if ($env.UseSystemAssigned) {
        Write-Host "🔧 Will use System-Assigned Managed Identity (Free tier)..." -ForegroundColor Yellow
        Write-Host "   (Identity will be created when assigned to Static Web App)" -ForegroundColor Gray
        
        $managedIdentities[$env.Name] = @{
            IsSystemAssigned = $true
        }
    } else {
        Write-Host "🔧 Creating User-Assigned Managed Identity '$($env.ManagedIdentityName)'..." -ForegroundColor Yellow
        $identity = az identity show --name $env.ManagedIdentityName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
        
        if (-not $identity) {
            $identity = az identity create `
                --name $env.ManagedIdentityName `
                --resource-group $ResourceGroup `
                --location $Location `
                --output json | ConvertFrom-Json
            Write-Host "✅ Managed Identity created" -ForegroundColor Green
        } else {
            Write-Host "✅ Managed Identity already exists" -ForegroundColor Green
        }
        
        $managedIdentities[$env.Name] = @{
            ClientId = $identity.clientId
            PrincipalId = $identity.principalId
            ResourceId = $identity.id
            IsSystemAssigned = $false
        }
        
        Write-Host "   Client ID: $($identity.clientId)" -ForegroundColor White
        Write-Host "   Principal ID: $($identity.principalId)" -ForegroundColor White
    }
    
    # 2. Create Static Web App
    Write-Host ""
    Write-Host "🌐 Creating Static Web App '$($env.AppName)'..." -ForegroundColor Yellow
    $swa = az staticwebapp show --name $env.AppName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    
    if (-not $swa) {
        $swa = az staticwebapp create `
            --name $env.AppName `
            --resource-group $ResourceGroup `
            --location $Location `
            --sku $env.Sku `
            --source https://github.com/$GitHubOwner/$GitHubRepo `
            --branch $env.Branch `
            --app-location "/" `
            --output-location "out" `
            --login-with-github `
            --output json | ConvertFrom-Json
        
        Write-Host "✅ Static Web App created" -ForegroundColor Green
    } else {
        Write-Host "✅ Static Web App already exists" -ForegroundColor Green
    }
    
    Write-Host "   URL: https://$($swa.defaultHostname)" -ForegroundColor White
    
    # 3. Assign Managed Identity to Static Web App
    Write-Host ""
    Write-Host "🔗 Assigning Managed Identity to Static Web App..." -ForegroundColor Yellow
    
    if ($managedIdentities[$env.Name].IsSystemAssigned) {
        # Enable System-Assigned Identity
        $identityResult = az staticwebapp identity assign `
            --name $env.AppName `
            --resource-group $ResourceGroup `
            --output json | ConvertFrom-Json
        
        # Store the principal ID for later use
        $managedIdentities[$env.Name].PrincipalId = $identityResult.principalId
        Write-Host "✅ System-Assigned Identity enabled" -ForegroundColor Green
        Write-Host "   Principal ID: $($identityResult.principalId)" -ForegroundColor White
    } else {
        # Assign User-Assigned Identity (requires the $identity variable from step 1)
        $userIdentity = az identity show --name $env.ManagedIdentityName --resource-group $ResourceGroup | ConvertFrom-Json
        az staticwebapp identity assign `
            --name $env.AppName `
            --resource-group $ResourceGroup `
            --identities $userIdentity.id `
            --output table
        Write-Host "✅ User-Assigned Identity assigned" -ForegroundColor Green
    }
    
    # 4. Grant Storage Blob Data Contributor role to Managed Identity
    Write-Host ""
    Write-Host "🔐 Granting Storage permissions to Managed Identity..." -ForegroundColor Yellow
    $storageScope = "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroup/providers/Microsoft.Storage/storageAccounts/$StorageAccountName"
    
    $principalId = $managedIdentities[$env.Name].PrincipalId
    az role assignment create `
        --assignee $principalId `
        --role "Storage Blob Data Contributor" `
        --scope $storageScope `
        --output table
    Write-Host "✅ Storage permissions granted" -ForegroundColor Green
    
    # 4b. Grant Key Vault access to Managed Identity
    Write-Host ""
    Write-Host "🔐 Granting Key Vault access to Managed Identity..." -ForegroundColor Yellow
    $principalId = $managedIdentities[$env.Name].PrincipalId
    az keyvault set-policy `
        --name $KeyVaultName `
        --object-id $principalId `
        --secret-permissions get list `
        --output table
    Write-Host "✅ Key Vault access granted" -ForegroundColor Green
    
    # 5. Create App Registration for GitHub Actions (Federated Credentials)
    Write-Host ""
    Write-Host "🔧 Setting up Federated Credentials for GitHub Actions..." -ForegroundColor Yellow
    
    $appRegName = "github-$GitHubRepo-$($env.Name)"
    $appReg = az ad app list --display-name $appRegName --query "[0]" | ConvertFrom-Json
    
    if (-not $appReg) {
        Write-Host "   Creating App Registration '$appRegName'..." -ForegroundColor Yellow
        $appReg = az ad app create --display-name $appRegName --output json | ConvertFrom-Json
        Write-Host "   ✅ App Registration created" -ForegroundColor Green
        
        # Create Service Principal
        Write-Host "   Creating Service Principal..." -ForegroundColor Yellow
        az ad sp create --id $appReg.appId --output table
        Write-Host "   ✅ Service Principal created" -ForegroundColor Green
        
        # Wait a bit for propagation
        Start-Sleep -Seconds 5
        
        # Assign Contributor role to the Static Web App resource
        Write-Host "   Assigning permissions..." -ForegroundColor Yellow
        $swaScope = "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroup/providers/Microsoft.Web/staticSites/$($env.AppName)"
        az role assignment create `
            --assignee $appReg.appId `
            --role "Contributor" `
            --scope $swaScope `
            --output table
        Write-Host "   ✅ Permissions assigned" -ForegroundColor Green
    } else {
        Write-Host "   ✅ App Registration '$appRegName' already exists" -ForegroundColor Green
    }
    
    # Store app registration info
    $managedIdentities[$env.Name].AppClientId = $appReg.appId
    
    # Create Federated Identity Credential for branch
    Write-Host "   Creating Federated Credential for branch '$($env.Branch)'..." -ForegroundColor Yellow
    $branchSubject = "repo:$GitHubOwner/${GitHubRepo}:ref:refs/heads/$($env.Branch)"
    
    $existingCred = az ad app federated-credential list --id $appReg.appId --query "[?subject=='$branchSubject']" | ConvertFrom-Json
    if (-not $existingCred -or $existingCred.Count -eq 0) {
        $branchCredential = @{
            name = "$($env.Name)-branch-$($env.Branch)"
            issuer = "https://token.actions.githubusercontent.com"
            subject = $branchSubject
            audiences = @("api://AzureADTokenExchange")
        }
        
        # Write to temp file to avoid PowerShell quoting issues
        $tempFile = [System.IO.Path]::GetTempFileName()
        $branchCredential | ConvertTo-Json -Depth 3 | Set-Content -Path $tempFile -Encoding UTF8
        
        az ad app federated-credential create --id $appReg.appId --parameters "@$tempFile"
        Remove-Item $tempFile -Force
        
        Write-Host "   ✅ Branch credential created" -ForegroundColor Green
    } else {
        Write-Host "   ✅ Branch credential already exists" -ForegroundColor Green
    }
    
    # Create Federated Identity Credential for pull requests
    Write-Host "   Creating Federated Credential for pull requests..." -ForegroundColor Yellow
    $prSubject = "repo:$GitHubOwner/${GitHubRepo}:pull_request"
    
    $existingPrCred = az ad app federated-credential list --id $appReg.appId --query "[?subject=='$prSubject']" | ConvertFrom-Json
    if (-not $existingPrCred -or $existingPrCred.Count -eq 0) {
        $prCredential = @{
            name = "$($env.Name)-pull-requests"
            issuer = "https://token.actions.githubusercontent.com"
            subject = $prSubject
            audiences = @("api://AzureADTokenExchange")
        }
        
        # Write to temp file to avoid PowerShell quoting issues
        $tempFile = [System.IO.Path]::GetTempFileName()
        $prCredential | ConvertTo-Json -Depth 3 | Set-Content -Path $tempFile -Encoding UTF8
        
        az ad app federated-credential create --id $appReg.appId --parameters "@$tempFile"
        Remove-Item $tempFile -Force
        
        Write-Host "   ✅ Pull request credential created" -ForegroundColor Green
    } else {
        Write-Host "   ✅ Pull request credential already exists" -ForegroundColor Green
    }
    
    # Get Static Web App API token
    Write-Host ""
    Write-Host "🔑 Retrieving Static Web App API token..." -ForegroundColor Yellow
    $apiToken = az staticwebapp secrets list --name $env.AppName --resource-group $ResourceGroup --query "properties.apiKey" -o tsv
    $managedIdentities[$env.Name].ApiToken = $apiToken
    Write-Host "✅ API token retrieved" -ForegroundColor Green
    
    # Store secrets in Key Vault
    Write-Host ""
    Write-Host "🔐 Storing secrets in Key Vault..." -ForegroundColor Yellow
    
    # Store API token
    az keyvault secret set `
        --vault-name $KeyVaultName `
        --name "swa-api-token-$($env.Name)" `
        --value $apiToken `
        --output none
    
    # Store App Registration Client ID
    az keyvault secret set `
        --vault-name $KeyVaultName `
        --name "github-client-id-$($env.Name)" `
        --value $appReg.appId `
        --output none
    
    # Store environment configuration
    az keyvault secret set `
        --vault-name $KeyVaultName `
        --name "environment-$($env.Name)" `
        --value $env.Name `
        --output none
    
    Write-Host "✅ Secrets stored in Key Vault" -ForegroundColor Green
}

# Display summary
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ PROVISIONING COMPLETED!           " -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""

Write-Host "📋 GITHUB SECRETS CONFIGURATION" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Add these secrets to your GitHub repository:" -ForegroundColor Yellow
Write-Host "Location: https://github.com/$GitHubOwner/$GitHubRepo/settings/secrets/actions" -ForegroundColor White
Write-Host ""

Write-Host "🔐 REQUIRED GITHUB SECRETS (only 5 needed!):" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host ""
Write-Host "AZURE_TENANT_ID" -ForegroundColor White
Write-Host "$tenantId" -ForegroundColor Cyan
Write-Host ""
Write-Host "AZURE_SUBSCRIPTION_ID" -ForegroundColor White
Write-Host "$subscriptionId" -ForegroundColor Cyan
Write-Host ""

foreach ($env in $environments) {
    $info = $managedIdentities[$env.Name]
    Write-Host "AZURE_CLIENT_ID_$($env.Name.ToUpper())" -ForegroundColor White
    Write-Host "$($info.AppClientId)" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
Write-Host "✅ All other secrets are stored securely in Key Vault!" -ForegroundColor Green
Write-Host "   Key Vault: $KeyVaultName" -ForegroundColor Cyan
Write-Host ""

Write-Host "🔐 SECRETS IN KEY VAULT:" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Yellow
foreach ($env in $environments) {
    Write-Host "  🌍 $($env.Name.ToUpper()) Environment:" -ForegroundColor Cyan
    Write-Host "     - swa-api-token-$($env.Name)" -ForegroundColor White
    Write-Host "     - github-client-id-$($env.Name)" -ForegroundColor White
    Write-Host "     - environment-$($env.Name)" -ForegroundColor White
    Write-Host ""
}

Write-Host "📝 RESOURCE INFORMATION" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔐 Key Vault: $KeyVaultName" -ForegroundColor Yellow
Write-Host "💾 Storage Account: $StorageAccountName" -ForegroundColor Yellow
Write-Host ""
foreach ($env in $environments) {
    Write-Host "🌐 $($env.Name.ToUpper()) Environment:" -ForegroundColor Yellow
    Write-Host "   Static Web App: $($env.AppName)" -ForegroundColor White
    Write-Host "   Managed Identity: $($env.ManagedIdentityName)" -ForegroundColor White
    Write-Host "   Branch: $($env.Branch)" -ForegroundColor White
    Write-Host "   URL: https://$($env.AppName).azurestaticapps.net" -ForegroundColor White
    Write-Host ""
}

Write-Host "📚 NEXT STEPS" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Add the 5 GitHub secrets listed above to your repository" -ForegroundColor White
Write-Host "   ⚠️ Note: Only 5 secrets needed now (down from 8)!" -ForegroundColor Yellow
Write-Host "2. GitHub workflows will retrieve API tokens from Key Vault automatically" -ForegroundColor White
Write-Host "3. Push code to trigger GitHub Actions workflows" -ForegroundColor White
Write-Host "4. Verify deployments in Azure Portal" -ForegroundColor White
Write-Host "5. Configure custom domains if needed" -ForegroundColor White
Write-Host ""
Write-Host "🎉 All done! Your Azure Static Web Apps are ready to deploy!" -ForegroundColor Green
Write-Host "🔐 API tokens are securely stored in Key Vault: $KeyVaultName" -ForegroundColor Green
Write-Host ""
