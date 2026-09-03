// CAMPUSIQ Hybrid RAG Retrieval & Anti-Hallucination Engine
import { Role, SourceCitation, ConfidenceScore, KnowledgeDomain } from '../types';
import { MOCK_KNOWLEDGE_DOCUMENTS, MOCK_VIDEOS, MOCK_FEEDBACK } from './mockDatabase';

export interface RagResult {
  answer: string;
  citations: SourceCitation[];
  confidence: ConfidenceScore;
  detectedLanguage: 'en' | 'ta';
  followUpQuestions: string[];
  retrievedDocs?: Array<{
    title: string;
    text: string;
    reference?: string;
    timestamp?: string;
  }>;
}

interface SearchDocument {
  id: string;
  title: string;
  text: string;
  sourceType: KnowledgeDomain;
  reference: string;
  allowedRoles: Role[];
  timestamp?: string;
  videoId?: string;
  videoTimestampSeconds?: number;
}

function buildUnifiedCorpus(): SearchDocument[] {
  const corpus: SearchDocument[] = [];

  // 1. Institutional Knowledge Documents
  for (const doc of MOCK_KNOWLEDGE_DOCUMENTS) {
    corpus.push({
      id: doc.id,
      title: doc.title,
      text: `${doc.title}. ${doc.content}`,
      sourceType: doc.knowledgeType,
      reference: doc.sourceUrl || doc.category,
      allowedRoles: ['STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'APPLICANT'],
    });
  }

  // 2. Spoken Video Transcripts
  for (const video of MOCK_VIDEOS) {
    if (video.transcript) {
      for (const chunk of video.transcript) {
        const mins = Math.floor(chunk.startTime / 60);
        const secs = chunk.startTime % 60;
        const endMins = Math.floor(chunk.endTime / 60);
        const endSecs = chunk.endTime % 60;
        const timeStr = `${mins}:${secs.toString().padStart(2, '0')} - ${endMins}:${endSecs.toString().padStart(2, '0')}`;

        corpus.push({
          id: `${video.id}_${chunk.id}`,
          title: `${video.subjectTitle} (Unit ${video.unitNumber}) - ${video.topic}`,
          text: `${chunk.text} (Faculty: ${video.facultyName})`,
          sourceType: 'LEARNING',
          reference: `Lecture: ${video.title} Unit ${video.unitNumber}`,
          timestamp: timeStr,
          videoId: video.id,
          videoTimestampSeconds: chunk.startTime,
          allowedRoles: ['STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'APPLICANT'],
        });
      }
    }
  }

  // 3. Approved Student Voice (Anonymized)
  for (const fb of MOCK_FEEDBACK) {
    if (fb.status === 'Approved') {
      corpus.push({
        id: fb.id,
        title: `Student Feedback: ${fb.category} (${fb.anonymousToken})`,
        text: fb.text,
        sourceType: 'STUDENT_VOICE',
        reference: `${fb.category} Feedback`,
        allowedRoles: ['STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN'],
      });
    }
  }

  return corpus;
}

// Simple language detector (English & Tamil)
function detectLanguage(query: string): 'en' | 'ta' {
  // Tamil unicode range 0B80 - 0BFF
  if (/[\u0B80-\u0BFF]/.test(query)) return 'ta';
  return 'en';
}

export function hybridRetrieveAndAnswer(query: string, userRole: Role): RagResult {
  const lang = detectLanguage(query);
  const rawTerms = query
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\u0B80-\u0BFF\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);
  const corpus = buildUnifiedCorpus();

  // Role-based pre-filtering
  const accessibleCorpus = corpus.filter((doc) => doc.allowedRoles.includes(userRole));

  // Score each document with hybrid keyword + semantic overlap
  const scoredDocs: { doc: SearchDocument; score: number }[] = [];

  for (const doc of accessibleCorpus) {
    let score = 0;
    const docLower = (doc.title + ' ' + doc.text).toLowerCase();

    for (const term of rawTerms) {
      if (docLower.includes(term)) {
        score += 2.0;
        // Boost for title matches
        if (doc.title.toLowerCase().includes(term)) {
          score += 3.5;
        }
      }
    }

    // Semantic keyword synonym boosts
    if (query.toLowerCase().includes('attendance') && docLower.includes('75%')) score += 5;
    if (query.toLowerCase().includes('bonafide') && docLower.includes('certificate')) score += 5;
    if (query.toLowerCase().includes('lab') && (docLower.includes('computer lab') || docLower.includes('workstation'))) score += 4;
    if (query.toLowerCase().includes('dbms') && (docLower.includes('normalization') || docLower.includes('3nf'))) score += 5;
    if (query.toLowerCase().includes('placement') && docLower.includes('cgpa')) score += 4;
    if (query.toLowerCase().includes('wi-fi') && docLower.includes('courtyard')) score += 4;

    // Tamil phonetic equivalents
    if (lang === 'ta') {
      if (query.includes('வருகை') || query.includes('attendance')) {
        if (docLower.includes('attendance') || docLower.includes('75%')) score += 6;
      }
      if (query.includes('பாடம்') || query.includes('lecture') || query.includes('dbms')) {
        if (docLower.includes('dbms') || docLower.includes('normalization')) score += 6;
      }
    }

    if (score > 1.0) {
      scoredDocs.push({ doc, score });
    }
  }

  scoredDocs.sort((a, b) => b.score - a.score);
  const topMatches = scoredDocs.slice(0, 3);

  // Anti-hallucination check: Insufficient evidence
  if (topMatches.length === 0 || topMatches[0].score < 2.0) {
    let answerText =
      'I could not find enough verified college information to answer this reliably. Please consult your department coordinator or the NSCET administrative office.';
    if (lang === 'ta') {
      answerText =
        'இதை நம்பகத்தன்மையுடன் பதிலளிக்க போதிய சரிபார்க்கப்பட்ட கல்லூரி ஆவணங்கள் கிடைக்கவில்லை. உங்கள் துறை ஒருங்கிணைப்பாளரை தொடர்பு கொள்ளவும்.';
    }

    return {
      answer: answerText,
      citations: [],
      confidence: 'INSUFFICIENT_EVIDENCE',
      detectedLanguage: lang,
      followUpQuestions: [
        'How do I contact my HOD?',
        'Show me DBMS Unit 3 lectures',
        'What is the attendance requirement?',
      ],
    };
  }

  // Synthesize answer with citations
  const citations: SourceCitation[] = topMatches.map((m) => ({
    id: m.doc.id,
    title: m.doc.title,
    reference: m.doc.reference,
    snippet: m.doc.text.substring(0, 140) + '...',
    sourceType: m.doc.sourceType,
    timestamp: m.doc.timestamp,
    videoId: m.doc.videoId,
    relevanceScore: Math.min(1.0, Number((m.score / 15).toFixed(2))),
  }));

  const confidence: ConfidenceScore =
    topMatches[0].score > 6.0 ? 'HIGH' : 'MODERATE';

  let answerText = '';
  if (lang === 'ta') {
    answerText = `**NSCET சரிபார்க்கப்பட்ட தகவல்:**\n\n${topMatches[0].doc.text}\n\n*மேற்கோள்: ${topMatches[0].doc.reference}*`;
  } else {
    answerText = `**Verified Institutional Record:**\n\n${topMatches[0].doc.text}\n\n*Source: ${topMatches[0].doc.reference}*`;
  }

  const followUpQuestions: string[] = [];
  if (query.toLowerCase().includes('attendance')) {
    followUpQuestions.push('What are the medical leave condonation rules?');
    followUpQuestions.push('Can I check my current CIA internal marks?');
  } else if (query.toLowerCase().includes('dbms') || query.toLowerCase().includes('lecture')) {
    followUpQuestions.push('Take an AI Practice Quiz on DBMS Unit 3');
    followUpQuestions.push('Show me CPU Scheduling lectures in Operating Systems');
  } else {
    followUpQuestions.push('Who is my CSE Department HOD?');
    followUpQuestions.push('What are the campus library operating hours?');
  }

  const retrievedDocs = topMatches.map((m) => ({
    title: m.doc.title,
    text: m.doc.text,
    reference: m.doc.reference,
    timestamp: m.doc.timestamp,
  }));

  return {
    answer: answerText,
    citations,
    confidence,
    detectedLanguage: lang,
    followUpQuestions,
    retrievedDocs,
  };
}
