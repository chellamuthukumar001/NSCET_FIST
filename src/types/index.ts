// CAMPUSIQ Comprehensive Type System

export type Role = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN' | 'SUPER_ADMIN' | 'APPLICANT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  departmentId: string;
  departmentName: string;
  avatarUrl?: string;
  studentId?: string; // Roll number, e.g. 921022104042
  facultyId?: string;
  semester?: number;
  batch?: string;
  program?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  hodName: string;
  hodEmail: string;
  studentCount: number;
  facultyCount: number;
  satisfactionScore: number;
  description: string;
  image?: string;
}

export interface Course {
  id: string;
  code: string; // e.g. CS3351
  title: string; // e.g. Database Management Systems
  departmentId: string;
  semester: number;
  credits: number;
  facultyName: string;
  units: CourseUnit[];
}

export interface CourseUnit {
  unitNumber: number;
  title: string;
  topics: string[];
  lectureCount: number;
}

export interface TranscriptChunk {
  id: string;
  startTime: number; // in seconds
  endTime: number;
  text: string;
  speaker?: string;
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  durationSeconds: number;
  publishedDate: string;
  departmentId: string;
  departmentCode: string;
  program: string;
  semester: number;
  academicYear: string;
  subjectCode: string;
  subjectTitle: string;
  unitNumber: number;
  topic: string;
  facultyName: string;
  tags: string[];
  viewCount: number;
  isBookmarked?: boolean;
  userProgressSeconds?: number;
  isCompleted?: boolean;
  transcript?: TranscriptChunk[];
  category?: string;
}

export type FeedbackCategory =
  | 'Academics'
  | 'Faculty'
  | 'Infrastructure'
  | 'Laboratories'
  | 'Library'
  | 'Hostel'
  | 'Transport'
  | 'Campus Life'
  | 'Extracurricular Activities'
  | 'Placements'
  | 'Administration'
  | 'Other';

export type ModerationStatus =
  | 'Pending'
  | 'Approved'
  | 'Rejected'
  | 'Needs Review'
  | 'Spam'
  | 'Contains PII'
  | 'Abusive'
  | 'Duplicate';

export type SentimentType = 'Positive' | 'Neutral' | 'Critical';

export interface Feedback {
  id: string;
  anonymousToken: string; // Cryptographic one-way token e.g. anon_7f9c2d1b
  category: FeedbackCategory;
  subcategory?: string;
  rating: number; // 1 to 5
  text: string;
  departmentId?: string;
  departmentName?: string;
  semester?: number;
  createdAt: string;
  status: ModerationStatus;
  sentiment: SentimentType;
  sentimentScore: number; // -1.0 to 1.0
  piiDetected: boolean;
  piiFlags?: string[];
  moderationNotes?: string;
  moderatedAt?: string;
  moderatedBy?: string;
  linkedIssueId?: string;
}

export type ClosedLoopStatus =
  | 'Identified'
  | 'Acknowledged'
  | 'Investigating'
  | 'Action Planned'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

export interface ClosedLoopIssue {
  id: string;
  title: string;
  category: FeedbackCategory;
  departmentId: string;
  departmentName: string;
  status: ClosedLoopStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  affectedCount: number;
  identifiedDate: string;
  targetResolutionDate: string;
  resolvedDate?: string;
  assignedPerson: string;
  description: string;
  actionTaken?: string;
  publicResolutionNotice?: string;
  studentSatisfactionRating?: number;
}

export type KnowledgeDomain = 'OFFICIAL' | 'LEARNING' | 'STUDENT_VOICE';

export type VisibilityLevel =
  | 'PUBLIC'
  | 'STUDENT'
  | 'FACULTY'
  | 'HOD'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface KnowledgeDocument {
  id: string;
  title: string;
  knowledgeType: KnowledgeDomain;
  visibility: VisibilityLevel;
  departmentId?: string;
  content: string;
  sourceUrl?: string;
  category: string;
  lastUpdated: string;
  chunkCount: number;
}

export type ConfidenceScore = 'HIGH' | 'MODERATE' | 'INSUFFICIENT_EVIDENCE';

export interface SourceCitation {
  id: string;
  title: string;
  sourceType: KnowledgeDomain;
  reference: string;
  snippet: string;
  timestamp?: string; // e.g. 14:20-16:45
  videoTimestampSeconds?: number;
  videoId?: string;
  relevanceScore: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language?: 'en' | 'ta';
  citations?: SourceCitation[];
  confidence?: ConfidenceScore;
  followUpQuestions?: string[];
  isStreaming?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
  unitNumber?: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'lecture' | 'exam' | 'notice' | 'placement' | 'feedback_resolution';
  timestamp: string;
  read: boolean;
  link?: string;
}

// ==========================================================
// MODULAR LEARNING PLATFORM (SWAYAM / SIMPLILEARN / NPTEL)
// ==========================================================

export type ModuleSectionType = 'introduction' | 'core_content' | 'knowledge_check';
export type ContentItemType = 'video' | 'doc' | 'text';

export interface ModularContentItem {
  id: string;
  moduleId: string;
  title: string;
  sectionType: ModuleSectionType;
  type: ContentItemType;
  urlOrPath: string; // YouTube videoId or PDF asset path or markdown body
  orderIndex: number;
  durationSeconds?: number;
  summary?: string;
  documentPages?: number;
  metadata?: {
    facultyName?: string;
    keyTakeaways?: string[];
    slidesUrl?: string;
    transcriptExcerpt?: string;
  };
}

export interface ModularQuizQuestion {
  id: string;
  quizId: string;
  question: string;
  questionType: 'mcq' | 'true_false';
  options: string[];
  correctAnswer: number;
  explanation: string;
  orderIndex: number;
  points?: number;
}

export interface ModularQuiz {
  id: string;
  moduleId?: string; // Set for module Knowledge Check
  courseId?: string; // Set for Final Course Assessment
  title: string;
  passingScore: number; // percentage (e.g. 70)
  timeLimitMinutes: number;
  isFinalAssessment: boolean;
  questions: ModularQuizQuestion[];
}

export interface ModularCourseModule {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number;
  description: string;
  estimatedMinutes: number;
  introduction: ModularContentItem; // Exactly ONE
  coreContent: ModularContentItem[]; // One or more, ordered
  knowledgeCheck: ModularQuiz;       // Exactly ONE
}

export interface ModularCourse {
  id: string;
  code: string; // e.g. CS3351
  title: string;
  description: string;
  department: string;
  departmentId: string;
  instructor: string;
  instructorTitle: string;
  thumbnailUrl: string;
  semester: number;
  credits: number;
  difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  totalDurationHours: number;
  prerequisites: string[];
  learningOutcomes: string[];
  modules: ModularCourseModule[];
  finalAssessment?: ModularQuiz;
  enrolledCount?: number;
}

export interface ContentProgress {
  id: string;
  studentId: string;
  contentItemId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  watchPercentage: number;
  scrollPercentage: number;
  timeSpentSeconds: number;
  completedAt?: string;
  lastAccessedAt: string;
}

export interface EnrollmentRecord {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
  progressPercentage: number;
  completedAt?: string;
  currentModuleId?: string;
  currentContentItemId?: string;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  attemptNumber: number;
  answers: Record<string, number>;
  attemptedAt: string;
}

export interface CourseCertificate {
  id: string;
  studentId: string;
  courseId: string;
  verificationId: string; // e.g. NSCET-CERT-2026-CS3351-84B2
  issuedAt: string;
  finalScore: number;
  studentName: string;
  courseTitle: string;
  instructorName: string;
  certificateUrl?: string;
  qrCodePayload?: string;
}

