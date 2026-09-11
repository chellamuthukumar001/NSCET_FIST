import { Router } from 'express';
import { handleRagQuery } from '../controllers/ragController';
import { listVideos, getVideoById, createVideo } from '../controllers/videoController';
import {
  searchEducationalVideos,
  getRelatedEducationalVideos,
  getTopSearchAnalytics
} from '../controllers/videoSearchController';
import { searchRateLimiter } from '../middleware/rateLimiter';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Apply auth to all API routes
router.use(authenticate);

// 1. Academic RAG & AI Copilot Routes
router.post('/rag/query', handleRagQuery);

// 2. Video Learning Hub Routes
router.get('/videos/search', searchRateLimiter, searchEducationalVideos);
router.get('/videos/related/:videoId', getRelatedEducationalVideos);
router.get('/videos/analytics/top-searches', getTopSearchAnalytics);
router.get('/videos', listVideos);
router.get('/videos/:id', getVideoById);
router.post('/videos', createVideo);

// 5. Modular Curriculum & Learning Platform Routes (SWAYAM / Simplilearn Model)
import {
  listCourses,
  getCourseDetail,
  enrollInCourse,
  updateContentProgress,
  submitQuiz,
  claimCertificate,
  verifyCertificate,
  adminCreateCourse,
  adminAddModule,
  adminAddContentItem,
  adminReorderContent,
  getCurriculumAnalytics
} from '../controllers/curriculumController';

router.get('/curriculum/courses', listCourses);
router.get('/curriculum/courses/:id', getCourseDetail);
router.post('/curriculum/courses/:id/enroll', enrollInCourse);
router.post('/curriculum/progress/update', updateContentProgress);
router.post('/curriculum/quizzes/:id/submit', submitQuiz);
router.post('/curriculum/courses/:id/certificate', claimCertificate);
router.get('/curriculum/certificates/verify/:verificationId', verifyCertificate);

// Admin / Faculty Curriculum Management
router.post('/curriculum/courses', requireRole(['ADMIN', 'SUPER_ADMIN', 'FACULTY']), adminCreateCourse);
router.post('/curriculum/modules', requireRole(['ADMIN', 'SUPER_ADMIN', 'FACULTY']), adminAddModule);
router.post('/curriculum/content-items', requireRole(['ADMIN', 'SUPER_ADMIN', 'FACULTY']), adminAddContentItem);
router.put('/curriculum/content-items/reorder', requireRole(['ADMIN', 'SUPER_ADMIN', 'FACULTY']), adminReorderContent);
router.get('/curriculum/analytics', requireRole(['ADMIN', 'SUPER_ADMIN', 'HOD', 'FACULTY']), getCurriculumAnalytics);

export default router;

