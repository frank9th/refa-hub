// api/refine-strategy.js
// Surgical refinement of specific sections of an existing strategy.
// Vercel Serverless Function (Node.js)

const { generateWithFallback, extractJsonFromText } = require('./ai-config');

const REFINE_SYSTEM_PROMPT = `You are a world-class event strategist updating a previously generated event strategy.

The user wants to make a specific change to their strategy. Your job is to:
1. Understand EXACTLY what section(s) need to change (budget, phases, tasks, content schedule, sponsorship, risks, or prizes).
2. Return ONLY the updated section(s) — do NOT return the full strategy. This is a surgical update.
3. Preserve all unchanged sections exactly as they were.
4. Return valid JSON with a "changes" object that contains only the fields that need updating.
5. Include a "summary" field explaining what changed in plain English.

RULES:
- All monetary figures in Nigerian Naira (₦).
- Return ONLY valid JSON — no markdown, no explanation, no code fences.

JSON SCHEMA for response:
{
  "summary": "string (plain English summary of what was changed and why)",
  "changes": {
    // Include ONLY the top-level strategy keys that changed.
    // e.g. if only budget changed: { "financials": { ...updated financials... } }
    // e.g. if phases changed: { "phases": [ ...updated phases array... ] }
    // IMPORTANT: If you update phases, you MUST preserve all nested fields for each phase (like contestantJourney, concreteActions, and tasks) even if you don't change them!
    // e.g. if multiple: { "financials": {...}, "phases": [...] }
  }
}`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { currentStrategy, refinementInstruction } = req.body;

  if (!currentStrategy || !refinementInstruction) {
    return res.status(400).json({ error: 'Both currentStrategy and refinementInstruction are required.' });
  }

  const userPrompt = `
CURRENT STRATEGY:
${JSON.stringify(currentStrategy, null, 2)}

USER REFINEMENT REQUEST:
"${refinementInstruction}"

Apply this change surgically and return only the changed sections plus a summary.
`;

  try {
    const response = await generateWithFallback(userPrompt, {
      systemInstruction: REFINE_SYSTEM_PROMPT,
      temperature: 0.65,
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    });

    const rawText = response.text.trim();
    const result = extractJsonFromText(rawText);

    // Merge changes into the current strategy server-side
    const updatedStrategy = { ...currentStrategy, ...result.changes };

    return res.status(200).json({
      success: true,
      summary: result.summary,
      changes: result.changes,
      updatedStrategy
    });

  } catch (err) {
    console.error('[refine-strategy] Error:', err);
    return res.status(500).json({ error: 'AI refinement failed.', detail: err.message });
  }
};
