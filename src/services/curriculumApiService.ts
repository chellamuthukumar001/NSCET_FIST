import {
  ModularCourse,
  EnrollmentRecord,
  ContentProgress,
  QuizAttempt,
  CourseCertificate,
} from '../types';
import localCoursesData from '../data/coursesData.json';

const API_BASE = 'http://localhost:5000/api/curriculum';

export interface CourseDetailResponse {
  course: ModularCourse;
  enrollment?: EnrollmentRecord;
  progress: Record<string, ContentProgress>;
  quizPassed: Record<string, boolean>;
}

// Local storage keys for resilient offline/standalone operation
const STORAGE_KEY_ENROLLMENTS = 'campusiq_curriculum_enrollments';
const STORAGE_KEY_PROGRESS = 'campusiq_curriculum_progress';
const STORAGE_KEY_ATTEMPTS = 'campusiq_curriculum_attempts';
const STORAGE_KEY_CERTS = 'campusiq_curriculum_certs';

function getLocalStore<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalStore<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {}
}

export const curriculumApiService = {
  // 1. Get all 10 courses
  async getCourses(): Promise<ModularCourse[]> {
    try {
      const res = await fetch(`${API_BASE}/courses`, {
        headers: { 'x-campusiq-role': 'STUDENT', 'x-campusiq-user-id': 'user_vignesh' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (err) {
      console.warn('[curriculumApiService] Using fallback courses data:', err);
    }
    return (localCoursesData as unknown) as ModularCourse[];
  },

  // 2. Get course details
  async getCourseDetail(courseId: string, studentId: string = 'user_vignesh'): Promise<CourseDetailResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/courses/${courseId}?studentId=${studentId}`, {
        headers: { 'x-campusiq-role': 'STUDENT', 'x-campusiq-user-id': studentId }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch (err) {
      console.warn('[curriculumApiService] Using fallback course detail:', err);
    }

    // Local fallback
    const all = (localCoursesData as unknown) as ModularCourse[];
    const course = all.find((c) => c.id === courseId);
    if (!course) return null;

    const enrollments = getLocalStore<EnrollmentRecord[]>(STORAGE_KEY_ENROLLMENTS, [
      {
        id: 'enr_1',
        studentId: 'user_vignesh',
        courseId: 'course_cs3351',
        enrolledAt: '2026-08-15T10:00:00Z',
        status: 'active',
        progressPercentage: 40.0,
        currentModuleId: 'mod_dbms_1',
        currentContentItemId: 'ci_dbms_1_core_1'
      }
    ]);
    const progressList = getLocalStore<ContentProgress[]>(STORAGE_KEY_PROGRESS, [
      {
        id: 'prog_1',
        studentId: 'user_vignesh',
        contentItemId: 'ci_dbms_1_intro',
        status: 'completed',
        watchPercentage: 100,
        scrollPercentage: 100,
        timeSpentSeconds: 300,
        lastAccessedAt: '2026-08-16T11:00:00Z'
      }
    ]);
    const attempts = getLocalStore<QuizAttempt[]>(STORAGE_KEY_ATTEMPTS, []);

    const enrollment = enrollments.find((e) => e.courseId === courseId && e.studentId === studentId);
    const progressMap: Record<string, ContentProgress> = {};
    for (const p of progressList.filter((p) => p.studentId === studentId)) {
      progressMap[p.contentItemId] = p;
    }
    const quizPassedMap: Record<string, boolean> = {};
    for (const att of attempts.filter((a) => a.studentId === studentId && a.passed)) {
      quizPassedMap[att.quizId] = true;
    }

    return { course, enrollment, progress: progressMap, quizPassed: quizPassedMap };
  },

  // 3. Enroll in course
  async enroll(courseId: string, studentId: string = 'user_vignesh'): Promise<EnrollmentRecord> {
    try {
      const res = await fetch(`${API_BASE}/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-campusiq-role': 'STUDENT',
          'x-campusiq-user-id': studentId
        },
        body: JSON.stringify({ studentId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {}

    // Local fallback
    const enrollments = getLocalStore<EnrollmentRecord[]>(STORAGE_KEY_ENROLLMENTS, []);
    let existing = enrollments.find((e) => e.courseId === courseId && e.studentId === studentId);
    if (!existing) {
      existing = {
        id: `enr_${Date.now()}`,
        studentId,
        courseId,
        enrolledAt: new Date().toISOString(),
        status: 'active',
        progressPercentage: 0
      };
      enrollments.push(existing);
      setLocalStore(STORAGE_KEY_ENROLLMENTS, enrollments);
    }
    return existing;
  },

  // 4. Update content progress (e.g. video watch % or doc scroll %)
  async updateProgress(params: {
    studentId?: string;
    contentItemId: string;
    courseId: string;
    moduleId: string;
    watchPercentage?: number;
    scrollPercentage?: number;
    timeSpentSeconds?: number;
    markComplete?: boolean;
  }): Promise<{ progress: ContentProgress; enrollment?: EnrollmentRecord; moduleCompleted: boolean }> {
    const studentId = params.studentId || 'user_vignesh';
    try {
      const res = await fetch(`${API_BASE}/progress/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-campusiq-role': 'STUDENT',
          'x-campusiq-user-id': studentId
        },
        body: JSON.stringify({ ...params, studentId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {}

    // Local fallback
    const progressList = getLocalStore<ContentProgress[]>(STORAGE_KEY_PROGRESS, []);
    let rec = progressList.find((p) => p.studentId === studentId && p.contentItemId === params.contentItemId);
    const isCompleted = Boolean(params.markComplete || (params.watchPercentage || 0) >= 90 || (params.scrollPercentage || 0) >= 90);

    if (!rec) {
      rec = {
        id: `prog_${Date.now()}`,
        studentId,
        contentItemId: params.contentItemId,
        status: isCompleted ? 'completed' : 'in_progress',
        watchPercentage: params.watchPercentage || 0,
        scrollPercentage: params.scrollPercentage || 0,
        timeSpentSeconds: params.timeSpentSeconds || 0,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
        lastAccessedAt: new Date().toISOString()
      };
      progressList.push(rec);
    } else {
      rec.watchPercentage = Math.max(rec.watchPercentage, params.watchPercentage || 0);
      rec.scrollPercentage = Math.max(rec.scrollPercentage, params.scrollPercentage || 0);
      rec.timeSpentSeconds += params.timeSpentSeconds || 0;
      rec.lastAccessedAt = new Date().toISOString();
      if (isCompleted && rec.status !== 'completed') {
        rec.status = 'completed';
        rec.completedAt = new Date().toISOString();
      }
    }
    setLocalStore(STORAGE_KEY_PROGRESS, progressList);

    return { progress: rec, moduleCompleted: false };
  },

  // 5. Submit quiz attempt
  async submitQuiz(params: {
    studentId?: string;
    quizId: string;
    courseId: string;
    moduleId?: string;
    answers: Record<string, number>;
  }): Promise<{ attempt: QuizAttempt; passed: boolean; unlockedNextModuleId?: string; courseCompleted?: boolean }> {
    const studentId = params.studentId || 'user_vignesh';
    try {
      const res = await fetch(`${API_BASE}/quizzes/${params.quizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-campusiq-role': 'STUDENT',
          'x-campusiq-user-id': studentId
        },
        body: JSON.stringify({ ...params, studentId })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {}

    // Local fallback grading
    const all = (localCoursesData as unknown) as ModularCourse[];
    const course = all.find((c) => c.id === params.courseId);
    let quiz = course?.modules.find((m) => m.id === params.moduleId)?.knowledgeCheck;
    if (!quiz && course?.finalAssessment?.id === params.quizId) {
      quiz = course.finalAssessment;
    }

    let correctCount = 0;
    const total = quiz?.questions.length || 1;
    if (quiz) {
      for (const q of quiz.questions) {
        if (params.answers[q.id] !== undefined && params.answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    }

    const score = Number(((correctCount / total) * 100).toFixed(1));
    const passed = score >= (quiz?.passingScore || 70);

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      studentId,
      quizId: params.quizId,
      score,
      totalQuestions: total,
      correctCount,
      passed,
      attemptNumber: 1,
      answers: params.answers,
      attemptedAt: new Date().toISOString()
    };

    const attempts = getLocalStore<QuizAttempt[]>(STORAGE_KEY_ATTEMPTS, []);
    attempts.push(attempt);
    setLocalStore(STORAGE_KEY_ATTEMPTS, attempts);

    return { attempt, passed, courseCompleted: passed };
  },

  // 6. Claim and verify certificates
  async claimCertificate(courseId: string, studentId: string = 'user_vignesh', studentName: string = 'Vignesh R.'): Promise<CourseCertificate> {
    try {
      const res = await fetch(`${API_BASE}/courses/${courseId}/certificate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-campusiq-role': 'STUDENT',
          'x-campusiq-user-id': studentId
        },
        body: JSON.stringify({ studentId, studentName })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {}

    const all = (localCoursesData as unknown) as ModularCourse[];
    const course = all.find((c) => c.id === courseId);
    const code = course?.code || 'CS3000';
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const verificationId = `NSCET-CERT-2026-${code}-${randomHex}`;

    const cert: CourseCertificate = {
      id: `cert_${Date.now()}`,
      studentId,
      courseId,
      verificationId,
      issuedAt: new Date().toISOString(),
      finalScore: 92.5,
      studentName,
      courseTitle: course?.title || 'Modular Degree Course',
      instructorName: course?.instructor || 'NSCET Faculty',
      certificateUrl: `/verify-certificate/${verificationId}`,
      qrCodePayload: `https://nscet.org/verify-certificate/${verificationId}`
    };

    const certs = getLocalStore<CourseCertificate[]>(STORAGE_KEY_CERTS, []);
    certs.push(cert);
    setLocalStore(STORAGE_KEY_CERTS, certs);
    return cert;
  },

  async verifyCertificate(verificationId: string): Promise<CourseCertificate | null> {
    try {
      const res = await fetch(`${API_BASE}/certificates/verify/${verificationId}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) return json.data;
      }
    } catch {}

    const certs = getLocalStore<CourseCertificate[]>(STORAGE_KEY_CERTS, []);
    const found = certs.find((c) => c.verificationId.toLowerCase() === verificationId.trim().toLowerCase());
    if (found) return found;

    if (verificationId.toUpperCase().startsWith('NSCET-CERT-')) {
      return {
        id: 'cert_demo',
        studentId: 'user_vignesh',
        courseId: 'course_cs3351',
        verificationId: verificationId.toUpperCase(),
        issuedAt: '2026-08-20T14:30:00Z',
        finalScore: 92.0,
        studentName: 'Vignesh R. (Reg No. 921022104042)',
        courseTitle: 'CS3351 Database Management Systems & SQL Architecture',
        instructorName: 'Dr. S. Karthik (HOD CSE)',
        certificateUrl: `/verify-certificate/${verificationId.toUpperCase()}`,
        qrCodePayload: `https://nscet.org/verify-certificate/${verificationId.toUpperCase()}`
      };
    }
    return null;
  }
};
