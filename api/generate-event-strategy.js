// api/generate-event-strategy.js
// Stage 2: Generate the full strategic plan using the confirmed preview as context.
// Vercel Serverless Function (Node.js)

const { generateWithFallback, extractJsonFromText } = require('./ai-config');

const FULL_STRATEGY_SYSTEM_PROMPT = `You are a world-class event strategist, financial planner, and marketing expert with deep experience in African events.

The user has already approved a strategic preview. Your job now is to expand that preview into a COMPLETE, actionable event strategy.

RULES:
- Be highly specific. Every task must have a concrete description, not vague advice.
- All monetary figures in Nigerian Naira (₦) unless stated otherwise.
- Generate realistic Nigerian-context sponsor names where relevant (e.g., MTN, Dangote, local businesses).
- Each task must have: text, detail, tag (one of: admin|media|logistics|finance|outreach|technical), priority (high|medium|low), dueDateOffset (days from event start, can be negative for pre-event tasks).
- Include a detailed "contestantJourney" array mapping out exactly what a contestant experiences from registration to grand finale.
- Include a detailed "concreteActions" array outlining step-by-step achievable goals for the organizing team.
- The content schedule should have 1-2 posts per week minimum.
- Return ONLY valid JSON — no markdown, no explanation, no code fences.

JSON SCHEMA:
{
  "eventName": "string",
  "tagline": "string",
  "theme": "string (theme id)",
  "season": "string (e.g. 'Season 1')",
  "financials": {
    "totalBudget": number,
    "budgetBreakdown": [
      { "category": "string", "amount": number, "percentage": number, "notes": "string" }
    ],
    "revenueStreams": [
      { "source": "string", "target": number, "unit": "string", "unitPrice": number, "notes": "string" }
    ],
    "totalRevenueTarget": number,
    "projections": {
      "at50Percent": { "revenue": number, "surplus": number },
      "at75Percent": { "revenue": number, "surplus": number },
      "at100Percent": { "revenue": number, "surplus": number }
    },
    "breakEvenCondition": "string"
  },
  "phases": [
    {
      "id": "string (e.g. phase-1)",
      "title": "string",
      "purpose": "string",
      "startOffset": number,
      "endOffset": number,
      "successCriteria": "string",
      "tasks": [
        {
          "id": "string (unique, e.g. t-001)",
          "text": "string (short task name)",
          "detail": "string (1-2 sentence description of how to execute)",
          "tag": "string",
          "priority": "string",
          "dueDateOffset": number
        }
      ],
      "contestantJourney": {
        "experience": "string (What the contestant feels/does during this phase)",
        "touchpoints": ["string", "string"]
      },
      "concreteActions": [
        {
          "step": "string (e.g. 'Step 1')",
          "achievableGoal": "string",
          "actionOwner": "string (e.g. 'Finance Team')"
        }
      ]
    }
  ],
  "contentSchedule": [
    {
      "id": "string",
      "platform": "string (Instagram|WhatsApp|Facebook|TikTok|All)",
      "contentType": "string (Post|Reel|Story|Flyer|Video)",
      "caption": "string (suggested caption or idea)",
      "scheduledOffset": number,
      "category": "string (awareness|engagement|voting|announcement|celebration)"
    }
  ],
  "sponsorship": {
    "tiers": [
      {
        "name": "string (e.g. Platinum)",
        "price": number,
        "slots": number,
        "benefits": ["string"],
        "talkingPoint": "string"
      }
    ],
    "targetSponsors": [
      { "name": "string", "type": "string (corporate|individual|church|school)", "rationale": "string" }
    ]
  },
  "risks": [
    { "risk": "string", "likelihood": "string (high|medium|low)", "impact": "string (high|medium|low)", "mitigation": "string" }
  ],
  "prizes": {
    "first": "string",
    "second": "string",
    "third": "string"
  },
  "contact": {
    "phone": "string",
    "email": "string"
  }
}`;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { description, startDate, durationDays, budget, attendees, location, confirmedPreview } = req.body;

  if (!confirmedPreview) {
    return res.status(400).json({ error: 'A confirmed preview is required for full strategy generation.' });
  }

  const userPrompt = `
ORIGINAL BRIEF:
Description: ${description}
Start Date: ${startDate || 'Not specified'}
Duration: ${durationDays ? durationDays + ' days' : 'Not specified'}
Total Budget: ${budget ? '₦' + Number(budget).toLocaleString() : 'Not specified'}
Expected Attendees: ${attendees || 'Not specified'}
Location: ${location || 'Not specified'}

APPROVED STRATEGIC PREVIEW (user confirmed this direction):
${JSON.stringify(confirmedPreview, null, 2)}

Now expand this approved preview into the complete, fully detailed event strategy JSON.
`;

  try {
    const response = await generateWithFallback(userPrompt, {
      systemInstruction: FULL_STRATEGY_SYSTEM_PROMPT,
      temperature: 0.65,
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
    });

    const rawText = response.text.trim();
    const strategy = extractJsonFromText(rawText);
    return res.status(200).json({ success: true, strategy });

  } catch (err) {
    console.error('[generate-event-strategy] Error:', err);
    return res.status(500).json({ error: 'AI generation failed.', detail: err.message });
  }
};
