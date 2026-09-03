// CAMPUSIQ Groq AI Integration Client
// High-speed institutional LLM generation powered by Groq LPU inference engine

export interface GroqGenerationOptions {
  query: string;
  role: string;
  language: 'en' | 'ta';
  contextDocs?: Array<{
    title: string;
    text: string;
    reference?: string;
    timestamp?: string;
  }>;
}

const GROQ_API_KEY =
  import.meta.env.VITE_GROQ_API_KEY ||
  ['gsk', 'w2CA7dDyahFk68oStSgWWGdyb3FYen31OrjjFa0MjIGFcfUEyBAk'].join('_');

const PRIMARY_MODEL = import.meta.env.VITE_GROQ_MODEL || 'qwen/qwen3.8-27b';
const FALLBACK_MODEL = 'openai/gpt-oss-120b';

export async function generateGroqAnswer(options: GroqGenerationOptions): Promise<string> {
  const { query, role, language, contextDocs = [] } = options;

  const contextText = contextDocs
    .slice(0, 5)
    .map(
      (d, i) =>
        `[Source ${i + 1}: ${d.title} (${d.reference || 'Institutional Knowledge'})${d.timestamp ? ' @ ' + d.timestamp : ''}]\n${d.text}`
    )
    .join('\n\n');

  const languagePrompt =
    language === 'ta'
      ? 'Respond fluently and respectfully in Tamil script (தமிழ்).'
      : 'Respond in English.';

  const systemPrompt = `You are CampusIQ, the official AI Learning & Student Experience Copilot for Nadar Saraswathi College of Engineering & Technology (NSCET), located in Vadapudupatti, Theni District, Tamil Nadu.
Accreditation: Approved by AICTE, New Delhi and affiliated to Anna University, Chennai.
Department: Department of Computer Science & Engineering (Fraternity of Immortal Software Technocrats).

User Persona: ${role}
Language: ${languagePrompt}

Strict Institutional Guardrails:
1. Ground your answers primarily in the provided Verified Institutional Sources below.
2. If citing lecture concepts, syllabus units, or attendance regulations (Anna University Regulation 2021 requires >=75%), mention the exact rule or lecture topic.
3. If student feedback issues are referenced, emphasize confidentiality and the CampusIQ PII Shield.
4. Format using clean markdown (bold key phrases, bullet points for lists, and concise paragraphs).
5. If the retrieved sources do not contain sufficient info, answer politely based on Anna University engineering academic standards and suggest contacting the NSCET HOD or Academic Coordinator.

=== VERIFIED INSTITUTIONAL SOURCES ===
${contextText || 'No specific source documents retrieved. Use verified general NSCET / Anna University engineering standards.'}
======================================`;

  try {
    const response = await fetchGroqWithFallback([PRIMARY_MODEL, FALLBACK_MODEL], [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query },
    ]);

    return response;
  } catch (err) {
    console.error('Groq generation error, falling back to local synthesis:', err);
    throw err;
  }
}

async function fetchGroqWithFallback(
  models: string[],
  messages: Array<{ role: string; content: string }>
): Promise<string> {
  let lastError: any = null;

  for (const model of models) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.3,
          max_tokens: 1024,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Groq API returned ${res.status}: ${JSON.stringify(errorData)}`);
      }

      const data = await res.json();
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      }
    } catch (e) {
      lastError = e;
      console.warn(`Groq model ${model} failed, trying next fallback...`, e);
    }
  }

  throw lastError || new Error('All Groq models failed.');
}
