import { Request, Response } from 'express';
import { curriculumService } from '../services/curriculumService';

export const listCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const courses = curriculumService.getAllCourses();
    res.json({ success: true, count: courses.length, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseDetail = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const studentId = (req.query.studentId as string) || (req as any).user?.id || 'user_vignesh';

    const result = curriculumService.getCourseById(id, studentId);
    if (!result) {
      res.status(404).json({ success: false, message: 'Course not found' });
      return;
    }

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const enrollInCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const studentId = req.body.studentId || (req as any).user?.id || 'user_vignesh';

    const enrollment = curriculumService.enrollStudent(id, studentId);
    res.json({ success: true, message: 'Successfully enrolled in course', data: enrollment });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateContentProgress = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      contentItemId,
      courseId,
      moduleId,
      watchPercentage,
      scrollPercentage,
      timeSpentSeconds,
      markComplete,
    } = req.body;

    const studentId = req.body.studentId || (req as any).user?.id || 'user_vignesh';

    if (!contentItemId || !courseId || !moduleId) {
      res.status(400).json({ success: false, message: 'Missing required parameters (contentItemId, courseId, moduleId)' });
      return;
    }

    const result = curriculumService.updateProgress({
      studentId,
      contentItemId,
      courseId,
      moduleId,
      watchPercentage: Number(watchPercentage) || 0,
      scrollPercentage: Number(scrollPercentage) || 0,
      timeSpentSeconds: Number(timeSpentSeconds) || 0,
      markComplete: Boolean(markComplete)
    });

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuiz = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { courseId, moduleId, answers } = req.body;
    const studentId = req.body.studentId || (req as any).user?.id || 'user_vignesh';

    if (!courseId || !answers) {
      res.status(400).json({ success: false, message: 'Missing courseId or answers map' });
      return;
    }

    const result = curriculumService.submitQuizAttempt({
      studentId,
      quizId: id,
      courseId,
      moduleId,
      answers: answers || {}
    });

    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const claimCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id); // courseId
    const studentId = req.body.studentId || (req as any).user?.id || 'user_vignesh';
    const studentName = req.body.studentName || 'Vignesh R. (Reg No. 921022104042)';

    const certificate = curriculumService.issueCertificate({
      studentId,
      courseId: id,
      studentName
    });

    res.json({ success: true, message: 'Certificate issued successfully', data: certificate });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyCertificate = async (req: Request, res: Response): Promise<void> => {
  try {
    const verificationId = String(req.params.verificationId);
    const cert = curriculumService.verifyCertificate(verificationId);

    if (!cert) {
      res.status(404).json({ success: false, message: 'Certificate verification failed: Invalid verification ID.' });
      return;
    }

    res.json({ success: true, verified: true, data: cert });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminCreateCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const course = curriculumService.createCourse(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminAddModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      res.status(400).json({ success: false, message: 'Missing courseId' });
      return;
    }
    const module = curriculumService.addModule(courseId, req.body);
    res.status(201).json({ success: true, data: module });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminAddContentItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.body;
    if (!moduleId) {
      res.status(400).json({ success: false, message: 'Missing moduleId' });
      return;
    }
    const item = curriculumService.addContentItem(moduleId, req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const adminReorderContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId, itemIds } = req.body;
    if (!moduleId || !Array.isArray(itemIds)) {
      res.status(400).json({ success: false, message: 'Missing moduleId or itemIds array' });
      return;
    }
    const items = curriculumService.reorderCoreContent(moduleId, itemIds);
    res.json({ success: true, data: items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCurriculumAnalytics = async (req: Request, res: Response): Promise<void> => {
  try {
    const analytics = curriculumService.getCurriculumAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
