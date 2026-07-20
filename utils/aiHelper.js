import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize the Gemini client using your environment variable
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Dynamically requests edge-case test cases from the AI
 */
export async function generateTestInputs() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a JSON array containing exactly 3 distinct edge-case string values to test a Todo text input box. Include: 1 ultra-long string, 1 string with special/emoji characters, and 1 string mimicking a script injection. Return ONLY the raw JSON array string, no markdown wrappers.',
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("⚠️ AI data generation failed, falling back to static strings.");
    return ["Buy milk 🔥", "A".repeat(100), "<script>alert('hack')</script>"];
  }
}

/**
 * Analyzes a broken DOM snippet to figure out what went wrong
 */
export async function analyzeFailure(errorMessage, domSnippet) {
  try {
    const prompt = `
      An automated UI test just failed. 
      Error Message: ${errorMessage}
      
      Here is the raw HTML snippet around the target zone:
      ${domSnippet}
      
      Act as an expert SDET Agent. Diagnose the root cause in 2 sentences. 
      State exactly what selector the script was looking for and why it failed based on the HTML.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    return "AI Diagnostic Engine unavailable to analyze this failure stack.";
  }
}