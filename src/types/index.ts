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
  language?: 'en' | 'ta' | 'hi';
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
