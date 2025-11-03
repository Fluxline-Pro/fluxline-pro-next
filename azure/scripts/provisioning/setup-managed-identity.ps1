# Azure Managed Identity Setup for GitHub Actions
# This script creates an Azure App Registration with Federated Identity Credentials for GitHub Actions

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubOwner = "Fluxline-Pro",
    
    [Parameter(Mandatory=$true)]
    [string]$GitHubRepo = "fluxline-pro-next",
    
    [Parameter(Mandatory=$false)]
    [string]$AppName = "fluxline-pro-next-github-actions",
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroupName = "az-fluxline-rg"
)

Write-Host "🚀 Setting up Managed Identity for GitHub Actions..." -ForegroundColor Green

# Get current subscription info
$subscription = az account show --query "id" -o tsv
$tenantId = az account show --query "tenantId" -o tsv

Write-Host "📋 Subscription ID: $subscription" -ForegroundColor Cyan
Write-Host "📋 Tenant ID: $tenantId" -ForegroundColor Cyan

# Create Azure AD App Registration
Write-Host "🔧 Creating Azure AD App Registration..." -ForegroundColor Yellow
$appRegistration = az ad app create --display-name $AppName --query "appId" -o tsv

if ($appRegistration) {
    Write-Host "✅ App Registration created: $appRegistration" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create App Registration" -ForegroundColor Red
    exit 1
}

# Create Service Principal
Write-Host "🔧 Creating Service Principal..." -ForegroundColor Yellow
$servicePrincipal = az ad sp create --id $appRegistration --query "id" -o tsv

if ($servicePrincipal) {
    Write-Host "✅ Service Principal created: $servicePrincipal" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create Service Principal" -ForegroundColor Red
    exit 1
}

# Assign Contributor role to the resource group
Write-Host "🔧 Assigning Contributor role to resource group..." -ForegroundColor Yellow
az role assignment create --assignee $appRegistration --role "Contributor" --scope "/subscriptions/$subscription/resourceGroups/$ResourceGroupName"

# Create Federated Identity Credentials for main branch (production)
Write-Host "🔧 Creating Federated Identity Credential for main branch..." -ForegroundColor Yellow
$mainCredentialBody = @{
    name = "main-branch"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GitHubOwner/${GitHubRepo}:ref:refs/heads/master"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json -Depth 3

az ad app federated-credential create --id $appRegistration --parameters $mainCredentialBody

# Create Federated Identity Credentials for develop branch
Write-Host "🔧 Creating Federated Identity Credential for develop branch..." -ForegroundColor Yellow
$developCredentialBody = @{
    name = "develop-branch"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GitHubOwner/${GitHubRepo}:ref:refs/heads/develop"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json -Depth 3

az ad app federated-credential create --id $appRegistration --parameters $developCredentialBody

# Create Federated Identity Credentials for test branch
Write-Host "🔧 Creating Federated Identity Credential for test branch..." -ForegroundColor Yellow
$testCredentialBody = @{
    name = "test-branch"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GitHubOwner/${GitHubRepo}:ref:refs/heads/test"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json -Depth 3

az ad app federated-credential create --id $appRegistration --parameters $testCredentialBody

# Create Federated Identity Credentials for pull requests
Write-Host "🔧 Creating Federated Identity Credential for pull requests..." -ForegroundColor Yellow
$prCredentialBody = @{
    name = "pull-requests"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GitHubOwner/${GitHubRepo}:pull_request"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json -Depth 3

az ad app federated-credential create --id $appRegistration --parameters $prCredentialBody

Write-Host ""
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Add these secrets to your GitHub repository:" -ForegroundColor Cyan
Write-Host "Repository → Settings → Secrets and variables → Actions → New repository secret"
Write-Host ""
Write-Host "AZURE_CLIENT_ID: $appRegistration" -ForegroundColor White
Write-Host "AZURE_TENANT_ID: $tenantId" -ForegroundColor White
Write-Host "AZURE_SUBSCRIPTION_ID: $subscription" -ForegroundColor White
Write-Host ""
Write-Host "🔒 These credentials will allow GitHub Actions to authenticate to Azure using Managed Identity" -ForegroundColor Green
Write-Host "🌟 This is much more secure than using API tokens!" -ForegroundColor Green