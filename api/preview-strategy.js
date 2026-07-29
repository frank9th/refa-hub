// api/preview-strategy.js
// Stage 1: Generate a lightweight strategic preview for user confirmation.
// Vercel Serverless Function (Node.js)

const { ai, AI_MODEL, extractJsonFromText } = require('./ai-config');

const PREVIEW_SYSTEM_PROMPT = `You are a world-class event strategist and financial planner with deep experience in African events — competitions, talent shows, church programs, conferences, cultural festivals, and community events.

Your job is to analyze a brief event description and produce a concise strategic preview. This is NOT the full plan — it is a lightweight summary the event organizer will review and confirm before you generate the complete strategy.

RULES:
- Be specific to the type of event described. A church competition ≠ a music concert ≠ a corporate conference.
- Use Nigerian Naira (₦) for all monetary figures unless another currency is stated.
- Recommend a theme from this list only: royal-gold, crimson-glory, emerald-grace, midnight-steel, sunset-fire, violet-kingdom
- Return ONLY a valid JSON object — no markdown, no explanation, no code fences. Just raw JSON.

JSON SCHEMA (return exactly this structure):
{
  "suggestedName": "string",
  "suggestedTagline": "string",
  "recommendedTheme": "string (theme id)",
  "themeReason": "string (1 sentence why)",
  "numberOfPhases": number,
  "phases": [
    { "name": "string", "purpose": "string (1 sentence)", "durationWeeks": number }
  ],
  "revenueTopLines": ["string", "string", "string"],
  "estimatedBudgetRange": "string (e.g. ₦900,000 – ₦1,200,000)",
  "estimatedRevenueRange": "string",
  "breakEvenCondition": "string (plain English, e.g. '3,000 votes at ₦200 each')",
  "strategicDirection": "string (2-3 sentences, the core strategic insight for this event)",
  "topRisks": ["string", "string", "string"]
}`;

module.exports = async (req, res) => {
  // CORS headers for development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description, startDate, durationDays, budget, attendees, location } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Event description is required.' });
  }

  const userPrompt = `
Event Description: ${description}
Start Date: ${startDate || 'Not specified'}
Duration: ${durationDays ? durationDays + ' days' : 'Not specified'}
Approximate Budget: ${budget ? '₦' + Number(budget).toLocaleString() : 'Not specified'}
Expected Attendees/Contestants: ${attendees || 'Not specified'}
Location: ${location || 'Not specified'}

Generate a strategic preview for this event.
`;

  try {
    if (!ai) {
      return res.status(500).json({ error: 'AI backend is not configured on this local server. Please restart your node server with a GEMINI_API_KEY environment variable.' });
    }
    const response = await ai.models.generateContent({
      model: AI_MODEL,
      contents: userPrompt,
      config: {
        systemInstruction: PREVIEW_SYSTEM_PROMPT,
        temperature: 0.7,
        responseMimeType: 'application/json',
      }
    });
    console.log('Finish Reason:', response.candidates?.[0]?.finishReason);
    const rawText = response.text.trim();

    const preview = extractJsonFromText(rawText);
    return res.status(200).json({ success: true, preview });

  } catch (err) {
    console.error('[preview-strategy] Error:', err);
    return res.status(500).json({ error: 'AI generation failed.', detail: err.message });
  }
};
