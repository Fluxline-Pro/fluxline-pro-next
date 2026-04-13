'use strict';

/**
 * Podcast Episodes API - Azure Function
 * Fetches podcast episode metadata from Azure Table Storage
 *
 * Route: /api/podcasts/episodes
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
};

async function getAllEpisodes() {
  const tableUrl = process.env.AZURE_TABLE_STORAGE_URL;
  const sasToken = process.env.AZURE_TABLE_SAS_TOKEN;
  const env = process.env.NEXT_PUBLIC_ENVIRONMENT || 'prod';
  const tableName =
    env === 'prod'
      ? process.env.AZURE_PODCAST_TABLE_PROD || 'podcasts'
      : process.env.AZURE_PODCAST_TABLE_DEV || 'podcastsdev';

  if (!tableUrl || !sasToken) return [];

  const url = `${tableUrl}/${tableName}?${sasToken}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json;odata=nometadata',
      'x-ms-version': '2020-04-08',
    },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.value || []).map((row) => ({
    id: row.RowKey,
    slug: row.slug || row.RowKey,
    podcast_name: row.podcast_name || 'The Authentic Growth Mythmaker Series',
    episode_title: row.episode_title || row.RowKey,
    author_name: row.author_name || 'Fluxline',
    description: row.description || '',
    publish_date: row.publish_date || row.Timestamp || '',
    duration: row.duration || '',
    audio_url: row.audio_url || '',
    audio_size_bytes: row.audio_size_bytes
      ? Number(row.audio_size_bytes)
      : undefined,
    episode_number: row.episode_number ? Number(row.episode_number) : undefined,
    tags: row.tags ? row.tags.split(',').map((t) => t.trim()) : [],
    imageUrl: row.imageUrl,
  }));
}

module.exports = async function (context, req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  try {
    const episodes = await getAllEpisodes();
    episodes.sort((a, b) => {
      const da = a.publish_date ? new Date(a.publish_date).getTime() : 0;
      const db = b.publish_date ? new Date(b.publish_date).getTime() : 0;
      return db - da;
    });

    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ episodes }),
    };
  } catch (error) {
    context.log.error('Podcast episodes function error:', error);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        episodes: [],
        error: 'Failed to fetch podcast episodes',
      }),
    };
  }
};
