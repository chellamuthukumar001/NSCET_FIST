import { Router } from 'express';
import { handleRagQuery } from '../controllers/ragController';
import { submitFeedback, listFeedbacks, updateFeedbackStatus } from '../controllers/feedbackController';
import { getClosedLoopIssues, advanceIssueStatus } from '../controllers/closedLoopController';
import { listVideos, getVideoById } from '../controllers/videoController';
import {
  searchEducationalVideos,
  getRelatedEducationalVideos,
  getTopSearchAnalytics
} from '../controllers/videoSearchController';
import { searchRateLimiter } from '../middleware/rateLimiter';
import { sanitizeFeedbackMiddleware } from '../middleware/piiSanitizer';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Apply auth to all API routes
router.use(authenticate);

// 1. RAG & AI Copilot Routes
router.post('/rag/query', handleRagQuery);

// 2. Feedback & PII Moderation Routes
router.post('/feedback', sanitizeFeedbackMiddleware, submitFeedback);
router.get('/feedback', listFeedbacks);
router.patch('/feedback/:id/status', requireRole(['ADMIN', 'SUPER_ADMIN', 'HOD']), updateFeedbackStatus);

// 3. Closed-Loop Remediation Routes
router.get('/closed-loop', getClosedLoopIssues);
router.patch('/closed-loop/:id', requireRole(['ADMIN', 'SUPER_ADMIN', 'HOD']), advanceIssueStatus);

// 4. Video Learning Hub Routes
router.get('/videos/search', searchRateLimiter, searchEducationalVideos);
router.get('/videos/related/:videoId', getRelatedEducationalVideos);
router.get('/videos/analytics/top-searches', getTopSearchAnalytics);
router.get('/videos', listVideos);
router.get('/videos/:id', getVideoById);

export default router;

