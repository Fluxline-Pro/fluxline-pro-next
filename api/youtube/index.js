'use strict';

/**
 * YouTube API Proxy - Azure Function
 * Fetches videos, live streams, and playlists from multiple YouTube channels
 *
 * Query params:
 *   - type: 'videos' | 'live' | 'playlists' (default: 'videos')
 *   - pageToken: pagination token
 *
 * Route: /api/youtube
 */

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_HANDLES = [
  'TheResonantIdentity',
  'TerenceRWaters',
  'fluxlinepro',
];
const MAX_RESULTS_PER_CHANNEL = 12;
const MAX_RESULTS_COMBINED = 24;

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
};

async function getChannelId(apiKey, handle) {
  const url = `${YOUTUBE_API_BASE}/channels?part=id&forHandle=${handle}&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.items?.[0]?.id ?? null;
}

async function fetchVideosForChannel(
  apiKey,
  channelId,
  channelHandle,
  type,
  pageToken
) {
  if (type === 'playlists') {
    const params = new URLSearchParams({
      part: 'snippet',
      channelId,
      maxResults: String(MAX_RESULTS_PER_CHANNEL),
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
      channelHandle,
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
    maxResults: String(MAX_RESULTS_PER_CHANNEL),
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
        channelHandle,
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

function mergeAndSortVideos(results) {
  const deduped = new Map();

  for (const result of results) {
    for (const video of result.videos || []) {
      if (!video?.id) continue;
      if (!deduped.has(video.id)) {
        deduped.set(video.id, video);
      }
    }
  }

  return Array.from(deduped.values())
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, MAX_RESULTS_COMBINED);
}

async function fetchVideosAcrossChannels(apiKey, channels, type, pageToken) {
  const perChannelResults = await Promise.all(
    channels.map((channel) =>
      fetchVideosForChannel(
        apiKey,
        channel.channelId,
        channel.handle,
        type,
        channels.length === 1 ? pageToken : undefined
      )
    )
  );

  const videos = mergeAndSortVideos(perChannelResults);
  const totalResults = perChannelResults.reduce(
    (total, result) => total + (result.totalResults || 0),
    0
  );

  return {
    videos,
    nextPageToken:
      channels.length === 1 ? perChannelResults[0]?.nextPageToken : undefined,
    totalResults,
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
      body: JSON.stringify({
        videos: [],
        error: 'YouTube API key not configured',
      }),
    };
    return;
  }

  const type = req.query.type || 'videos';
  const pageToken = req.query.pageToken || undefined;

  try {
    const resolvedChannels = await Promise.all(
      CHANNEL_HANDLES.map(async (handle) => {
        const channelId = await getChannelId(apiKey, handle);
        return channelId ? { handle, channelId } : null;
      })
    );

    const channels = resolvedChannels.filter(Boolean);

    if (!channels.length) {
      context.res = {
        status: 404,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          videos: [],
          error: 'No configured channels found',
        }),
      };
      return;
    }

    const result = await fetchVideosAcrossChannels(
      apiKey,
      channels,
      type,
      pageToken
    );
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
      body: JSON.stringify({
        videos: [],
        error: 'Failed to fetch YouTube data',
      }),
    };
  }
};
