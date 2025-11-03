# ===================================================================
# Grant Service Principal Permissions for Free Tier Environments
# ===================================================================
# This script grants Storage and Key Vault permissions to the 
# App Registration Service Principals used by GitHub Actions
# (For dev/test which can't use Managed Identities on Free tier)
# ===================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$StorageAccountName = "azfluxlinewebstorage",
    
    [Parameter(Mandatory=$false)]
    [string]$KeyVaultName = "kv-az-fluxline-next",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubRepo = "fluxline-pro-next"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Grant Service Principal Permissions   " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Get subscription ID
$subscriptionId = (az account show --query id -o tsv)

$environments = @("dev", "test")

foreach ($env in $environments) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  Processing Environment: $($env.ToUpper())" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    $appRegName = "github-$GitHubRepo-$env"
    
    # Get App Registration
    Write-Host "🔍 Finding App Registration '$appRegName'..." -ForegroundColor Yellow
    $appReg = az ad app list --display-name $appRegName --query "[0]" | ConvertFrom-Json
    
    if (-not $appReg) {
        Write-Host "   ❌ App Registration not found!" -ForegroundColor Red
        continue
    }
    
    Write-Host "   ✅ Found App Registration" -ForegroundColor Green
    Write-Host "      App ID: $($appReg.appId)" -ForegroundColor White
    
    # Get Service Principal
    Write-Host "🔍 Finding Service Principal..." -ForegroundColor Yellow
    $sp = az ad sp show --id $appReg.appId 2>$null | ConvertFrom-Json
    
    if (-not $sp) {
        Write-Host "   ⚠️ Service Principal not found, creating..." -ForegroundColor Yellow
        az ad sp create --id $appReg.appId --output table
        Start-Sleep -Seconds 3
        $sp = az ad sp show --id $appReg.appId | ConvertFrom-Json
    }
    
    Write-Host "   ✅ Service Principal ready" -ForegroundColor Green
    Write-Host "      Object ID: $($sp.id)" -ForegroundColor White
    
    # Grant Storage Blob Data Contributor
    Write-Host ""
    Write-Host "🔐 Granting Storage permissions..." -ForegroundColor Yellow
    $storageScope = "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroup/providers/Microsoft.Storage/storageAccounts/$StorageAccountName"
    
    try {
        az role assignment create `
            --assignee $appReg.appId `
            --role "Storage Blob Data Contributor" `
            --scope $storageScope `
            --output table 2>$null
        Write-Host "   ✅ Storage permissions granted" -ForegroundColor Green
    } catch {
        Write-Host "   ℹ️ Storage role assignment may already exist" -ForegroundColor Gray
    }
    
    # Grant Key Vault Secrets User
    Write-Host ""
    Write-Host "🔐 Granting Key Vault permissions..." -ForegroundColor Yellow
    
    try {
        az keyvault set-policy `
            --name $KeyVaultName `
            --object-id $sp.id `
            --secret-permissions get list `
            --output table
        Write-Host "   ✅ Key Vault permissions granted" -ForegroundColor Green
    } catch {
        Write-Host "   ℹ️ Key Vault policy may already exist" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ PERMISSIONS GRANTED!               " -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Summary:" -ForegroundColor Yellow
Write-Host "   - Dev & Test Service Principals now have Storage access" -ForegroundColor White
Write-Host "   - Dev & Test Service Principals now have Key Vault access" -ForegroundColor White
Write-Host "   - GitHub Actions workflows will use these Service Principals" -ForegroundColor White
Write-Host "   - This works perfectly on Free tier Static Web Apps!" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Ready to deploy! Push to develop or test branch to trigger deployment." -ForegroundColor Green
Write-Host ""
