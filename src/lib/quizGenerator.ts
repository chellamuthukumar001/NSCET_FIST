import { QuizQuestion } from '../types';
import { generateGroqAnswer } from './groqClient';

export interface QuizGenerateOptions {
  subjectCode: string;
  subjectTitle: string;
  unitNumber: number;
  topic?: string;
  difficulty?: 'Foundation' | 'Intermediate' | 'Advanced';
  count?: number;
  language?: 'en' | 'ta';
}

const CURATED_FALLBACK_QUIZZES: Record<string, QuizQuestion[]> = {
  CS3351: [
    {
      id: 'q_dbms_1',
      question: 'Which of the following conditions strictly defines Boyce-Codd Normal Form (BCNF) over 3NF?',
      options: [
        'Every non-key attribute must be fully functionally dependent on candidate key',
        'For every non-trivial FD X -> Y, determinant X must be a candidate/super key',
        'Transitive dependencies are permitted if Y is a prime attribute',
        'Repeating groups and multi-valued attributes are converted to atomic rows'
      ],
      correctAnswerIndex: 1,
      explanation: 'BCNF removes the 3NF loophole where Y can be a prime attribute. In BCNF, every determinant X MUST be a candidate or superkey without exceptions.',
      topic: 'Database Normalization',
      unitNumber: 3
    },
    {
      id: 'q_dbms_2',
      question: 'What type of database anomaly is prevented when a relation is normalized from 1NF to 2NF?',
      options: [
        'Transitive Dependency Anomalies',
        'Multi-valued Attribute Redundancy',
        'Partial Functional Dependency Anomalies where non-prime attributes depend on part of composite key',
        'Phantom Read and Dirty Read Transaction Anomalies'
      ],
      correctAnswerIndex: 2,
      explanation: '2NF strictly forbids partial dependencies. Every non-prime attribute must depend on the FULL composite primary key.',
      topic: 'Database Normalization',
      unitNumber: 3
    },
    {
      id: 'q_dbms_3',
      question: 'In a transaction schedule, what does the ACID property Isolation guarantee according to Anna University syllabus?',
      options: [
        'The database remains structurally consistent before and after transaction execution',
        'Changes made by committed transactions survive permanent server power outages',
        'Intermediate transaction operations remain invisible to concurrently executing transactions',
        'All operations within a transaction unit execute completely or abort completely'
      ],
      correctAnswerIndex: 2,
      explanation: 'Isolation ensures that concurrently executing transactions do not interfere with each other or observe uncommitted intermediate states.',
      topic: 'Transaction Processing',
      unitNumber: 4
    }
  ],
  CS3451: [
    {
      id: 'q_os_1',
      question: 'Which CPU scheduling algorithm provides the theoretical minimum average waiting time for a set of stationary processes?',
      options: [
        'First-Come First-Served (FCFS)',
        'Shortest Job First (SJF / Shortest Remaining Time First)',
        'Round Robin with very large time quantum',
        'Multi-Level Feedback Queue with priority boost'
      ],
      correctAnswerIndex: 1,
      explanation: 'SJF is mathematically proven to minimize average waiting time because moving shorter jobs ahead reduces total accumulated wait time across all processes.',
      topic: 'CPU Scheduling',
      unitNumber: 2
    },
    {
      id: 'q_os_2',
      question: 'In Coffman deadlock conditions, what does the Hold and Wait condition stipulate?',
      options: [
        'A process cannot be forcibly deprived of its allocated resources',
        'A process must hold at least one resource while waiting to acquire additional resources held by others',
        'A closed chain of processes exists where each process holds a resource needed by the next',
        'Resources can only be shared in read-only concurrent access modes'
      ],
      correctAnswerIndex: 1,
      explanation: 'Hold and Wait occurs when a process currently allocated one or more resources requests and waits for other resources currently held by other processes.',
      topic: 'Deadlocks',
      unitNumber: 3
    },
    {
      id: 'q_os_3',
      question: 'What is Beladys Anomaly in operating system virtual memory management?',
      options: [
        'Page fault rate decreases as page frame allocation increases in FIFO page replacement',
        'Page fault rate increases despite increasing the number of page frames in FIFO replacement',
        'Thrashing occurs when the working set exceeds physical RAM capacity',
        'Optimal page replacement algorithms cause excessive disk head thrashing'
      ],
      correctAnswerIndex: 1,
      explanation: 'Beladys Anomaly demonstrates that with certain page reference strings, increasing memory page frames leads to MORE page faults under FIFO replacement.',
      topic: 'Virtual Memory & Page Replacement',
      unitNumber: 4
    }
  ],
  CS3491: [
    {
      id: 'q_crypto_1',
      question: 'In the RSA algorithm, if chosen primes are p=7 and q=11, what is the value of Eulers Totient function phi(n)?',
      options: [
        '77',
        '60',
        '18',
        '54'
      ],
      correctAnswerIndex: 1,
      explanation: 'phi(n) = (p - 1) * (q - 1) = (7 - 1) * (11 - 1) = 6 * 10 = 60.',
      topic: 'Public Key Cryptography & RSA',
      unitNumber: 3
    },
    {
      id: 'q_crypto_2',
      question: 'What is the primary distinction between Symmetric and Asymmetric cryptographic algorithms?',
      options: [
        'Symmetric cryptography cannot be used for message confidentiality',
        'Asymmetric uses two mathematically linked keys (Public & Private), whereas Symmetric uses a single shared secret key',
        'Symmetric algorithms are exclusively implemented in hardware ASICs',
        'Asymmetric ciphers use stream ciphers while symmetric uses block ciphers only'
      ],
      correctAnswerIndex: 1,
      explanation: 'Asymmetric (e.g. RSA, ECC) relies on dual public/private keys, while symmetric (e.g. AES, DES) relies on a single shared secret key.',
      topic: 'Classical & Asymmetric Encryption',
      unitNumber: 1
    }
  ],
  CS3452: [
    {
      id: 'q_toc_1',
      question: 'Which of the following formal language classes is accepted by Deterministic Finite Automata (DFA)?',
      options: [
        'Context-Free Languages (CFL)',
        'Regular Languages',
        'Context-Sensitive Languages (CSL)',
        'Recursively Enumerable Languages'
      ],
      correctAnswerIndex: 1,
      explanation: 'According to the Chomsky Hierarchy, finite automata (both DFA and NFA) recognize precisely Type-3 Regular Languages.',
      topic: 'Finite Automata',
      unitNumber: 2
    },
    {
      id: 'q_toc_2',
      question: 'What is the Pumping Lemma for Regular Languages primarily used for in Anna University examinations?',
      options: [
        'To minimize states in an existing DFA',
        'To construct an equivalent DFA from a given Regular Expression',
        'To prove that a given language is NOT regular by contradiction',
        'To convert a non-deterministic Turing machine to a deterministic one'
      ],
      correctAnswerIndex: 2,
      explanation: 'The Pumping Lemma cannot prove a language is regular; its sole mathematical function is to prove a language is non-regular by contradiction.',
      topic: 'Regular Expressions & Pumping Lemma',
      unitNumber: 2
    }
  ],
  CS3301: [
    {
      id: 'q_dsa_1',
      question: 'In an AVL tree, what are the permissible values for the balance factor of any internal node?',
      options: [
        '{0}',
        '{-1, 0, +1}',
        '{-2, -1, 0, +1, +2}',
        '{0, 1, 2}'
      ],
      correctAnswerIndex: 1,
      explanation: 'The AVL balance factor is defined as height(left_subtree) - height(right_subtree) and must be strictly in {-1, 0, +1} to maintain O(log N) height.',
      topic: 'AVL Trees',
      unitNumber: 4
    },
    {
      id: 'q_dsa_2',
      question: 'When an insertion occurs in the left subtree of the left child causing an AVL imbalance, which rotation restores balance?',
      options: [
        'Right-Left (RL) Double Rotation',
        'Left-Right (LR) Double Rotation',
        'Single Right (LL) Rotation',
        'Single Left (RR) Rotation'
      ],
      correctAnswerIndex: 2,
      explanation: 'An insertion in the outer left child (LL condition) requires a Single Right Rotation to rebalance the root.',
      topic: 'Tree Rotations',
      unitNumber: 4
    }
  ]
};

