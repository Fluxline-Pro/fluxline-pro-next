#!/bin/bash

# Azure Deployment Script for Fluxline Next.js Environments
# Usage: ./deploy.sh <environment> [resource-group]
# Example: ./deploy.sh dev
# Example: ./deploy.sh prod rg-fluxline-prod

set -e

ENVIRONMENT=${1:-dev}
RESOURCE_GROUP=${2:-"rg-fluxline-$ENVIRONMENT"}
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
LOCATION="East US 2"

# Validate environment
if [[ ! "$ENVIRONMENT" =~ ^(dev|test|prod)$ ]]; then
    echo "❌ Error: Environment must be dev, test, or prod"
    exit 1
fi

echo "🚀 Deploying Fluxline Next.js to $ENVIRONMENT environment..."
echo "📍 Resource Group: $RESOURCE_GROUP"
echo "🌍 Location: $LOCATION"

# Check if logged in to Azure
if ! az account show > /dev/null 2>&1; then
    echo "❌ Please login to Azure CLI first: az login"
    exit 1
fi

# Create resource group if it doesn't exist
echo "📦 Creating resource group if it doesn't exist..."
az group create \
    --name "$RESOURCE_GROUP" \
    --location "$LOCATION" \
    --output table

# Deploy ARM template
echo "🏗️ Deploying ARM template..."
az deployment group create \
    --resource-group "$RESOURCE_GROUP" \
    --template-file "azure/arm-template.json" \
    --parameters "azure/parameters.$ENVIRONMENT.json" \
    --output table

# Get deployment outputs
echo "📋 Retrieving deployment information..."
STATIC_WEB_APP_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "arm-template" \
    --query "properties.outputs.staticWebAppName.value" -o tsv)

DEFAULT_HOSTNAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "arm-template" \
    --query "properties.outputs.staticWebAppDefaultHostname.value" -o tsv)

STORAGE_ACCOUNT_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "arm-template" \
    --query "properties.outputs.storageAccountName.value" -o tsv)

KEY_VAULT_NAME=$(az deployment group show \
    --resource-group "$RESOURCE_GROUP" \
    --name "arm-template" \
    --query "properties.outputs.keyVaultName.value" -o tsv)

echo "⚙️ Static Web App deployed successfully!"
echo "🔗 Next step: Connect to GitHub manually in Azure Portal"
echo "   1. Go to: https://portal.azure.com/#resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/staticSites/$STATIC_WEB_APP_NAME"
echo "   2. Navigate to: Deployment > GitHub"
echo "   3. Connect to Repository: Fluxline-Pro/fluxline-pro-next"
echo "   4. Select Branch: $(jq -r '.parameters.branch.value' azure/parameters.$ENVIRONMENT.json)"

echo ""
echo "✅ Deployment completed successfully!"
echo ""
echo "📊 Environment Information:"
echo "  🌐 Static Web App: $STATIC_WEB_APP_NAME"
echo "  🔗 Default URL: https://$DEFAULT_HOSTNAME"
echo "  💾 Storage Account: $STORAGE_ACCOUNT_NAME"
echo "  🔐 Key Vault: $KEY_VAULT_NAME"
echo ""
echo "🎯 Next Steps:"
echo "  1. Connect Static Web App to GitHub (see instructions above)"
echo "  2. Configure custom domain in Azure Portal"
echo "  3. Configure Key Vault access policies"
echo "  4. Update DNS records for custom domain"
echo "  5. Configure environment variables after GitHub connection"
echo ""