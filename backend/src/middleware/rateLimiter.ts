// IP-based Sliding Window Rate Limiter
// Prevents rapid exhaustion of YouTube Data API v3 daily quota (10,000 units)
// Search requests cost 100 units each. Rate-limiting protects the institutional key.

import { Request, Response, NextFunction } from 'express';

interface ClientWindow {
  count: number;
  resetAt: number;
}

const clients = new Map<string, ClientWindow>();

// Evict expired client windows every 2 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, window] of clients.entries()) {
    if (now > window.resetAt) {
      clients.delete(ip);
    }
  }
}, 2 * 60 * 1000).unref();

export function createRateLimiter(maxRequests = 20, windowSeconds = 60) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIp =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    const now = Date.now();
    const existing = clients.get(clientIp);

    if (!existing || now > existing.resetAt) {
      clients.set(clientIp, {
        count: 1,
        resetAt: now + windowSeconds * 1000,
      });
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      return next();
    }

    if (existing.count >= maxRequests) {
      const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfter);
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);

      res.status(429).json({
        error: 'Too Many Requests',
        message: `Search rate limit exceeded. Please wait ${retryAfter} seconds to conserve API quota.`,
        retryAfterSeconds: retryAfter,
      });
      return;
    }

    existing.count++;
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - existing.count));
    next();
  };
}

export const searchRateLimiter = createRateLimiter(20, 60); // 20 requests per minute
