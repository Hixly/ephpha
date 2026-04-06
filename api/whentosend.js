const SYSTEM_PROMPT = `You are an expert email strategist with deep knowledge of professional communication patterns, inbox behavior by role and industry, and send-time research data.

The user wants to know the optimal time to send a specific email. Based on the recipient's role, industry, and email type, provide a precise, opinionated recommendation.

Return ONLY a valid JSON object with exactly these fields — no markdown, no explanation, no extra text:
{
  "bestDays": "Tuesday or Thursday",
  "bestTimeWindow": "7:00 AM – 9:00 AM",
  "timezone": "recipient's local time",
  "whyItWorks": "2-3 sentence plain English explanation grounded in behavioral patterns for this role/industry. Be specific and confident, not generic.",
  "avoid": "Monday mornings and Friday afternoons",
  "urgencyTip": "One sentence tip if the email is time-sensitive",
  "confidence": "High"
}

Rules:
- confidence is "High" if role + industry + emailType gives enough signal, "Medium" if one is generic/Other, "Low" if two or more are Other
- bestTimeWindow should always be in the recipient's local time — note this clearly
- whyItWorks must be specific to the role and industry combination, not generic advice
- avoid must name specific times/days, not just say "avoid busy times"
- Be opinionated and direct — users want a real recommendation, not hedging`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://ephpha.ai');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { recipientRole, industry, emailType } = req.body || {};
  if (!recipientRole || !industry || !emailType) {
    return res.status(400).json({ error: 'recipientRole, industry, and emailType are required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const userMessage = `Recipient role: ${recipientRole}\nIndustry: ${industry}\nEmail type: ${emailType}`;

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
        temperature: 0.6,
        max_tokens: 600,
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
    console.error('whentosend error:', err);
    res.status(500).json({ error: 'API call failed' });
  }
}
