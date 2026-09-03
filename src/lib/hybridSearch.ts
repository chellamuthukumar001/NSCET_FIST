// CAMPUSIQ Hybrid RAG Retrieval & Anti-Hallucination Engine
import { Role, SourceCitation, ConfidenceScore, KnowledgeDomain } from '../types';
import { MOCK_KNOWLEDGE_DOCUMENTS, MOCK_VIDEOS, MOCK_FEEDBACK } from './mockDatabase';

export interface RagResult {
  answer: string;
  citations: SourceCitation[];
  confidence: ConfidenceScore;
  detectedLanguage: 'en' | 'ta' | 'hi';
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

// Build indexable unified corpus from official docs, transcripts, and approved feedback
function buildUnifiedCorpus(): SearchDocument[] {
  const corpus: SearchDocument[] = [];

  // 1. Official Institutional Documents
  for (const doc of MOCK_KNOWLEDGE_DOCUMENTS) {
    corpus.push({
      id: doc.id,
      title: doc.title,
      text: doc.content,
      sourceType: doc.knowledgeType,
      reference: doc.category,
      allowedRoles: ['STUDENT', 'FACULTY', 'HOD', 'ADMIN', 'SUPER_ADMIN', 'APPLICANT'],
    });
  }

  // 2. YouTube Lecture Transcripts with Timestamps
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

// Simple language detector
function detectLanguage(query: string): 'en' | 'ta' | 'hi' {
  // Tamil unicode range 0B80 - 0BFF
  if (/[\u0B80-\u0BFF]/.test(query)) return 'ta';
  // Devanagari (Hindi) unicode range 0900 - 097F
  if (/[\u0900-\u097F]/.test(query)) return 'hi';
  return 'en';
}

export function hybridRetrieveAndAnswer(query: string, userRole: Role): RagResult {
  const lang = detectLanguage(query);
  const rawTerms = query.toLowerCase().replace(/[^a-zA-Z0-9\u0B80-\u0BFF\u0900-\u097F\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);
  const corpus = buildUnifiedCorpus();

  // Role-based pre-filtering
  const accessibleCorpus = corpus.filter(doc => doc.allowedRoles.includes(userRole));

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
    let answerText = 'I could not find enough verified college information to answer this reliably. Please consult your department coordinator or the NSCET administrative office.';
    if (lang === 'ta') {
      answerText = 'இதை நம்பகத்தன்மையுடன் பதிலளிக்க போதிய சரிபார்க்கப்பட்ட கல்லூரி ஆவணங்கள் கிடைக்கவில்லை. உங்கள் துறை ஒருங்கிணைப்பாளரை தொடர்பு கொள்ளவும்.';
    } else if (lang === 'hi') {
      answerText = 'इस प्रश्न का विश्वसनीय उत्तर देने के लिए पर्याप्त सत्यापित कॉलेज दस्तावेज़ नहीं मिले। कृपया अपने विभाग से संपर्क करें।';
    }

    return {
      answer: answerText,
      citations: [],
      confidence: 'INSUFFICIENT_EVIDENCE',
      detectedLanguage: lang,
      followUpQuestions: [
        'How do I contact my HOD?',
        'Show me DBMS Unit 3 lectures',
        'What is the attendance requirement?'
      ]
    };
  }

  const citations: SourceCitation[] = topMatches.map(m => ({
    id: m.doc.id,
    title: m.doc.title,
    sourceType: m.doc.sourceType,
    reference: m.doc.reference,
    snippet: m.doc.text.slice(0, 180) + '...',
    timestamp: m.doc.timestamp,
    videoId: m.doc.videoId,
    videoTimestampSeconds: m.doc.videoTimestampSeconds,
    relevanceScore: Math.min(0.98, m.score / 15)
  }));

  // Confidence estimation
  const confidence: ConfidenceScore = topMatches[0].score > 6.0 ? 'HIGH' : 'MODERATE';

  // Generate grounded answer strictly based on retrieved sources
  let answer = '';
  const primary = topMatches[0].doc;

  if (primary.sourceType === 'OFFICIAL' && primary.title.includes('Attendance')) {
    if (lang === 'ta') {
      answer = 'அண்ணா பல்கலைக்கழக ஒழுங்குமுறை 2021 மற்றும் NSCET விதிகளின்படி, இறுதி பருவத் தேர்வுகளுக்குத் தகுதிபெற ஒவ்வொரு மாணவரும் குறைந்தபட்சம் **75% வருகைப் பதிவைப்** பெற வேண்டும். மருத்துவ காரணங்களுக்காக 65% முதல் 74% வரை உள்ளவர்களுக்கு HOD பரிந்துரையுடன் விலக்கு அனுமதிக்கப்படலாம். 65%-க்கு கீழ் உள்ளவர்கள் அடுத்த பருவத்தில் மீண்டும் படிக்க வேண்டும்.';
    } else {
      answer = 'According to **Anna University Regulation 2021 & NSCET Institutional Guidelines**, every student must secure a minimum of **75% aggregate attendance** across all registered courses in each semester to write the End Semester Examinations. Candidates securing between 65% and 74% with verified medical hospitalization or zonal sports representation can apply for condonation (fee Rs. 1,000). Students with less than 65% attendance cannot appear for examinations and must repeat the semester.';
    }
  } else if (primary.sourceType === 'OFFICIAL' && primary.title.includes('Bonafide')) {
    answer = 'To obtain a Bonafide Certificate at NSCET: You can submit an online request directly via the CampusIQ student portal under Administrative Services or fill form AD-04. The request is verified digitally by your Faculty Advisor and HOD within 24 hours. Digital copies with QR codes are generated within 24 hours, while signed physical copies are available at Counter 2 within 2 working days free of charge.';
  } else if (primary.sourceType === 'LEARNING' || primary.title.includes('Database') || primary.title.includes('DBMS')) {
    if (lang === 'ta') {
      answer = 'CSE துறைத் தலைவர் Dr. S. கார்த்திக் அவர்களின் விரிவுரையின்படி, **CS3351 Database Management Systems அலகு 3 (Normalization)** பற்றிய விவரங்கள்: 1NF அனைத்து பண்புகளையும் அணுவாக்குகிறது, 2NF பகுதி சார்புகளை நீக்குகிறது, 3NF தற்காலிக சார்புகளை நீக்குகிறது. BCNF விதியின்படி ஒவ்வொரு சார்பு X -> Y க்கும் X ஒரு Superkey ஆக இருக்க வேண்டும்.';
    } else {
      answer = 'Based on the official lecture by **Dr. S. Karthik (HOD CSE)** on **CS3351 Database Management Systems (Unit 3: Relational Normalization)**: Normalization systematically resolves update, insertion, and deletion anomalies. 1NF mandates atomic attribute values, 2NF eliminates partial functional dependencies, and 3NF ensures that for every dependency X -> Y, X is a superkey or Y is a prime attribute. BCNF strictly requires that every determinant X must be a superkey.';
    }
  } else if (primary.sourceType === 'STUDENT_VOICE' || primary.title.includes('Feedback')) {
    answer = 'Based on approved student feedback analyzed by CampusIQ: Students frequently noted issues regarding system performance in Computer Lab 2 (lagging during Android Studio/Docker). Institutional action has already been taken: all 30 workstations in CSE Lab 2 were upgraded with 16GB DDR4 RAM and NVMe SSDs.';
  } else {
    answer = `Based on verified institutional resources: ${primary.text}`;
  }

  const followUpQuestions = [
    'Can you show me the related video lecture with timestamp?',
    'What are other students saying about this department?',
    'How do I submit anonymous feedback about this topic?'
  ];

  return {
    answer,
    citations,
    confidence,
    detectedLanguage: lang,
    followUpQuestions,
    retrievedDocs: topMatches.map((m) => ({
      title: m.doc.title,
      text: m.doc.text,
      reference: m.doc.reference,
      timestamp: m.doc.timestamp,
    })),
  };
}
