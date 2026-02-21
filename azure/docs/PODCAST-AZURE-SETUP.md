# Podcast Infrastructure - Azure Configuration Guide

This guide walks you through configuring Azure Storage and Static Web Apps for the podcast functionality.

## Overview

Your podcast infrastructure uses:

- **Azure Blob Storage** - Audio files (.mp3)
- **Azure Table Storage** - Episode metadata
- **Azure Static Web Apps** - Three environments (dev, test, prod)

---

## Storage Account Configuration

**Storage Account Name:** `azfluxlinewebstorage`

### Blob Containers

**Production:**

- Container: `podcasts`
- URL: `https://azfluxlinewebstorage.blob.core.windows.net/podcasts/`

**Dev/Test:**

- Container: `podcasts-dev`
- URL: `https://azfluxlinewebstorage.blob.core.windows.net/podcasts-dev/`

### Table Storage

**Production:**

- Table: `podcasts`
- Base URL: `https://azfluxlinewebstorage.table.core.windows.net`

**Dev/Test:**

- Table: `podcastsdev`
- Base URL: `https://azfluxlinewebstorage.table.core.windows.net`

---

## Step 1: Make Blob Containers Public (Read-Only)

Your audio files need to be publicly accessible so the HTML5 audio player can stream them.

### Option A: Azure Portal (Recommended)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to Storage Account: **azfluxlinewebstorage**
3. Click **Containers** (under Data storage)
4. For each container (`podcasts` and `podcasts-dev`):
   - Click on the container name
   - Click **Change access level** (top toolbar)
   - Select **Blob (anonymous read access for blobs only)**
   - Click **OK**

**What this does:**

