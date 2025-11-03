# ===================================================================
# Cleanup Old Azure Resources
# ===================================================================
# This script deletes old Static Web Apps, Managed Identities, and
# App Registrations to prepare for a fresh provisioning
#
# WARNING: This will delete resources! Make sure you have backups if needed.
#
# Usage:
#   .\cleanup-old-resources.ps1
# ===================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubRepo = "fluxline-pro-next"
)

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Red
Write-Host "  ⚠️  CLEANUP OLD RESOURCES  ⚠️         " -ForegroundColor Red
Write-Host "=========================================" -ForegroundColor Red
Write-Host ""
Write-Host "This script will DELETE the following resources:" -ForegroundColor Yellow
Write-Host "  - Static Web Apps (dev/test/prod)" -ForegroundColor White
Write-Host "  - User-Assigned Managed Identities" -ForegroundColor White
Write-Host "  - App Registrations for GitHub Actions" -ForegroundColor White
Write-Host ""
Write-Host "KEEPING:" -ForegroundColor Green
Write-Host "  - Resource Group: $ResourceGroup" -ForegroundColor White
Write-Host "  - Storage Account: azfluxlinewebstorage" -ForegroundColor White
Write-Host "  - VNets and other resources" -ForegroundColor White
Write-Host ""

$confirmation = Read-Host "Type 'DELETE' to confirm (or anything else to cancel)"
if ($confirmation -ne "DELETE") {
    Write-Host "Cancelled. No resources were deleted." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🗑️ Starting cleanup..." -ForegroundColor Yellow
Write-Host ""

# Check if logged in to Azure
try {
    $account = az account show | ConvertFrom-Json
    if (-not $account) {
        throw "Not logged in"
    }
    Write-Host "✅ Azure CLI authenticated as: $($account.user.name)" -ForegroundColor Green
} catch {
    Write-Host "❌ Please login to Azure CLI first: az login" -ForegroundColor Red
    exit 1
}

$environments = @("dev", "test", "prod")

foreach ($env in $environments) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  Cleaning up: $($env.ToUpper())" -ForegroundColor Cyan
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    
    $appName = "az-fluxline-next-$env"
    $identityName = "az-fluxline-next-$env-mg"
    $appRegName = "github-$GitHubRepo-$env"
    
    # Delete Static Web App
    Write-Host "🗑️ Deleting Static Web App '$appName'..." -ForegroundColor Yellow
    $swa = az staticwebapp show --name $appName --resource-group $ResourceGroup 2>$null
    if ($swa) {
        az staticwebapp delete --name $appName --resource-group $ResourceGroup --yes --no-wait
        Write-Host "✅ Static Web App deletion initiated" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Static Web App not found (may already be deleted)" -ForegroundColor Yellow
    }
    
    # Delete User-Assigned Managed Identity
    Write-Host "🗑️ Deleting Managed Identity '$identityName'..." -ForegroundColor Yellow
    $identity = az identity show --name $identityName --resource-group $ResourceGroup 2>$null
    if ($identity) {
        az identity delete --name $identityName --resource-group $ResourceGroup
        Write-Host "✅ Managed Identity deleted" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Managed Identity not found (may already be deleted)" -ForegroundColor Yellow
    }
    
    # Delete App Registration
    Write-Host "🗑️ Deleting App Registration '$appRegName'..." -ForegroundColor Yellow
    $appReg = az ad app list --display-name $appRegName --query "[0]" 2>$null | ConvertFrom-Json
    if ($appReg) {
        # Delete associated service principal first
        $sp = az ad sp list --display-name $appRegName --query "[0].id" -o tsv 2>$null
        if ($sp) {
            az ad sp delete --id $sp
            Write-Host "  ✅ Service Principal deleted" -ForegroundColor Green
        }
        
        # Delete app registration
        az ad app delete --id $appReg.appId
        Write-Host "✅ App Registration deleted" -ForegroundColor Green
    } else {
        Write-Host "⚠️ App Registration not found (may already be deleted)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✅ CLEANUP COMPLETED!                " -ForegroundColor Green
Write-Host "═══════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Wait 2-3 minutes for deletions to complete" -ForegroundColor White
Write-Host "  2. Run: .\provision-swa-with-managed-identities.ps1" -ForegroundColor White
Write-Host "  3. Delete old GitHub secrets (keep AZURE_TENANT_ID and AZURE_SUBSCRIPTION_ID)" -ForegroundColor White
Write-Host ""
Write-Host "💡 Static Web Apps may take several minutes to fully delete" -ForegroundColor Yellow
Write-Host ""
