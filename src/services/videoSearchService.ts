// Frontend Video Search Service
// Communicates with CampusIQ Backend API (/api/videos/search)
// Features client caching and graceful fallback handling

export interface VideoSearchResult {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  channelName: string;
  description: string;
  publishedAt: string;
  durationCategory?: 'medium' | 'long';
  source: 'youtube' | 'nptel' | 'open_edu' | 'archive';
  department?: string;
  subjectCode?: string;
}

export interface VideoSearchResponse {
  cached: boolean;
  count: number;
  source: string;
  data: VideoSearchResult[];
}

const API_BASE = 'http://localhost:5000/api';

export async function searchVideosApi(
  query: string,
  options?: { department?: string; duration?: string; limit?: number }
): Promise<VideoSearchResponse> {
  const params = new URLSearchParams();
  params.set('q', query);
  if (options?.department && options.department !== 'ALL') {
    params.set('department', options.department);
  }
  if (options?.duration && options.duration !== 'any') {
    params.set('duration', options.duration);
  }
  if (options?.limit) {
    params.set('limit', String(options.limit));
  }

  try {
    const res = await fetch(`${API_BASE}/videos/search?${params.toString()}`);
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Search error (HTTP ${res.status})`);
    }
    return await res.json();
  } catch (err: any) {
    console.warn('[VideoSearchService] Backend search error:', err.message);
    return {
      cached: false,
      count: 0,
      source: 'Error',
      data: [],
    };
  }
}

export async function getRelatedVideosApi(videoId: string, query?: string): Promise<VideoSearchResult[]> {
  try {
    const qParam = query ? `?q=${encodeURIComponent(query)}` : '';
    const url = `${API_BASE}/videos/related/${encodeURIComponent(videoId)}${qParam}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    console.warn('[VideoSearchService] Failed to fetch related videos:', err);
    return [];
  }
}
