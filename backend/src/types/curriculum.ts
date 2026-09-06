export type ModuleSectionType = 'introduction' | 'core_content' | 'knowledge_check';
export type ContentItemType = 'video' | 'doc' | 'text';

export interface ModularContentItem {
  id: string;
  moduleId: string;
  title: string;
  sectionType: ModuleSectionType;
  type: ContentItemType;
  urlOrPath: string;
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
  moduleId?: string;
  courseId?: string;
  title: string;
  passingScore: number;
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
  introduction: ModularContentItem;
  coreContent: ModularContentItem[];
  knowledgeCheck: ModularQuiz;
}

export interface ModularCourse {
  id: string;
  code: string;
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
  verificationId: string;
  issuedAt: string;
  finalScore: number;
  studentName: string;
  courseTitle: string;
  instructorName: string;
  certificateUrl?: string;
  qrCodePayload?: string;
}
