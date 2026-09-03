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

