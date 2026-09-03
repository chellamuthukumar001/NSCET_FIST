import { Request, Response } from 'express';
import { defaultVideoAdapter, VideoSearchOptions } from '../services/videoSourceAdapter';
import { videoSearchCache } from '../services/cacheService';
import { searchLogger } from '../services/searchLogger';

export const searchEducationalVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawQuery = (req.query.q as string) || '';
    const department = (req.query.department as string) || undefined;
    const duration = (req.query.duration as 'medium' | 'long' | 'any') || 'medium';
    const limit = Number(req.query.limit) || 12;

    const trimmedQuery = rawQuery.trim();
    if (!trimmedQuery) {
      res.status(400).json({
        error: 'Bad Request',
        message: 'Search query parameter "q" is required. Example: /api/videos/search?q=DBMS',
      });
      return;
    }

    // Cache key incorporates query, department, and duration
    const cacheKey = `search:${trimmedQuery.toLowerCase()}:${department || 'ALL'}:${duration}`;
    const cachedResult = videoSearchCache.get<any[]>(cacheKey);

 if (cachedResult) {
 res.json({
 cached: true,
 count: cachedResult.length,
 source: 'cache (0 API quota units consumed)',
 data: cachedResult,
 });
 return;
 }

 const options: VideoSearchOptions = {
 department,
 duration,
 maxResults: limit,
 };

 const results = await defaultVideoAdapter.search(trimmedQuery, options);

 // Cache the result for 6 hours
 videoSearchCache.set(cacheKey, results);

 // Anonymously log the search for campus topic analytics
 const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress || '127.0.0.1';
 searchLogger.logSearch(trimmedQuery, results.length, results[0]?.source || 'open_edu', clientIp, department);

 res.json({
 cached: false,
 count: results.length,
 source: results[0]?.source === 'youtube' ? 'YouTube Data API v3' : 'Open Educational Courseware',
 data: results,
 });
 } catch (err: any) {
 console.error('[VideoSearchController Error]:', err);
 res.status(500).json({
 error: 'Video Search Error',
 message: err.message || 'Failed to search educational video repositories.',
 });
 }
};

export const getRelatedEducationalVideos = async (req: Request, res: Response): Promise<void> => {
  try {
    const videoId = req.params.videoId as string;
    const query = (req.query.q as string) || undefined;

    if (!videoId) {
      res.status(400).json({ error: 'videoId parameter is required' });
      return;
    }

 const cacheKey = `related:${videoId}`;
 const cached = videoSearchCache.get<any[]>(cacheKey);
 if (cached) {
 res.json({ cached: true, count: cached.length, data: cached });
 return;
 }

 const results = await defaultVideoAdapter.getRelated(videoId, query);
 videoSearchCache.set(cacheKey, results, 12 * 60 * 60);

 res.json({ cached: false, count: results.length, data: results });
 } catch (err: any) {
 console.error('[RelatedVideos Error]:', err);
 res.status(500).json({ error: 'Failed to fetch related videos' });
 }
};

export const getTopSearchAnalytics = async (req: Request, res: Response): Promise<void> => {
 const limit = Number(req.query.limit) || 10;
 const topQueries = searchLogger.getTopQueries(limit);
 const cacheStats = videoSearchCache.stats();

 res.json({
 topQueries,
 cacheStats,
 recentSearchesCount: searchLogger.getRecentLogs(10).length,
 });
};
