# Production Static Web App Setup - Complete Guide

## 📖 Overview

This directory contains comprehensive documentation and scripts for setting up a new Azure Static Web Apps (Standard Tier) production environment for Fluxline 2.0.

## 🎯 Purpose

Replace the existing production Static Web App with a new Standard Tier instance properly configured to avoid 403 Forbidden errors when using custom 404 pages and custom domain routing.

## 📚 Documentation Index

### Quick Start

1. [PROD-STANDARD-TIER-SETUP.md](./PROD-STANDARD-TIER-SETUP.md) - **Start here** - Complete setup guide
2. [../scripts/provisioning/setup-prod-standard-swa.ps1](../scripts/provisioning/setup-prod-standard-swa.ps1) - Automated setup script

### Troubleshooting

3. [TROUBLESHOOT-403-FORBIDDEN.md](./TROUBLESHOOT-403-FORBIDDEN.md) - Comprehensive 403 error troubleshooting
4. [ENTRA-ID-FEDERATED-CREDENTIAL-SETUP.md](./ENTRA-ID-FEDERATED-CREDENTIAL-SETUP.md) - GitHub Actions authentication setup

### Configuration

5. [../configs/staticwebapp.config.standard-tier.json](../configs/staticwebapp.config.standard-tier.json) - Optimized configuration for Standard tier
6. [../../.github/workflows/azure-static-web-apps-prod-v2.yml](../../.github/workflows/azure-static-web-apps-prod-v2.yml) - New GitHub Actions workflow

## 🚀 Quick Start Guide

### Prerequisites

Before starting, ensure you have:

- [ ] Azure CLI installed and authenticated
- [ ] PowerShell 7+ or Windows PowerShell 5.1
- [ ] Access to Azure subscription: `3912d915-b497-49b5-8c04-f9de63a523c1`
- [ ] Admin access to GitHub repository: `Fluxline-Pro/fluxline-pro-next`
- [ ] Admin access to domain registrar for DNS changes

### Option 1: Automated Setup (Recommended)

```powershell
# Navigate to scripts directory
cd azure\scripts\provisioning

# Run setup script
.\setup-prod-standard-swa.ps1

# Follow the prompts
```

### Option 2: Manual Setup

Follow the step-by-step guide in [PROD-STANDARD-TIER-SETUP.md](./PROD-STANDARD-TIER-SETUP.md)

## 🔑 Key Information

### Azure Resources

| Resource              | Value                                  |
| --------------------- | -------------------------------------- |
| **Subscription ID**   | `3912d915-b497-49b5-8c04-f9de63a523c1` |
| **Subscription Name** | Azure Business                         |
| **Tenant ID**         | `9ebc2060-7a03-47c4-8df4-54d40955cc06` |
| **Resource Group**    | `az-fluxline-rg`                       |
| **Location**          | West US 2                              |
| **New SWA Name**      | `swa-fluxline-pro-prod-v2`             |
| **SKU**               | Standard                               |

### Key Vault

| Resource              | Value                   |
| --------------------- | ----------------------- |
| **Key Vault Name**    | `kv-az-fluxline-next`   |
| **Secret Name (New)** | `swa-api-token-prod-v2` |
| **Secret Name (Old)** | `swa-api-token-prod`    |

### Managed Identity

| Resource             | Value                                  |
| -------------------- | -------------------------------------- |
| **App Registration** | `github-fluxline-pro-next-dev`         |
| **Client ID**        | `bcea6cc6-3949-4065-8f69-e5879edfe7bf` |
| **Purpose**          | GitHub Actions authentication via OIDC |

### Custom Domains

| Domain             | Type             |
| ------------------ | ---------------- |
| `fluxline.pro`     | Apex/Root domain |
| `www.fluxline.pro` | Subdomain        |

## 🔧 Setup Steps Summary

1. **Create Static Web App**
   - Create Standard tier Static Web App
   - Configure for GitHub Actions deployment
   - Disable auto-deployment from Azure

