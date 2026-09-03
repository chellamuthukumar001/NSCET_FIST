import { Request, Response } from 'express';

// In-memory store fallback if DB is not yet connected
let feedbacks: any[] = [
  {
    id: 'fb_101',
    anonymousToken: 'anon_b8e217d4a19c',
    category: 'Laboratories',
    rating: 4,
    text: 'Computer Lab 2 systems in CSE department are functioning smoothly after the recent 16GB RAM upgrade.',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    status: 'Approved',
    sentiment: 'Positive',
    sentimentScore: 0.85,
    piiDetected: false,
    createdAt: new Date().toISOString(),
  },
];

export const submitFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, subcategory, rating, text, departmentId, departmentName, semester, anonymousToken, piiDetected, piiFlags } = req.body;

    const newFeedback = {
      id: `fb_${Date.now()}`,
      anonymousToken: anonymousToken || `anon_${Date.now().toString(36)}`,
      category: category || 'Academics',
      subcategory,
      rating: Number(rating) || 5,
      text,
      departmentId,
      departmentName: departmentName || 'Computer Science & Engineering',
      semester: Number(semester) || 5,
      status: piiDetected ? 'Contains PII' : 'Approved',
      sentiment: Number(rating) >= 4 ? 'Positive' : Number(rating) <= 2 ? 'Critical' : 'Neutral',
      sentimentScore: (Number(rating) - 3) / 2,
      piiDetected: Boolean(piiDetected),
      piiFlags: piiFlags || [],
      createdAt: new Date().toISOString(),
    };

    feedbacks.unshift(newFeedback);

    res.status(201).json({
      success: true,
      message: 'Confidential feedback submitted and scrubbed successfully',
      feedback: newFeedback,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
};

export const listFeedbacks = async (req: Request, res: Response): Promise<void> => {
  const { category, status, departmentId } = req.query;

  let result = [...feedbacks];
  if (category && category !== 'ALL') result = result.filter(f => f.category === category);
  if (status && status !== 'ALL') result = result.filter(f => f.status === status);
  if (departmentId) result = result.filter(f => f.departmentId === departmentId);

  res.json({ count: result.length, data: result });
};

export const updateFeedbackStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, moderationNotes } = req.body;

  const item = feedbacks.find(f => f.id === id);
  if (!item) {
    res.status(404).json({ error: 'Feedback entry not found' });
    return;
  }

  item.status = status;
  if (moderationNotes) item.moderationNotes = moderationNotes;
  item.moderatedAt = new Date().toISOString();
  item.moderatedBy = req.user?.name || 'Administrator';

  res.json({ success: true, feedback: item });
};

