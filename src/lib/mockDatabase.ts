import { Department, Course, Video, Feedback, ClosedLoopIssue, KnowledgeDocument, User, Notification, QuizQuestion } from '../types';

export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'dept_cse',
    code: 'CSE',
    name: 'Computer Science & Engineering',
    hodName: 'Dr. S. Karthik, Ph.D.',
    hodEmail: 'hod.cse@nscet.org',
    studentCount: 420,
    facultyCount: 24,
    satisfactionScore: 84,
    description: 'Leading innovations in software engineering, AI, cybersecurity, and intelligent computing at NSCET Theni.',
    image: '/assets/campus/academic-blocks-courtyard.jpg',
  },
  {
    id: 'dept_aids',
    code: 'AI&DS',
    name: 'Artificial Intelligence & Data Science',
    hodName: 'Dr. R. Meenakshi, Ph.D.',
    hodEmail: 'hod.aids@nscet.org',
    studentCount: 240,
    facultyCount: 14,
    satisfactionScore: 88,
    description: 'State-of-the-art curriculum in deep learning, big data analytics, and generative intelligence.',
    image: '/assets/campus/campus-aerial-overview.jpg',
  },
  {
    id: 'dept_ece',
    code: 'ECE',
    name: 'Electronics & Communication Engineering',
    hodName: 'Dr. K. Vigneshwaran, Ph.D.',
    hodEmail: 'hod.ece@nscet.org',
    studentCount: 360,
    facultyCount: 20,
    satisfactionScore: 81,
    description: 'Specializing in VLSI, embedded IoT systems, robotics, and next-gen communication technologies.',
    image: '/assets/campus/campus-sports-quad.jpg',
  },
  {
    id: 'dept_eee',
    code: 'EEE',
    name: 'Electrical & Electronics Engineering',
    hodName: 'Dr. P. Murugan, Ph.D.',
    hodEmail: 'hod.eee@nscet.org',
    studentCount: 210,
    facultyCount: 15,
    satisfactionScore: 79,
    description: 'Pioneering renewable energy, smart power grids, and electrical vehicle technology.',
    image: '/assets/campus/campus-driveway-hills.jpg',
  },
  {
    id: 'dept_mech',
    code: 'MECH',
    name: 'Mechanical Engineering',
    hodName: 'Dr. V. Selvam, Ph.D.',
    hodEmail: 'hod.mech@nscet.org',
    studentCount: 280,
    facultyCount: 18,
    satisfactionScore: 82,
    description: 'Modern robotics, CAD/CAM automation, thermodynamic design, and advanced metallurgy.',
    image: '/assets/campus/academic-blocks-courtyard.jpg',
  },
  {
    id: 'dept_civil',
    code: 'CIVIL',
    name: 'Civil Engineering',
    hodName: 'Dr. T. Anand, Ph.D.',
    hodEmail: 'hod.civil@nscet.org',
    studentCount: 190,
    facultyCount: 12,
    satisfactionScore: 80,
    description: 'Sustainable structural design, smart city infrastructure, and geotechnical innovations.',
    image: '/assets/campus/nscet-entrance-gate.jpg',
  }
];

export const MOCK_VIDEOS: Video[] = [
  {
    id: 'vid_1',
    youtubeId: '', // No youtube ID needed for local video
    localVideoPath: '/assets/videos/campusiq-01.mp4',
    title: 'Introduction to Web Development & React',
    description: 'A comprehensive guide to building modern web applications using React and Tailwind CSS.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1500,
    publishedDate: '2026-09-10',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'CS3501',
    subjectTitle: 'Full Stack Web Development',
    unitNumber: 1,
    topic: 'React JS Fundamentals',
    facultyName: 'Prof. A. WebDev',
    tags: ['React', 'Web Development', 'Frontend'],
    viewCount: 150,
    isBookmarked: false,
    userProgressSeconds: 0,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 't1', startTime: 0, endTime: 1500, text: 'Welcome to the React JS crash course. Today we will build interactive UI components.' }
    ]
  },
  {
    id: 'vid_2',
    youtubeId: '',
    localVideoPath: '/assets/videos/campusiq-02.mp4',
    title: 'Advanced Machine Learning Concepts',
    description: 'Exploring neural networks, deep learning, and advanced AI techniques for modern applications.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2200,
    publishedDate: '2026-09-11',
    departmentId: 'dept_aids',
    departmentCode: 'AI&DS',
    program: 'B.Tech Artificial Intelligence & Data Science',
    semester: 6,
    academicYear: '2026-2027',
    subjectCode: 'AI3402',
    subjectTitle: 'Machine Learning Techniques',
    unitNumber: 2,
    topic: 'Deep Learning & Neural Networks',
    facultyName: 'Dr. R. Meenakshi',
    tags: ['Machine Learning', 'Deep Learning', 'AI'],
    viewCount: 300,
    isBookmarked: true,
    userProgressSeconds: 0,
    isCompleted: false,
    category: 'Artificial Intelligence & Data Science',
    transcript: [
      { id: 't2', startTime: 0, endTime: 2200, text: 'In this session, we dive deep into neural networks and backpropagation.' }
    ]
  }
];