export async function generateAIQuiz(options: QuizGenerateOptions): Promise<QuizQuestion[]> {
  const {
    subjectCode,
    subjectTitle,
    unitNumber,
    topic = 'Core Syllabus Concepts',
    difficulty = 'Intermediate',
    count = 3,
    language = 'en',
  } = options;

  const prompt = `You are a Senior Anna University Chennai Examiner generating an official practice quiz for Nadar Saraswathi College of Engineering & Technology (NSCET Theni).

Generate exactly ${count} multiple-choice questions for:
- Subject: ${subjectCode} - ${subjectTitle}
- Syllabus Unit: Unit ${unitNumber} (${topic})
- Difficulty Level: ${difficulty}
- Target Standard: Anna University Chennai Regulation 2021 (B.E./B.Tech)
- Language: ${language === 'ta' ? 'Tamil (with technical terms in English script)' : 'English'}

Output MUST be a strictly valid JSON array of objects. Do not wrap in conversational markdown before or after.
Format:
[
  {
    "id": "q1",
    "question": "Clear and rigorous question statement?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "correctAnswerIndex": 0,
    "explanation": "Detailed technical explanation explaining why this option is correct and why other options fail, citing relevant Anna University formulas or theorems.",
    "topic": "${topic}",
    "unitNumber": ${unitNumber}
  }
]`;

  try {
    const rawResponse = await generateGroqAnswer({
      query: prompt,
      role: 'STUDENT',
      language: language === 'ta' ? 'ta' : 'en',
    });

    const cleaned = rawResponse
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

 const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
 if (jsonMatch) {
 const parsed = JSON.parse(jsonMatch[0]) as QuizQuestion[];
 if (Array.isArray(parsed) && parsed.length > 0) {
 return parsed.map((item, idx) => ({
 id: item.id || 'q_ai_' + Date.now() + '_' + idx,
 question: item.question,
 options: item.options,
 correctAnswerIndex: typeof item.correctAnswerIndex === 'number' ? item.correctAnswerIndex : 0,
 explanation: item.explanation || 'Verified Anna University Regulation 2021 concept.',
 topic: item.topic || topic,
 unitNumber: item.unitNumber || unitNumber,
 }));
 }
 }
 } catch (err) {
 console.warn('Groq AI Quiz synthesis fell back to curated repository:', err);
 }

 const fallbackList = CURATED_FALLBACK_QUIZZES[subjectCode] || CURATED_FALLBACK_QUIZZES['CS3351'];
 return fallbackList.slice(0, count).map((q, i) => ({
 ...q,
 id: 'q_fallback_' + Date.now() + '_' + i,
 unitNumber,
 }));
}
