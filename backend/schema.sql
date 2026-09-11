-- ==========================================================
-- CAMPUSIQ: Institutional MySQL Database Schema
-- Nadar Saraswathi College of Engineering & Technology (NSCET Theni)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS campusiq_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE campusiq_db;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    hod_name VARCHAR(255) NOT NULL,
    hod_email VARCHAR(255) NOT NULL,
    description TEXT,
    student_count INT DEFAULT 0,
    faculty_count INT DEFAULT 0,
    satisfaction_score DECIMAL(5,2) DEFAULT 85.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Users Table (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role ENUM('STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'APPLICANT') NOT NULL DEFAULT 'STUDENT',
    department_id VARCHAR(50),
    department_name VARCHAR(255),
    student_id VARCHAR(50),
    faculty_id VARCHAR(50),
    program VARCHAR(255),
    semester INT,
    batch VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Videos Table (Manually Uploaded & Curated College Lectures)
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(50) PRIMARY KEY,
    youtube_id VARCHAR(50) DEFAULT '',
    local_video_path VARCHAR(500),
    title VARCHAR(255) NOT NULL,
    topic VARCHAR(255) NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    department_code VARCHAR(20) NOT NULL,
    department_id VARCHAR(50),
    program VARCHAR(50) DEFAULT 'B.E',
    semester INT DEFAULT 1,
    academic_year VARCHAR(20) NOT NULL,
    subject_code VARCHAR(50) DEFAULT 'GEN',
    subject_title VARCHAR(255) DEFAULT 'General Engineering',
    unit_number INT DEFAULT 1,
    thumbnail_url TEXT,
    study_material_url TEXT,
    description TEXT,
    duration_seconds INT DEFAULT 120,
    tags JSON,
    view_count INT DEFAULT 0,
    is_bookmarked BOOLEAN DEFAULT FALSE,
    is_completed BOOLEAN DEFAULT FALSE,
    published_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Video Transcript Chunks
CREATE TABLE IF NOT EXISTS transcript_chunks (
    id VARCHAR(100) PRIMARY KEY,
    video_id VARCHAR(50) NOT NULL,
    chunk_index INT NOT NULL,
    start_time INT NOT NULL,
    end_time INT NOT NULL,
    text TEXT NOT NULL,
    speaker VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (video_id) REFERENCES videos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Courses Table (Anna University Regulation 2021)
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id VARCHAR(50),
    semester INT NOT NULL,
    credits INT DEFAULT 3,
    academic_year VARCHAR(20) DEFAULT '2026-27',
    regulation VARCHAR(50) DEFAULT 'Regulation 2021',
    instructor VARCHAR(255) DEFAULT 'NSCET Faculty Team',
    instructor_title VARCHAR(255) DEFAULT 'Associate Professor / CSE',
    thumbnail_url TEXT,
    difficulty_level ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Intermediate',
    total_duration_hours DECIMAL(4,1) DEFAULT 12.0,
    prerequisites JSON,
    learning_outcomes JSON,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Modules Table (Ordered Units per Course)
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    order_index INT NOT NULL,
    description TEXT,
    estimated_minutes INT DEFAULT 45,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_course_module_order (course_id, order_index),
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Content Items Table (Polymorphic Learning Assets)
CREATE TABLE IF NOT EXISTS content_items (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    section_type ENUM('introduction', 'core_content', 'knowledge_check') NOT NULL,
    type ENUM('video', 'doc', 'text') NOT NULL,
    url_or_path TEXT,
    order_index INT NOT NULL,
    duration_seconds INT DEFAULT 0,
    summary TEXT,
    document_pages INT DEFAULT 1,
    metadata_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_module_content_order (module_id, section_type, order_index),
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Quizzes Table (Knowledge Checks & Final Assessments)
CREATE TABLE IF NOT EXISTS quizzes (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50),
    course_id VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    passing_score DECIMAL(5,2) DEFAULT 70.00,
    time_limit_minutes INT DEFAULT 15,
    is_final_assessment BOOLEAN DEFAULT FALSE,
    max_attempts INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id VARCHAR(50) PRIMARY KEY,
    quiz_id VARCHAR(50) NOT NULL,
    question TEXT NOT NULL,
    question_type ENUM('mcq', 'true_false') DEFAULT 'mcq',
    options_json JSON NOT NULL,
    correct_answer INT NOT NULL,
    explanation TEXT,
    order_index INT NOT NULL,
    points INT DEFAULT 1,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Student Course Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    completed_at TIMESTAMP NULL,
    current_module_id VARCHAR(50),
    UNIQUE KEY uq_student_course_enrollment (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Content Item Progress Tracking Table
CREATE TABLE IF NOT EXISTS progress (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL,
    content_item_id VARCHAR(50) NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    watch_percentage DECIMAL(5,2) DEFAULT 0.00,
    scroll_percentage DECIMAL(5,2) DEFAULT 0.00,
    time_spent_seconds INT DEFAULT 0,
    completed_at TIMESTAMP NULL,
    last_accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_student_content_progress (student_id, content_item_id),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_item_id) REFERENCES content_items(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL,
    quiz_id VARCHAR(50) NOT NULL,
    score DECIMAL(5,2) NOT NULL,
    total_questions INT NOT NULL,
    correct_count INT NOT NULL,
    passed BOOLEAN NOT NULL,
    attempt_number INT DEFAULT 1,
    answers_json JSON,
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Verified Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL,
    course_id VARCHAR(50) NOT NULL,
    verification_id VARCHAR(64) NOT NULL UNIQUE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url TEXT,
    final_score DECIMAL(5,2) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    qr_code_payload TEXT,
    UNIQUE KEY uq_student_course_certificate (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==========================================================
-- INITIAL SEED DATA
-- ==========================================================

-- Seed Department
INSERT INTO departments (id, name, code, hod_name, hod_email, description, student_count, faculty_count)
VALUES 
('dept_cse', 'Computer Science and Engineering', 'CSE', 'Dr. S. Karthik', 'hod.cse@nscet.org', 'Department of Computer Science & Engineering, NSCET Theni', 240, 18)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Seed Initial Local Videos Requested by User
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
)
ON DUPLICATE KEY UPDATE title=VALUES(title);