export const MOCK_FEEDBACK: Feedback[] = [];

export const MOCK_CLOSED_LOOP_ISSUES: ClosedLoopIssue[] = [
  {
    id: 'issue_001',
    title: 'CSE Lab 2 Workstation RAM & SSD Upgrade',
    category: 'Laboratories',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    status: 'Resolved',
    priority: 'High',
    affectedCount: 65,
    identifiedDate: '2026-02-10',
    targetResolutionDate: '2026-02-24',
    resolvedDate: '2026-02-23',
    assignedPerson: 'Er. R. Senthil (System Admin) & Dr. S. Karthik (HOD CSE)',
    description: 'Multiple student feedback reports indicated 15 systems in Lab 2 freezing during heavyweight compilation and Android Studio emulators.',
    actionTaken: 'All 30 workstations in CSE Lab 2 upgraded from 8GB to 16GB DDR4 RAM and fitted with 512GB NVMe SSDs. OS re-imaged with optimized SDK containers.',
    publicResolutionNotice: 'Workstations in CSE Lab 2 are now fully upgraded to 16GB RAM and high-speed NVMe SSDs. Student verification confirms smooth performance.',
    studentSatisfactionRating: 4.8
  },
  {
    id: 'issue_002',
    title: 'Academic Quad & Courtyard Wi-Fi Access Point Installation',
    category: 'Infrastructure',
    departmentId: 'dept_ece',
    departmentName: 'Campus Infrastructure & IT',
    status: 'In Progress',
    priority: 'Medium',
    affectedCount: 142,
    identifiedDate: '2026-02-18',
    targetResolutionDate: '2026-03-10',
    assignedPerson: 'IT Infrastructure Committee',
    description: 'Signal attenuation between Academic Block A, B and Central Courtyard causing dropped connections for students using laptops outdoors.',
    actionTaken: 'Procured 4 enterprise Aruba outdoor dual-band Wi-Fi 6 APs. Cabling completed; configuration and signal calibration underway.'
  },
  {
    id: 'issue_003',
    title: 'Theni-Bodinayakanur Route 7 Evening Bus Capacity',
    category: 'Transport',
    departmentId: 'dept_cse',
    departmentName: 'Transport Department',
    status: 'Action Planned',
    priority: 'Medium',
    affectedCount: 38,
    identifiedDate: '2026-02-22',
    targetResolutionDate: '2026-03-08',
    assignedPerson: 'Mr. P. Karuppasamy (Transport Officer)',
    description: 'Student feedback highlighted overcrowding on the 4:45 PM Route 7 bus connecting college to Bodinayakanur town.'
  }
];

