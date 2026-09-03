import { Request, Response } from 'express';

const closedLoopIssues: any[] = [
  {
    id: 'issue_089',
    title: 'Computer Lab 2 Memory & IDE Performance Upgrade',
    category: 'Laboratories',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    status: 'Resolved',
    priority: 'High',
    affectedCount: 64,
    identifiedDate: '2026-01-12',
    targetResolutionDate: '2026-01-25',
    resolvedDate: '2026-01-24',
    assignedPerson: 'Er. M. Senthil (System Admin) & Dr. S. Karthik (HOD CSE)',
    description: 'Multiple students reported Android Studio and Docker emulation crashes in Lab 2 due to 8GB RAM constraints.',
    actionTaken: 'Procured and installed 30x 16GB Crucial DDR4 RAM modules and 512GB NVMe SSD drives across all workstations.',
    publicResolutionNotice: 'All 30 systems in CSE Computer Lab 2 upgraded with 16GB RAM and NVMe SSDs. Android Studio and virtualization emulators tested and running at 60 FPS.',
    studentSatisfactionRating: 4.8,
  },
  {
    id: 'issue_092',
    title: 'Campus Central Courtyard Wi-Fi Access Point Latency',
    category: 'Infrastructure',
    departmentId: 'dept_cse',
    departmentName: 'General Campus Infrastructure',
    status: 'In Progress',
    priority: 'Medium',
    affectedCount: 110,
    identifiedDate: '2026-02-05',
    targetResolutionDate: '2026-02-28',
    assignedPerson: 'Network Infrastructure Division',
    description: 'Wi-Fi disconnects reported by day-scholar students studying in the open central academic courtyard.',
    actionTaken: 'Outdoor high-gain Cisco Wi-Fi 6 access points ordered and scheduled for mast mounting on Block A.',
    publicResolutionNotice: 'Phase 1 cabling completed. High-gain outdoor AP installation scheduled for completion by end of week.',
    studentSatisfactionRating: 4.2,
  },
];

export const getClosedLoopIssues = async (req: Request, res: Response): Promise<void> => {
  res.json({ count: closedLoopIssues.length, data: closedLoopIssues });
};

export const advanceIssueStatus = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, actionTaken, publicResolutionNotice } = req.body;

  const issue = closedLoopIssues.find(i => i.id === id);
  if (!issue) {
    res.status(404).json({ error: 'Issue not found' });
    return;
  }

  if (status) issue.status = status;
  if (actionTaken) issue.actionTaken = actionTaken;
  if (publicResolutionNotice) issue.publicResolutionNotice = publicResolutionNotice;
  issue.updatedAt = new Date().toISOString();

  res.json({ success: true, message: 'Issue status updated', issue });
};

