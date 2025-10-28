# Azure Deployment Script for Fluxline Next.js Environments (PowerShell)
# Usage: .\deploy.ps1 -Environment dev
# Example: .\deploy.ps1 -Environment prod -ResourceGroup "rg-fluxline-prod"

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("dev", "test", "prod")]
    [string]$Environment,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "rg-fluxline-$Environment",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US 2"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Deploying Fluxline Next.js to $Environment environment..." -ForegroundColor Green
Write-Host "📍 Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "🌍 Location: $Location" -ForegroundColor Cyan

# Check if logged in to Azure
try {
    $account = az account show | ConvertFrom-Json
    if (-not $account) {
        throw "Not logged in"
    }
} catch {
    Write-Host "❌ Please login to Azure CLI first: az login" -ForegroundColor Red
    exit 1
}

# Create resource group if it doesn't exist
Write-Host "📦 Creating resource group if it doesn't exist..." -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location --output table

# Deploy ARM template
Write-Host "🏗️ Deploying ARM template..." -ForegroundColor Yellow
az deployment group create `
    --resource-group $ResourceGroup `
    --template-file "azure\arm-template.json" `
    --parameters "azure\parameters.$Environment.json" `
    --output table

# Get deployment outputs
Write-Host "📋 Retrieving deployment information..." -ForegroundColor Yellow
$staticWebAppName = az deployment group show `
    --resource-group $ResourceGroup `
    --name "arm-template" `
    --query "properties.outputs.staticWebAppName.value" -o tsv

$defaultHostname = az deployment group show `
    --resource-group $ResourceGroup `
    --name "arm-template" `
    --query "properties.outputs.staticWebAppDefaultHostname.value" -o tsv

$storageAccountName = az deployment group show `
    --resource-group $ResourceGroup `
    --name "arm-template" `
    --query "properties.outputs.storageAccountName.value" -o tsv

$keyVaultName = az deployment group show `
    --resource-group $ResourceGroup `
    --name "arm-template" `
    --query "properties.outputs.keyVaultName.value" -o tsv

Write-Host "⚙️ Static Web App deployed successfully!" -ForegroundColor Yellow
Write-Host "🔗 Next step: Connect to GitHub manually in Azure Portal" -ForegroundColor Cyan
Write-Host "   1. Go to: https://portal.azure.com/#resource/subscriptions/$((az account show --query id -o tsv))/resourceGroups/$ResourceGroup/providers/Microsoft.Web/staticSites/$staticWebAppName" -ForegroundColor White
Write-Host "   2. Navigate to: Deployment > GitHub" -ForegroundColor White
Write-Host "   3. Connect to Repository: Fluxline-Pro/fluxline-pro-next" -ForegroundColor White
Write-Host "   4. Select Branch: $((Get-Content "azure\parameters.$Environment.json" | ConvertFrom-Json).parameters.branch.value)" -ForegroundColor White

Write-Host ""
Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Environment Information:" -ForegroundColor Cyan
Write-Host "  🌐 Static Web App: $staticWebAppName" -ForegroundColor White
Write-Host "  🔗 Default URL: https://$defaultHostname" -ForegroundColor White
Write-Host "  💾 Storage Account: $storageAccountName" -ForegroundColor White
Write-Host "  🔐 Key Vault: $keyVaultName" -ForegroundColor White
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Connect Static Web App to GitHub (see instructions above)" -ForegroundColor White
Write-Host "  2. Configure custom domain in Azure Portal" -ForegroundColor White
Write-Host "  3. Configure Key Vault access policies" -ForegroundColor White
Write-Host "  4. Update DNS records for custom domain" -ForegroundColor White
Write-Host "  5. Configure environment variables after GitHub connection" -ForegroundColor White
Write-Host ""