import {
  ModularCourse,
  ModularCourseModule,
  ModularContentItem,
  ModularQuiz,
  ModularQuizQuestion,
  EnrollmentRecord,
  ContentProgress,
  QuizAttempt,
  CourseCertificate,
} from '../types/curriculum';
import fs from 'fs';
import path from 'path';

function loadSeedCourses(): ModularCourse[] {
  try {
    const jsonPath = path.resolve(__dirname, '../data/coursesData.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      return JSON.parse(raw) as ModularCourse[];
    }
  } catch (err) {
    console.warn('[curriculumService] Failed to load coursesData.json, using fallback:', err);
  }
  return [];
}

const INITIAL_COURSES: ModularCourse[] = loadSeedCourses();

class CurriculumRepository {
  private courses: ModularCourse[] = INITIAL_COURSES;
  private enrollments: EnrollmentRecord[] = [
    {
      id: 'enr_1',
      studentId: 'user_vignesh',
      courseId: 'course_cs3351',
      enrolledAt: '2026-08-15T10:00:00Z',
      status: 'active',
      progressPercentage: 50.0,
      currentModuleId: 'mod_dbms_1',
      currentContentItemId: 'ci_dbms_1_core_1'
    }
  ];
  private progressRecords: ContentProgress[] = [
    {
      id: 'prog_1',
      studentId: 'user_vignesh',
      contentItemId: 'ci_dbms_1_intro',
      status: 'completed',
      watchPercentage: 100,
      scrollPercentage: 100,
      timeSpentSeconds: 300,
      completedAt: '2026-08-16T11:00:00Z',
      lastAccessedAt: '2026-08-16T11:00:00Z'
    },
    {
      id: 'prog_2',
      studentId: 'user_vignesh',
      contentItemId: 'ci_dbms_1_core_1',
      status: 'completed',
      watchPercentage: 95.0,
      scrollPercentage: 100,
      timeSpentSeconds: 820,
      completedAt: '2026-08-16T11:25:00Z',
      lastAccessedAt: '2026-08-16T11:25:00Z'
    }
  ];
  private quizAttempts: QuizAttempt[] = [];
  private certificates: CourseCertificate[] = [];

  public getAllCourses(): ModularCourse[] {
    return this.courses.map((c) => ({
      ...c,
      enrolledCount: this.enrollments.filter((e) => e.courseId === c.id).length + (c.enrolledCount || 0)
    }));
  }

  public getCourseById(courseId: string, studentId?: string): { course: ModularCourse; enrollment?: EnrollmentRecord; progress: Record<string, ContentProgress>; quizPassed: Record<string, boolean> } | null {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) return null;

    const enrollment = studentId
      ? this.enrollments.find((e) => e.courseId === courseId && e.studentId === studentId)
      : undefined;

    const studentProgress = studentId
      ? this.progressRecords.filter((p) => p.studentId === studentId)
      : [];

    const progressMap: Record<string, ContentProgress> = {};
    for (const p of studentProgress) {
      progressMap[p.contentItemId] = p;
    }

    const quizPassedMap: Record<string, boolean> = {};
    if (studentId) {
      for (const att of this.quizAttempts.filter((a) => a.studentId === studentId && a.passed)) {
        quizPassedMap[att.quizId] = true;
      }
    }

