// CAMPUSIQ PII Sanitizer & Anonymization Engine
// Strictly enforces Student Privacy and prevents PII leakage into RAG and Public Embeddings

export interface PiiDetectionResult {
  hasPii: boolean;
  sanitizedText: string;
  detectedTypes: string[];
  riskScore: number; // 0 (clean) to 1.0 (severe PII)
  warnings: string[];
}

// Regex patterns for Indian Higher Education identifiers
const PATTERNS = {
  // 12-digit Anna University / NSCET Roll Number (e.g., 921021104001, 921022104042) or short form (e.g. 21CSE042)
  rollNumber: /\b(9210\d{8}|[12]\d{1}[A-Z]{3}\d{3}|\d{12})\b/gi,
  
  // Indian Mobile Numbers (+91 or 10 digits starting with 6,7,8,9)
  phoneNumber: /(?:\+91[-.\s]?)?[6-9]\d{9}\b/g,
  
  // Standard Email Addresses
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  
  // Student self-declaration phrases e.g., 'My name is Rahul', 'I am Vignesh'
  nameIntroduction: /\b(my name is|i am|this is)\s+([A-Z][a-z]+(\s+[A-Z][a-z]+)?)\b/gi,
  
  // Hostel room / specific personal residential addresses
  hostelRoom: /\b(room\s*(?:no|number)?[.:]?\s*\d{1,4}[A-Za-z]?)\b/gi,
};

export function detectAndScrubPii(text: string): PiiDetectionResult {
  let sanitized = text;
  const detectedTypes: string[] = [];
  const warnings: string[] = [];
  let score = 0;

  // 1. Check Roll Numbers
  if (PATTERNS.rollNumber.test(text)) {
    detectedTypes.push('Student Roll Number');
    warnings.push('Student ID / Register Number detected and anonymized to protect identity.');
    sanitized = sanitized.replace(PATTERNS.rollNumber, '[REDACTED_STUDENT_ID]');
    score += 0.4;
  }

  // 2. Check Phone Numbers
  if (PATTERNS.phoneNumber.test(text)) {
    detectedTypes.push('Phone Number');
    warnings.push('Personal phone number detected and removed.');
    sanitized = sanitized.replace(PATTERNS.phoneNumber, '[REDACTED_PHONE]');
    score += 0.35;
  }

  // 3. Check Emails
  if (PATTERNS.email.test(text)) {
    detectedTypes.push('Email Address');
    warnings.push('Personal email address detected and removed.');
    sanitized = sanitized.replace(PATTERNS.email, '[REDACTED_EMAIL]');
    score += 0.3;
  }

  // 4. Check Name Introductions
  if (PATTERNS.nameIntroduction.test(text)) {
    detectedTypes.push('Personal Identity Declaration');
    warnings.push('Personal introduction stripped to maintain genuine anonymity.');
    sanitized = sanitized.replace(PATTERNS.nameIntroduction, 'A student');
    score += 0.25;
  }

  // 5. Check Hostel Room numbers
  if (PATTERNS.hostelRoom.test(text)) {
    detectedTypes.push('Hostel Room Info');
    warnings.push('Specific room numbers redacted.');
    sanitized = sanitized.replace(PATTERNS.hostelRoom, '[REDACTED_ROOM]');
    score += 0.15;
  }

  return {
    hasPii: detectedTypes.length > 0,
    sanitizedText: sanitized,
    detectedTypes,
    riskScore: Math.min(1.0, score),
    warnings,
  };
}

/**
 * Generates an irreversible anonymous hash token from student session
 * Never connects the student identity with the feedback record in database
 */
export function generateAnonymousToken(): string {
  const chars = 'abcdef0123456789';
  let token = 'anon_';
  for (let i = 0; i < 12; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
