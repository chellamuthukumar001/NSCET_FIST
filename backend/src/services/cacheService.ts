// In-Memory Key-Value Cache with Time-To-Live (TTL)
// Critical for YouTube Data API v3 Quota Conservation
// Default YouTube API free tier = 10,000 quota units / day.
// Each search.list call costs 100 quota units (~100 queries max without caching).
// Caching frequent student queries (e.g., 'DBMS', 'Normalization') ensures 0-cost instant responses.

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class MemoryCache {
  private store = new Map<string, CacheEntry<any>>();
  private hitCount = 0;
  private missCount = 0;

  constructor(private defaultTtlSeconds = 6 * 60 * 60) {
    // Periodically evict expired entries every 30 minutes
    setInterval(() => this.purgeExpired(), 30 * 60 * 1000).unref();
  }

  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.missCount++;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.missCount++;
      return null;
    }
    this.hitCount++;
    return entry.data as T;
  }

  set<T>(key: string, data: T, ttlSeconds = this.defaultTtlSeconds): void {
    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  clear(): void {
    this.store.clear();
  }

  stats() {
    return {
      size: this.store.size,
      hits: this.hitCount,
      misses: this.missCount,
      ratio: this.hitCount + this.missCount > 0
        ? `${((this.hitCount / (this.hitCount + this.missCount)) * 100).toFixed(1)}%`
        : '0%',
    };
  }

  private purgeExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

export const videoSearchCache = new MemoryCache(6 * 60 * 60); // 6 hour TTL
