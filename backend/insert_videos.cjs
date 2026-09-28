const mysql = require('./node_modules/mysql2/promise');

const newVideos = [
  {
    id: 'vid-local-03',
    youtube_id: '',
    local_video_path: '/assets/videos/campusiq-03.mp4',
    title: 'Why Do We Fear Public Speaking',
    topic: 'Public Speaking & Overcoming Stage Fear',
    faculty_name: 'Irfana S (II-CSE)',
    department_code: 'CSE',
    department_id: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academic_year: '2024-25',
    subject_code: 'HS3152',
    subject_title: 'Professional Communication & Public Speaking',
    unit_number: 1,
    thumbnail_url: '/assets/videos/thumbs/thumb-03.jpg',
    description: 'Comprehensive student lecture exploring the psychological fears behind public speaking, crowd discomfort, fear of judgment, and practical techniques to build presentation confidence.',
    duration_seconds: 343,
    tags: JSON.stringify(['Public Speaking', 'Communication Skills', 'Presentation', 'Confidence', 'CSE']),
    view_count: 1560,
    published_date: '2026-09-27'
  },
  {
    id: 'vid-local-04',
    youtube_id: '',
    local_video_path: '/assets/videos/campusiq-04.mp4',
    title: 'Machine Learning: How Computers Learn from Data',
    topic: 'Machine Learning Foundations & Paradigms',
    faculty_name: 'M. Priyadharshini (IV - CSE)',
    department_code: 'CSE',
    department_id: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academic_year: '2024-25',
    subject_code: 'CS3551',
    subject_title: 'Machine Learning & AI Architectures',
    unit_number: 1,
    thumbnail_url: '/assets/videos/thumbs/thumb-04.jpg',
    description: 'In-depth presentation covering how machine learning algorithms discover patterns from data, traditional programming vs machine learning, supervised learning, and predictive modeling.',
    duration_seconds: 736,
    tags: JSON.stringify(['Machine Learning', 'Artificial Intelligence', 'Data Science', 'CSE', 'FIST']),
    view_count: 2340,
    published_date: '2026-09-23'
  },
  {
    id: 'vid-local-05',
    youtube_id: '',
    local_video_path: '/assets/videos/campusiq-05.mp4',
    title: 'The Habits That Improved My English',
    topic: 'Vocabulary Acquisition & Language Habits',
    faculty_name: 'Irfana S (II-CSE)',
    department_code: 'CSE',
    department_id: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academic_year: '2024-25',
    subject_code: 'HS3151',
    subject_title: 'Professional English & Language Habits',
    unit_number: 2,
    thumbnail_url: '/assets/videos/thumbs/thumb-05.jpg',
    description: 'Practical strategies and daily habits for mastering English vocabulary, effective dictionary usage, pronunciation guides, and sentence construction.',
    duration_seconds: 387,
    tags: JSON.stringify(['English Communication', 'Vocabulary', 'Language Habits', 'Pronunciation', 'CSE']),
    view_count: 1890,
    published_date: '2026-09-27'
  },
  {
    id: 'vid-local-06',
    youtube_id: '',
    local_video_path: '/assets/videos/campusiq-06.mp4',
    title: 'Data Structures & Algorithms: Stack & LIFO Principle',
    topic: 'Stack Data Structure & LIFO Implementation',
    faculty_name: 'Kanaga Durga M (B.E CSE)',
    department_code: 'CSE',
    department_id: 'dept_cse',
    program: 'B.E',
    semester: 3,
    academic_year: '2024-25',
    subject_code: 'CS3301',
    subject_title: 'Data Structures & Algorithms',
    unit_number: 2,
    thumbnail_url: '/assets/videos/thumbs/thumb-06.jpg',
    description: 'Lecture on the Stack linear data structure, Last-In-First-Out (LIFO) principle, push and pop operations, pointer management, and memory representation.',
    duration_seconds: 411,
    tags: JSON.stringify(['Data Structures', 'Stack', 'LIFO', 'Algorithms', 'CSE']),
    view_count: 2100,
    published_date: '2026-09-23'
  },
  {
    id: 'vid-local-07',
    youtube_id: '',
    local_video_path: '/assets/videos/campusiq-07.mp4',
    title: 'MCP (Model Context Protocol): Connecting AI with Tools & Data',
    topic: 'Model Context Protocol Architecture & Tool Integration',
    faculty_name: 'Akshaya Shri K (IV CSE)',
    department_code: 'CSE',
    department_id: 'dept_cse',
    program: 'B.E',
    semester: 7,
    academic_year: '2024-25',
    subject_code: 'CS3591',
    subject_title: 'Advanced AI Architectures & Protocols',
    unit_number: 4,
    thumbnail_url: '/assets/videos/thumbs/thumb-07.jpg',
    description: 'Comprehensive overview of Anthropic Model Context Protocol (MCP) as a universal connector enabling AI models to interact with files, databases, APIs, and tools.',
    duration_seconds: 361,
    tags: JSON.stringify(['MCP', 'Model Context Protocol', 'AI Agents', 'APIs', 'CSE']),
    view_count: 2870,
    published_date: '2026-09-23'
  }
];

async function run() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'campusiq_db'
  });

  for (const v of newVideos) {
    const query = `INSERT INTO videos (id, youtube_id, local_video_path, title, topic, faculty_name, department_code, department_id, program, semester, academic_year, subject_code, subject_title, unit_number, thumbnail_url, description, duration_seconds, tags, view_count, published_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        topic = VALUES(topic),
        faculty_name = VALUES(faculty_name),
        local_video_path = VALUES(local_video_path),
        thumbnail_url = VALUES(thumbnail_url),
        duration_seconds = VALUES(duration_seconds),
        description = VALUES(description),
        tags = VALUES(tags);`;

    await conn.query(query, [
      v.id,
      v.youtube_id,
      v.local_video_path,
      v.title,
      v.topic,
      v.faculty_name,
      v.department_code,
      v.department_id,
      v.program,
      v.semester,
      v.academic_year,
      v.subject_code,
      v.subject_title,
      v.unit_number,
      v.thumbnail_url,
      v.description,
      v.duration_seconds,
      v.tags,
      v.view_count,
      v.published_date
    ]);
    console.log('Inserted/Updated:', v.id, '-', v.title);
  }

  const [rows] = await conn.query('SELECT id, title, faculty_name, local_video_path FROM videos');
  console.log('Total videos now in MySQL:', rows.length);
  console.log(rows);
  await conn.end();
}

run().catch(console.error);
