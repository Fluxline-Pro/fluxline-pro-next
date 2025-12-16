# Setup Production Standard Tier Static Web App
# This script creates and configures a new Azure Static Web App for production

param(
    [Parameter(Mandatory=$false)]
    [string]$SubscriptionId = "3912d915-b497-49b5-8c04-f9de63a523c1",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "eastus2",
    
    [Parameter(Mandatory=$false)]
    [string]$StaticWebAppName = "az-fluxline-next-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$KeyVaultName = "kv-az-fluxline-next",
    
    [Parameter(Mandatory=$false)]
    [string]$SecretName = "swa-api-token-prod",
    
    [Parameter(Mandatory=$false)]
    [string]$ManagedIdentityClientId = "ac51b814-4f10-4511-93fa-fba541500610",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipDomainConfiguration
)

# Color output functions
function Write-Success { param([string]$Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Info { param([string]$Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param([string]$Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }
function Write-Error { param([string]$Message) Write-Host "❌ $Message" -ForegroundColor Red }
function Write-Step { param([string]$Message) Write-Host "`n🔹 $Message" -ForegroundColor Magenta }

# Start script
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "  Azure Static Web App - Standard Tier Setup" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Info "Configuration:"
Write-Host "  Subscription ID: $SubscriptionId"
Write-Host "  Resource Group: $ResourceGroup"
Write-Host "  Location: $Location"
Write-Host "  Static Web App Name: $StaticWebAppName"
Write-Host "  Key Vault: $KeyVaultName"
Write-Host "  Secret Name: $SecretName`n"

# Check Azure CLI installation
Write-Step "Step 1: Checking Azure CLI"
try {
    $azVersion = az version --output json | ConvertFrom-Json
    Write-Success "Azure CLI version: $($azVersion.'azure-cli')"
} catch {
    Write-Error "Azure CLI not found. Please install from: https://aka.ms/installazurecliwindows"
    exit 1
}

# Set subscription
Write-Step "Step 2: Setting Azure Subscription"
try {
    az account set --subscription $SubscriptionId
    $currentSub = az account show --query name --output tsv
    Write-Success "Using subscription: $currentSub"
} catch {
    Write-Error "Failed to set subscription. Error: $_"
    exit 1
}

# Verify resource group exists
Write-Step "Step 3: Verifying Resource Group"
$rgExists = az group exists --name $ResourceGroup
if ($rgExists -eq "true") {
    Write-Success "Resource group '$ResourceGroup' exists"
} else {
    Write-Warning "Resource group does not exist. Creating..."
    az group create --name $ResourceGroup --location $Location
    Write-Success "Resource group created"
}

# Check if Static Web App already exists
Write-Step "Step 4: Checking if Static Web App exists"
$existingSwa = az staticwebapp show --name $StaticWebAppName --resource-group $ResourceGroup 2>$null
if ($existingSwa) {
    Write-Warning "Static Web App '$StaticWebAppName' already exists"
    $response = Read-Host "Do you want to continue and use the existing app? (y/N)"
    if ($response -ne "y" -and $response -ne "Y") {
        Write-Info "Exiting script"
        exit 0
    }
} else {
    Write-Info "Static Web App does not exist. Will create..."
}

# Create Static Web App (Standard Tier)
if (-not $existingSwa) {
    Write-Step "Step 5: Creating Static Web App (Standard Tier)"
    Write-Info "This may take a few minutes..."
    
    try {
        az staticwebapp create `
            --name $StaticWebAppName `
            --resource-group $ResourceGroup `
            --location $Location `
            --sku Standard `
            --source "https://github.com/Fluxline-Pro/fluxline-pro-next" `
            --branch "master" `
            --app-location "out" `
            --api-location "api" `
            --output-location "" `
            --login-with-github $false
        
        Write-Success "Static Web App created successfully"
        
        # Wait for provisioning to complete
        Write-Info "Waiting for provisioning to complete..."
        Start-Sleep -Seconds 30
    } catch {
        Write-Error "Failed to create Static Web App. Error: $_"
        exit 1
    }
} else {
    Write-Info "Using existing Static Web App"
}

# Get deployment token
Write-Step "Step 6: Retrieving Deployment Token"
try {
    $deploymentToken = az staticwebapp secrets list `
        --name $StaticWebAppName `
        --resource-group $ResourceGroup `
        --query "properties.apiKey" `
        --output tsv
    
    if ($deploymentToken) {
        Write-Success "Deployment token retrieved"
        Write-Info "Token length: $($deploymentToken.Length) characters"
    } else {
        throw "Failed to retrieve deployment token"
    }
} catch {
    Write-Error "Failed to retrieve deployment token. Error: $_"
    exit 1
}

# Store token in Key Vault
Write-Step "Step 7: Storing Token in Key Vault"
try {
    az keyvault secret set `
        --vault-name $KeyVaultName `
        --name $SecretName `
        --value $deploymentToken `
        --output none
    
    Write-Success "Token stored in Key Vault as '$SecretName'"
} catch {
    Write-Error "Failed to store token in Key Vault. Error: $_"
    Write-Warning "You may need to manually add the token to Key Vault"
}

# Enable system-assigned managed identity
Write-Step "Step 8: Configuring Managed Identity"
try {
    $identityResult = az staticwebapp identity assign `
        --name $StaticWebAppName `
        --resource-group $ResourceGroup `
        --output json | ConvertFrom-Json
    
    $principalId = $identityResult.principalId
    Write-Success "Managed identity enabled"
    Write-Info "Principal ID: $principalId"
    
    # Grant Key Vault access
    Write-Info "Granting Key Vault access to managed identity..."
    az keyvault set-policy `
        --name $KeyVaultName `
        --object-id $principalId `
        --secret-permissions get list `
        --output none
    
    Write-Success "Key Vault access granted"
} catch {
    Write-Warning "Failed to configure managed identity. Error: $_"
    Write-Info "You may need to configure this manually"
}

# Get default hostname
Write-Step "Step 9: Getting Static Web App Information"
try {
    $swaInfo = az staticwebapp show `
        --name $StaticWebAppName `
        --resource-group $ResourceGroup `
        --output json | ConvertFrom-Json
    
    $defaultHostname = $swaInfo.defaultHostname
    Write-Success "Default hostname: $defaultHostname"
    Write-Info "Test URL: https://$defaultHostname"
} catch {
    Write-Warning "Failed to retrieve Static Web App information"
}

# Configure custom domain (testing domain only)
if (-not $SkipDomainConfiguration) {
    Write-Step "Step 10: Configuring Custom Domain"
    
    $testDomain = "flx-next-prod.fluxline.pro"
    
    Write-Info "Adding testing domain: $testDomain"
    try {
        az staticwebapp hostname set `
            --name $StaticWebAppName `
            --resource-group $ResourceGroup `
            --hostname $testDomain `
            --output none
        
        Write-Success "Domain '$testDomain' added"
        
        Write-Info "`nDNS Configuration Required:"
        Write-Host "For $testDomain`:"
        Write-Host "  Type: CNAME"
        Write-Host "  Name: flx-next-prod"
        Write-Host "    Value: $defaultHostname`n" -ForegroundColor Yellow
        Write-Warning "Production domains (fluxline.pro, www.fluxline.pro) will be added manually later"
    } catch {
        Write-Warning "Failed to add domain '$testDomain'. Error: $_"
        Write-Info "You may need to add this domain manually in Azure Portal"
    }
} else {
    Write-Info "Skipping domain configuration (use -SkipDomainConfiguration:$false to enable)"
}

# Display next steps
Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "  ✅ Setup Complete!" -ForegroundColor Green
Write-Host "================================================`n" -ForegroundColor Cyan

Write-Host "📋 Next Steps:`n"
Write-Host "1. Configure Federated Credential in Entra ID:"
Write-Host "   - App Registration: github-fluxline-pro-next-prod"
Write-Host "   - Client ID: $ManagedIdentityClientId"
Write-Host "   - Add credential for: Fluxline-Pro/fluxline-pro-next (master branch)`n"

Write-Host "2. Verify GitHub Secrets:"
Write-Host "   - AZURE_CLIENT_ID_PROD: $ManagedIdentityClientId"
Write-Host "   - AZURE_TENANT_ID: 9ebc2060-7a03-47c4-8df4-54d40955cc06"
Write-Host "   - AZURE_SUBSCRIPTION_ID: $SubscriptionId`n"

Write-Host "3. Update GitHub Actions workflow:"
Write-Host "   - Update Key Vault secret name to: $SecretName"
Write-Host "   - Or update the secret in Key Vault to use existing name`n"

Write-Host "4. Configure DNS records for custom domains (if not done yet)`n"

Write-Host "5. Wait for SSL certificate provisioning (5-15 minutes)`n"

Write-Host "6. Test deployment:"
Write-Host "   - Push to master branch"
Write-Host "   - Monitor GitHub Actions workflow"
Write-Host "   - Test default URL: https://$defaultHostname"
Write-Host "   - Test custom domains after DNS propagation`n"

Write-Host "📚 Full documentation: azure/docs/PROD-STANDARD-TIER-SETUP.md`n"

# Save configuration to file
$configOutput = @"
# Production Static Web App Configuration
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## Azure Resources
- Subscription ID: $SubscriptionId
- Resource Group: $ResourceGroup
- Static Web App Name: $StaticWebAppName
- Location: $Location
- SKU: Standard
- Default Hostname: $defaultHostname

## Key Vault
- Key Vault Name: $KeyVaultName
- Secret Name: $SecretName

## Managed Identity
- Managed Identity Client ID: $ManagedIdentityClientId
- Principal ID: $principalId

## Custom Domains
- Testing: flx-next-prod.fluxline.pro
- Production (add manually later): fluxline.pro
- Production (add manually later): www.fluxline.pro

## Test URLs
- Native: https://$defaultHostname
- Testing: https://flx-next-prod.fluxline.pro
- Production: https://fluxline.pro (add domain manually when ready)
- Production WWW: https://www.fluxline.pro (add domain manually when ready)
"@

$configPath = Join-Path $PSScriptRoot "..\..\..\azure\prod-swa-config.txt"
$configOutput | Out-File -FilePath $configPath -Encoding UTF8
Write-Info "Configuration saved to: $configPath"

Write-Host "`n🎉 Setup completed successfully!`n" -ForegroundColor Green
