const { GoogleGenAI } = require('@google/genai');

let ai;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (e) {
  console.warn('[ai-config] Warning: GoogleGenAI failed to initialize. Missing GEMINI_API_KEY in .env?');
}

// Fallback models to try in sequence if we hit 503/429 errors
const FALLBACK_MODELS = [
  'gemini-flash-latest',
  'gemini-pro-latest',
  'gemini-2.5-flash',
  'gemini-2.5-pr'
];

async function generateWithFallback(contents, config) {
  if (!ai) throw new Error('AI backend is not configured on this server.');

  let lastError;
  for (const model of FALLBACK_MODELS) {
    try {
      console.log(`[ai-config] Attempting generation with model: ${model}`);
      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: config
      });
      return response;
    } catch (err) {
      lastError = err;
      console.warn(`[ai-config] Model ${model} failed:`, err.message);

      // If it's a 503 Unavailable or 429 Too Many Requests, continue to next model
      if (err.status === 503 || err.status === 429 || err.message.includes('503') || err.message.includes('429')) {
        console.log(`[ai-config] Falling back to next model...`);
        continue;
      }
      // For other errors (like 400 Bad Request), abort and throw
      throw err;
    }
  }

  throw new Error(`All fallback models failed due to high demand. Last error: ${lastError.message}`);
}

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
  generateWithFallback,
  extractJsonFromText
};