export const MOCK_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'doc_001',
    title: 'NSCET Academic Regulations 2026–27: Attendance & Examination Policies',
    knowledgeType: 'OFFICIAL',
    visibility: 'PUBLIC',
    category: 'Academic Policy',
    lastUpdated: '2026-01-10',
    chunkCount: 12,
    content: `Anna University Regulation 2021 & NSCET Institutional Guidelines:
1. Minimum Attendance Requirement: Every student must secure a minimum of 75% attendance across all registered courses in each semester to be eligible to appear for the End Semester Examinations.
2. Medical Condonation: Candidates securing attendance between 65% and 74% due to verified hospitalization, illness, or participation in authorized zonal/national sports or symposia may apply for attendance condonation upon recommendation of the HOD and approval by the Principal.
3. Condonation Fee: A prescribed condonation fee of Rs. 1,000 per course applies for approved medical leaves.
4. Less than 65% Attendance: Students possessing less than 65% aggregate attendance are strictly NOT eligible to write examinations and must repeat the semester in the subsequent academic cycle.`
  },
  {
    id: 'doc_002',
    title: 'Bonafide Certificate & Official Document Application Workflow',
    knowledgeType: 'OFFICIAL',
    visibility: 'STUDENT',
    category: 'Administrative Procedures',
    lastUpdated: '2026-01-15',
    chunkCount: 6,
    content: `Procedure for Bonafide Certificate Issuance at NSCET:
1. Online Application: Students can submit an e-request via CampusIQ student portal under Administrative Services or fill out form AD-04 at the Administrative Office.
2. Verification: The application is digitally reviewed and countersigned by the Faculty Advisor and respective HOD within 24 business hours.
3. Turnaround Time: Standard digital certificates with QR verification are generated in 24 hours. Physical sealed copies for passport/bank loan purposes are dispatched from Counter 2 within 2 working days.
4. Fee: Standard bonafide certificates are issued free of charge.`
  },
  {
    id: 'doc_003',
    title: 'Training & Placement Cell: 2026–27 Campus Recruitment Eligibility & Programs',
    knowledgeType: 'OFFICIAL',
    visibility: 'STUDENT',
    category: 'Placements',
    lastUpdated: '2026-02-01',
    chunkCount: 8,
    content: `Campus Placement Guidelines:
1. Eligibility: Students maintaining a CGPA of 6.5 and above with no standing arrears are eligible for tier-1 IT services and product engineering recruitments (TCS, Infosys, Zoho, Cognizant, Kaar Tech).
2. Specialized Training: Free mandatory training programs are provided by the NSCET Placement Cell:
   - Aptitude & Logical Reasoning drills (Every Tuesday & Thursday, 4:30 PM - 6:00 PM)
   - Full-stack coding & DSA masterclasses in Python and Java
   - Personality development, mock HR interviews, and resume critiques.`
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'user_student_1',
    name: 'Vignesh R.',
    email: 'vignesh.cs22@nscet.org',
    role: 'STUDENT',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    studentId: '921022104042',
    semester: 5,
    batch: '2022-2026',
    program: 'B.E. Computer Science & Engineering',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'user_admin_1',
    name: 'Er. K. Anand',
    email: 'admin@nscet.org',
    role: 'ADMIN',
    departmentId: 'dept_cse',
    departmentName: 'Administrative Office',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'CSE Lab 2 Upgraded Workstations Available',
    message: 'Workstations in Lab 2 have been upgraded with 16GB RAM and SSDs following student feedback. Fast compilation is now live.',
    type: 'feedback_resolution',
    timestamp: '2 hours ago',
    read: false,
    link: '/student/videos'
  },
  {
    id: 'n2',
    title: 'Unit 3 DBMS Practice Quiz Ready',
    message: 'New AI-generated practice quiz on Relational Normalization (1NF, 2NF, 3NF, BCNF) is available.',
    type: 'lecture',
    timestamp: '5 hours ago',
    read: false,
    link: '/student/quiz'
  },
  {
    id: 'n3',
    title: 'Internal Assessment Test II Schedule Released',
    message: 'The schedule for IAT-2 commencing on March 18th has been published. Verify your attendance status.',
    type: 'exam',
    timestamp: '1 day ago',
    read: true,
    link: '/student/progress'
  },
  {
    id: 'n4',
    title: 'Zoho Corporation On-Campus Recruitment Drive',
    message: 'Registration for Zoho software developer roles is open for final & pre-final year students with 6.5+ CGPA.',
    type: 'placement',
    timestamp: '2 days ago',
    read: true
  }
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In React, what hook is used to manage state within a functional component?',
    options: [
      'useEffect',
      'useState',
      'useContext',
      'useReducer'
    ],
    correctAnswerIndex: 1,
    explanation: 'The useState hook is the primary mechanism for adding state to functional components in React.',
    topic: 'React JS Fundamentals',
    unitNumber: 1
  },
  {
    id: 'q2',
    question: 'What is the primary purpose of backpropagation in a neural network?',
    options: [
      'To normalize input data before processing',
      'To define the network architecture and number of layers',
      'To calculate the gradient of the loss function with respect to weights',
      'To prevent the model from overfitting during training'
    ],
    correctAnswerIndex: 2,
    explanation: 'Backpropagation computes the gradient of the loss function, allowing the optimizer (like Gradient Descent) to update weights and minimize error.',
    topic: 'Deep Learning & Neural Networks',
    unitNumber: 2
  },
  {
    id: 'q3',
    question: 'Which of the following activation functions is commonly used to introduce non-linearity in modern deep neural networks to solve the vanishing gradient problem?',
    options: [
      'Step function',
      'Sigmoid',
      'ReLU (Rectified Linear Unit)',
      'Linear function'
    ],
    correctAnswerIndex: 2,
    explanation: 'ReLU is widely used because it does not saturate for positive inputs, which helps alleviate the vanishing gradient problem common in deep networks.',
    topic: 'Deep Learning & Neural Networks',
    unitNumber: 2
  }
];
