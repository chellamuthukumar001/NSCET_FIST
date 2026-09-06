-- ==========================================================
-- CAMPUSIQ: Institutional PostgreSQL & pgvector Schema
-- Nadar Saraswathi College of Engineering & Technology (NSCET)
-- ==========================================================

-- Enable pgvector & UUID extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS departments (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    hod_name VARCHAR(255) NOT NULL,
    hod_email VARCHAR(255) NOT NULL,
    description TEXT,
    student_count INTEGER DEFAULT 0,
    faculty_count INTEGER DEFAULT 0,
    satisfaction_score NUMERIC(5,2) DEFAULT 85.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users Table (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'APPLICANT')),
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE SET NULL,
    department_name VARCHAR(255),
    student_id VARCHAR(50), -- Roll / Reg No (e.g. 921022104042)
    faculty_id VARCHAR(50),
    program VARCHAR(255),
    semester INTEGER,
    batch VARCHAR(50),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Courses Table (Anna University Regulation 2021)
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    code VARCHAR(20) NOT NULL, -- e.g. CS3351
    title VARCHAR(255) NOT NULL,
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    semester INTEGER NOT NULL,
    credits INTEGER DEFAULT 3,
    academic_year VARCHAR(20) DEFAULT '2026-27',
    regulation VARCHAR(50) DEFAULT 'Regulation 2021',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Videos Table (Curated YouTube Lectures)
