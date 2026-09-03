from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from rag_engine import HybridRAGEngine
from pii_scrubber import PIIScrubber
import os
import uvicorn

app = FastAPI(
    title="CAMPUSIQ AI & RAG Microservice",
    description="FastAPI Service for Grounded RAG, YouTube Lecture Chunking, and PII Sanitization for NSCET Theni.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5000", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Engines
rag_engine = HybridRAGEngine()

# ----------------- Pydantic Schemas -----------------
class RAGQueryRequest(BaseModel):
    query: str = Field(..., description="Natural language question from student/faculty")
    role: str = Field(default="STUDENT", description="Caller role: STUDENT, FACULTY, HOD, ADMIN")
    department_id: Optional[str] = Field(default="dept_cse", description="Department filter")

class Citation(BaseModel):
    id: str
    title: str
    sourceType: str
    reference: str
    snippet: str
    timestamp: Optional[str] = None
    videoId: Optional[str] = None
    videoTimestampSeconds: Optional[int] = None
    relevanceScore: float

class RAGQueryResponse(BaseModel):
    answer: str
    citations: List[Citation]
    confidence: str
    detected_language: str
    follow_up_questions: List[str]

class PIIScrubRequest(BaseModel):
    text: str
    student_id: Optional[str] = None

class PIIScrubResponse(BaseModel):
    sanitized_text: str
    pii_detected: bool
    flags: List[str]
    anonymous_token: str

class YouTubeSyncRequest(BaseModel):
    youtube_url_or_id: str
    subject_code: str
    unit_number: int

# ----------------- API Endpoints -----------------
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "online",
        "service": "CAMPUSIQ FastAPI Microservice",
        "institution": "Nadar Saraswathi College of Engineering & Technology (NSCET Theni)",
        "capabilities": [
            "Hybrid BM25 + Vector RAG",
            "Real-time PII Sanitization",
            "YouTube Transcript Synchronization",
            "Anti-Hallucination Threshold Scoring"
        ]
    }

@app.post("/api/v1/rag/query", response_model=RAGQueryResponse, tags=["RAG"])
def query_rag(request: RAGQueryRequest):
    """
    Executes grounded hybrid search over Anna University regulations, lecture transcripts, and student voice.
    """
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    result = rag_engine.retrieve_and_answer(request.query, request.role)
    return result

@app.post("/api/v1/pii/scrub", response_model=PIIScrubResponse, tags=["PII Shield"])
def scrub_pii(request: PIIScrubRequest):
    """
    Sanitizes phone numbers, Anna University roll numbers, emails, and produces a one-way anonymous hash.
    """
    return PIIScrubber.scrub(request.text, request.student_id)

@app.post("/api/v1/youtube/transcript", tags=["Ingestion"])
def sync_youtube_transcript(request: YouTubeSyncRequest):
    """
    Simulates / triggers transcript extraction and semantic chunking for a YouTube lecture.
    """
    video_id = request.youtube_url_or_id.split("v=")[-1].split("/")[-1]
    return {
        "success": True,
        "video_id": video_id,
        "chunks_extracted": 5,
        "message": f"Successfully indexed {request.subject_code} Unit {request.unit_number} lecture.",
        "sample_chunks": [
            {"index": 1, "time": "00:00 - 03:00", "topic": "Introduction"},
            {"index": 2, "time": "03:00 - 08:00", "topic": "Functional Dependencies"},
            {"index": 3, "time": "08:00 - 14:20", "topic": "1NF and 2NF Proofs"},
            {"index": 4, "time": "14:20 - 18:05", "topic": "Boyce-Codd Normal Form"},
            {"index": 5, "time": "18:05 - 24:20", "topic": "Worked Examples & Summary"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

