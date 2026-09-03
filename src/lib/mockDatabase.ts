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
    youtubeId: 'kBdlM6hNDAE', // Relational Database Normalization
    title: 'Database Normalization: 1NF, 2NF, 3NF & BCNF Explained with Examples',
    description: 'Comprehensive Anna University Regulation 2021 lecture on Relational Database Normalization. Covers functional dependencies, anomaly reduction, lossless join decomposition, and BCNF conversion.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2140, // 35:40
    publishedDate: '2026-02-15',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'CS3351',
    subjectTitle: 'Database Management Systems',
    unitNumber: 3,
    topic: 'Relational Database Design & Normalization',
    facultyName: 'Dr. S. Karthik',
    tags: ['DBMS', 'Normalization', '3NF', 'BCNF', 'SQL', 'CS3351'],
    viewCount: 1420,
    isBookmarked: true,
    userProgressSeconds: 1280,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 't1', startTime: 0, endTime: 180, text: 'Welcome students to Unit 3 of Database Management Systems. Today we analyze database anomalies: Insertion, Deletion, and Update anomalies.' },
      { id: 't2', startTime: 181, endTime: 490, text: 'First Normal Form (1NF) mandates that all attributes have atomic values, and no repeating groups exist within any relation schema.' },
      { id: 't3', startTime: 491, endTime: 980, text: 'Second Normal Form (2NF) requires 1NF compliance and that no non-prime attribute depends partially on any candidate key.' },
      { id: 't4', startTime: 981, endTime: 1540, text: 'Third Normal Form (3NF): A relation is in 3NF if whenever a functional dependency X to Y holds, either X is a superkey or Y is a prime attribute.' },
      { id: 't5', startTime: 1541, endTime: 2140, text: 'Boyce-Codd Normal Form (BCNF) is stricter: for every functional dependency X to Y, X MUST be a superkey. Let us review an Anna University university exam question.' }
    ]
  },
  {
    id: 'vid_2',
    youtubeId: '26QPDBe-NB8', // CPU Scheduling
    title: 'Operating Systems: CPU Scheduling Algorithms (FCFS, SJF, Round Robin & Priority)',
    description: 'Detailed visual breakdown of operating system CPU scheduling mechanisms, calculating turnaround time, waiting time, and Gantt charts according to CS3451 syllabus.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1820,
    publishedDate: '2026-02-18',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 4,
    academicYear: '2026-2027',
    subjectCode: 'CS3451',
    subjectTitle: 'Operating Systems',
    unitNumber: 2,
    topic: 'Process Management & CPU Scheduling',
    facultyName: 'Dr. M. Deepa',
    tags: ['OS', 'Scheduling', 'Round Robin', 'SJF', 'CS3451'],
    viewCount: 2310,
    isBookmarked: false,
    userProgressSeconds: 600,
    isCompleted: false,
    category: 'Systems, Networks & Security',
    transcript: [
      { id: 'ot1', startTime: 0, endTime: 210, text: 'Process scheduling enables multi-programming by switching the CPU among processes to maximize throughput.' },
      { id: 'ot2', startTime: 211, endTime: 640, text: 'Shortest Job First (SJF) provides minimum average waiting time, but suffers from potential starvation for longer burst tasks.' },
      { id: 'ot3', startTime: 641, endTime: 1220, text: 'Round Robin scheduling gives each process a quantum time slice, making it optimal for interactive time-sharing systems.' },
      { id: 'ot4', startTime: 1221, endTime: 1820, text: 'Solving 8-mark numerical problem on preemptive priority scheduling from the November 2025 Anna University question paper.' }
    ]
  },
  {
    id: 'vid_3',
    youtubeId: 'aircAruvnKk', // Neural Networks
    title: 'Artificial Neural Networks & Backpropagation Step-by-Step Mathematical Derivation',
    description: 'Department of AI&DS lecture on Multi-Layer Perceptrons, gradient descent optimization, loss functions, and chain rule backpropagation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2460,
    publishedDate: '2026-02-22',
    departmentId: 'dept_aids',
    departmentCode: 'AI&DS',
    program: 'B.Tech Artificial Intelligence & Data Science',
    semester: 6,
    academicYear: '2026-2027',
    subjectCode: 'AI3401',
    subjectTitle: 'Deep Learning Architectures',
    unitNumber: 2,
    topic: 'Backpropagation & Loss Optimization',
    facultyName: 'Dr. R. Meenakshi',
    tags: ['AI', 'Deep Learning', 'Neural Networks', 'AI3401'],
    viewCount: 1890,
    isBookmarked: true,
    userProgressSeconds: 2460,
    isCompleted: true,
    category: 'Artificial Intelligence & Data Science',
    transcript: [
      { id: 'at1', startTime: 0, endTime: 300, text: 'In deep learning, we optimize weights by propagating error gradients backward through the hidden network layers.' },
      { id: 'at2', startTime: 301, endTime: 900, text: 'The Chain Rule of Calculus allows computing partial derivatives of the overall loss function with respect to individual synoptic weights.' },
      { id: 'at3', startTime: 901, endTime: 1680, text: 'Addressing the Vanishing Gradient problem when utilizing Sigmoid vs ReLU activation functions in deep multi-layered architectures.' },
      { id: 'at4', startTime: 1681, endTime: 2460, text: 'PyTorch and TensorFlow tensor implementation of forward and backward pass.' }
    ]
  },
  {
    id: 'vid_4',
    youtubeId: 'RBSGKlAoiM4', // Data Structures
    title: 'Binary Search Trees & AVL Tree Rotations (LL, RR, LR, RL) Explained',
    description: 'Complete data structure lecture covering self-balancing trees, balance factor calculations, and rotation algorithms with animations.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1980,
    publishedDate: '2026-01-28',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 3,
    academicYear: '2026-2027',
    subjectCode: 'CS3301',
    subjectTitle: 'Data Structures & Algorithms',
    unitNumber: 4,
    topic: 'Tree Structures & AVL Rotations',
    facultyName: 'Prof. K. Sundar',
    tags: ['DSA', 'Trees', 'AVL', 'Rotations', 'CS3301'],
    viewCount: 3100,
    isBookmarked: false,
    userProgressSeconds: 320,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 'dt1', startTime: 0, endTime: 280, text: 'Standard Binary Search Trees can degenerate to O(N) linear linked lists in worst-case insertions.' },
      { id: 'dt2', startTime: 281, endTime: 850, text: 'AVL trees maintain O(log N) lookup height by enforcing that balance factors remain strictly within {-1, 0, +1}.' },
      { id: 'dt3', startTime: 851, endTime: 1450, text: 'Left-Left (LL) and Right-Right (RR) single rotations restore tree symmetry with constant O(1) pointer operations.' },
      { id: 'dt4', startTime: 1451, endTime: 1980, text: 'Double rotations (LR and RL) are required when imbalance occurs in the interior branch of a subtree.' }
    ]
  },
  {
    id: 'vid_5',
    youtubeId: 'jhXCTbFnK8o', // RSA Algorithm
    title: 'Cryptography & Cyber Security: RSA Algorithm Key Generation & Encryption',
    description: 'Detailed mathematical derivation of the RSA public-key cryptosystem according to Anna University CS3491 syllabus. Covers Euler’s Totient Theorem, modular multiplicative inverse, and practical 16-mark numerical problems.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2280, // 38:00
    publishedDate: '2026-02-24',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'CS3491',
    subjectTitle: 'Cryptography & Cyber Security',
    unitNumber: 3,
    topic: 'Public Key Cryptography & RSA Algorithm',
    facultyName: 'Dr. S. Karthik',
    tags: ['Cryptography', 'RSA', 'Cyber Security', 'CS3491', 'Public Key', 'Anna University'],
    viewCount: 2840,
    isBookmarked: true,
    userProgressSeconds: 920,
    isCompleted: false,
    category: 'Systems, Networks & Security',
    transcript: [
      { id: 'ct1', startTime: 0, endTime: 240, text: 'Welcome to Unit 3 of Cryptography and Cyber Security. Today we derive the asymmetric RSA cryptosystem invented by Rivest, Shamir, and Adleman.' },
      { id: 'ct2', startTime: 241, endTime: 750, text: 'Key Generation: Select two large prime numbers p and q. Compute the modulus n = p * q and Euler totient phi(n) = (p-1) * (q-1).' },
      { id: 'ct3', startTime: 751, endTime: 1420, text: 'Select an encryption key e such that gcd(e, phi(n)) equals 1. Calculate private key d as the modular multiplicative inverse of e modulo phi(n).' },
      { id: 'ct4', startTime: 1421, endTime: 1950, text: 'Encryption formula C = M^e mod n, and Decryption formula M = C^d mod n. Let us solve the November 2025 Anna University 16-mark problem with p=7, q=11, and e=17.' },
      { id: 'ct5', startTime: 1951, endTime: 2280, text: 'Security vulnerabilities of RSA: Factorization attacks, Wiener attack on small private keys, and optimal padding methods like OAEP.' }
    ]
  },
  {
    id: 'vid_6',
    youtubeId: '40i4PKpM0Q8', // Theory of Computation DFA
    title: 'Theory of Computation: Deterministic Finite Automata (DFA) Design & Minimization',
    description: 'Master CS3452 Unit 2: Step-by-step state transition diagram construction for regular languages, dead states, trap states, and Myhill-Nerode DFA state minimization.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1920, // 32:00
    publishedDate: '2026-02-10',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 4,
    academicYear: '2026-2027',
    subjectCode: 'CS3452',
    subjectTitle: 'Theory of Computation',
    unitNumber: 2,
    topic: 'Finite Automata & DFA Minimization',
    facultyName: 'Prof. P. Ramasamy',
    tags: ['TOC', 'DFA', 'NFA', 'Automata', 'CS3452', 'Computation'],
    viewCount: 1960,
    isBookmarked: false,
    userProgressSeconds: 0,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 'tt1', startTime: 0, endTime: 310, text: 'A Deterministic Finite Automaton is a 5-tuple: Q, Sigma, delta, q0, and F. Every state must have exactly one transition for each input symbol.' },
      { id: 'tt2', startTime: 311, endTime: 890, text: 'Designing a DFA that accepts binary strings containing an even number of 0s and an odd number of 1s using a 4-state product construction.' },
      { id: 'tt3', startTime: 891, endTime: 1450, text: 'Subset construction algorithm: Converting a Non-deterministic Finite Automaton (NFA with epsilon moves) into an equivalent DFA.' },
      { id: 'tt4', startTime: 1451, endTime: 1920, text: 'Table-filling algorithm for DFA state minimization: Identifying indistinguishable states and merging redundant transitions.' }
    ]
  },
  {
    id: 'vid_7',
    youtubeId: 'r_MbozD32eo', // Java Multithreading
    title: 'Object Oriented Programming: Java Multithreading & Synchronization Mechanisms',
    description: 'Anna University CS3391 Unit 3 Core: Thread lifecycles, Runnable interface, synchronized keyword, deadlock conditions, and wait/notify thread communication.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1740, // 29:00
    publishedDate: '2026-02-05',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 3,
    academicYear: '2026-2027',
    subjectCode: 'CS3391',
    subjectTitle: 'Object Oriented Programming',
    unitNumber: 3,
    topic: 'Multithreading & Synchronization in Java',
    facultyName: 'Dr. M. Deepa',
    tags: ['Java', 'OOP', 'Multithreading', 'CS3391', 'Synchronization'],
    viewCount: 3420,
    isBookmarked: true,
    userProgressSeconds: 1740,
    isCompleted: true,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 'jt1', startTime: 0, endTime: 260, text: 'Multithreading in Java enables concurrent execution of two or more parts of a program for maximum CPU utilization.' },
      { id: 'jt2', startTime: 261, endTime: 720, text: 'Extending the Thread class versus implementing the Runnable interface: Why Runnable is preferred for multiple inheritance flexibility.' },
      { id: 'jt3', startTime: 721, endTime: 1250, text: 'Thread synchronization: Using synchronized blocks and method monitors to prevent race conditions in shared banking balance objects.' },
      { id: 'jt4', startTime: 1251, endTime: 1740, text: 'Inter-thread communication using wait(), notify(), and notifyAll() to solve the classic Producer-Consumer buffer problem.' }
    ]
  },
  {
    id: 'vid_8',
    youtubeId: 'VwN9aKUvhbY', // Computer Networks Routing
    title: 'Computer Networks: Distance Vector vs Link State Routing (Dijkstra Algorithm)',
    description: 'Anna University CS3591 Unit 3: Packet forwarding, Count-to-Infinity problem, Bellman-Ford equation, Open Shortest Path First (OSPF), and Dijkstra shortest path derivation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2100, // 35:00
    publishedDate: '2026-02-12',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'CS3591',
    subjectTitle: 'Computer Networks',
    unitNumber: 3,
    topic: 'Network Layer & Shortest Path Routing Algorithms',
    facultyName: 'Prof. K. Sundar',
    tags: ['Networks', 'Routing', 'Dijkstra', 'Link State', 'CS3591', 'OSPF'],
    viewCount: 2650,
    isBookmarked: false,
    userProgressSeconds: 450,
    isCompleted: false,
    category: 'Systems, Networks & Security',
    transcript: [
      { id: 'nt1', startTime: 0, endTime: 290, text: 'The Network Layer delivers packets from source to destination across multiple interconnected network hops.' },
      { id: 'nt2', startTime: 291, endTime: 880, text: 'Distance Vector Routing uses the Bellman-Ford algorithm where routers share distance vectors exclusively with neighboring nodes.' },
      { id: 'nt3', startTime: 881, endTime: 1510, text: 'Link State Routing requires routers to broadcast the state of their direct links to the entire network topology.' },
      { id: 'nt4', startTime: 1511, endTime: 2100, text: 'Dijkstra algorithm step-by-step trace: Calculating least-cost paths from source router A to all network nodes with tie-breaking rules.' }
    ]
  },
  {
    id: 'vid_9',
    youtubeId: 'efR1C6CvhmE', // Machine Learning SVM
    title: 'Machine Learning: Support Vector Machines (SVM) & Kernel Trick Derivation',
    description: 'Department of AI&DS lecture on Maximum Margin Classifiers, Lagrange Multipliers, quadratic programming formulation, and non-linear RBF / Polynomial kernels according to AI3402.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2400, // 40:00
    publishedDate: '2026-02-19',
    departmentId: 'dept_aids',
    departmentCode: 'AI&DS',
    program: 'B.Tech Artificial Intelligence & Data Science',
    semester: 6,
    academicYear: '2026-2027',
    subjectCode: 'AI3402',
    subjectTitle: 'Machine Learning Techniques',
    unitNumber: 4,
    topic: 'Support Vector Machines & Kernel Methods',
    facultyName: 'Dr. R. Meenakshi',
    tags: ['Machine Learning', 'SVM', 'AI3402', 'Kernels', 'Classification', 'AI&DS'],
    viewCount: 2190,
    isBookmarked: true,
    userProgressSeconds: 0,
    isCompleted: false,
    category: 'Artificial Intelligence & Data Science',
    transcript: [
      { id: 'mt1', startTime: 0, endTime: 320, text: 'Support Vector Machines find an optimal separating hyperplane that maximizes the geometric margin between data classes.' },
      { id: 'mt2', startTime: 321, endTime: 980, text: 'Formulating the primal constrained optimization problem using Lagrange multipliers to derive the dual optimization equation.' },
      { id: 'mt3', startTime: 981, endTime: 1690, text: 'The Kernel Trick allows computing dot products in high-dimensional feature spaces without explicitly mapping the data points.' },
      { id: 'mt4', startTime: 1691, endTime: 2400, text: 'Comparing Radial Basis Function (RBF), Gaussian, and Polynomial kernels for non-linearly separable datasets with Scikit-learn.' }
    ]
  },
  {
    id: 'vid_10',
    youtubeId: 'kqtD5dpn9C8', // Python Basics
    title: 'Problem Solving and Python Programming: Control Structures, Functions & Modules',
    description: 'First-year engineering foundational course GE3151: Conditional branching, while and for loops, list comprehensions, recursion, and modular Python coding principles.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1620, // 27:00
    publishedDate: '2026-01-15',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 1,
    academicYear: '2026-2027',
    subjectCode: 'GE3151',
    subjectTitle: 'Problem Solving and Python Programming',
    unitNumber: 1,
    topic: 'Algorithmic Problem Solving & Python Control Structures',
    facultyName: 'Er. S. Anitha',
    tags: ['Python', 'Programming', 'GE3151', 'Semester 1', 'First Year', 'Basics'],
    viewCount: 4120,
    isBookmarked: false,
    userProgressSeconds: 800,
    isCompleted: false,
    transcript: [
      { id: 'pt1', startTime: 0, endTime: 250, text: 'Welcome first-year engineering scholars to GE3151. Today we formulate algorithmic problem solving using flowcharts and pseudocode.' },
      { id: 'pt2', startTime: 251, endTime: 720, text: 'Conditional statements in Python: if-elif-else constructs, nested decisions, and ternary operator syntax.' },
      { id: 'pt3', startTime: 721, endTime: 1210, text: 'Iterative control structures: for loops with range() generator, while loops, and break/continue statements.' },
      { id: 'pt4', startTime: 1211, endTime: 1620, text: 'Defining functions with def, default arguments, keyword arguments, and writing recursive solutions for Factorial and Fibonacci.' }
    ],
    category: 'Foundations & Computational Thinking'
  },
  {
    id: 'vid_11',
    youtubeId: 'oBt53YbR9Kk', // Dynamic Programming
    title: 'Design & Analysis of Algorithms: Dynamic Programming & Shortest Paths',
    description: 'Anna University CS3401 Unit 3 Core: Principle of optimality, Memoization vs Tabulation, Bellman-Ford shortest paths, and Floyd-Warshall all-pairs shortest path matrix multiplication.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2160, // 36:00
    publishedDate: '2026-02-22',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 4,
    academicYear: '2026-2027',
    subjectCode: 'CS3401',
    subjectTitle: 'Algorithms Design & Analysis',
    unitNumber: 3,
    topic: 'Dynamic Programming & Shortest Paths',
    facultyName: 'Prof. K. Sundar',
    tags: ['Algorithms', 'Dynamic Programming', 'Bellman-Ford', 'Floyd-Warshall', 'CS3401'],
    viewCount: 3120,
    isBookmarked: true,
    userProgressSeconds: 420,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 'at1', startTime: 0, endTime: 310, text: 'Dynamic Programming solves problems by combining solutions to overlapping subproblems, guaranteeing polynomial time bounds.' },
      { id: 'at2', startTime: 311, endTime: 890, text: 'Memoization top-down approach versus Tabulation bottom-up matrix filling for the 0/1 Knapsack optimization problem.' },
      { id: 'at3', startTime: 891, endTime: 1520, text: 'Bellman-Ford algorithm: Relaxing all |V|-1 edges iteratively to detect negative-weight cycles in directed graphs.' },
      { id: 'at4', startTime: 1521, endTime: 2160, text: 'Floyd-Warshall algorithm: Constructing distance and predecessor matrices with O(V^3) time complexity for Anna University 16-mark problems.' }
    ]
  },
  {
    id: 'vid_12',
    youtubeId: 'Qkwj65l_96I', // Compiler Design
    title: 'Compiler Design: Lexical Analysis, Lex Tools & Predictive LL(1) Parsing',
    description: 'CS3501 Unit 2: Regular expressions to Finite Automata, First and Follow sets calculation, LL(1) parsing table construction, and handling left-recursion and left-factoring.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2460, // 41:00
    publishedDate: '2026-02-16',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'CS3501',
    subjectTitle: 'Compiler Design',
    unitNumber: 2,
    topic: 'Syntax Analysis & Top-Down LL(1) Parsing',
    facultyName: 'Dr. S. Karthik',
    tags: ['Compiler', 'Parsing', 'LL1', 'Syntax Analysis', 'CS3501', 'Lex'],
    viewCount: 2280,
    isBookmarked: false,
    userProgressSeconds: 0,
    isCompleted: false,
    category: 'Core Software & Algorithms',
    transcript: [
      { id: 'cd1', startTime: 0, endTime: 290, text: 'Syntax analysis verifies that the token stream produced by the lexical analyzer conforms to context-free grammar specifications.' },
      { id: 'cd2', startTime: 291, endTime: 920, text: 'Eliminating immediate and indirect left recursion to prepare context-free grammars for top-down recursive descent and LL(1) parsers.' },
      { id: 'cd3', startTime: 921, endTime: 1680, text: 'Mathematical derivation of First and Follow sets: Rules for epsilon productions and end-marker dollar symbols.' },
      { id: 'cd4', startTime: 1681, endTime: 2460, text: 'Step-by-step construction of the LL(1) predictive parsing table and detecting conflicts for non-LL(1) grammars.' }
    ]
  },
  {
    id: 'vid_13',
    youtubeId: '7mS_L_4Z3-E', // Embedded Systems ARM
    title: 'Embedded Systems & IoT: ARM Cortex Microcontroller Architecture & GPIO Programming',
    description: 'CS3691 Unit 1: Harvard architecture, 3-stage pipeline, ARM Cortex-M register banks, memory mapping, interrupt vectors, and GPIO peripheral interfacing in C.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1860, // 31:00
    publishedDate: '2026-02-14',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 6,
    academicYear: '2026-2027',
    subjectCode: 'CS3691',
    subjectTitle: 'Embedded Systems and IoT',
    unitNumber: 1,
    topic: 'ARM Cortex Architecture & Peripheral Interfacing',
    facultyName: 'Prof. P. Ramasamy',
    tags: ['Embedded Systems', 'IoT', 'ARM', 'Cortex', 'Microcontroller', 'CS3691'],
    viewCount: 1840,
    isBookmarked: true,
    userProgressSeconds: 680,
    isCompleted: false,
    category: 'Electronics & Embedded Systems',
    transcript: [
      { id: 'em1', startTime: 0, endTime: 280, text: 'Embedded systems differ from general-purpose computing through hard real-time deadlines and resource constraints.' },
      { id: 'em2', startTime: 281, endTime: 820, text: 'ARM Cortex-M core architecture: Thumb-2 instruction set, Nested Vectored Interrupt Controller (NVIC), and internal register sets.' },
      { id: 'em3', startTime: 821, endTime: 1390, text: 'Memory map organization: Flash ROM, SRAM, and peripheral address space mapping via Advanced High-Performance Bus (AHB).' },
      { id: 'em4', startTime: 1391, endTime: 1860, text: 'Configuring GPIO registers (MODER, OTYPER, PUPDR) in embedded C to interface sensors and actuators.' }
    ]
  },
  {
    id: 'vid_14',
    youtubeId: '2LaAJq1lB1Q', // Cloud Computing
    title: 'Cloud Computing: Virtualization Hypervisors, AWS Core Services & Docker',
    description: 'Elective CCS335 Unit 2: Type-1 bare-metal vs Type-2 hosted hypervisors, hardware-assisted virtualization (Intel VT-x), Amazon EC2 / S3 architecture, and container namespaces.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2220, // 37:00
    publishedDate: '2026-02-17',
    departmentId: 'dept_cse',
    departmentCode: 'CSE',
    program: 'B.E. Computer Science & Engineering',
    semester: 7,
    academicYear: '2026-2027',
    subjectCode: 'CCS335',
    subjectTitle: 'Cloud Computing Technologies',
    unitNumber: 2,
    topic: 'Virtualization & Cloud Infrastructure',
    facultyName: 'Dr. M. Deepa',
    tags: ['Cloud', 'AWS', 'Virtualization', 'Docker', 'CCS335', 'Hypervisors'],
    viewCount: 2950,
    isBookmarked: false,
    userProgressSeconds: 1100,
    isCompleted: false,
    category: 'Systems, Networks & Security',
    transcript: [
      { id: 'cc1', startTime: 0, endTime: 300, text: 'Virtualization abstracts physical compute resources, creating multi-tenant elastic cloud environments.' },
      { id: 'cc2', startTime: 301, endTime: 910, text: 'Hypervisor classification: Type-1 hypervisors like VMware ESXi and KVM versus Type-2 hypervisors running on host operating systems.' },
      { id: 'cc3', startTime: 911, endTime: 1580, text: 'AWS core infrastructure: Virtual Private Cloud (VPC), Elastic Compute Cloud (EC2) instance families, and S3 object storage buckets.' },
      { id: 'cc4', startTime: 1581, endTime: 2220, text: 'Containerization with Docker: Linux cgroups, namespaces, and union file systems compared to traditional heavy virtual machines.' }
    ]
  },
  {
    id: 'vid_15',
    youtubeId: 's4u7n8gO3kM', // Digital Electronics
    title: 'Digital Systems Design: Karnaugh Maps, Combinational Logic & Verilog HDL',
    description: 'ECE & CSE core subject EC3352 Unit 1: 4-variable and 5-variable K-map minimization, don\'t-care conditions, full-adder design, and structural Verilog HDL modeling.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 1980, // 33:00
    publishedDate: '2026-01-22',
    departmentId: 'dept_ece',
    departmentCode: 'ECE',
    program: 'B.E. Electronics & Communication Engineering',
    semester: 3,
    academicYear: '2026-2027',
    subjectCode: 'EC3352',
    subjectTitle: 'Digital Systems Design',
    unitNumber: 1,
    topic: 'Combinational Logic Minimization & Verilog',
    facultyName: 'Dr. V. Selvam',
    tags: ['Digital Electronics', 'K-Map', 'Verilog', 'Combinational Logic', 'EC3352', 'ECE'],
    viewCount: 3820,
    isBookmarked: true,
    userProgressSeconds: 1980,
    isCompleted: true,
    category: 'Electronics & Embedded Systems',
    transcript: [
      { id: 'ds1', startTime: 0, endTime: 270, text: 'Boolean algebra allows minimizing digital switching circuits to reduce gate count and propagation delay.' },
      { id: 'ds2', startTime: 271, endTime: 850, text: '4-variable Karnaugh Map simplification: Grouping minterms into octets, quads, and pairs, taking advantage of dont-care states.' },
      { id: 'ds3', startTime: 851, endTime: 1420, text: 'Designing a 4-bit parallel adder/subtractor using full-adder cells and XOR control gates.' },
      { id: 'ds4', startTime: 1421, endTime: 1980, text: 'Writing behavioral and dataflow Verilog HDL modules with testbenches and observing simulated waveforms.' }
    ]
  },
  {
    id: 'vid_16',
    youtubeId: 'YRhxdVk_sIs', // Deep Learning CNN
    title: 'Deep Learning for Vision: CNN Architectures, VGG, ResNet & Transfer Learning',
    description: 'AD3501 Unit 3: 2D Convolution operation, kernel filters, pooling layers, vanishing gradient resolution with residual skip connections (ResNet-50), and PyTorch fine-tuning.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&auto=format&fit=crop&q=80',
    durationSeconds: 2520, // 42:00
    publishedDate: '2026-02-25',
    departmentId: 'dept_aids',
    departmentCode: 'AI&DS',
    program: 'B.Tech Artificial Intelligence & Data Science',
    semester: 5,
    academicYear: '2026-2027',
    subjectCode: 'AD3501',
    subjectTitle: 'Deep Learning & Computer Vision',
    unitNumber: 3,
    topic: 'Convolutional Neural Networks & Feature Extraction',
    facultyName: 'Dr. R. Meenakshi',
    tags: ['Deep Learning', 'CNN', 'Computer Vision', 'ResNet', 'AD3501', 'AI&DS', 'PyTorch'],
    viewCount: 3410,
    isBookmarked: true,
    userProgressSeconds: 1540,
    isCompleted: false,
    category: 'Artificial Intelligence & Data Science',
    transcript: [
      { id: 'cv1', startTime: 0, endTime: 310, text: 'Convolutional Neural Networks preserve spatial feature locality through parameter-sharing convolution kernels.' },
      { id: 'cv2', startTime: 311, endTime: 980, text: 'Stride, padding, and max-pooling operations: Calculating output feature map spatial dimensions (W - F + 2P)/S + 1.' },
      { id: 'cv3', startTime: 981, endTime: 1720, text: 'Deep Residual Learning: How ResNet skip connections resolve vanishing and exploding gradient problems in 50+ layer networks.' },
      { id: 'cv4', startTime: 1721, endTime: 2520, text: 'Transfer learning on pre-trained ImageNet backbones: Freezing feature layers and training dense classification heads in PyTorch.' }
    ]
  }
];