CREATE TABLE IF NOT EXISTS videos (
    id VARCHAR(50) PRIMARY KEY,
    youtube_id VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    duration_seconds INTEGER NOT NULL,
    published_date DATE NOT NULL,
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE CASCADE,
    department_code VARCHAR(20) NOT NULL,
    program VARCHAR(255) NOT NULL,
    semester INTEGER NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    subject_code VARCHAR(20) NOT NULL,
    subject_title VARCHAR(255) NOT NULL,
    unit_number INTEGER NOT NULL CHECK (unit_number BETWEEN 1 AND 5),
    topic VARCHAR(255) NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Video Transcript Chunks with pgvector Embeddings
CREATE TABLE IF NOT EXISTS transcript_chunks (
    id VARCHAR(100) PRIMARY KEY,
    video_id VARCHAR(50) REFERENCES videos(id) ON DELETE CASCADE,
    chunk_index INTEGER NOT NULL,
    start_time INTEGER NOT NULL, -- in seconds
    end_time INTEGER NOT NULL,   -- in seconds
    text TEXT NOT NULL,
    speaker VARCHAR(255),
    embedding vector(1536),      -- OpenAI text-embedding-3 / Gemini embedding
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- HNSW Vector Index for Sub-10ms Approximate Nearest Neighbor (ANN) search
CREATE INDEX IF NOT EXISTS idx_transcript_chunks_embedding 
ON transcript_chunks USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 6. Anonymous Student Feedback Table (Cryptographically Shielded)
CREATE TABLE IF NOT EXISTS feedback (
    id VARCHAR(100) PRIMARY KEY,
    anonymous_token VARCHAR(64) NOT NULL, -- SHA-256 one-way token
    category VARCHAR(100) NOT NULL,
    subcategory VARCHAR(100),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE SET NULL,
    department_name VARCHAR(255),
    semester INTEGER,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected', 'Needs Review', 'Spam', 'Contains PII', 'Abusive')),
    sentiment VARCHAR(20) CHECK (sentiment IN ('Positive', 'Neutral', 'Critical')),
    sentiment_score NUMERIC(4,3) DEFAULT 0.000,
    pii_detected BOOLEAN DEFAULT FALSE,
    pii_flags TEXT[] DEFAULT '{}',
    moderation_notes TEXT,
    moderated_at TIMESTAMP WITH TIME ZONE,
    moderated_by VARCHAR(100),
    linked_issue_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_feedback_category ON feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_anonymous_token ON feedback(anonymous_token);

-- 7. Closed-Loop Institutional Issues Table (7-Stage Remediation Tracker)
CREATE TABLE IF NOT EXISTS closed_loop_issues (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    department_id VARCHAR(50) REFERENCES departments(id) ON DELETE SET NULL,
    department_name VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Identified' 
        CHECK (status IN ('Identified', 'Acknowledged', 'Investigating', 'Action Planned', 'In Progress', 'Resolved', 'Closed')),
    priority VARCHAR(20) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    affected_count INTEGER DEFAULT 1,
    identified_date DATE NOT NULL,
    target_resolution_date DATE NOT NULL,
    resolved_date DATE,
    assigned_person VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    action_taken TEXT,
    public_resolution_notice TEXT,
    student_satisfaction_rating NUMERIC(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Institutional Knowledge Documents Table (RAG Grounding)
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    knowledge_type VARCHAR(50) NOT NULL CHECK (knowledge_type IN ('OFFICIAL', 'LEARNING', 'STUDENT_VOICE')),
    visibility VARCHAR(50) NOT NULL DEFAULT 'STUDENT' CHECK (visibility IN ('PUBLIC', 'STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN')),
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    chunk_count INTEGER DEFAULT 1,
    embedding vector(1536),
    last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_knowledge_documents_embedding 
ON knowledge_documents USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- 9. Tamper-Evident System Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    actor_id VARCHAR(100) NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(100),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ==========================================================
-- 10. MODULAR LEARNING PLATFORM (SWAYAM / NPTEL MODEL)
-- Non-destructive additive migration
-- ==========================================================

-- Course Extensions
ALTER TABLE courses ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor VARCHAR(255) DEFAULT 'NSCET Faculty Team';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS instructor_title VARCHAR(255) DEFAULT 'Associate Professor / CSE';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS difficulty_level VARCHAR(50) DEFAULT 'Intermediate';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS total_duration_hours NUMERIC(4,1) DEFAULT 12.0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS prerequisites TEXT[] DEFAULT '{}';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS learning_outcomes TEXT[] DEFAULT '{}';
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT TRUE;

-- 11. Modules Table (Ordered Units per Course)
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    order_index INTEGER NOT NULL,
    description TEXT,
    estimated_minutes INTEGER DEFAULT 45,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_course_module_order UNIQUE (course_id, order_index)
);
CREATE INDEX IF NOT EXISTS idx_modules_course_id ON modules(course_id, order_index);

-- 12. Content Items Table (Polymorphic Learning Assets)
-- Enforces: 1. introduction (first), 2. core_content (middle, ordered), 3. knowledge_check (last)
CREATE TABLE IF NOT EXISTS content_items (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    section_type VARCHAR(30) NOT NULL CHECK (section_type IN ('introduction', 'core_content', 'knowledge_check')),
    type VARCHAR(20) NOT NULL CHECK (type IN ('video', 'doc', 'text')),
    url_or_path TEXT,
    order_index INTEGER NOT NULL,
    duration_seconds INTEGER DEFAULT 0,
    summary TEXT,
    document_pages INTEGER DEFAULT 1,
    metadata_json JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_module_content_order UNIQUE (module_id, section_type, order_index)
);
CREATE INDEX IF NOT EXISTS idx_content_items_module ON content_items(module_id, section_type, order_index);

-- 13. Quizzes Table (Knowledge Checks & Final Assessments)
CREATE TABLE IF NOT EXISTS quizzes (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) REFERENCES modules(id) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    passing_score NUMERIC(5,2) DEFAULT 70.00,
    time_limit_minutes INTEGER DEFAULT 15,
    is_final_assessment BOOLEAN DEFAULT FALSE,
    max_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_quiz_parent CHECK (module_id IS NOT NULL OR course_id IS NOT NULL)
);
CREATE INDEX IF NOT EXISTS idx_quizzes_module ON quizzes(module_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_course ON quizzes(course_id);

-- 14. Quiz Questions Table
CREATE TABLE IF NOT EXISTS quiz_questions (
    id VARCHAR(50) PRIMARY KEY,
    quiz_id VARCHAR(50) NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type VARCHAR(20) DEFAULT 'mcq' CHECK (question_type IN ('mcq', 'true_false')),
    options_json JSONB NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    order_index INTEGER NOT NULL,
    points INTEGER DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz ON quiz_questions(quiz_id, order_index);

-- 15. Student Course Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    progress_percentage NUMERIC(5,2) DEFAULT 0.00,
    completed_at TIMESTAMP WITH TIME ZONE,
    current_module_id VARCHAR(50) REFERENCES modules(id),
    CONSTRAINT uq_student_course_enrollment UNIQUE (student_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

-- 16. Content Item Progress Tracking Table
CREATE TABLE IF NOT EXISTS progress (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_item_id VARCHAR(50) NOT NULL REFERENCES content_items(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    watch_percentage NUMERIC(5,2) DEFAULT 0.00,
    scroll_percentage NUMERIC(5,2) DEFAULT 0.00,
    time_spent_seconds INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_student_content_progress UNIQUE (student_id, content_item_id)
);
CREATE INDEX IF NOT EXISTS idx_progress_student_item ON progress(student_id, content_item_id);

-- 17. Quiz Attempts Table (Student Assessment Submissions)
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quiz_id VARCHAR(50) NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
    score NUMERIC(5,2) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_count INTEGER NOT NULL,
    passed BOOLEAN NOT NULL,
    attempt_number INTEGER DEFAULT 1,
    answers_json JSONB DEFAULT '{}'::jsonb,
    attempted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id, quiz_id);

-- 18. Verified Certificates Table
CREATE TABLE IF NOT EXISTS certificates (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(100) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    verification_id VARCHAR(64) NOT NULL UNIQUE,
    issued_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    certificate_url TEXT,
    final_score NUMERIC(5,2) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    course_title VARCHAR(255) NOT NULL,
    instructor_name VARCHAR(255) NOT NULL,
    qr_code_payload TEXT,
    CONSTRAINT uq_student_course_certificate UNIQUE (student_id, course_id)
);
CREATE INDEX IF NOT EXISTS idx_certificates_verification_id ON certificates(verification_id);

