# How to Add a Podcast Episode

This guide shows you how to add a new podcast episode to the "The Authentic Growth Mythmaker Series" podcast on the Fluxline Pro website.

## Quick Overview

Unlike the blog and portfolio which use Markdown files, podcast episodes are stored in **Azure Cloud Storage**:

1. **Audio files** → Azure Blob Storage
2. **Episode metadata** → Azure Table Storage
3. **Display** → Automatically fetched by the website
4. **RSS feed** → Auto-generated for Apple Podcasts, Spotify, etc.

---

## Prerequisites

You'll need:

- Azure Portal access or Azure CLI installed
- Your podcast audio file (.mp3 format recommended)
- Episode details (title, description, duration, etc.)

---

## Step-by-Step Guide

### Step 1: Prepare Your Audio File

**Format Requirements:**

- **File format**: MP3 (recommended), M4A, or WAV
- **Bitrate**: 128-192 kbps (good quality, reasonable file size)
- **Sample rate**: 44.1 kHz or 48 kHz
- **Channels**: Mono or Stereo
- **File size**: Under 100 MB recommended

**Naming Convention:**

- Use lowercase with hyphens: `episode-1-intro.mp3`
- Avoid spaces and special characters
- Keep names short and descriptive

**Example Tools for Audio Editing:**

- **Audacity** (free, cross-platform)
- **Adobe Audition** (professional)
- **GarageBand** (Mac)
- **Descript** (podcast-focused)

---

### Step 2: Upload Audio to Azure Blob Storage

You have three options for uploading:

#### Option A: Azure Portal (Easiest for beginners)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to your Storage Account
3. Click **Containers** → Select your podcast container (e.g., `podcasts` or `podcasts-dev`)
4. Click **Upload**
5. Select your audio file
6. Click **Upload**
7. Once uploaded, click on the file and **copy the URL**

**Example URL:**

```
https://azfluxlinewebstorage.blob.core.windows.net/podcasts/episode-1-intro.mp3
```

#### Option B: Azure Storage Explorer (Recommended)

1. Download [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)
2. Sign in with your Azure account
3. Navigate to your Storage Account → Blob Containers → `podcasts`
4. Click **Upload** → **Upload Files**
5. Select your audio file
6. After upload, right-click the file → **Copy URL**

#### Option C: Azure CLI (For developers)

```bash
# Upload audio file
az storage blob upload \
  --account-name azfluxlinewebstorage \
  --container-name podcasts \
  --name episode-1-intro.mp3 \
  --file /path/to/your/episode-1-intro.mp3 \
  --auth-mode login

# Get the blob URL
az storage blob url \
  --account-name azfluxlinewebstorage \
  --container-name podcasts \
  --name episode-1-intro.mp3
```

---

### Step 3: Get Episode Metadata

Before adding to Table Storage, gather this information:

| Field                | Description                             | Example                                    |
| -------------------- | --------------------------------------- | ------------------------------------------ |
| **RowKey**           | Unique episode ID (URL-safe)            | `episode-001`                              |
| **episode_title**    | Episode title                           | `Introduction to Mythmaking`               |
| **description**      | Full episode description                | `In this inaugural episode, we explore...` |
| **audio_url**        | URL from Step 2                         | `https://storage.../episode-1.mp3`         |
| **duration**         | Episode length                          | `32:45` (MM:SS) or `PT32M45S` (ISO 8601)   |
| **publish_date**     | Publication date                        | `2026-02-21T00:00:00Z` (ISO 8601)          |
| **episode_number**   | Episode number                          | `1`                                        |
| **audio_size_bytes** | File size in bytes                      | `15728640` (get from file properties)      |
| **podcast_name**     | Show name (optional)                    | `The Authentic Growth Mythmaker Series`    |
| **author_name**      | Host name (optional)                    | `Fluxline`                                 |
| **tags**             | Comma-separated tags (optional)         | `business,strategy,transformation`         |
| **imageUrl**         | Episode artwork URL (optional)          | `https://...`                              |
| **slug**             | URL slug (optional, defaults to RowKey) | `intro-to-mythmaking`                      |

