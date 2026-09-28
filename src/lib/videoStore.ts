import { Video } from '../types';

const STORAGE_KEY = 'campusiq_uploaded_videos';

export const DEFAULT_VIDEOS: Video[] = [
  {
    id: 'vid-local-01',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-01.mp4',
    title: 'Federated Learning: Training AI Without Sharing Raw Data',
    topic: 'Privacy-Preserving AI & Distributed Model Training',
    facultyName: 'Asifa Shereen (CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 5,
    academicYear: '2024-25',
    subjectCode: 'CS3551',
    subjectTitle: 'Distributed & Federated Systems',
    unitNumber: 3,
    thumbnailUrl: '/assets/videos/thumbs/thumb-01.jpg',
    description: 'Lecture on Federated Learning concepts, distributed machine learning architecture, and privacy-preserving model aggregation.',
    durationSeconds: 240,
    tags: ['Machine Learning', 'Federated Learning', 'Distributed AI'],
    viewCount: 1420,
    publishedDate: '2026-09-01',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-02',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-02.mp4',
    title: 'What Happens When You Type a URL? Behind the Scenes of a Web Request',
    topic: 'Web Request Lifecycle & Client-Server Architecture',
    facultyName: 'A. Asmath Nabila (CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 5,
    academicYear: '2024-25',
    subjectCode: 'CS3452',
    subjectTitle: 'Web Technology & Networks',
    unitNumber: 2,
    thumbnailUrl: '/assets/videos/thumbs/thumb-02.jpg',
    description: 'Comprehensive walkthrough of HTTP/HTTPS web requests, client-server communication lifecycle, REST protocols, and response headers.',
    durationSeconds: 217,
    tags: ['Web Technology', 'HTTP', 'REST API', 'Computer Networks'],
    viewCount: 1890,
    publishedDate: '2026-09-02',
    category: 'Systems, Networks & Security'
  },
  {
    id: 'vid-local-03',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-03.mp4',
    title: 'Why Do We Fear Public Speaking',
    topic: 'Public Speaking & Overcoming Stage Fear',
    facultyName: 'Irfana S (II-CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academicYear: '2024-25',
    subjectCode: 'HS3152',
    subjectTitle: 'Professional Communication & Public Speaking',
    unitNumber: 1,
    thumbnailUrl: '/assets/videos/thumbs/thumb-03.jpg',
    description: 'Comprehensive student lecture exploring the psychological fears behind public speaking, crowd discomfort, fear of judgment, and practical techniques to build presentation confidence.',
    durationSeconds: 343,
    tags: ['Public Speaking', 'Communication Skills', 'Presentation', 'Confidence', 'CSE'],
    viewCount: 1560,
    publishedDate: '2026-09-27',
    category: 'Humanities & Professional Communication'
  },
  {
    id: 'vid-local-04',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-04.mp4',
    title: 'Machine Learning: How Computers Learn from Data',
    topic: 'Machine Learning Foundations & Paradigms',
    facultyName: 'M. Priyadharshini (IV - CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academicYear: '2024-25',
    subjectCode: 'CS3551',
    subjectTitle: 'Machine Learning & AI Architectures',
    unitNumber: 1,
    thumbnailUrl: '/assets/videos/thumbs/thumb-04.jpg',
    description: 'In-depth presentation covering how machine learning algorithms discover patterns from data, traditional programming vs machine learning, supervised learning, and predictive modeling.',
    durationSeconds: 736,
    tags: ['Machine Learning', 'Artificial Intelligence', 'Data Science', 'CSE', 'FIST'],
    viewCount: 2340,
    publishedDate: '2026-09-23',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-05',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-05.mp4',
    title: 'The Habits That Improved My English',
    topic: 'Vocabulary Acquisition & Language Habits',
    facultyName: 'Irfana S (II-CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academicYear: '2024-25',
    subjectCode: 'HS3151',
    subjectTitle: 'Professional English & Language Habits',
    unitNumber: 2,
    thumbnailUrl: '/assets/videos/thumbs/thumb-05.jpg',
    description: 'Practical strategies and daily habits for mastering English vocabulary, effective dictionary usage, pronunciation guides, and sentence construction.',
    durationSeconds: 387,
    tags: ['English Communication', 'Vocabulary', 'Language Habits', 'Pronunciation', 'CSE'],
    viewCount: 1890,
    publishedDate: '2026-09-27',
    category: 'Humanities & Professional Communication'
  },
  {
    id: 'vid-local-06',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-06.mp4',
    title: 'Data Structures & Algorithms: Stack & LIFO Principle',
    topic: 'Stack Data Structure & LIFO Implementation',
    facultyName: 'Kanaga Durga M (B.E CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academicYear: '2024-25',
    subjectCode: 'CS3301',
    subjectTitle: 'Data Structures & Algorithms',
    unitNumber: 2,
    thumbnailUrl: '/assets/videos/thumbs/thumb-06.jpg',
    description: 'Lecture on the Stack linear data structure, Last-In-First-Out (LIFO) principle, push and pop operations, pointer management, and memory representation.',
    durationSeconds: 411,
    tags: ['Data Structures', 'Stack', 'LIFO', 'Algorithms', 'CSE'],
    viewCount: 2100,
    publishedDate: '2026-09-23',
    category: 'Core Computer Science & Programming'
  },
  {
    id: 'vid-local-07',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-07.mp4',
    title: 'MCP (Model Context Protocol): Connecting AI with Tools & Data',
    topic: 'Model Context Protocol Architecture & Tool Integration',
    facultyName: 'Akshaya Shri K (IV CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academicYear: '2024-25',
    subjectCode: 'CS3591',
    subjectTitle: 'Advanced AI Architectures & Protocols',
    unitNumber: 4,
    thumbnailUrl: '/assets/videos/thumbs/thumb-07.jpg',
    description: 'Comprehensive overview of Anthropic Model Context Protocol (MCP) as a universal connector enabling AI models to interact with files, databases, APIs, and tools.',
    durationSeconds: 361,
    tags: ['MCP', 'Model Context Protocol', 'AI Agents', 'APIs', 'CSE'],
    viewCount: 2870,
    publishedDate: '2026-09-23',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-08',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-08.mp4',
    title: 'AI Agents: Beyond Answers - Autonomous Systems & Tool Integration',
    topic: 'Agentic AI Workflows, Autonomous Planning & Execution',
    facultyName: 'Akshaya Shri K (IV CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academicYear: '2024-25',
    subjectCode: 'CS3592',
    subjectTitle: 'Agentic AI & Autonomous Systems',
    unitNumber: 1,
    thumbnailUrl: '/assets/videos/thumbs/thumb-08.jpg',
    description: 'In-depth exploration of AI Agents moving beyond static question-answering towards goal decomposition, autonomous decision making, tool calling, and multi-agent coordination.',
    durationSeconds: 356,
    tags: ['AI Agents', 'Agentic AI', 'Autonomous Workflows', 'Planning', 'CSE'],
    viewCount: 1950,
    publishedDate: '2026-09-23',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-09',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-09.mp4',
    title: 'LLM + RAG (Part 1): Understanding Modern AI & Architecture',
    topic: 'Large Language Models & Retrieval Augmented Generation Architecture',
    facultyName: 'Akshaya Shri K (IV CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academicYear: '2024-25',
    subjectCode: 'CS3593',
    subjectTitle: 'Generative AI & Retrieval Augmented Generation',
    unitNumber: 2,
    thumbnailUrl: '/assets/videos/thumbs/thumb-09.jpg',
    description: 'Deep dive into LLMs combined with Retrieval Augmented Generation (RAG), vector embeddings, document chunking, semantic retrieval, and eliminating model hallucinations.',
    durationSeconds: 394,
    tags: ['LLM', 'RAG', 'Vector Embeddings', 'Generative AI', 'CSE'],
    viewCount: 2420,
    publishedDate: '2026-09-23',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-10',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-10.mp4',
    title: 'LLM + RAG (Part 2): Semantic Retrieval & Vector Embeddings',
    topic: 'Retrieval Augmented Generation & Knowledge Grounding in Production',
    facultyName: 'Akshaya Shri K (IV CSE)',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academicYear: '2024-25',
    subjectCode: 'CS3593',
    subjectTitle: 'Generative AI & Retrieval Augmented Generation',
    unitNumber: 3,
    thumbnailUrl: '/assets/videos/thumbs/thumb-10.jpg',
    description: 'Advanced walkthrough of Retrieval Augmented Generation (RAG) pipelines, vector database querying, embedding generation, context window optimization, and hallucination reduction.',
    durationSeconds: 394,
    tags: ['LLM', 'RAG', 'Vector Embeddings', 'Generative AI', 'CSE'],
    viewCount: 2150,
    publishedDate: '2026-09-23',
    category: 'Artificial Intelligence & Data Science'
  }
];

