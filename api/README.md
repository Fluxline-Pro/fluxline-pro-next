# Azure Functions API for Fluxline Pro

This directory contains Azure Functions that power backend functionality for the Fluxline Pro website.

## Available APIs

### Contact Form (`/api/contact`)

- Sends contact form submissions via email using SMTP2Go
- Includes rate limiting (5 requests per IP per hour)
- See [Contact Setup](#contact-api-setup) below for configuration

### YouTube Integration (`/api/youtube`)

- Proxies YouTube Data API v3 to fetch videos from @aplusinflux channel
- Supports Videos, Live Streams, and Playlists tabs
- See [YouTube Setup](#youtube-api-setup) below for configuration

### Podcast Episodes (`/api/podcasts/episodes`)

- Fetches podcast episode metadata from Azure Table Storage
- Returns JSON array of episodes sorted by publish date
- See [Podcast Setup](#podcast-api-setup) below for configuration

### Podcast RSS Feed (`/api/podcasts/rss`)

- Generates valid RSS 2.0 feed with iTunes extensions
- Compatible with Apple Podcasts, Spotify, and Spreaker
- Auto-updates when episodes are added to Table Storage
- See [Podcast Setup](#podcast-api-setup) below for configuration

### Ping Warmup (timer-triggered function, no public HTTP endpoint)

- Timer-triggered CRON job that runs every 15 minutes
- Keeps the Azure Functions host warm on the **PROD** environment only
- On DEV and TEST environments the function exits immediately without doing any work
- Requires the `ENVIRONMENT` application setting to be set to `prod` in the Azure Static Web App

---

## Contact API Setup

---

## Contact API Setup

### Local Development

1. Copy `local.settings.sample.json` to `local.settings.json`
2. Fill in your SMTP credentials from SMTP2Go:
   - `SMTP_USER`: Your SMTP2Go username
   - `SMTP_PASS`: Your SMTP2Go password

### Azure Deployment

For production deployment, configure these application settings in your Azure Static Web App:

| Setting         | Description                           | Default Value         |
| --------------- | ------------------------------------- | --------------------- |
| `SMTP_HOST`     | SMTP server hostname                  | mail.smtp2go.com      |
| `SMTP_PORT`     | SMTP server port                      | 2525                  |
| `SMTP_USER`     | SMTP2Go username                      | (Required)            |
| `SMTP_PASS`     | SMTP2Go password                      | (Required)            |
| `SMTP_FROM`     | Email address to send from            | no-reply@fluxline.pro |
| `CONTACT_EMAIL` | Email address to receive contact form | support@fluxline.pro  |

---

## YouTube API Setup

### Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable **YouTube Data API v3**:
   - Navigate to **APIs & Services** → **Library**
   - Search for "YouTube Data API v3"
   - Click **Enable**
4. Create credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **Create Credentials** → **API Key**
5. Restrict the key (recommended):
   - Click on your new API key
   - Under **API restrictions**, select **Restrict key**
   - Choose **YouTube Data API v3** from the dropdown
   - Click **Save**

### Azure Deployment

Add the API key to your Azure Static Web App:

| Setting           | Description                           | Required |
| ----------------- | ------------------------------------- | -------- |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key (server-side) | Yes      |

**Important**: Do NOT prefix with `NEXT_PUBLIC_` - this key must remain server-side only.

### How It Works

1. Frontend calls `/api/youtube?type=videos` (or `live`, `playlists`)
2. Azure Function fetches channel ID for @aplusinflux handle
3. Queries YouTube API for channel content
4. Returns sanitized JSON to frontend
5. Caches results for 1 hour to reduce API calls

---

## Podcast API Setup

### Azure Storage Configuration

Podcasts use two Azure Storage services:

1. **Azure Table Storage** - Episode metadata
2. **Azure Blob Storage** - Audio files (.mp3)

### Azure Deployment

Configure these application settings:

| Setting                    | Description                               | Example                                  |
| -------------------------- | ----------------------------------------- | ---------------------------------------- |
| `AZURE_TABLE_STORAGE_URL`  | Base URL for Table Storage REST API       | https://yourstore.table.core.windows.net |
| `AZURE_TABLE_SAS_TOKEN`    | SAS token for Table Storage (read access) | sv=2020-08-04&ss=t&srt=sco&sp=rl&...     |
| `AZURE_PODCAST_TABLE_DEV`  | Table name for dev/test environment       | podcastsdev                              |
| `AZURE_PODCAST_TABLE_PROD` | Table name for production environment     | podcasts                                 |
| `NEXT_PUBLIC_ENVIRONMENT`  | Environment identifier (dev/test/prod)    | prod                                     |

### Episode Metadata Schema

Each episode in Table Storage should have these fields:

| Field              | Type   | Required | Description                                |
| ------------------ | ------ | -------- | ------------------------------------------ |
| `PartitionKey`     | string | Yes      | Always set to "podcast"                    |
| `RowKey`           | string | Yes      | Unique episode ID (URL-safe)               |
| `episode_title`    | string | Yes      | Episode title                              |
| `description`      | string | Yes      | Full episode description                   |
| `audio_url`        | string | Yes      | Public URL to audio file in Blob Storage   |
| `publish_date`     | string | Yes      | ISO 8601 date (e.g., 2026-02-21T00:00:00Z) |
| `duration`         | string | No       | MM:SS or ISO 8601 duration                 |
| `episode_number`   | number | No       | Episode number                             |
| `audio_size_bytes` | number | No       | File size in bytes (for RSS enclosure)     |
| `podcast_name`     | string | No       | Podcast show name                          |
| `author_name`      | string | No       | Host/author name                           |
| `tags`             | string | No       | Comma-separated tags                       |
| `imageUrl`         | string | No       | Episode artwork URL                        |
| `slug`             | string | No       | URL slug (defaults to RowKey)              |

### How It Works

**Episode Display (`/api/podcasts/episodes`)**:

1. Determines environment (dev/test vs prod)
2. Queries appropriate Table Storage table
3. Returns all episodes sorted by publish_date (newest first)
4. Frontend displays with HTML5 audio player

**RSS Feed (`/api/podcasts/rss`)**:

1. Fetches all episodes from Table Storage
2. Generates valid RSS 2.0 XML with iTunes extensions
3. Includes audio enclosures with proper MIME types
4. Compatible with Apple Podcasts, Spotify, Spreaker, etc.

### Adding Episodes

See [HOW_TO_ADD_PODCAST_EPISODE.md](HOW_TO_ADD_PODCAST_EPISODE.md) for detailed instructions on:

- Preparing audio files
- Uploading to Azure Blob Storage
- Adding metadata to Azure Table Storage
- Verifying episodes appear on site and in RSS feed

### Environment Separation

- **Dev/Test**: Use `podcastsdev` table and separate blob container
- **Production**: Use `podcasts` table and separate blob container
- Organize audio files by path (e.g., `podcasts-dev/` vs `podcasts/`)
- Store environment-specific URLs in respective tables

---

## API Endpoints

### POST /api/contact

Submit a contact form message.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```

**Response (Success):**

```json
{
  "message": "Message sent successfully"
}
```

**Response (Error):**

```json
{
  "message": "Error description"
}
```

**Rate Limiting:**

- 5 requests per IP per hour
- Returns 429 status code when exceeded

### GET /api/youtube

Fetch videos from YouTube channel.

**Query Parameters:**

- `type`: 'videos' | 'live' | 'playlists' (default: 'videos')
- `pageToken`: Pagination token (optional)

**Response:**

```json
{
  "videos": [
    {
      "id": "videoId",
      "title": "Video Title",
      "description": "Video description",
      "thumbnailUrl": "https://...",
      "publishedAt": "2026-02-21T00:00:00Z",
      "duration": "PT10M30S",
      "viewCount": "1234",
      "type": "video"
    }
  ],
  "nextPageToken": "token",
  "totalResults": 42
}
```

### GET /api/podcasts/episodes

Fetch all podcast episodes.

**Response:**

```json
{
  "episodes": [
    {
      "id": "episode-1",
      "slug": "episode-1",
      "podcast_name": "A+ In FLUX Mythmaker",
      "episode_title": "Introduction",
      "author_name": "Fluxline",
      "description": "Episode description",
      "publish_date": "2026-02-21T00:00:00Z",
      "duration": "32:45",
      "audio_url": "https://storage.../episode.mp3",
      "audio_size_bytes": 15728640,
      "episode_number": 1,
      "tags": ["business", "strategy"],
      "imageUrl": "https://..."
    }
  ]
}
```

### GET /api/podcasts/rss

Generate podcast RSS 2.0 feed.

**Response:** XML (RSS 2.0 with iTunes extensions)

**RSS Feed URL for Distribution:**

```
https://www.fluxline.pro/api/podcasts/rss
```

Use this URL to submit to:

- Apple Podcasts Connect
- Spotify for Podcasters
- Google Podcasts
- Spreaker
- Other podcast directories

---

## Local Development

### Prerequisites

- Node.js >= 20.0.0
- Azure Functions Core Tools (install via `winget install Microsoft.Azure.FunctionsCoreTools` on Windows)
- yarn package manager

### Setup

1. **Copy local settings template:**

   ```bash
   cp local.settings.sample.json local.settings.json
   ```

2. **Configure environment variables in `local.settings.json`:**

   ```json
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "",
       "FUNCTIONS_WORKER_RUNTIME": "node",

       "SMTP_HOST": "mail.smtp2go.com",
       "SMTP_PORT": "2525",
       "SMTP_USER": "your-smtp2go-username",
       "SMTP_PASS": "your-smtp2go-password",
       "SMTP_FROM": "no-reply@fluxline.pro",
       "CONTACT_EMAIL": "support@fluxline.pro",

       "YOUTUBE_API_KEY": "your-youtube-api-key",

       "AZURE_TABLE_STORAGE_URL": "https://yourstore.table.core.windows.net",
       "AZURE_TABLE_SAS_TOKEN": "sv=2020-08-04&ss=t&...",
       "AZURE_PODCAST_TABLE_DEV": "podcastsdev",
       "AZURE_PODCAST_TABLE_PROD": "podcasts",
       "NEXT_PUBLIC_ENVIRONMENT": "dev"
     }
   }
   ```

3. **Install dependencies:**

   ```bash
   cd api
   yarn install
   ```

4. **Start Azure Functions locally:**

   ```bash
   yarn start
   # or on Windows:
   ./start-functions.bat
   ```

   Functions will be available at:
   - Contact: `http://localhost:7071/api/contact`
   - YouTube: `http://localhost:7071/api/youtube`
   - Podcasts Episodes: `http://localhost:7071/api/podcasts/episodes`
   - Podcasts RSS: `http://localhost:7071/api/podcasts/rss`

### Testing Locally

**Test Contact API:**

```bash
curl -X POST http://localhost:7071/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Testing"}'
```

**Test YouTube API:**

```bash
curl http://localhost:7071/api/youtube?type=videos
```

**Test Podcasts API:**

```bash
curl http://localhost:7071/api/podcasts/episodes
curl http://localhost:7071/api/podcasts/rss
```

---

## Setting Environment Variables in Azure

### Via Azure Portal

1. Go to your Azure Static Web App in the Azure Portal
2. Navigate to **Configuration** → **Application settings**
3. Add each environment variable (see configuration tables above)
4. Click **Save**

### Via Azure CLI

```bash
az staticwebapp appsettings set \
  --name az-fluxline-next-prod \
  --resource-group az-fluxline-rg \
  --setting-names \
    SMTP_USER=your-username \
    SMTP_PASS=your-password \
    YOUTUBE_API_KEY=your-key \
    AZURE_TABLE_STORAGE_URL=https://... \
    AZURE_TABLE_SAS_TOKEN=sv=...
```

### Storing Secrets in Azure Key Vault (Recommended)

For sensitive values, use Azure Key Vault references:

```bash
# Instead of storing the actual value, reference Key Vault:
SMTP_PASS=@Microsoft.KeyVault(SecretUri=https://your-vault.vault.azure.net/secrets/smtp-pass/)
```

---

## Files

- `contact/index.js` - Contact form Azure Function handler
- `contact/function.json` - Contact function binding configuration
- `ping-warmup/index.js` - CRON keep-warm Azure Function handler (PROD only)
- `ping-warmup/function.json` - Ping warmup timer trigger binding configuration
- `host.json` - Azure Functions host configuration
- `package.json` - Dependencies (nodemailer)
- `local.settings.sample.json` - Template for local development settings