export const MOCK_FEEDBACK: Feedback[] = [
  {
    id: 'fb_101',
    anonymousToken: 'anon_9f82d1c44a',
    category: 'Laboratories',
    subcategory: 'Computer Lab 2 Systems',
    rating: 2,
    text: 'Computer Lab 2 has several desktop machines that lag severely during Android Studio and Docker practical sessions. 15 systems frequently reboot or freeze.',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    semester: 5,
    createdAt: '2026-02-20T10:15:00Z',
    status: 'Approved',
    sentiment: 'Critical',
    sentimentScore: -0.72,
    piiDetected: false,
    linkedIssueId: 'issue_001'
  },
  {
    id: 'fb_102',
    anonymousToken: 'anon_4e71a0b98f',
    category: 'Transport',
    subcategory: 'Theni-Bodinayakanur Route',
    rating: 3,
    text: 'College bus route 7 from Bodinayakanur is crowded during the evening departure at 4:45 PM. Requesting an additional 32-seater shuttle.',
    departmentId: 'dept_cse',
    departmentName: 'General College Infrastructure',
    semester: 4,
    createdAt: '2026-02-22T14:30:00Z',
    status: 'Approved',
    sentiment: 'Neutral',
    sentimentScore: -0.15,
    piiDetected: false,
    linkedIssueId: 'issue_003'
  },
  {
    id: 'fb_103',
    anonymousToken: 'anon_b319c72e11',
    category: 'Academics',
    subcategory: 'DBMS Unit 3 Doubt Sessions',
    rating: 5,
    text: 'The video lectures by Dr. Karthik on Normalization made 3NF and BCNF crystal clear. The interactive quizzes on CampusIQ helped our internal preparation immensely.',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    semester: 5,
    createdAt: '2026-02-25T11:00:00Z',
    status: 'Approved',
    sentiment: 'Positive',
    sentimentScore: 0.88,
    piiDetected: false,
  },
  {
    id: 'fb_104',
    anonymousToken: 'anon_882c91a021',
    category: 'Infrastructure',
    subcategory: 'Campus Wi-Fi',
    rating: 2,
    text: 'Wi-Fi connectivity in the academic courtyard drops when moving between block B and the cafeteria. Need stronger access points for student laptops.',
    departmentId: 'dept_ece',
    departmentName: 'Campus Infrastructure',
    semester: 6,
    createdAt: '2026-02-26T09:45:00Z',
    status: 'Approved',
    sentiment: 'Critical',
    sentimentScore: -0.65,
    piiDetected: false,
    linkedIssueId: 'issue_002'
  },
  {
    id: 'fb_105',
    anonymousToken: 'anon_99e120f4c3',
    category: 'Placements',
    subcategory: 'Pre-placement Mock Interviews',
    rating: 5,
    text: 'The technical mock interviews and LeetCode algorithmic drills arranged by the placement cell last Saturday were exceptionally beneficial.',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    semester: 7,
    createdAt: '2026-02-28T16:20:00Z',
    status: 'Approved',
    sentiment: 'Positive',
    sentimentScore: 0.92,
    piiDetected: false
  },
  {
    id: 'fb_106',
    anonymousToken: 'anon_3c2d4a1b90',
    category: 'Laboratories',
    subcategory: 'Lab 2 RAM Upgrades',
    rating: 2,
    text: 'Please check roll number 921022104042 - my PC in lab row 3 has a bad monitor cable.',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    semester: 5,
    createdAt: '2026-03-01T08:30:00Z',
    status: 'Contains PII',
    sentiment: 'Neutral',
    sentimentScore: -0.2,
    piiDetected: true,
    piiFlags: ['Student Roll Number'],
    moderationNotes: 'Contains explicit student roll number; auto-quarantined by PII scrubber.'
  }
];

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
    id: 'user_faculty_1',
    name: 'Dr. M. Deepa',
    email: 'deepa.cs@nscet.org',
    role: 'FACULTY',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    facultyId: 'FAC_CSE_014',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80'
  },
  {
    id: 'user_hod_1',
    name: 'Dr. S. Karthik',
    email: 'hod.cse@nscet.org',
    role: 'HOD',
    departmentId: 'dept_cse',
    departmentName: 'Computer Science & Engineering',
    facultyId: 'HOD_CSE_001',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80'
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
    question: 'Under Boyce-Codd Normal Form (BCNF), what is the strict condition for every non-trivial functional dependency X -> Y?',
    options: [
      'X must be a candidate superkey of the relation.',
      'Y must be a prime attribute belonging to some candidate key.',
      'X and Y must be atomic values.',
      'There should be no multivalued dependencies.'
    ],
    correctAnswerIndex: 0,
    explanation: 'BCNF requires that for every functional dependency X -> Y, the determinant X must be a superkey. Unlike 3NF, BCNF does not allow Y to be a prime attribute if X is not a superkey.',
    topic: 'Database Normalization',
    unitNumber: 3
  },
  {
    id: 'q2',
    question: 'Which CPU scheduling algorithm gives the minimum average waiting time for a predetermined set of static processes?',
    options: [
      'First-Come First-Served (FCFS)',
      'Shortest Job First (SJF)',
      'Round Robin with large time quantum',
      'Priority Scheduling without aging'
    ],
    correctAnswerIndex: 1,
    explanation: 'Shortest Job First (SJF) is mathematically optimal because scheduling shorter jobs ahead reduces the cumulative waiting time for subsequent processes.',
    topic: 'CPU Scheduling',
    unitNumber: 2
  },
  {
    id: 'q3',
    question: 'What is the minimum percentage of attendance mandated by Anna University regulations to be eligible for end semester examinations?',
    options: [
      '60%',
      '70%',
      '75%',
      '80%'
    ],
    correctAnswerIndex: 2,
    explanation: 'According to Anna University Regulation 2021 Clause 7.1, students must secure a minimum 75% attendance. Condonation is only considered between 65% and 74% with authorized medical proof.',
    topic: 'Academic Regulations',
    unitNumber: 1
  }
];