// Helper to get local stored videos
export const getLocalStoredVideos = (): Video[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VIDEOS));
      return DEFAULT_VIDEOS;
    }
    let parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      let modified = false;

      // Ensure all DEFAULT_VIDEOS are incorporated if missing in cached localStorage
      const existingIds = new Set(parsed.map((v: Video) => v.id));
      const missing = DEFAULT_VIDEOS.filter((v: Video) => !existingIds.has(v.id));
      if (missing.length > 0) {
        parsed = [...parsed, ...missing];
        modified = true;
      }

      // Auto-correct duration and thumbnails for local videos if outdated
      const corrected = parsed.map((v: Video) => {
        if (v.id === 'vid-local-01') {
          if (v.thumbnailUrl !== '/assets/videos/thumbs/thumb-01.jpg' || v.durationSeconds === 1280 || v.title === 'federated learning') {
            modified = true;
            return {
              ...v,
              title: 'Federated Learning: Training AI Without Sharing Raw Data',
              topic: 'Privacy-Preserving AI & Distributed Model Training',
              facultyName: 'Asifa Shereen (CSE)',
              thumbnailUrl: '/assets/videos/thumbs/thumb-01.jpg',
              durationSeconds: 240
            };
          }
        }
        if (v.id === 'vid-local-02') {
          if (v.thumbnailUrl !== '/assets/videos/thumbs/thumb-02.jpg' || v.durationSeconds === 1450 || v.title === 'web request') {
            modified = true;
            return {
              ...v,
              title: 'What Happens When You Type a URL? Behind the Scenes of a Web Request',
              topic: 'Web Request Lifecycle & Client-Server Architecture',
              facultyName: 'A. Asmath Nabila (CSE)',
              thumbnailUrl: '/assets/videos/thumbs/thumb-02.jpg',
              durationSeconds: 217
            };
          }
        }
        return v;
      });
      if (modified) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(corrected));
      }
      return corrected;
    }
  } catch (e) {
    console.error('Error reading localStorage videos:', e);
  }
  return DEFAULT_VIDEOS;
};

