import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
})

const SYSTEM_PROMPT = `You are an expert email copywriter. Write a complete, professional email and evaluate the subject line quality.

Return ONLY valid JSON with this exact structure:
{
  "subject": "<compelling subject line, max 60 chars>",
  "body": "<complete email with greeting, paragraphs, and sign-off>",
  "score": <integer 0-100 rating the subject line quality>
}

Email type guidance:
- Follow-up: Reference prior interaction, one clear next step
- Cold Outreach: Specific hook, value prop up front, easy CTA
- Meeting Request: Suggest a time, clear purpose, easy yes/no
- Thank You: Warm, specific, genuine
- Reminder: Friendly, direct, reference original context
- Custom: Match the user's intent precisely

Subject line scoring:
- 80-100: Compelling, clear, right length, strong hook
- 60-79: Good but improvable
- 40-59: Fair, noticeable issues
- 0-39: Poor, spammy, confusing

Body rules:
- 2-4 short paragraphs, professional but conversational
- Clear call-to-action at the end
- Use "Hi [Name]," and "Best,\\n[Your Name]" as placeholders only
- No other placeholder brackets
- Return ONLY the JSON object, no markdown, no extra text`

export interface WriteEmailResult {
  subject: string
  body: string
  score: number
}

export async function writeEmail(goal: string, emailType: string): Promise<WriteEmailResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: `Email type: ${emailType}\n\nGoal: ${goal}` },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.75,
    max_tokens: 800,
  })

  const raw = response.choices[0]?.message?.content
  if (!raw) throw new Error('Empty response from AI')

  const parsed = JSON.parse(raw) as WriteEmailResult

  if (typeof parsed.subject !== 'string' || typeof parsed.body !== 'string') {
    throw new Error('Unexpected response format from AI')
  }

  return {
    subject: parsed.subject.slice(0, 80),
    body: parsed.body,
    score:
      typeof parsed.score === 'number'
        ? Math.min(100, Math.max(0, Math.round(parsed.score)))
        : 70,
  }
}
