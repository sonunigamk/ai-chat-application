import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not defined in .env file");
}

const ai = new GoogleGenAI({ apiKey });

const getGeminiResponse = async (prompt) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    return result.text;
  } catch (error) {
    console.error(`Gemini API error with model gemini-2.0-flash:`, error);

    if (
      error.message.includes("429") ||
      error.message.includes("RESOURCE_EXHAUSTED")
    ) {
      return "You've made too many requests. Please wait a minute and try again.";
    }

    return "Error: Could not get a response from the AI. Please check the browser console for details.";
  }
};

export default getGeminiResponse;