**Required Fields:** RowKey, episode_title, audio_url, publish_date  
**Recommended Fields:** description, duration, episode_number, audio_size_bytes

---

### Step 4: Add Episode Metadata to Azure Table Storage

#### Option A: Azure Portal (Recommended for beginners)

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to your Storage Account
3. Click **Storage browser** (left sidebar) → **Tables**
4. Select your podcast table:
   - **Dev/Test**: `podcastsdev`
   - **Production**: `podcasts`
5. Click **+ Add entity**
6. Fill in the fields:

**Example Entity:**

```
PartitionKey: podcast
RowKey: episode-001
episode_title: Introduction to Mythmaking
description: In this inaugural episode, we explore the art of mythmaking...
audio_url: https://azfluxlinewebstorage.blob.core.windows.net/podcasts/episode-1.mp3
duration: 32:45
publish_date: 2026-02-21T00:00:00Z
episode_number: 1
audio_size_bytes: 15728640
podcast_name: The Authentic Growth Mythmaker Series
author_name: Fluxline
tags: business,strategy,transformation
```

7. Click **Insert**

#### Option B: Azure Storage Explorer

1. Open Azure Storage Explorer
2. Navigate to Storage Account → Tables → `podcasts` (or `podcastsdev`)
3. Click **Add**
4. Fill in properties (same as above)
5. Click **Insert**

#### Option C: Azure CLI

```bash
az storage entity insert \
  --account-name azfluxlinewebstorage \
  --table-name podcasts \
  --entity \
    PartitionKey=podcast \
    RowKey=episode-001 \
    episode_title="Introduction to Mythmaking" \
    description="In this inaugural episode..." \
    audio_url="https://azfluxlinewebstorage.blob.core.windows.net/podcasts/episode-1.mp3" \
    duration="32:45" \
    publish_date="2026-02-21T00:00:00Z" \
    episode_number@odata.type=Edm.Int32 \
    episode_number=1 \
    audio_size_bytes@odata.type=Edm.Int64 \
    audio_size_bytes=15728640 \
    podcast_name="The Authentic Growth Mythmaker Series" \
    author_name="Fluxline" \
    tags="business,strategy,transformation"
```

---

### Step 5: Verify the Episode Appears

1. **On your website**: Navigate to `/podcasts`
   - Episode should appear in the grid
   - Newest episodes appear first (sorted by `publish_date`)

2. **Test the audio player**: Click on the episode card
   - Modal should open
   - Audio player should load
   - Click play to test audio

3. **Check the RSS feed**: Visit `/api/podcasts/rss`
   - Episode should be in the feed
   - Verify title, description, audio_url, and duration are correct

---

## Environment Separation

The architecture supports separate environments for testing:

### Dev/Test Environment

- **Table**: `podcastsdev`
- **Container**: `podcasts-dev` (or path: `podcasts/dev/`)
- **Environment variable**: `NEXT_PUBLIC_ENVIRONMENT=dev`

### Production Environment

- **Table**: `podcasts`
- **Container**: `podcasts` (or path: `podcasts/prod/`)
- **Environment variable**: `NEXT_PUBLIC_ENVIRONMENT=prod`

**Tip:** Test episodes in the dev table before adding to production!

---

## Best Practices

### Audio Quality

- Use consistent bitrate across episodes (128-192 kbps)
- Normalize audio levels (-16 LUFS for podcasts)
- Add intro/outro music for branding
- Remove long silences and filler words

### Metadata

- Write compelling descriptions (3-5 sentences)
- Use consistent formatting for titles
- Include episode numbers for serialized content
- Add relevant tags for discoverability

### File Organization

- Use consistent naming: `episode-###-short-title.mp3`
- Keep separate folders for dev and prod
- Archive source files with episode number

### SEO & Discovery

