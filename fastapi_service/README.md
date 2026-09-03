# CAMPUSIQ FastAPI AI & RAG Microservice
## Nadar Saraswathi College of Engineering & Technology (NSCET Theni)

This microservice provides high-throughput, Python-native AI, Hybrid RAG, YouTube transcript extraction, and PII sanitization for the **CAMPUSIQ** platform.

---

### Why FastAPI & How it Fits in the Architecture

In enterprise institutional applications like CAMPUSIQ, a **dual-service architecture** is standard:

```
[ React 19 Frontend ] 
       │
       ├── (Authenticated REST / WebSockets) ──> [ Node.js Express Backend :5000 ]
       │                                                    │
       └── (AI, Transcripts, Hybrid RAG) ──────> [ Python FastAPI AI Service :8000 ]
                                                            │
                                             [ PostgreSQL 16 + pgvector :5432 ]
```

| Layer | Technology | Primary Role in CAMPUSIQ |
| :--- | :--- | :--- |
| **Frontend Portal** | React 19 + TypeScript + Tailwind v4 | Responsive UI for Students, Faculty, HODs, and Admins. |
| **Business Backend** | Node.js / Express | Fast auth, sessions, notifications, RBAC, and ticketing CRUD. |
| **AI / RAG Microservice**| **Python FastAPI** | Vector embeddings, BM25 + dense search, RRF reranking, anti-hallucination verification, transcript chunking. |
| **Unified Database** | **PostgreSQL 16 + pgvector** | Single ACID database for relational data + 1536-dim vector embeddings with HNSW indexing. |
| **Cache & Task Queue**| **Redis** | Query result caching, rate limiting, and async ingestion jobs. |

---

### Comparison: FastAPI vs Other Alternatives

| Framework | Strengths in CAMPUSIQ | Trade-offs |
| :--- | :--- | :--- |
| **FastAPI (Selected)** | • Native async (`asyncio`/`uvicorn`) with C-like throughput.<br>• Direct access to PyTorch, Hugging Face, sentence-transformers, spacy.<br>• Automatic interactive Swagger UI at `/docs`.<br>• Pydantic v2 strict type validation. | Requires Python runtime environment. |
| **Flask / Django** | • Mature ecosystem. | Slower synchronous execution; lacks native OpenAPI schema generation. |
| **Node.js only for AI** | • Single language across stack. | Node.js lacks native ML tensor libraries (PyTorch/HuggingFace) and requires slow subprocess calls for NLP. |
| **Go (Golang)** | • Ultra-low latency and low memory footprint. | Poor AI/ML and embedding library ecosystem compared to Python. |
| **Supabase** | • Hosted PostgreSQL + pgvector + Edge Functions + instant Auth. | Great for rapid cloud deployment, but for on-premises college servers, self-hosted Postgres + FastAPI offers full institutional sovereignty. |

---

### Local Quickstart

#### 1. Create & activate Python virtual environment:
```bash
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
```

#### 2. Install dependencies:
```bash
pip install -r requirements.txt
```

#### 3. Run the development server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

#### 4. Open Interactive API Documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- Health check: `http://localhost:8000/health`