// Helper to save videos permanently in localStorage
export const saveVideosToLocalStorage = (videos: Video[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    // Trigger custom event so all pages re-render instantly
    window.dispatchEvent(new Event('campusiq_videos_updated'));
  } catch (e) {
    console.error('Error saving videos to localStorage:', e);
  }
};

// Fetch videos from backend MySQL API with automatic fallback to localStorage
export const fetchAllVideos = async (): Promise<Video[]> => {
  try {
    const res = await fetch('/api/videos');
    if (res.ok) {
      const json = await res.json();
      if (json && Array.isArray(json.data) && json.data.length > 0) {
        // Merge with local storage to never lose locally cached videos
        const local = getLocalStoredVideos();
        const mergedMap = new Map<string, Video>();
        
        // Put database videos
        for (const v of json.data) {
          mergedMap.set(v.id, v);
        }
        // Put any local videos not in DB yet
        for (const v of local) {
          if (!mergedMap.has(v.id)) {
            mergedMap.set(v.id, v);
          }
        }
        const mergedList = Array.from(mergedMap.values());
        saveVideosToLocalStorage(mergedList);
        return mergedList;
      }
    }
  } catch (err) {
    console.log('[videoStore] Backend API offline or unreachable, using local storage cache.');
  }

  return getLocalStoredVideos();
};

// Convert file to Base64 data URL for permanent offline backup
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Save newly uploaded video permanently to MySQL and LocalStorage
export const uploadAndPersistVideo = async (
  formData: FormData,
  metadata: {
    topicName: string;
    presentedBy: string;
    department: string;
    year: string;
    thumbnailDataUrl?: string;
    videoDataUrl?: string;
    studyMaterialDataUrl?: string;
    description?: string;
    durationSeconds?: number;
  }
): Promise<Video> => {
  let createdVideo: Video | null = null;

  // 1. Attempt upload to backend Express & MySQL
  try {
    if (metadata.durationSeconds && !formData.has('durationSeconds')) {
      formData.append('durationSeconds', metadata.durationSeconds.toString());
    }
    const res = await fetch('/api/videos/upload', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        createdVideo = json.data;
      }
    }
  } catch (err) {
    console.warn('[videoStore] Failed to upload via backend API, saving locally:', err);
  }

  // 2. If backend was offline or failed, create resilient local record
  if (!createdVideo) {
    const id = 'vid-local-' + Date.now().toString(36);
    createdVideo = {
      id,
      youtubeId: '',
      localVideoPath: metadata.videoDataUrl || '/assets/videos/campusiq-01.mp4',
      title: metadata.topicName,
      topic: metadata.topicName,
      facultyName: metadata.presentedBy,
      departmentCode: metadata.department,
      departmentId: 'dept_' + metadata.department.toLowerCase(),
      program: 'B.E',
      semester: 1,
      academicYear: metadata.year,
      subjectCode: 'GEN',
      subjectTitle: 'General Engineering',
      unitNumber: 1,
      thumbnailUrl: metadata.thumbnailDataUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      studyMaterialUrl: metadata.studyMaterialDataUrl,
      description: metadata.description || 'Manually uploaded video lecture.',
      durationSeconds: metadata.durationSeconds || 240,
      tags: [metadata.department, 'Lecture'],
      viewCount: 0,
      publishedDate: new Date().toISOString().split('T')[0],
    };
  }

  // 3. Always persist to localStorage permanently
  const current = getLocalStoredVideos();
  const updated = [createdVideo, ...current.filter((v) => v.id !== createdVideo!.id)];
  saveVideosToLocalStorage(updated);

  return createdVideo;
};
