import { Video } from '../types';

const STORAGE_KEY = 'campusiq_uploaded_videos';

export const DEFAULT_VIDEOS: Video[] = [
  {
    id: 'vid-local-01',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-01.mp4',
    title: 'federated learning',
    topic: 'federated learning',
    facultyName: 'asifa shereen CSE',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 5,
    academicYear: '2024-25',
    subjectCode: 'CS3551',
    subjectTitle: 'Distributed & Federated Systems',
    unitNumber: 3,
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    description: 'Lecture on Federated Learning concepts, distributed machine learning architecture, and privacy-preserving model aggregation.',
    durationSeconds: 1280,
    tags: ['Machine Learning', 'Federated Learning', 'Distributed AI'],
    viewCount: 1420,
    publishedDate: '2026-09-01',
    category: 'Artificial Intelligence & Data Science'
  },
  {
    id: 'vid-local-02',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-02.mp4',
    title: 'web request',
    topic: 'web request',
    facultyName: 'asmath nabila CSE',
    departmentCode: 'CSE',
    departmentId: 'dept_cse',
    program: 'B.E',
    semester: 5,
    academicYear: '2024-25',
    subjectCode: 'CS3452',
    subjectTitle: 'Web Technology & Networks',
    unitNumber: 2,
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    description: 'Comprehensive walkthrough of HTTP/HTTPS web requests, client-server communication lifecycle, REST protocols, and response headers.',
    durationSeconds: 1450,
    tags: ['Web Technology', 'HTTP', 'REST API', 'Computer Networks'],
    viewCount: 1890,
    publishedDate: '2026-09-02',
    category: 'Systems, Networks & Security'
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
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
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
  }
): Promise<Video> => {
  let createdVideo: Video | null = null;

  // 1. Attempt upload to backend Express & MySQL
  try {
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
      durationSeconds: 120,
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
