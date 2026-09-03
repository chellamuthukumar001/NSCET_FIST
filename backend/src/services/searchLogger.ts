// Anonymized Search Query Logger
// Collects student search trends for curriculum analytics without storing PII

import crypto from 'crypto';

export interface SearchLogRecord {
  query: string;
  departmentCode?: string;
  resultCount: number;
  source: string;
  timestamp: string;
  hashedIp: string;
}

class SearchLogger {
  private logs: SearchLogRecord[] = [];
  private queryFrequencies = new Map<string, number>();

  logSearch(query: string, resultCount: number, source: string, ip = '127.0.0.1', departmentCode?: string): void {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return;

    const hashedIp = crypto.createHash('sha256').update(ip + '_campusiq_salt').digest('hex').substring(0, 12);

    const record: SearchLogRecord = {
      query: normalized,
      departmentCode,
      resultCount,
      source,
      timestamp: new Date().toISOString(),
      hashedIp,
    };

    this.logs.push(record);
    if (this.logs.length > 5000) {
      this.logs.shift(); // Keep latest 5000 records in ring buffer
    }

    this.queryFrequencies.set(normalized, (this.queryFrequencies.get(normalized) || 0) + 1);
  }

  getTopQueries(limit = 10): Array<{ query: string; count: number }> {
    return Array.from(this.queryFrequencies.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  getRecentLogs(limit = 50): SearchLogRecord[] {
    return this.logs.slice(-limit).reverse();
  }
}

export const searchLogger = new SearchLogger();