2. **Configure Key Vault**
   - Store deployment token in Key Vault
   - Grant managed identity access to Key Vault

3. **Setup Entra ID**
   - Configure federated credential for GitHub Actions
   - Verify OIDC authentication works

4. **Configure Custom Domains**
   - Add custom domains to Static Web App
   - Update DNS records
   - Wait for SSL certificate provisioning

5. **Update GitHub**
   - Verify GitHub secrets are configured
   - Deploy new workflow file
   - Test deployment

6. **Verify & Test**
   - Test native Azure URL
   - Test custom domains
   - Verify custom 404 page
   - Test API function (contact form)

## 🎯 Success Criteria

Your production environment is properly configured when:

- [x] Static Web App created in Standard tier
- [x] Deployment token stored in Key Vault
- [x] Managed identity has Key Vault access
- [x] Federated credential configured in Entra ID
- [x] Custom domains bound and SSL active
- [x] GitHub Actions workflow deploys successfully
- [x] Custom 404 page displays correctly
- [x] No 403 Forbidden errors
- [x] Contact form API works
- [x] All routes accessible

## 🚨 Common Issues & Solutions

### Issue 1: 403 Forbidden on Custom Domains

**Symptom**: Native Azure URL works, but custom domains return 403.

**Solution**: See [TROUBLESHOOT-403-FORBIDDEN.md](./TROUBLESHOOT-403-FORBIDDEN.md) - Scenario 3

### Issue 2: SSL Certificate Stuck in Pending

**Symptom**: Custom domain shows "Pending" SSL status for >30 minutes.

**Solution**:

1. Verify DNS records are correct
2. Add TXT validation record if required
3. Wait up to 1 hour
4. If still pending, remove and re-add domain

### Issue 3: GitHub Actions Authentication Fails

**Symptom**: "Failed to get token" error in workflow.

**Solution**: See [ENTRA-ID-FEDERATED-CREDENTIAL-SETUP.md](./ENTRA-ID-FEDERATED-CREDENTIAL-SETUP.md) - Troubleshooting section

### Issue 4: Custom 404 Causes 403

**Symptom**: Adding `responseOverrides` triggers 403 errors.

**Solution**:

1. Ensure `404.html` exists in `out` folder
2. Verify custom domains are bound with active SSL
3. Wait 15-30 minutes for configuration propagation

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Repository                     │
│            Fluxline-Pro/fluxline-pro-next               │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Push to master
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 GitHub Actions Workflow                  │
│  - Build Next.js app (yarn build)                       │
│  - Authenticate with Azure (OIDC)                       │
│  - Get deployment token from Key Vault                  │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Deploy
                     ▼
┌─────────────────────────────────────────────────────────┐
│          Azure Static Web Apps (Standard)               │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Static Content (Next.js SSG)                  │    │
│  │  - HTML, CSS, JS from /out folder             │    │
│  │  - Custom 404.html page                       │    │
│  └────────────────────────────────────────────────┘    │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Azure Functions API                           │    │
│  │  - /api/contact (Node.js 20)                  │    │
│  └────────────────────────────────────────────────┘    │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Custom domains
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  Public Access                           │
│  - https://fluxline.pro                                 │
│  - https://www.fluxline.pro                             │
│  - https://[swa-name].azurestaticapps.net              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│            Supporting Azure Resources                    │
│                                                          │
│  Key Vault (kv-az-fluxline-next)                       │
│  └─ swa-api-token-prod-v2                              │
│                                                          │
│  Entra ID App Registration                              │
│  └─ github-fluxline-pro-next-dev                       │
│     └─ Federated Credential (OIDC)                     │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Security Features

### Authentication & Authorization

- ✅ **OIDC Authentication**: No secrets stored in GitHub
- ✅ **Managed Identity**: Automatic credential management
- ✅ **Key Vault Integration**: Secure token storage
- ✅ **Role-Based Access Control**: Least privilege principle

