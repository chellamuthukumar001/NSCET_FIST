import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

export interface ScrubbedResult {
  sanitizedText: string;
  piiDetected: boolean;
  detectedFlags: string[];
  anonymousToken: string;
}

export function scrubPiiServer(text: string, studentIdOrSalt?: string): ScrubbedResult {
  const flags: string[] = [];
  let sanitized = text;

  // 1. Indian Phone Numbers
  const phoneRegex = /(\+91[\-\s]?)?[6789]\d{9}\b/g;
  if (phoneRegex.test(sanitized)) {
    flags.push('PHONE_NUMBER');
    sanitized = sanitized.replace(phoneRegex, '[REDACTED_PHONE]');
  }

  // 2. Anna University Register / Roll Numbers (12-digit format e.g. 921022104042)
  const regNoRegex = /\b921\d{9}\b/g;
  if (regNoRegex.test(sanitized)) {
    flags.push('ROLL_REGISTER_NUMBER');
    sanitized = sanitized.replace(regNoRegex, '[REDACTED_REG_NO]');
  }

  // 3. Email Addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  if (emailRegex.test(sanitized)) {
    flags.push('EMAIL_ADDRESS');
    sanitized = sanitized.replace(emailRegex, '[REDACTED_EMAIL]');
  }

  // 4. One-Way Anonymous SHA-256 Token
  const salt = process.env.PII_SALT || 'nscet_theni_salt';
  const rawIdentifier = studentIdOrSalt || (Date.now().toString() + Math.random().toString());
  const hash = crypto.createHash('sha256').update(rawIdentifier + salt).digest('hex');
  const anonymousToken = `anon_${hash.substring(0, 12)}`;

  return {
    sanitizedText: sanitized,
    piiDetected: flags.length > 0,
    detectedFlags: flags,
    anonymousToken,
  };
}

export const sanitizeFeedbackMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body.text === 'string') {
    const scrubbed = scrubPiiServer(req.body.text, req.user?.id);
    req.body.text = scrubbed.sanitizedText;
    req.body.anonymousToken = scrubbed.anonymousToken;
    req.body.piiDetected = scrubbed.piiDetected;
    req.body.piiFlags = scrubbed.detectedFlags;
  }
  next();
};

