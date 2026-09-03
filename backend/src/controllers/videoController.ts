import { Request, Response } from 'express';

const videos = [
  {
    id: 'vid_1',
    youtubeId: 'kBdlM6hNDAE',
    title: 'CS3351 DBMS: Relational Database Normalization (1NF to BCNF)',
    description: 'Anna University Regulation 2021 Unit 3 masterclass on functional dependency theory and Boyce-Codd Normal Form.',
    durationSeconds: 1460,
    departmentCode: 'CSE',
    semester: 5,
    subjectCode: 'CS3351',
    subjectTitle: 'Database Management Systems',
    unitNumber: 3,
    facultyName: 'Dr. S. Karthik (HOD CSE)',
    viewCount: 1420,
    transcript: [
      { id: 'c1', startTime: 0, endTime: 180, text: 'Welcome students to Unit 3: Relational Database Design and Normalization.' },
      { id: 'c2', startTime: 180, endTime: 480, text: 'What is a Functional Dependency? Given relation R, X determines Y if each X value is associated with precisely one Y value.' },
      { id: 'c3', startTime: 480, endTime: 860, text: 'First Normal Form mandates attribute atomicity and no repeating groups.' },
      { id: 'c4', startTime: 860, endTime: 1200, text: 'Second Normal Form eliminates partial functional dependencies on any candidate key.' },
      { id: 'c5', startTime: 1200, endTime: 1460, text: 'Third Normal Form and BCNF: Every non-trivial dependency X -> Y must have X as a Superkey.' },
    ],
  },
  {
    id: 'vid_2',
    youtubeId: '26QPDBe-NB8',
    title: 'CS3451 Operating Systems: CPU Scheduling Algorithms',
    description: 'Detailed analysis of FCFS, SJF, Priority, and Round Robin scheduling algorithms with Gantt chart calculations.',
    durationSeconds: 1820,
    departmentCode: 'CSE',
    semester: 4,
    subjectCode: 'CS3451',
    subjectTitle: 'Operating Systems',
    unitNumber: 2,
    facultyName: 'Dr. M. Deepa (AP / CSE)',
    viewCount: 1890,
  },
];

export const listVideos = async (req: Request, res: Response): Promise<void> => {
  const { department, semester, unit, search } = req.query;

  let result = [...videos];
  if (department && department !== 'ALL') {
    result = result.filter(v => v.departmentCode === department);
  }
  if (semester && semester !== 'ALL') {
    result = result.filter(v => v.semester === Number(semester));
  }
  if (unit && unit !== 'ALL') {
    result = result.filter(v => v.unitNumber === Number(unit));
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.subjectTitle.toLowerCase().includes(q) ||
      v.facultyName.toLowerCase().includes(q)
    );
  }

  res.json({ count: result.length, data: result });
};

export const getVideoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const video = videos.find(v => v.id === id);

  if (!video) {
    res.status(404).json({ error: 'Video lecture not found' });
    return;
  }

  res.json(video);
};