### Network Security

- ✅ **HTTPS Only**: All traffic encrypted
- ✅ **Custom SSL Certificates**: Auto-provisioned by Azure
- ✅ **Security Headers**: XSS protection, clickjacking prevention
- ✅ **IP Restrictions**: Configurable (currently open)

### Application Security

- ✅ **Content Security Policy**: Via global headers
- ✅ **CORS Configuration**: Controlled via routes
- ✅ **API Authentication**: Optional route-based auth

## 📈 Monitoring & Observability

### Recommended: Enable Application Insights

```powershell
# Create Application Insights instance
az monitor app-insights component create \
  --app "ai-fluxline-pro-prod" \
  --location "westus2" \
  --resource-group "az-fluxline-rg" \
  --application-type web

# Link to Static Web App
az staticwebapp appsettings set \
  --name "swa-fluxline-pro-prod-v2" \
  --resource-group "az-fluxline-rg" \
  --setting-names APPINSIGHTS_INSTRUMENTATIONKEY=<key>
```

### Key Metrics to Monitor

- HTTP response codes (especially 403, 404, 500)
- Page load times
- API function execution duration
- SSL certificate expiration dates
- Deployment success/failure rates

## 🔄 Maintenance

### Regular Tasks

**Monthly**:

- [ ] Review Application Insights metrics
- [ ] Check SSL certificate status
- [ ] Review Azure Activity Logs
- [ ] Audit role assignments

**Quarterly**:

- [ ] Review and update dependencies (yarn upgrade)
- [ ] Test disaster recovery procedures
- [ ] Review and optimize caching strategies

**Annually**:

- [ ] Review and renew custom domain registrations
- [ ] Audit security configurations
- [ ] Update documentation

### Disaster Recovery

**Rollback Procedure** (if issues occur):

1. Update GitHub Actions workflow to use old Static Web App
2. Update DNS to point to old instance
3. Verify old instance is operational
4. Investigate and fix new instance issues
5. Re-test before switching back

**Backup Strategy**:

- Git repository contains all source code
- Azure maintains deployment history
- Key Vault secrets are versioned
- DNS records should be documented

## 📞 Support

### Internal Team

- **DevOps**: Review GitHub Actions workflows
- **Frontend**: Review Next.js build process
- **Infrastructure**: Review Azure configuration

### External Support

- **Azure Support**: For platform-specific issues
- **GitHub Support**: For Actions-related issues
- **Domain Registrar**: For DNS and domain issues

### Useful Commands

```powershell
# Quick health check
curl -I https://fluxline.pro

# Check deployment status
az staticwebapp show --name swa-fluxline-pro-prod-v2 --resource-group az-fluxline-rg

# View recent activity
az monitor activity-log list --resource-group az-fluxline-rg --max-events 20

# Test Key Vault access
az keyvault secret show --vault-name kv-az-fluxline-next --name swa-api-token-prod-v2
```

## 🎓 Learning Resources

- [Azure Static Web Apps Documentation](https://learn.microsoft.com/en-us/azure/static-web-apps/)
- [Next.js Static Site Generation](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation)
- [GitHub Actions for Azure](https://learn.microsoft.com/en-us/azure/developer/github/github-actions)
- [Workload Identity Federation](https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation)

## 📝 Change Log

| Date       | Change                                     | Author |
| ---------- | ------------------------------------------ | ------ |
| 2025-12-16 | Initial production setup documentation     | System |
| 2025-12-16 | Added troubleshooting guide for 403 errors | System |
| 2025-12-16 | Created automated setup script             | System |

## 🤝 Contributing

When updating this documentation:

1. Update the relevant markdown files
2. Run setup scripts to verify functionality
3. Update the Change Log above
4. Commit with descriptive message

---

**For questions or issues, refer to the troubleshooting guides or contact the infrastructure team.**

**Last Updated**: December 16, 2025
