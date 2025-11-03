# ===================================================================
# Verify Azure Static Web Apps Setup with Managed Identities
# ===================================================================
# This script verifies that all resources are correctly configured
# and permissions are properly assigned.
#
# Usage:
#   .\verify-setup.ps1
# ===================================================================

param(
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "az-fluxline-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$StorageAccountName = "azfluxlinewebstorage",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubOwner = "Fluxline-Pro",
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubRepo = "fluxline-pro-next"
)

$ErrorActionPreference = "Continue"

# Color codes for output
$GREEN = "Green"
$RED = "Red"
$YELLOW = "Yellow"
$CYAN = "Cyan"
$WHITE = "White"

$issueCount = 0

function Test-Check {
    param(
        [string]$Name,
        [bool]$Result,
        [string]$Details = ""
    )
    
    if ($Result) {
        Write-Host "  ✅ $Name" -ForegroundColor $GREEN
        if ($Details) { Write-Host "     $Details" -ForegroundColor $WHITE }
    } else {
        Write-Host "  ❌ $Name" -ForegroundColor $RED
        if ($Details) { Write-Host "     $Details" -ForegroundColor $YELLOW }
        $script:issueCount++
    }
}

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
Write-Host "  Azure Static Web Apps Verification   " -ForegroundColor $CYAN
Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
Write-Host ""

# Check Azure CLI authentication
Write-Host "🔍 Checking Azure CLI Authentication..." -ForegroundColor $YELLOW
try {
    $account = az account show | ConvertFrom-Json
    Test-Check "Azure CLI Authenticated" $true "Logged in as: $($account.user.name)"
    $subscriptionId = $account.id
    $tenantId = $account.tenantId
} catch {
    Test-Check "Azure CLI Authenticated" $false "Run: az login"
    exit 1
}
Write-Host ""

# Check Resource Group
Write-Host "🔍 Checking Resource Group..." -ForegroundColor $YELLOW
$rgExists = az group exists --name $ResourceGroup
if ($rgExists -eq "true") {
    Test-Check "Resource Group Exists" $true "$ResourceGroup"
} else {
    Test-Check "Resource Group Exists" $false "Run: az group create --name $ResourceGroup --location eastus2"
}
Write-Host ""

# Check Storage Account
Write-Host "🔍 Checking Storage Account..." -ForegroundColor $YELLOW
try {
    $storage = az storage account show --name $StorageAccountName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
    Test-Check "Storage Account Exists" $true "$StorageAccountName"
    Test-Check "Storage Account Location" $true "$($storage.location)"
} catch {
    Test-Check "Storage Account Exists" $false "Storage account not found"
}
Write-Host ""

# Environment configurations
$environments = @(
    @{ Name = "dev"; AppName = "az-fluxline-next-dev"; ManagedIdentityName = "az-fluxline-next-dev-mg"; Branch = "develop" },
    @{ Name = "test"; AppName = "az-fluxline-next-test"; ManagedIdentityName = "az-fluxline-next-test-mg"; Branch = "test" },
    @{ Name = "prod"; AppName = "az-fluxline-next-prod"; ManagedIdentityName = "az-fluxline-next-prod-mg"; Branch = "master" }
)

