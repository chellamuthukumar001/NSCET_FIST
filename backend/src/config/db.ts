import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export let isDbConnected = false;

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'campusiq_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const initDatabase = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    isDbConnected = true;
    console.log('✅ [MySQL] Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'campusiq_db'));
    
    // Ensure videos table exists
    await connection.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR(50) PRIMARY KEY,
        youtube_id VARCHAR(50) DEFAULT '',
        local_video_path VARCHAR(500),
        title VARCHAR(255) NOT NULL,
        topic VARCHAR(255) NOT NULL,
        faculty_name VARCHAR(255) NOT NULL,
        department_code VARCHAR(20) NOT NULL,
        academic_year VARCHAR(20) NOT NULL,
        thumbnail_url TEXT,
        study_material_url TEXT,
        description TEXT,
        duration_seconds INT DEFAULT 120,
        semester INT DEFAULT 1,
        subject_code VARCHAR(50) DEFAULT 'GEN',
        subject_title VARCHAR(255) DEFAULT 'General Engineering',
        unit_number INT DEFAULT 1,
        tags JSON,
        view_count INT DEFAULT 0,
        published_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if videos table has data, if not insert the 2 default videos
    const [rows]: any = await connection.query('SELECT COUNT(*) as cnt FROM videos');
    if (rows && rows[0]?.cnt === 0) {
      await connection.query(`
        INSERT INTO videos (
          id, local_video_path, title, topic, faculty_name, department_code, academic_year, 
          thumbnail_url, description, duration_seconds, semester, subject_code, subject_title, unit_number, published_date
        ) VALUES 
        (
          'vid-local-01',
          '/assets/videos/campusiq-01.mp4',
          'federated learning',
          'federated learning',
          'asifa shereen CSE',
          'CSE',
          '2024-25',
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
          'Lecture on Federated Learning concepts, distributed machine learning architecture, and privacy-preserving model aggregation.',
          1280,
          5,
          'CS3551',
          'Distributed & Federated Systems',
          3,
          '2026-09-01'
        ),
        (
          'vid-local-02',
          '/assets/videos/campusiq-02.mp4',
          'web request',
          'web request',
          'asmath nabila CSE',
          'CSE',
          '2024-25',
          'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
          'Comprehensive walkthrough of HTTP/HTTPS web requests, client-server communication lifecycle, REST protocols, and response headers.',
          1450,
          5,
          'CS3452',
          'Web Technology & Networks',
          2,
          '2026-09-02'
        );
      `);
      console.log('✅ [MySQL] Default local videos seeded into MySQL successfully.');
    }

    connection.release();
    return true;
  } catch (err: any) {
    isDbConnected = false;
    console.warn(`⚠️ [MySQL] Note: Could not connect to MySQL at ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306} (${err.message}). Using in-memory store for fallback.`);
    return false;
  }
};

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  const [rows, fields] = await pool.query(text, params);
  const duration = Date.now() - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[DB Query]', { 
      text: text.slice(0, 100), 
      duration, 
      rowsCount: Array.isArray(rows) ? rows.length : 0 
    });
  }
  
  return { rows, fields };
};

