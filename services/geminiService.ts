import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Quote } from '../types';

/**
 * Generates a cool quote using the Gemini API.
 * @returns A promise that resolves to a Quote object.
 */
export const generateCoolQuote = async (): Promise<Quote> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-2.5-flash'; // Using gemini-2.5-flash for text generation

  const prompt = `Generate a concise, insightful, and 'cool' quote about life, success, wisdom, or perseverance. The quote should be engaging and thought-provoking, suitable for sharing. Do not include an author.
  
  Example: "The only way to do great work is to love what you do."
  Example: "Innovation distinguishes between a leader and a follower."
  Example: "Stay hungry, stay foolish."
  
  Generate one new quote.`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.9,
        maxOutputTokens: 50,
      }
    });

    const quoteText = response.text?.trim();

    if (!quoteText) {
      throw new Error("Failed to generate a quote or received an empty response.");
    }

    return { text: quoteText };
  } catch (error: any) {
    console.error("Error generating quote:", error);
    // You might want to parse the error for more specific messages
    if (error.message && error.message.includes("429")) {
      throw new Error("Too many requests. Please try again shortly.");
    }
    throw new Error(`Failed to generate quote: ${error.message || 'Unknown error'}`);
  }
};
