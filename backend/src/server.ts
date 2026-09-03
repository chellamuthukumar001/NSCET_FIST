import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'CAMPUSIQ Institutional Backend',
    college: 'Nadar Saraswathi College of Engineering & Technology (NSCET Theni)',
    timestamp: new Date().toISOString(),
    engine: 'Hybrid RAG + pgvector + PII Shield',
  });
});

// API Routes
app.use('/api', apiRouter);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[CAMPUSIQ Server Error]:', err);
  res.status(500).json({
    error: 'Internal Institutional Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` CAMPUSIQ Backend Server Active`);
  console.log(` College: NSCET Theni District, Tamil Nadu`);
  console.log(` Port: ${PORT}`);
  console.log(` Health: http://localhost:${PORT}/health`);
  console.log(` API Base: http://localhost:${PORT}/api`);
  console.log(`=======================================================`);
});

export default app;

