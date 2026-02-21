'use strict';

/**
 * YouTube API Proxy - Azure Function
 * Fetches videos, live streams, and playlists from the @aplusinflux YouTube channel
 *
 * Query params:
 *   - type: 'videos' | 'live' | 'playlists' (default: 'videos')
 *   - pageToken: pagination token
 *
 * Route: /api/youtube
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_HANDLE = 'aplusinflux';

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
};

async function getChannelId(apiKey) {
  const url = `${YOUTUBE_API_BASE}/channels?part=id&forHandle=${CHANNEL_HANDLE}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.items?.[0]?.id ?? null;
}

async function fetchVideos(apiKey, channelId, type, pageToken) {
  if (type === 'playlists') {
    const params = new URLSearchParams({
      part: 'snippet',
      channelId,
      maxResults: '24',
      key: apiKey,
      ...(pageToken ? { pageToken } : {}),
    });
    const res = await fetch(`${YOUTUBE_API_BASE}/playlists?${params}`);
    if (!res.ok) return { videos: [] };
    const data = await res.json();
    const videos = (data.items || []).map((item) => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl:
        item.snippet.thumbnails?.high?.url ||
        item.snippet.thumbnails?.default?.url ||
        '',
      publishedAt: item.snippet.publishedAt,
      type: 'playlist',
    }));
    return {
      videos,
      nextPageToken: data.nextPageToken,
      totalResults: data.pageInfo?.totalResults,
    };
  }

  const eventType = type === 'live' ? 'live' : 'none';
  const params = new URLSearchParams({
    part: 'snippet',
    channelId,
    maxResults: '24',
    order: 'date',
    type: 'video',
    eventType,
    key: apiKey,
    ...(pageToken ? { pageToken } : {}),
  });
  const searchRes = await fetch(`${YOUTUBE_API_BASE}/search?${params}`);
  if (!searchRes.ok) return { videos: [] };
  const searchData = await searchRes.json();

  const videoIds = (searchData.items || [])
    .map((item) => item.id?.videoId)
    .filter(Boolean);

  if (!videoIds.length) return { videos: [] };

  const detailsParams = new URLSearchParams({
    part: 'contentDetails,statistics',
    id: videoIds.join(','),
    key: apiKey,
  });
  const detailsRes = await fetch(`${YOUTUBE_API_BASE}/videos?${detailsParams}`);
  const detailsData = detailsRes.ok ? await detailsRes.json() : { items: [] };
  const detailsMap = {};
  for (const item of detailsData.items || []) {
    detailsMap[item.id] = item;
  }

  const videos = (searchData.items || [])
    .map((item) => {
      const videoId = item.id?.videoId;
      const detail = detailsMap[videoId];
      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl:
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.default?.url ||
          '',
        publishedAt: item.snippet.publishedAt,
        duration: detail?.contentDetails?.duration,
        viewCount: detail?.statistics?.viewCount,
        type: type === 'live' ? 'live' : 'video',
      };
    })
    .filter((v) => v.id);

  return {
    videos,
    nextPageToken: searchData.nextPageToken,
    totalResults: searchData.pageInfo?.totalResults,
  };
}

module.exports = async function (context, req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: CORS_HEADERS, body: '' };
    return;
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    context.res = {
      status: 503,
      headers: CORS_HEADERS,
      body: JSON.stringify({ videos: [], error: 'YouTube API key not configured' }),
    };
    return;
  }

  const type = req.query.type || 'videos';
  const pageToken = req.query.pageToken || undefined;

  try {
    const channelId = await getChannelId(apiKey);
    if (!channelId) {
      context.res = {
        status: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({ videos: [], error: 'Channel not found' }),
      };
      return;
    }

    const result = await fetchVideos(apiKey, channelId, type, pageToken);
    context.res = {
      status: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(result),
    };
  } catch (error) {
    context.log.error('YouTube function error:', error);
    context.res = {
      status: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ videos: [], error: 'Failed to fetch YouTube data' }),
    };
  }
};
