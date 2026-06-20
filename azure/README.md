# Azure Infrastructure

This directory contains all Azure-related scripts, templates, and documentation for the Fluxline Pro Next.js application.

## 📁 Directory Structure

```
azure/
├── scripts/                   # Automation scripts
│   ├── provisioning/          # Initial setup and provisioning
│   │   ├── provision-swa-with-managed-identities.ps1
│   │   ├── grant-service-principal-permissions.ps1
│   │   └── setup-managed-identity.ps1 (legacy)
│   ├── deployment/            # Deployment scripts
│   │   ├── deploy.ps1
│   │   └── deploy.sh
│   └── maintenance/           # Maintenance and utilities
│       ├── verify-identity-assignments.ps1
│       ├── verify-setup.ps1
│       └── cleanup-old-resources.ps1
│
├── docs/                      # Documentation
│   ├── SETUP-GUIDE.md         # Complete setup instructions
│   ├── KEY-VAULT-INTEGRATION.md
│   ├── QUICK-REFERENCE.md
│   └── managed-identity-README.md
│
├── arm-templates/             # Infrastructure as Code
│   └── arm-template.json
│
└── parameters/                # Environment parameters
    ├── parameters.dev.json
    ├── parameters.test.json
    ├── parameters.prod.json
    └── parameters.template.json
```

## 🚀 Quick Start

### First Time Setup

**1. Provision all environments:**

```powershell
.\scripts\provisioning\provision-swa-with-managed-identities.ps1
```

**2. Grant Service Principal permissions (Free tier):**

```powershell
.\scripts\provisioning\grant-service-principal-permissions.ps1
```

**3. Verify setup:**

```powershell
.\scripts\maintenance\verify-setup.ps1
```

### Deployment

```powershell
# PowerShell
.\scripts\deployment\deploy.ps1 -Environment test

# Bash
./scripts/deployment/deploy.sh test
```

## 🏗️ Architecture

### Environments

| Environment | SKU      | Branch | Static Web App        | Identity Type     |
| ----------- | -------- | ------ | --------------------- | ----------------- |
| **Test**    | Free     | test   | az-fluxline-next-test | Service Principal |
| **Prod**    | Standard | master | az-fluxline-next-prod | User-Assigned MI  |

> **Note:** Free tier Static Web Apps don't support managed identities, so the TEST environment uses a Service Principal.

### Service Principals

- `github-fluxline-pro-next-test` → Test environment
- `github-fluxline-pro-next-prod` → Prod environment

### Shared Resources

- **Storage Account**: `azfluxlinewebstorage`
- **Key Vault**: `kv-az-fluxline-next`
- **Resource Group**: `az-fluxline-rg`

### Key Vault Secrets

API tokens stored centrally:

- `swa-api-token-test`
- `swa-api-token-prod`

## 📚 Documentation

- **[Setup Guide](docs/SETUP-GUIDE.md)** - Complete setup instructions
- **[Key Vault Integration](docs/KEY-VAULT-INTEGRATION.md)** - Secret management details
- **[Quick Reference](docs/QUICK-REFERENCE.md)** - Common commands

## 🔐 Security

### GitHub Secrets Required (Only 5!)

```
AZURE_TENANT_ID
AZURE_SUBSCRIPTION_ID
AZURE_CLIENT_ID_TEST
AZURE_CLIENT_ID_PROD
```

All API tokens are retrieved from Key Vault at runtime!

### Authentication Flow

1. **GitHub Actions** authenticates as Service Principal using federated credentials (OIDC)
2. **Service Principal** retrieves API token from Key Vault
3. **Workflow** deploys to Static Web App using the token

No secrets stored in GitHub beyond the 5 Client IDs!

## 🔧 Maintenance Scripts

### Verify Identity Assignments

```powershell
.\scripts\maintenance\verify-identity-assignments.ps1
```

### Verify Complete Setup

```powershell
.\scripts\maintenance\verify-setup.ps1
```

### Cleanup Old Resources

```powershell
.\scripts\maintenance\cleanup-old-resources.ps1
```

## 🌐 URLs

After deployment:

- **Test**: `https://az-fluxline-next-test.azurestaticapps.net`
- **Prod**: `https://az-fluxline-next-prod.azurestaticapps.net`

## 🆘 Troubleshooting

1. Check the [Setup Guide](docs/SETUP-GUIDE.md)
2. Review [Quick Reference](docs/QUICK-REFERENCE.md)
3. Verify Azure Portal resource status
4. Check GitHub Actions workflow logs

## 💡 Key Features

✅ **Federated Credentials** - No secrets in GitHub  
✅ **Key Vault Integration** - Centralized secret management  
✅ **Service Principal Auth** - Works on Free tier  
✅ **Automated Provisioning** - One script sets up everything  
✅ **Environment Separation** - Dev/Test/Prod isolation

---

**Last Updated:** November 3, 2025  
**Maintained By:** Fluxline Pro Team
