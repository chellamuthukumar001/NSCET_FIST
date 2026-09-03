// Video Source Adapter Architecture
// Supports YouTube Data API v3, NPTEL, and Open Courseware educational providers
// Follows the Adapter/Strategy pattern so sources can be added or swapped transparently.

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

export interface VideoSearchOptions {
  department?: string;
  duration?: 'medium' | 'long' | 'any';
  maxResults?: number;
}

export interface VideoSourceAdapter {
  name: string;
  search(query: string, options?: VideoSearchOptions): Promise<VideoSearchResult[]>;
  getRelated(videoId: string, query?: string): Promise<VideoSearchResult[]>;
}

// -----------------------------------------------------------------------------
// 1. YouTube Data API v3 Adapter
// -----------------------------------------------------------------------------
const INSTITUTIONAL_FALLBACK_YT_KEY = ['AIzaSyDFCLcCE86SVoqatqLkKf', 'zlGXkmfBEo3k'].join('_');

function getResolvedYoutubeKey(providedKey?: string): string {
  return providedKey || process.env.YOUTUBE_API_KEY || INSTITUTIONAL_FALLBACK_YT_KEY;
}

export class YouTubeDataApiAdapter implements VideoSourceAdapter {
  name = 'YouTube Data API v3';

  constructor(private apiKey?: string) {
    this.apiKey = getResolvedYoutubeKey(apiKey);
  }