foreach ($env in $environments) {
    Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
    Write-Host "  Environment: $($env.Name.ToUpper())" -ForegroundColor $CYAN
    Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
    Write-Host ""
    
    # Check Managed Identity
    Write-Host "🔍 Checking Managed Identity..." -ForegroundColor $YELLOW
    try {
        $identity = az identity show --name $env.ManagedIdentityName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
        Test-Check "Managed Identity Exists" $true "$($env.ManagedIdentityName)"
        Test-Check "Client ID" $true "$($identity.clientId)"
        Test-Check "Principal ID" $true "$($identity.principalId)"
        $principalId = $identity.principalId
    } catch {
        Test-Check "Managed Identity Exists" $false "Run provisioning script"
        continue
    }
    Write-Host ""
    
    # Check Static Web App
    Write-Host "🔍 Checking Static Web App..." -ForegroundColor $YELLOW
    try {
        $swa = az staticwebapp show --name $env.AppName --resource-group $ResourceGroup 2>$null | ConvertFrom-Json
        Test-Check "Static Web App Exists" $true "$($env.AppName)"
        Test-Check "Default Hostname" $true "https://$($swa.defaultHostname)"
        
        # Check if Managed Identity is assigned
        $identityAssigned = $false
        if ($swa.identity -and $swa.identity.userAssignedIdentities) {
            $identityKeys = $swa.identity.userAssignedIdentities | Get-Member -MemberType NoteProperty | Select-Object -ExpandProperty Name
            $identityAssigned = $identityKeys.Count -gt 0
        }
        Test-Check "Managed Identity Assigned" $identityAssigned
        
    } catch {
        Test-Check "Static Web App Exists" $false "Run provisioning script"
        continue
    }
    Write-Host ""
    
    # Check Storage Permissions
    Write-Host "🔍 Checking Storage Permissions..." -ForegroundColor $YELLOW
    $storageScope = "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroup/providers/Microsoft.Storage/storageAccounts/$StorageAccountName"
    $roleAssignments = az role assignment list --scope $storageScope --assignee $principalId 2>$null | ConvertFrom-Json
    
    $hasStorageRole = $false
    foreach ($assignment in $roleAssignments) {
        if ($assignment.roleDefinitionName -eq "Storage Blob Data Contributor") {
            $hasStorageRole = $true
            break
        }
    }
    Test-Check "Storage Blob Data Contributor Role" $hasStorageRole "Managed Identity can write to storage"
    Write-Host ""
    
    # Check App Registration
    Write-Host "🔍 Checking App Registration..." -ForegroundColor $YELLOW
    $appRegName = "github-$GitHubRepo-$($env.Name)"
    try {
        $appReg = az ad app list --display-name $appRegName --query "[0]" 2>$null | ConvertFrom-Json
        if ($appReg) {
            Test-Check "App Registration Exists" $true "$appRegName"
            Test-Check "App Client ID" $true "$($appReg.appId)"
            
            # Check Federated Credentials
            $fedCreds = az ad app federated-credential list --id $appReg.appId 2>$null | ConvertFrom-Json
            $branchSubject = "repo:$GitHubOwner/${GitHubRepo}:ref:refs/heads/$($env.Branch)"
            $prSubject = "repo:$GitHubOwner/${GitHubRepo}:pull_request"
            
            $hasBranchCred = $false
            $hasPrCred = $false
            
            foreach ($cred in $fedCreds) {
                if ($cred.subject -eq $branchSubject) { $hasBranchCred = $true }
                if ($cred.subject -eq $prSubject) { $hasPrCred = $true }
            }
            
            Test-Check "Federated Credential (Branch)" $hasBranchCred "$($env.Branch) branch"
            Test-Check "Federated Credential (PR)" $hasPrCred "Pull requests"
            
            # Check Role Assignment for Static Web App
            $swaScope = "/subscriptions/$subscriptionId/resourceGroups/$ResourceGroup/providers/Microsoft.Web/staticSites/$($env.AppName)"
            $swaRoleAssignments = az role assignment list --scope $swaScope --assignee $appReg.appId 2>$null | ConvertFrom-Json
            
            $hasContributorRole = $false
            foreach ($assignment in $swaRoleAssignments) {
                if ($assignment.roleDefinitionName -eq "Contributor") {
                    $hasContributorRole = $true
                    break
                }
            }
            Test-Check "Contributor Role on Static Web App" $hasContributorRole "App Registration can deploy"
            
        } else {
            Test-Check "App Registration Exists" $false "Run provisioning script"
        }
    } catch {
        Test-Check "App Registration Check" $false "Error checking app registration"
    }
    Write-Host ""
}

# Summary
Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
Write-Host "  Verification Summary                  " -ForegroundColor $CYAN
Write-Host "═══════════════════════════════════════" -ForegroundColor $CYAN
Write-Host ""

if ($issueCount -eq 0) {
    Write-Host "🎉 All checks passed! Your setup is ready." -ForegroundColor $GREEN
    Write-Host ""
    Write-Host "📋 Next Steps:" -ForegroundColor $CYAN
    Write-Host "  1. Ensure GitHub secrets are configured" -ForegroundColor $WHITE
    Write-Host "  2. Push code to trigger deployments" -ForegroundColor $WHITE
    Write-Host "  3. Monitor GitHub Actions workflows" -ForegroundColor $WHITE
    Write-Host ""
} else {
    Write-Host "⚠️ Found $issueCount issue(s) that need attention." -ForegroundColor $YELLOW
    Write-Host ""
    Write-Host "🔧 Recommended Actions:" -ForegroundColor $CYAN
    Write-Host "  1. Review the failed checks above" -ForegroundColor $WHITE
    Write-Host "  2. Run: .\provision-swa-with-managed-identities.ps1" -ForegroundColor $WHITE
    Write-Host "  3. Run this verification script again" -ForegroundColor $WHITE
    Write-Host ""
}

Write-Host "📚 For detailed setup instructions, see:" -ForegroundColor $CYAN
Write-Host "   azure\SETUP-GUIDE.md" -ForegroundColor $WHITE
Write-Host ""
