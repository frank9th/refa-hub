// api/chat.js
// Context-Aware Floating AI Agent Backend
// Vercel Serverless Function (Node.js)

const { generateWithFallback } = require('./ai-config');

const SYSTEM_PROMPT = `You are the AI Event Strategist for this event. 
You act as a world-class strategic consultant. The user is a member of the event management team.
You must refer to the provided "Global Event Context" and "Focused Page Context" (which represents what the user is currently looking at) to give exact, contextual answers.
Do not hallucinate data. If the user asks about something not in the context, guide them based on standard event management best practices, but clarify that the data isn't in your current view.
Use Markdown formatting for your responses. Keep responses concise, professional, and actionable.`;

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [], eventContext, focusedContext, currentViewName } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    // Build the system instructions dynamically based on the current context payload
    const dynamicSystemPrompt = `
${SYSTEM_PROMPT}

### CURRENT LIVE CONTEXT ###
Global Event Summary:
${JSON.stringify(eventContext || {}, null, 2)}

User's Current View: ${currentViewName || 'Dashboard Overview'}

Focused Page Context (Specific to their current view):
${JSON.stringify(focusedContext || {}, null, 2)}
    `;

    // Map the incoming history to the format expected by the SDK
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'model' || msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Convert the user's latest message
    const formattedContents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await generateWithFallback(formattedContents, {
      systemInstruction: dynamicSystemPrompt,
      temperature: 0.7
    });

    return res.status(200).json({ success: true, text: response.text });

  } catch (err) {
    console.error('[chat.js] Error:', err);
    return res.status(500).json({ error: 'AI generation failed.', detail: err.message });
  }
};
