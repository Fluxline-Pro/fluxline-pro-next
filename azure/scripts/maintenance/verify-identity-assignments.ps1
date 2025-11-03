# ===================================================================
# Verify Managed Identity Assignments on Static Web Apps
# ===================================================================
# This script checks if User-Assigned Managed Identities are properly
# assigned to each Static Web App
# ===================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg"
)

$ErrorActionPreference = "Stop"

$environments = @("dev", "test", "prod")

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Verifying Identity Assignments        " -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

foreach ($env in $environments) {
    $appName = "az-fluxline-next-$env"
    
    Write-Host "🔍 Checking $($env.ToUpper()): $appName" -ForegroundColor Yellow
    
    # Get Static Web App details
    $swa = az staticwebapp show --name $appName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    
    if (-not $swa) {
        Write-Host "   ❌ Static Web App not found!" -ForegroundColor Red
        continue
    }
    
    # Check identity configuration
    if ($swa.identity -and $swa.identity.type) {
        Write-Host "   Identity Type: $($swa.identity.type)" -ForegroundColor White
        
        if ($swa.identity.type -eq "UserAssigned") {
            Write-Host "   ✅ User-Assigned Identity configured" -ForegroundColor Green
            
            if ($swa.identity.userAssignedIdentities) {
                Write-Host "   Assigned Identities:" -ForegroundColor White
                $swa.identity.userAssignedIdentities.PSObject.Properties | ForEach-Object {
                    Write-Host "      - $($_.Name)" -ForegroundColor Cyan
                }
            }
        } elseif ($swa.identity.type -eq "None") {
            Write-Host "   ❌ No identity assigned!" -ForegroundColor Red
            Write-Host "      Run: az staticwebapp identity assign --name $appName --resource-group $ResourceGroup --identities /subscriptions/.../az-fluxline-next-$env-mg" -ForegroundColor Yellow
        } else {
            Write-Host "   Identity Type: $($swa.identity.type)" -ForegroundColor White
        }
    } else {
        Write-Host "   ❌ No identity configuration found!" -ForegroundColor Red
    }
    
    Write-Host ""
}

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 To view in Azure Portal:" -ForegroundColor Yellow
Write-Host "   1. Navigate to your Static Web App" -ForegroundColor White
Write-Host "   2. Go to Settings → Identity" -ForegroundColor White
Write-Host "   3. Click 'User assigned' tab" -ForegroundColor White
Write-Host ""