- ✅ Audio files are publicly accessible via direct URL
- ✅ No authentication required for playback
- ❌ Container listing is NOT public (can't browse all files)
- ❌ Cannot write or delete (read-only)

### Option B: Azure CLI

```bash
# Set blob container to public read access
az storage container set-permission \
  --name podcasts \
  --account-name azfluxlinewebstorage \
  --public-access blob

az storage container set-permission \
  --name podcasts-dev \
  --account-name azfluxlinewebstorage \
  --public-access blob
```

### Verify Public Access

Test that a blob is publicly accessible:

```bash
# Upload a test file (if you haven't already)
az storage blob upload \
  --account-name azfluxlinewebstorage \
  --container-name podcasts-dev \
  --name test.mp3 \
  --file /path/to/test.mp3 \
  --auth-mode login

# Try accessing without authentication (should work)
curl -I https://azfluxlinewebstorage.blob.core.windows.net/podcasts-dev/test.mp3
```

You should get a `200 OK` response without any authentication.

---

## Step 2: Configure Static Web App Environment Variables

You need to add configuration to each of your three Static Web Apps.

### Environment Variables to Add

| Variable                   | Value                                                 | Notes                     |
| -------------------------- | ----------------------------------------------------- | ------------------------- |
| `AZURE_TABLE_STORAGE_URL`  | `https://azfluxlinewebstorage.table.core.windows.net` | Same for all environments |
| `AZURE_TABLE_SAS_TOKEN`    | `<your-sas-token>`                                    | Different per environment |
| `AZURE_PODCAST_TABLE_DEV`  | `podcastsdev`                                         | Same for all environments |
| `AZURE_PODCAST_TABLE_PROD` | `podcasts`                                            | Same for all environments |
| `NEXT_PUBLIC_ENVIRONMENT`  | `dev`, `test`, or `prod`                              | Different per environment |
| `YOUTUBE_API_KEY`          | `<your-youtube-api-key>`                              | Same for all environments |

---

## Step 3: Configure DEV Environment

**Static Web App:** `az-fluxline-next-dev`

### Option A: Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to: **Resource Groups** → **az-fluxline-rg** → **az-fluxline-next-dev**
3. Click **Configuration** (left sidebar under Settings)
4. Click **+ Add** for each variable:

**Application Settings to Add:**

| Name                       | Value                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AZURE_TABLE_STORAGE_URL`  | `https://azfluxlinewebstorage.table.core.windows.net`                                                    |
| `AZURE_TABLE_SAS_TOKEN`    | `sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN` |
| `AZURE_PODCAST_TABLE_DEV`  | `podcastsdev`                                                                                            |
| `AZURE_PODCAST_TABLE_PROD` | `podcasts`                                                                                               |
| `NEXT_PUBLIC_ENVIRONMENT`  | `dev`                                                                                                    |
| `YOUTUBE_API_KEY`          | `<your-youtube-api-key>`                                                                                 |

5. Click **Save** at the top

### Option B: Azure CLI

```bash
az staticwebapp appsettings set \
  --name az-fluxline-next-dev \
  --resource-group az-fluxline-rg \
  --setting-names \
    AZURE_TABLE_STORAGE_URL="https://azfluxlinewebstorage.table.core.windows.net" \
    AZURE_TABLE_SAS_TOKEN="sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN" \
    AZURE_PODCAST_TABLE_DEV="podcastsdev" \
    AZURE_PODCAST_TABLE_PROD="podcasts" \
    NEXT_PUBLIC_ENVIRONMENT="dev" \
    YOUTUBE_API_KEY="<your-youtube-api-key>"
```

---

## Step 4: Configure TEST Environment

**Static Web App:** `az-fluxline-next-test`

### Portal Configuration

Same as DEV, but use these values:

| Name                       | Value                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AZURE_TABLE_STORAGE_URL`  | `https://azfluxlinewebstorage.table.core.windows.net`                                                    |
| `AZURE_TABLE_SAS_TOKEN`    | `sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN` |
| `AZURE_PODCAST_TABLE_DEV`  | `podcastsdev`                                                                                            |
| `AZURE_PODCAST_TABLE_PROD` | `podcasts`                                                                                               |
| `NEXT_PUBLIC_ENVIRONMENT`  | `test`                                                                                                   |
| `YOUTUBE_API_KEY`          | `<your-youtube-api-key>`                                                                                 |

### Azure CLI

```bash
az staticwebapp appsettings set \
  --name az-fluxline-next-test \
  --resource-group az-fluxline-rg \
  --setting-names \
    AZURE_TABLE_STORAGE_URL="https://azfluxlinewebstorage.table.core.windows.net" \
    AZURE_TABLE_SAS_TOKEN="sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN" \
    AZURE_PODCAST_TABLE_DEV="podcastsdev" \
    AZURE_PODCAST_TABLE_PROD="podcasts" \
    NEXT_PUBLIC_ENVIRONMENT="test" \
    YOUTUBE_API_KEY="<your-youtube-api-key>"
```

**Note:** TEST uses the same `podcastsdev` table as DEV for episode data.

---

## Step 5: Configure PROD Environment

**Static Web App:** `az-fluxline-next-prod`

### Portal Configuration

Use these values:

| Name                       | Value                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AZURE_TABLE_STORAGE_URL`  | `https://azfluxlinewebstorage.table.core.windows.net`                                                    |
| `AZURE_TABLE_SAS_TOKEN`    | `sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN` |
| `AZURE_PODCAST_TABLE_DEV`  | `podcastsdev`                                                                                            |
| `AZURE_PODCAST_TABLE_PROD` | `podcasts`                                                                                               |
| `NEXT_PUBLIC_ENVIRONMENT`  | `prod`                                                                                                   |
| `YOUTUBE_API_KEY`          | `<your-youtube-api-key>`                                                                                 |

### Azure CLI

```bash
az staticwebapp appsettings set \
  --name az-fluxline-next-prod \
  --resource-group az-fluxline-rg \
  --setting-names \
    AZURE_TABLE_STORAGE_URL="https://azfluxlinewebstorage.table.core.windows.net" \
    AZURE_TABLE_SAS_TOKEN="sv=2020-08-04&ss=t&srt=sco&sp=rl&se=2027-01-01T00:00:00Z&sig=EXAMPLE_SIGNATURE_REPLACE_WITH_REAL_TOKEN" \
    AZURE_PODCAST_TABLE_DEV="podcastsdev" \
    AZURE_PODCAST_TABLE_PROD="podcasts" \
    NEXT_PUBLIC_ENVIRONMENT="prod" \
    YOUTUBE_API_KEY="<your-youtube-api-key>"
```

---

## Step 6: Understanding SAS Token Expiration

⚠️ **Important:** Your current SAS tokens expire on **February 22, 2026** (24 hours from creation).

### Expiration Details

**DEV Table SAS:**

- Expires: `2026-02-22T19:16:12Z`

**PROD Table SAS:**

- Expires: `2026-02-22T19:14:53Z`

### Generating Long-Lived SAS Tokens

For production use, generate SAS tokens that last longer:

#### Option A: Azure Portal

1. Go to **Storage Account** → **azfluxlinewebstorage**
2. Click **Shared access signature** (left sidebar under Security + networking)
3. Configure:
   - **Allowed services:** ✅ Table
   - **Allowed resource types:** ✅ Object
   - **Allowed permissions:** ✅ Read, ✅ List
   - **Start date/time:** Today
   - **End date/time:** 1-2 years from now
   - **Allowed protocols:** HTTPS only
4. Click **Generate SAS and connection string**
5. Copy the **SAS token** (the part after `?`)

**For table-specific SAS:**

1. Go to **Storage Account** → **Tables** → Select table (`podcasts` or `podcastsdev`)
2. Click **Shared access signature** (top toolbar)
3. Configure:
   - **Permissions:** Read ✅, Query ✅
   - **Start/Expiry:** Set appropriate dates
4. Click **Generate SAS token and URL**
5. Copy the **Query string** (without the leading `?`)

#### Option B: Azure CLI

```bash
# Generate SAS token for 1 year
az storage table generate-sas \
  --account-name azfluxlinewebstorage \
  --name podcasts \
  --permissions r \
  --expiry $(date -u -d "+1 year" '+%Y-%m-%dT%H:%MZ') \
  --https-only \
  --output tsv

az storage table generate-sas \
  --account-name azfluxlinewebstorage \
  --name podcastsdev \
  --permissions r \
  --expiry $(date -u -d "+1 year" '+%Y-%m-%dT%H:%MZ') \
  --https-only \
  --output tsv
```

### Updating Expired Tokens

When your tokens expire, you'll need to:

1. Generate new SAS tokens (as above)
2. Update the `AZURE_TABLE_SAS_TOKEN` variable in all three Static Web Apps
3. No code changes or redeployment needed - just update the app settings

---

## Step 7: Verify Configuration

### Check Static Web App Settings

```bash
# View DEV settings
az staticwebapp appsettings list \
  --name az-fluxline-next-dev \
  --resource-group az-fluxline-rg

# View TEST settings
az staticwebapp appsettings list \
  --name az-fluxline-next-test \
  --resource-group az-fluxline-rg

# View PROD settings
az staticwebapp appsettings list \
  --name az-fluxline-next-prod \
  --resource-group az-fluxline-rg
```

### Test Podcast API Endpoints

After deploying your code, test each environment:

**DEV:**

```bash
curl https://az-fluxline-next-dev.azurestaticapps.net/api/podcasts/episodes
curl https://az-fluxline-next-dev.azurestaticapps.net/api/podcasts/rss
```

**TEST:**

```bash
curl https://az-fluxline-next-test.azurestaticapps.net/api/podcasts/episodes
curl https://az-fluxline-next-test.azurestaticapps.net/api/podcasts/rss
```

**PROD:**

```bash
curl https://az-fluxline-next-prod.azurestaticapps.net/api/podcasts/episodes
curl https://az-fluxline-next-prod.azurestaticapps.net/api/podcasts/rss
```

### Test Frontend

Visit the podcast pages:

- DEV: `https://az-fluxline-next-dev.azurestaticapps.net/podcasts`
- TEST: `https://az-fluxline-next-test.azurestaticapps.net/podcasts`
- PROD: `https://az-fluxline-next-prod.azurestaticapps.net/podcasts`

---

## Step 8: Upload Your First Episode (Optional Test)

### Upload to DEV for Testing

1. **Upload audio file:**

```bash
az storage blob upload \
  --account-name azfluxlinewebstorage \
  --container-name podcasts-dev \
  --name test-episode-1.mp3 \
  --file /path/to/your/audio.mp3 \
  --auth-mode login
```

2. **Get the blob URL:**

```bash
az storage blob url \
  --account-name azfluxlinewebstorage \
  --container-name podcasts-dev \
  --name test-episode-1.mp3
```

Result: `https://azfluxlinewebstorage.blob.core.windows.net/podcasts-dev/test-episode-1.mp3`

3. **Add episode to Table Storage:**

Via Azure Portal:

- Go to **Storage Account** → **Tables** → **podcastsdev**
- Click **+ Add entity**
- Fill in:
  ```
  PartitionKey: podcast
  RowKey: test-001
  episode_title: Test Episode 1
  description: This is a test episode
  audio_url: https://azfluxlinewebstorage.blob.core.windows.net/podcasts-dev/test-episode-1.mp3
  publish_date: 2026-02-21T00:00:00Z
  duration: 5:30
  episode_number: 1
  ```

4. **Verify it appears on DEV site:**
   - Visit: `https://az-fluxline-next-dev.azurestaticapps.net/podcasts`
   - Your test episode should appear
   - Click to play and test audio

---

## Environment Summary

| Environment | Static Web App        | Table       | Blob Container | Purpose         |
| ----------- | --------------------- | ----------- | -------------- | --------------- |
| DEV         | az-fluxline-next-dev  | podcastsdev | podcasts-dev/  | Development     |
| TEST        | az-fluxline-next-test | podcastsdev | podcasts-dev/  | Testing/Staging |
| PROD        | az-fluxline-next-prod | podcasts    | podcasts/      | Production      |

**Note:** DEV and TEST share the same table and blob container. Only PROD has separate storage.

---

## Security Considerations

### SAS Token Security

✅ **Good practices:**

- Tokens are read-only (`sp=r`)
- HTTPS only (`spr=https`)
- Scoped to specific tables
- Time-limited (should be 6-12 months)

⚠️ **Important:**

- SAS tokens grant access to anyone who has them
- Don't commit tokens to Git (use environment variables)
- Rotate tokens periodically
- Monitor for unauthorized access

### Blob Container Security

Your blob containers are set to **public blob access**:

- ✅ Individual audio files are accessible via direct URL
- ✅ Cannot list all files in container
- ✅ Cannot write/modify/delete files
- ✅ Required for HTML5 audio player to work

---

## Cost Optimization

### Current Setup (No CDN)

**Storage Costs:**

- Blob Storage: ~$0.018/GB/month
- Table Storage: ~$0.10/100k transactions
- Bandwidth: First 100 GB/month free, then ~$0.087/GB

**Example monthly cost for 100 episodes:**

- Audio files: 10 GB × $0.018 = **$0.18**
- Table storage: Minimal (< $1)
- Bandwidth: Free (under 100 GB)
- **Total: ~$1-2/month**

### Future CDN Options

When you're ready to add CDN:

- **Azure Front Door** - $35/month base + $0.01/GB
- **Cloudflare** - Free tier with 100 GB/month bandwidth
- **Fastly** - Pay-as-you-go, similar to Front Door

**Recommendation:** Start without CDN, add later if bandwidth costs increase.

---

## Troubleshooting

### Episodes don't appear on website

1. **Check SAS token expiration:**
   - Look at the `se=` parameter in your SAS token
   - Format: `YYYY-MM-DDTHH:MM:SSZ`
   - Regenerate if expired

2. **Verify Static Web App settings:**
   - Check all 6 environment variables are set
   - Ensure `NEXT_PUBLIC_ENVIRONMENT` matches your environment

3. **Check table name matches:**
   - DEV/TEST should use `podcastsdev`
   - PROD should use `podcasts`

### Audio won't play

1. **Verify blob is publicly accessible:**

   ```bash
   curl -I https://azfluxlinewebstorage.blob.core.windows.net/podcasts/your-file.mp3
   ```

   Should return `200 OK` without authentication

2. **Check container access level:**
   - Should be "Blob" not "Private"

3. **Test CORS (if needed):**
   - Usually not needed for public blobs
   - But check if browser console shows CORS errors

### API returns "Failed to fetch"

1. **Check Azure Function logs:**
   - Go to Static Web App → Functions
   - Check recent invocations and errors

2. **Verify Table Storage connectivity:**
   ```bash
   # Test SAS token manually
   curl "https://azfluxlinewebstorage.table.core.windows.net/podcasts?sv=2019-02-02&..."
   ```

---

## Next Steps

1. ✅ Set blob containers to public read access
2. ✅ Configure all three Static Web Apps with environment variables
3. ✅ Generate long-lived SAS tokens (1-2 years)
4. ✅ Upload a test episode to DEV
5. ✅ Verify it appears and plays correctly
6. ✅ Add real episodes to PROD

See [HOW_TO_ADD_PODCAST_EPISODE.md](../../api/HOW_TO_ADD_PODCAST_EPISODE.md) for detailed episode upload instructions.

---

**Questions?** Check the main documentation or Azure portal for more details.

_Last updated: February 21, 2026_
