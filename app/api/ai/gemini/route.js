import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { formData, extractedTexts, formType, config } = await request.json();
    // ❌ REMOVED: prompt parameter

    // BUILD THE PROMPT USING THE TEMPLATE SYSTEM
    const userMessage = buildPrompt(formType, {
      formData,
      extractedTexts,
      formType,
    });

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: config.model });

    // Call Gemini API
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