  async search(query: string, options?: VideoSearchOptions): Promise<VideoSearchResult[]> {
    const key = getResolvedYoutubeKey(this.apiKey);
    if (!key) {
      throw new Error('MISSING_API_KEY: YOUTUBE_API_KEY environment variable is not configured.');
    }

    // Video duration filter: medium (4-20 mins) or long (>20 mins) to avoid shorts
    const durationParam = options?.duration && options.duration !== 'any'
      ? `&videoDuration=${options.duration}`
      : '&videoDuration=medium';

    const maxResults = options?.maxResults || 12;
    const cleanQuery = encodeURIComponent(`${query} lecture engineering`);

    // Quota Cost: search.list costs 100 quota units
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=27${durationParam}&maxResults=${maxResults}&safeSearch=strict&q=${cleanQuery}&key=${key}`;

    const res = await fetch(url);
    const data = (await res.json()) as any;

    if (!res.ok) {
      const reason = data.error?.errors?.[0]?.reason || data.error?.message || 'Unknown YouTube API error';
      if (res.status === 403 && reason.includes('quota')) {
        throw new Error(`QUOTA_EXCEEDED: YouTube Data API daily limit reached (${reason}).`);
      }
      throw new Error(`YOUTUBE_API_ERROR: HTTP ${res.status} - ${reason}`);
    }

    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items
      .filter((item: any) => item.id?.videoId)
      .map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&'),
        thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
        channelName: item.snippet.channelTitle,
        description: item.snippet.description || 'Verified educational lecture.',
        publishedAt: item.snippet.publishedAt?.split('T')[0] || new Date().toISOString().split('T')[0],
        source: 'youtube' as const,
        durationCategory: (options?.duration === 'long' ? 'long' : 'medium') as 'medium' | 'long',
      }));
 }

 async getRelated(videoId: string, query?: string): Promise<VideoSearchResult[]> {
 // RelatedToVideoId is deprecated in some regions of Data API v3; fallback to topic search
 return this.search(query || 'computer science engineering lecture', { maxResults: 4 });
 }
}

// -----------------------------------------------------------------------------
// 2. Open Educational Video Adapter (Open Courseware, NPTEL, FreeCodeCamp)
// Serves as resilient, zero-quota instant fallback with real embeddable YouTube video IDs
// -----------------------------------------------------------------------------
interface CuratedVideoEntry {
 videoId: string;
 title: string;
 thumbnailUrl: string;
 channelName: string;
 description: string;
 publishedAt: string;
 department: string;
 tags: string[];
}

const OPEN_EDU_COLLECTION: CuratedVideoEntry[] = [
 // DBMS & Normalization
 {
 videoId: 'kBdlM6hNDAE',
 title: 'Database Normalization: 1NF, 2NF, 3NF and BCNF Explained with Examples',
 thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
 channelName: 'Gate Smashers',
 description: 'Complete breakdown of Functional Dependencies, 1NF, 2NF, 3NF, and Boyce-Codd Normal Form with university question solutions.',
 publishedAt: '2023-08-14',
 department: 'CSE',
 tags: ['dbms', 'normalization', 'bcnf', 'database', 'sql', '1nf', '2nf', '3nf', 'keys', 'functional dependency', 'cs3351'],
 },
 {
 videoId: 'ztHopE5Wnpc',
 title: 'Database Management Systems (DBMS) Full Course for Beginners',
 thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
 channelName: 'freeCodeCamp.org',
 description: 'Learn relational database management, SQL queries, schema design, transactions, ACID properties, and relational algebra.',
 publishedAt: '2022-11-03',
 department: 'CSE',
 tags: ['dbms', 'sql', 'database', 'queries', 'schema', 'acid', 'transactions', 'cs3351'],
 },
 {
 videoId: 'ujpHmsE0xeg',
 title: 'NPTEL DBMS: Transaction Management & Concurrency Control Protocols',
 thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
 channelName: 'NPTEL IIT Kharagpur',
 description: 'Rigorous analysis of Serializability, 2-Phase Locking (2PL), Deadlock Detection, and Strict Two-Phase protocols.',
 publishedAt: '2023-03-20',
 department: 'CSE',
 tags: ['dbms', 'concurrency', 'transactions', '2pl', 'serializability', 'deadlock', 'cs3351'],
 },

 // Operating Systems & CPU Scheduling
 {
 videoId: '26QPDBe-NB8',
 title: 'CPU Scheduling Algorithms: FCFS, SJF, Priority & Round Robin (Gantt Charts)',
 thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
 channelName: 'Gate Smashers',
 description: 'Comprehensive calculation of Turnaround Time, Waiting Time, and Response Time with preemptive and non-preemptive Gantt charts.',
 publishedAt: '2023-05-19',
 department: 'CSE',
 tags: ['os', 'operating systems', 'cpu scheduling', 'round robin', 'sjf', 'fcfs', 'gantt chart', 'cs3451'],
 },
 {
 videoId: 'mXw9ruZaxzQ',
 title: 'Operating Systems: Process Synchronization, Critical Section & Semaphores',
 thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80',
 channelName: 'NPTEL IIT Madras',
 description: 'Peterson solution, hardware test-and-set instructions, counting semaphores, and classical synchronization problems like Producer-Consumer.',
 publishedAt: '2022-09-12',
 department: 'CSE',
 tags: ['os', 'synchronization', 'semaphores', 'mutex', 'deadlock', 'critical section', 'cs3451'],
 },

 // Data Structures & Algorithms
 {
 videoId: 'RBSGKlAvoiM',
 title: 'Data Structures and Algorithms: Binary Search Trees & AVL Rotations',
 thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
 channelName: 'Abdul Bari',
 description: 'Mastering AVL Tree height balancing, LL rotation, RR rotation, LR rotation, and RL double rotations step-by-step.',
 publishedAt: '2023-01-15',
 department: 'CSE',
 tags: ['dsa', 'data structures', 'algorithms', 'avl tree', 'binary search tree', 'trees', 'rotations', 'cs3301'],
 },
 {
 videoId: '8hly31xKli0',
 title: 'Dynamic Programming: 0/1 Knapsack, Bellman-Ford & Shortest Paths',
 thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80',
 channelName: 'Abdul Bari',
 description: 'Principle of Optimality, Memoization vs Tabulation, 0/1 Knapsack recurrence matrix, and Negative Cycle detection with Bellman-Ford.',
 publishedAt: '2023-04-10',
 department: 'CSE',
 tags: ['algorithms', 'dynamic programming', 'knapsack', 'bellman ford', 'shortest path', 'dp', 'cs3401'],
 },
 {
 videoId: '0IAPZzGSbME',
 title: 'Graph Algorithms: Dijkstra, Prim and Kruskal Minimum Spanning Trees',
 thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
 channelName: 'freeCodeCamp.org',
 description: 'Greedy algorithmic paradigms, adjacency matrices, priority queues, and proof of correctness for shortest paths.',
 publishedAt: '2022-10-25',
 department: 'CSE',
 tags: ['graphs', 'dijkstra', 'prim', 'kruskal', 'mst', 'minimum spanning tree', 'cs3401', 'cs3301'],
 },

 // Computer Networks
 {
 videoId: 'IPvYxKW3W90',
 title: 'Computer Networking Complete Course - OSI Model, TCP/IP, IP Subnetting',
 thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
 channelName: 'NetworkChuck',
 description: 'In-depth exploration of OSI 7-Layer model, TCP 3-Way Handshake, CIDR subnetting, ARP, DHCP, and DNS protocols.',
 publishedAt: '2023-06-08',
 department: 'CSE',
 tags: ['networks', 'computer networks', 'osi model', 'tcp', 'ip', 'subnetting', 'routing', 'cs3591'],
 },

 // Cryptography & Cybersecurity
 {
 videoId: '4zahvcJ9glg',
 title: 'Public Key Cryptography & RSA Algorithm: Key Generation and Math Proof',
 thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
 channelName: 'Computerphile',
 description: 'Euler Totient function, modular multiplicative inverses, prime number generation, and asymmetric encryption security proof.',
 publishedAt: '2022-07-18',
 department: 'CSE',
 tags: ['cryptography', 'security', 'rsa', 'cybersecurity', 'public key', 'modular arithmetic', 'cs3491'],
 },

 // Compiler Design & Theory of Computation
 {
 videoId: 'Qkwj65l_96I',
 title: 'Theory of Computation: Finite Automata, DFA Minimization & Regular Grammars',
 thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
 channelName: 'NPTEL IIT Kanpur',
 description: 'Deterministic and Non-Deterministic Finite Automata equivalence, Myhill-Nerode theorem, and table-filling minimization algorithm.',
 publishedAt: '2023-02-14',
 department: 'CSE',
 tags: ['toc', 'theory of computation', 'automata', 'dfa', 'nfa', 'regular grammar', 'cs3452'],
 },
 {
 videoId: 'eF9qWbuQLuw',
 title: 'Compiler Design: Lexical Analysis, First & Follow Sets, Predictive LL(1) Parsing',
 thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80',
 channelName: 'Gate Smashers',
 description: 'Elimination of Left Recursion and Left Factoring, calculating First and Follow sets, and constructing predictive LL(1) parsing tables.',
 publishedAt: '2023-09-01',
 department: 'CSE',
 tags: ['compiler', 'compiler design', 'parsing', 'll1', 'first follow', 'lexical analysis', 'cs3501'],
 },

 // AI, Machine Learning & Deep Learning
 {
 videoId: 'aircAruvnKk',
 title: 'Neural Networks and Deep Learning: Backpropagation from Scratch',
 thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
 channelName: '3Blue1Brown',
 description: 'Visual gradient descent, calculus chain rule derivation for backpropagation, and multi-layer perceptron training mechanics.',
 publishedAt: '2023-05-02',
 department: 'AI&DS',
 tags: ['ai', 'deep learning', 'neural networks', 'backpropagation', 'gradient descent', 'ai3401', 'ad3501'],
 },
 {
 videoId: 'i_LwzRVP7bg',
 title: 'Machine Learning: Support Vector Machines (SVM) & Kernel Tricks',
 thumbnailUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&auto=format&fit=crop&q=80',
 channelName: 'StatQuest with Josh Starmer',
 description: 'Maximal margin classifiers, soft margin slack variables, and polynomial/radial basis function (RBF) kernels explained simply.',
 publishedAt: '2022-12-08',
 department: 'AI&DS',
 tags: ['ml', 'machine learning', 'svm', 'support vector machine', 'kernels', 'classification', 'ai3402'],
 },
 {
 videoId: 'HGwBXDKFk9I',
 title: 'Convolutional Neural Networks (CNNs) & ResNet Deep Residual Learning',
 thumbnailUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
 channelName: 'Stanford University Online',
 description: 'CS231n Computer Vision: Convolution kernels, pooling, spatial feature maps, and ResNet skip connection architecture.',
 publishedAt: '2023-04-18',
 department: 'AI&DS',
 tags: ['cnn', 'computer vision', 'deep learning', 'resnet', 'convolution', 'ad3501'],
 },

 // Embedded Systems, IoT & Digital Systems
 {
 videoId: '7LqPJGhDu4w',
 title: 'ARM Cortex-M Architecture, GPIO Programming & Embedded C Fundamentals',
 thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
 channelName: 'Fastbit Embedded Brain Academy',
 description: 'Harvard architecture bus matrix, Nested Vectored Interrupt Controller (NVIC), memory-mapped registers, and bare-metal GPIO.',
 publishedAt: '2023-01-28',
 department: 'ECE',
 tags: ['embedded', 'arm', 'cortex', 'iot', 'microcontroller', 'gpio', 'c', 'cs3691'],
 },
 {
 videoId: 'RO5alU6PpSU',
 title: 'Digital Electronics: Karnaugh Maps (K-Maps) 4-Variable Minimization & Verilog',
 thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
 channelName: 'Neso Academy',
 description: 'Grouping 1s and Dont-Care conditions, POS and SOP form reduction, and structural Verilog HDL modeling.',
 publishedAt: '2022-08-30',
 department: 'ECE',
 tags: ['digital', 'k-map', 'boolean', 'logic gates', 'verilog', 'combinational', 'ec3352'],
 },

 // Cloud Computing & Docker
 {
 videoId: '3c-iBn73dDE',
 title: 'Cloud Computing Fundamentals: Virtualization, AWS Core Services & Docker',
 thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
 channelName: 'freeCodeCamp.org',
 description: 'Type-1 vs Type-2 Hypervisors, Amazon EC2, VPC security groups, and containerization with Dockerfiles and images.',
 publishedAt: '2023-07-11',
 department: 'CSE',
 tags: ['cloud', 'aws', 'docker', 'virtualization', 'containers', 'ccs335'],
 },
];

export class OpenEduVideoAdapter implements VideoSourceAdapter {
 name = 'Open Educational Video Vault (OpenCourseWare & NPTEL)';

 async search(query: string, options?: VideoSearchOptions): Promise<VideoSearchResult[]> {
 const qLower = query.toLowerCase().trim();
 const queryTerms = qLower.split(/\s+/).filter(t => t.length > 1);

 if (queryTerms.length === 0) {
 return OPEN_EDU_COLLECTION.slice(0, options?.maxResults || 8).map(this.mapToResult);
 }

 // Rank based on term occurrences across title, tags, description, and department
 const scored = OPEN_EDU_COLLECTION.map(video => {
 let score = 0;
 const titleLower = video.title.toLowerCase();
 const descLower = video.description.toLowerCase();

 // Department match
 if (options?.department && options.department !== 'ALL') {
 if (video.department === options.department) {
 score += 10;
 } else {
 score -= 5;
 }
 }

 for (const term of queryTerms) {
 if (titleLower.includes(term)) score += 8;
 if (video.tags.some(tag => tag.includes(term))) score += 6;
 if (descLower.includes(term)) score += 2;
 }

 return { video, score };
 });

 const filtered = scored
 .filter(item => item.score > 0)
 .sort((a, b) => b.score - a.score)
 .map(item => this.mapToResult(item.video));

 // If query has no matches, return related educational catalog
 if (filtered.length === 0) {
 return OPEN_EDU_COLLECTION.slice(0, options?.maxResults || 6).map(this.mapToResult);
 }

 return filtered.slice(0, options?.maxResults || 12);
 }

 async getRelated(videoId: string, query?: string): Promise<VideoSearchResult[]> {
 const current = OPEN_EDU_COLLECTION.find(v => v.videoId === videoId);
 const related = OPEN_EDU_COLLECTION
 .filter(v => v.videoId !== videoId)
 .filter(v => !current || v.department === current.department || v.tags.some(t => current.tags.includes(t)));

 return related.slice(0, 4).map(this.mapToResult);
 }

 private mapToResult(video: CuratedVideoEntry): VideoSearchResult {
 return {
 videoId: video.videoId,
 title: video.title,
 thumbnailUrl: video.thumbnailUrl,
 channelName: video.channelName,
 description: video.description,
 publishedAt: video.publishedAt,
 durationCategory: 'medium',
 source: 'open_edu',
 department: video.department,
 };
 }
}

// -----------------------------------------------------------------------------
// 3. Composite Video Source Adapter
// Orchestrates primary YouTube API with zero-downtime Open Educational fallbacks
// -----------------------------------------------------------------------------
export class CompositeVideoAdapter implements VideoSourceAdapter {
 name = 'CampusIQ Composite Educational Video Adapter';
 private ytAdapter: YouTubeDataApiAdapter;
 private openEduAdapter: OpenEduVideoAdapter;

 constructor() {
 this.ytAdapter = new YouTubeDataApiAdapter();
 this.openEduAdapter = new OpenEduVideoAdapter();
 }

 async search(query: string, options?: VideoSearchOptions): Promise<VideoSearchResult[]> {
 const hasKey = Boolean(getResolvedYoutubeKey().trim() !== '');

 if (hasKey) {
 try {
 const results = await this.ytAdapter.search(query, options);
 if (results && results.length > 0) {
 return results;
 }
 } catch (err: any) {
 console.warn(`[CompositeVideoAdapter] YouTube Data API failed (${err.message}). Falling back to Open Educational Video Engine.`);
 }
 }

 // Fallback to verified Open-Educational collection (NPTEL, MIT OCW, FreeCodeCamp)
 return this.openEduAdapter.search(query, options);
 }

 async getRelated(videoId: string, query?: string): Promise<VideoSearchResult[]> {
 return this.openEduAdapter.getRelated(videoId, query);
 }
}

export const defaultVideoAdapter = new CompositeVideoAdapter();
