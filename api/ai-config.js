const { GoogleGenAI } = require('@google/genai');

let ai;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (e) {
  console.warn('[ai-config] Warning: GoogleGenAI failed to initialize. Missing GEMINI_API_KEY in .env?');
}

// Centralized model configuration
// Update this string to change the model across all endpoints
// e.g. 'gemini-1.5-pro', 'gemini-1.5-flash'
const AI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-pro';

// Robust JSON extraction to handle when models add markdown fences or preamble text
function extractJsonFromText(rawText) {
  if (!rawText) {
    console.log('[extractJsonFromText] rawText is empty or undefined');
    return null;
  }
  
  console.log('\n--- AI RESPONSE LOG ---');
  console.log(rawText);
  console.log('-----------------------\n');

  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');
  
  if (firstBrace === -1 || lastBrace === -1) {
    throw new SyntaxError("No valid JSON object found in response text");
  }
  
  return JSON.parse(rawText.substring(firstBrace, lastBrace + 1));
}

module.exports = {
  ai,
  AI_MODEL,
  extractJsonFromText
};
