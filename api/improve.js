const SYSTEM_PROMPT = `You are an expert email coach. The user has written a draft email and wants it improved.

Analyze the email and return a JSON object with exactly these fields:
{
  "improvedEmail": "the full rewritten email body",
  "clarityScore": <number 1-10>,
  "toneScore": <number 1-10>,
  "ctaScore": <number 1-10>,
  "fixes": ["fix 1", "fix 2", "fix 3"]
}

Rules:
- Keep the same intent and key facts
- Make it genuinely better — don't just rephrase
- fixes array should be specific and concrete, 2-4 items
- Return ONLY the JSON object, no markdown, no explanation`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://ephpha.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { emailBody, toneTarget } = req.body || {};
  if (!emailBody || typeof emailBody !== 'string') {
    return res.status(400).json({ error: 'emailBody is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const toneInstruction = toneTarget ? `Tone target: ${toneTarget}` : 'Tone target: neutral improvement';
  const userMessage = `${toneInstruction}\n\nOriginal email:\n${emailBody}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1200,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      if (response.status === 401) return res.status(401).json({ error: 'Invalid API key' });
      if (response.status === 429) return res.status(429).json({ error: 'Rate limit reached' });
      return res.status(response.status).json({ error: errData.error?.message || 'OpenAI error' });
    }

    const data = await response.json();
    const raw = data.choices[0]?.message?.content;
    if (!raw) return res.status(500).json({ error: 'Empty response from AI' });

    const parsed = JSON.parse(raw);
    res.status(200).json(parsed);
  } catch (err) {
    console.error('improve error:', err);
    res.status(500).json({ error: 'API call failed' });
  }
}