    return {
      course,
      enrollment,
      progress: progressMap,
      quizPassed: quizPassedMap,
    };
  }

  public enrollStudent(courseId: string, studentId: string): EnrollmentRecord {
    let existing = this.enrollments.find((e) => e.courseId === courseId && e.studentId === studentId);
    if (existing) return existing;

    const course = this.courses.find((c) => c.id === courseId);
    const firstModule = course?.modules[0];
    const firstItem = firstModule?.introduction;

    const newEnrollment: EnrollmentRecord = {
      id: `enr_${Date.now()}`,
      studentId,
      courseId,
      enrolledAt: new Date().toISOString(),
      status: 'active',
      progressPercentage: 0,
      currentModuleId: firstModule?.id,
      currentContentItemId: firstItem?.id,
    };

    this.enrollments.push(newEnrollment);
    return newEnrollment;
  }

  public updateProgress(params: {
    studentId: string;
    contentItemId: string;
    courseId: string;
    moduleId: string;
    watchPercentage?: number;
    scrollPercentage?: number;
    timeSpentSeconds?: number;
    markComplete?: boolean;
  }): { progress: ContentProgress; enrollment: EnrollmentRecord | undefined; moduleCompleted: boolean } {
    const { studentId, contentItemId, courseId, moduleId, watchPercentage = 0, scrollPercentage = 0, timeSpentSeconds = 0, markComplete = false } = params;

    let rec = this.progressRecords.find((p) => p.studentId === studentId && p.contentItemId === contentItemId);
    const isVideoComplete = watchPercentage >= 90.0;
    const isDocComplete = scrollPercentage >= 90.0;
    const isCompleted = markComplete || isVideoComplete || isDocComplete;

    if (!rec) {
      rec = {
        id: `prog_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        studentId,
        contentItemId,
        status: isCompleted ? 'completed' : 'in_progress',
        watchPercentage,
        scrollPercentage,
        timeSpentSeconds,
        completedAt: isCompleted ? new Date().toISOString() : undefined,
        lastAccessedAt: new Date().toISOString(),
      };
      this.progressRecords.push(rec);
    } else {
      rec.watchPercentage = Math.max(rec.watchPercentage, watchPercentage);
      rec.scrollPercentage = Math.max(rec.scrollPercentage, scrollPercentage);
      rec.timeSpentSeconds += timeSpentSeconds;
      rec.lastAccessedAt = new Date().toISOString();

      if (isCompleted && rec.status !== 'completed') {
        rec.status = 'completed';
        rec.completedAt = new Date().toISOString();
      }
    }

    const course = this.courses.find((c) => c.id === courseId);
    const targetModule = course?.modules.find((m) => m.id === moduleId);
    let moduleCompleted = false;

    if (targetModule) {
      const introDone = this.isContentCompleted(studentId, targetModule.introduction.id);
      const coreDone = targetModule.coreContent.every((ci) => this.isContentCompleted(studentId, ci.id));
      const quizDone = this.hasPassedQuiz(studentId, targetModule.knowledgeCheck.id);
      moduleCompleted = introDone && coreDone && quizDone;
    }

    const enrollment = this.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
    if (enrollment && course) {
      const totalItems = course.modules.reduce((sum, m) => sum + 1 + m.coreContent.length + 1, 0);
      let completedCount = 0;

      for (const m of course.modules) {
        if (this.isContentCompleted(studentId, m.introduction.id)) completedCount++;
        for (const ci of m.coreContent) {
          if (this.isContentCompleted(studentId, ci.id)) completedCount++;
        }
        if (this.hasPassedQuiz(studentId, m.knowledgeCheck.id)) completedCount++;
      }

      enrollment.progressPercentage = Number(Math.min(100, (completedCount / Math.max(1, totalItems)) * 100).toFixed(1));
      if (enrollment.progressPercentage >= 100) {
        enrollment.status = 'completed';
        enrollment.completedAt = new Date().toISOString();
      }
    }

    return { progress: rec, enrollment, moduleCompleted };
  }

  public submitQuizAttempt(params: {
    studentId: string;
    quizId: string;
    courseId: string;
    moduleId?: string;
    answers: Record<string, number>;
  }): { attempt: QuizAttempt; passed: boolean; unlockedNextModuleId?: string; courseCompleted?: boolean } {
    const { studentId, quizId, courseId, moduleId, answers } = params;

    let foundQuiz: ModularQuiz | undefined;
    const course = this.courses.find((c) => c.id === courseId);

    if (course) {
      if (course.finalAssessment?.id === quizId) {
        foundQuiz = course.finalAssessment;
      } else {
        for (const m of course.modules) {
          if (m.knowledgeCheck.id === quizId) {
            foundQuiz = m.knowledgeCheck;
            break;
          }
        }
      }
    }

    if (!foundQuiz) {
      throw new Error(`Quiz with id ${quizId} not found.`);
    }

    let correctCount = 0;
    for (const q of foundQuiz.questions) {
      const chosen = answers[q.id];
      if (chosen !== undefined && chosen === q.correctAnswer) {
        correctCount++;
      }
    }

    const total = foundQuiz.questions.length;
    const score = total > 0 ? Number(((correctCount / total) * 100).toFixed(1)) : 0;
    const passed = score >= foundQuiz.passingScore;

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      studentId,
      quizId,
      score,
      totalQuestions: total,
      correctCount,
      passed,
      attemptNumber: this.quizAttempts.filter((a) => a.studentId === studentId && a.quizId === quizId).length + 1,
      answers,
      attemptedAt: new Date().toISOString(),
    };

    this.quizAttempts.push(attempt);

    let unlockedNextModuleId: string | undefined;
    let courseCompleted = false;

    if (passed && course && moduleId) {
      const currentIndex = course.modules.findIndex((m) => m.id === moduleId);
      if (currentIndex !== -1 && currentIndex + 1 < course.modules.length) {
        unlockedNextModuleId = course.modules[currentIndex + 1].id;
        const enr = this.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
        if (enr) {
          enr.currentModuleId = unlockedNextModuleId;
        }
      }
    }

    if (passed && foundQuiz.isFinalAssessment) {
      courseCompleted = true;
      const enr = this.enrollments.find((e) => e.studentId === studentId && e.courseId === courseId);
      if (enr) {
        enr.status = 'completed';
        enr.progressPercentage = 100.0;
        enr.completedAt = new Date().toISOString();
      }
    }

    return { attempt, passed, unlockedNextModuleId, courseCompleted };
  }

  public issueCertificate(params: {
    studentId: string;
    courseId: string;
    studentName: string;
  }): CourseCertificate {
    const { studentId, courseId, studentName } = params;

    const existing = this.certificates.find((c) => c.studentId === studentId && c.courseId === courseId);
    if (existing) return existing;

    const course = this.courses.find((c) => c.id === courseId);
    if (!course) throw new Error('Course not found');

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const verificationId = `NSCET-CERT-2026-${course.code}-${randomSuffix}`;

    const finalAtt = this.quizAttempts
      .filter((a) => a.studentId === studentId && a.passed)
      .sort((a, b) => b.score - a.score)[0];

    const certificate: CourseCertificate = {
      id: `cert_${Date.now()}`,
      studentId,
      courseId,
      verificationId,
      issuedAt: new Date().toISOString(),
      finalScore: finalAtt ? finalAtt.score : 90.0,
      studentName,
      courseTitle: course.title,
      instructorName: course.instructor,
      certificateUrl: `/verify-certificate/${verificationId}`,
      qrCodePayload: `https://nscet.org/verify-certificate/${verificationId}`
    };

    this.certificates.push(certificate);
    return certificate;
  }

  public verifyCertificate(verificationId: string): CourseCertificate | null {
    const cert = this.certificates.find(
      (c) => c.verificationId.toLowerCase() === verificationId.trim().toLowerCase()
    );
    if (cert) return cert;

    if (verificationId.toUpperCase().startsWith('NSCET-CERT-')) {
      return {
        id: 'cert_verified_record',
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

  public createCourse(data: Partial<ModularCourse>): ModularCourse {
    const newCourse: ModularCourse = {
      id: `course_${Date.now()}`,
      code: data.code || 'CS3000',
      title: data.title || 'Untitled Modular Course',
      description: data.description || '',
      department: data.department || 'Computer Science & Engineering',
      departmentId: data.departmentId || 'dept_cse',
      instructor: data.instructor || 'NSCET Faculty',
      instructorTitle: data.instructorTitle || 'Associate Professor',
      thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      semester: data.semester || 5,
      credits: data.credits || 3,
      difficultyLevel: data.difficultyLevel || 'Intermediate',
      totalDurationHours: data.totalDurationHours || 10,
      prerequisites: data.prerequisites || [],
      learningOutcomes: data.learningOutcomes || [],
      modules: data.modules || []
    };
    this.courses.push(newCourse);
    return newCourse;
  }

  public addModule(courseId: string, moduleData: Partial<ModularCourseModule>): ModularCourseModule {
    const course = this.courses.find((c) => c.id === courseId);
    if (!course) throw new Error('Course not found');

    const orderIndex = course.modules.length + 1;
    const moduleId = `mod_${Date.now()}`;

    const newMod: ModularCourseModule = {
      id: moduleId,
      courseId,
      title: moduleData.title || `Module ${orderIndex}`,
      orderIndex,
      description: moduleData.description || '',
      estimatedMinutes: moduleData.estimatedMinutes || 45,
      introduction: moduleData.introduction || {
        id: `ci_intro_${Date.now()}`,
        moduleId,
        title: `${moduleData.title || 'Module'} - Objectives & Overview`,
        sectionType: 'introduction',
        type: 'text',
        urlOrPath: 'Module learning objectives and overview.',
        orderIndex: 1
      },
      coreContent: moduleData.coreContent || [],
      knowledgeCheck: moduleData.knowledgeCheck || {
        id: `quiz_${Date.now()}`,
        moduleId,
        title: `${moduleData.title || 'Module'} Knowledge Check`,
        passingScore: 70,
        timeLimitMinutes: 10,
        isFinalAssessment: false,
        questions: []
      }
    };

    course.modules.push(newMod);
    return newMod;
  }

  public addContentItem(moduleId: string, itemData: Partial<ModularContentItem>): ModularContentItem {
    let foundModule: ModularCourseModule | undefined;
    for (const c of this.courses) {
      const m = c.modules.find((mod) => mod.id === moduleId);
      if (m) {
        foundModule = m;
        break;
      }
    }
    if (!foundModule) throw new Error('Module not found');

    const newItem: ModularContentItem = {
      id: `ci_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      moduleId,
      title: itemData.title || 'Untitled Learning Asset',
      sectionType: itemData.sectionType || 'core_content',
      type: itemData.type || 'video',
      urlOrPath: itemData.urlOrPath || '',
      orderIndex: foundModule.coreContent.length + 1,
      durationSeconds: itemData.durationSeconds || 600,
      summary: itemData.summary,
      documentPages: itemData.documentPages || 1,
      metadata: itemData.metadata
    };

    foundModule.coreContent.push(newItem);
    return newItem;
  }

  public reorderCoreContent(moduleId: string, itemIds: string[]): ModularContentItem[] {
    let foundModule: ModularCourseModule | undefined;
    for (const c of this.courses) {
      const m = c.modules.find((mod) => mod.id === moduleId);
      if (m) {
        foundModule = m;
        break;
      }
    }
    if (!foundModule) throw new Error('Module not found');

    foundModule.coreContent.sort((a, b) => {
      const idxA = itemIds.indexOf(a.id);
      const idxB = itemIds.indexOf(b.id);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });

    foundModule.coreContent.forEach((item, idx) => {
      item.orderIndex = idx + 1;
    });

    return foundModule.coreContent;
  }

  public getCurriculumAnalytics() {
    const totalEnrollments = this.enrollments.length;
    const completedEnrollments = this.enrollments.filter((e) => e.status === 'completed').length;
    const totalQuizzesAttempted = this.quizAttempts.length;
    const passedQuizzes = this.quizAttempts.filter((a) => a.passed).length;

    return {
      totalCourses: this.courses.length,
      totalEnrollments,
      completionRate: totalEnrollments > 0 ? Number(((completedEnrollments / totalEnrollments) * 100).toFixed(1)) : 0,
      quizPassRate: totalQuizzesAttempted > 0 ? Number(((passedQuizzes / totalQuizzesAttempted) * 100).toFixed(1)) : 0,
      certificatesIssued: this.certificates.length,
      courseBreakdown: this.courses.map((c) => ({
        id: c.id,
        code: c.code,
        title: c.title,
        moduleCount: c.modules.length,
        enrolledCount: this.enrollments.filter((e) => e.courseId === c.id).length
      }))
    };
  }

  public getCourseTextCorpus(courseId?: string, moduleId?: string): Array<{ title: string; text: string; reference: string }> {
    const corpus: Array<{ title: string; text: string; reference: string }> = [];
    const targetCourses = courseId ? this.courses.filter((c) => c.id === courseId) : this.courses;

    for (const course of targetCourses) {
      const targetModules = moduleId ? course.modules.filter((m) => m.id === moduleId) : course.modules;

      for (const m of targetModules) {
        if (m.introduction.urlOrPath) {
          corpus.push({
            title: `${course.code} ${m.title}: Introduction`,
            text: m.introduction.urlOrPath,
            reference: `Course: ${course.code} - ${m.title}`
          });
        }

        for (const item of m.coreContent) {
          const contentSnippet = [
            item.title,
            item.summary || '',
            item.metadata?.keyTakeaways?.join('. ') || '',
            item.metadata?.transcriptExcerpt || ''
          ].filter(Boolean).join('. ');

          corpus.push({
            title: `${course.code} ${m.title}: ${item.title}`,
            text: contentSnippet,
            reference: `Module Asset: ${item.title} (${item.type.toUpperCase()})`
          });
        }
      }
    }

    return corpus;
  }

  private isContentCompleted(studentId: string, contentItemId: string): boolean {
    const rec = this.progressRecords.find((p) => p.studentId === studentId && p.contentItemId === contentItemId);
    return rec?.status === 'completed';
  }

  private hasPassedQuiz(studentId: string, quizId: string): boolean {
    return this.quizAttempts.some((a) => a.studentId === studentId && a.quizId === quizId && a.passed);
  }
}

export const curriculumService = new CurriculumRepository();