- Front-load important keywords in title and description
- Keep titles under 60 characters
- Use all 3-5 tag slots
- Include episode artwork (1400x1400px to 3000x3000px)

---

## Troubleshooting

### Episode doesn't appear on the site

**Check:**

1. Verify episode is in the correct table (`podcasts` vs `podcastsdev`)
2. Check `NEXT_PUBLIC_ENVIRONMENT` matches your table
3. Verify `RowKey` is unique (no duplicates)
4. Ensure `publish_date` is not in the future
5. Wait 1 hour for cache to expire, or clear browser cache

### Audio won't play

**Check:**

1. Verify `audio_url` is correct and accessible (paste in browser)
2. Ensure audio file is .mp3, .m4a, or .wav format
3. Check blob container has public read access
4. Verify file size is reasonable (< 100 MB)
5. Test in multiple browsers

### Episode missing from RSS feed

**Check:**

1. Visit `/api/podcasts/rss` directly to see XML
2. Verify episode has all required fields
3. Check `audio_url` is publicly accessible
4. Ensure `duration` and `audio_size_bytes` are present
5. Validate RSS feed with [podbase.com validator](https://podbase.com/validate)

### File size in bytes

**How to get it:**

- **Mac**: Right-click file → Get Info → Size (in bytes)
- **Windows**: Right-click file → Properties → Size
- **Linux**: `ls -l filename.mp3` (column 5)
- **Azure Portal**: Click file → Properties → Size

---

## Advanced: Bulk Upload Script

For uploading multiple episodes at once, you can use this PowerShell script:

```powershell
# upload-episodes.ps1
$episodes = @(
    @{
        file = "episode-1.mp3"
        title = "Episode 1: Getting Started"
        description = "Welcome to the show"
        duration = "25:30"
        episode_number = 1
    },
    @{
        file = "episode-2.mp3"
        title = "Episode 2: Deep Dive"
        description = "Going deeper"
        duration = "32:45"
        episode_number = 2
    }
)

$storageAccount = "azfluxlinewebstorage"
$container = "podcasts"

foreach ($episode in $episodes) {
    # Upload audio
    az storage blob upload `
        --account-name $storageAccount `
        --container-name $container `
        --name $episode.file `
        --file $episode.file

    # Get URL
    $url = az storage blob url `
        --account-name $storageAccount `
        --container-name $container `
        --name $episode.file `
        --output tsv

    # Get file size
    $size = (Get-Item $episode.file).Length

    # Insert into table
    az storage entity insert `
        --account-name $storageAccount `
        --table-name podcasts `
        --entity `
          PartitionKey=podcast `
          RowKey="episode-$($episode.episode_number.ToString('000'))" `
          episode_title="$($episode.title)" `
          description="$($episode.description)" `
          audio_url="$url" `
          duration="$($episode.duration)" `
          episode_number@odata.type=Edm.Int32 `
          episode_number=$($episode.episode_number) `
          audio_size_bytes@odata.type=Edm.Int64 `
          audio_size_bytes=$size

    Write-Host "Uploaded: $($episode.title)"
}
```

---

## RSS Feed Distribution

Once your episode is in the RSS feed (`/api/podcasts/rss`), you can submit to:

- **Apple Podcasts**: [podcastsconnect.apple.com](https://podcastsconnect.apple.com)
- **Spotify for Podcasters**: [podcasters.spotify.com](https://podcasters.spotify.com)
- **Google Podcasts**: Via Google Search Console
- **Spreaker**: Import from RSS option

**RSS Feed URL:** `https://www.fluxline.pro/api/podcasts/rss`

---

## Need Help?

- **API Documentation**: See `/api/README.md`
- **Architecture Overview**: See repository README.md (Podcast Section)
- **Azure Storage Docs**: [Azure Blob Storage](https://docs.microsoft.com/azure/storage/blobs/)
- **Azure Table Storage**: [Azure Table Storage](https://docs.microsoft.com/azure/storage/tables/)

---

**Happy podcasting!** 🎙️

_Last updated: February 21, 2026_
