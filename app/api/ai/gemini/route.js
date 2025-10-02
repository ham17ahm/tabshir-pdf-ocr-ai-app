import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { formData, extractedTexts, formType, config } = await request.json();

    // 🔍 LOG 1: See the raw incoming data
    console.log("=== GEMINI API - INCOMING DATA ===");
    console.log("Form Type:", formType);
    console.log("Form Data:", JSON.stringify(formData, null, 2));
    console.log("Extracted Texts:", extractedTexts);
    console.log("Config:", config);

    // BUILD THE PROMPT USING THE TEMPLATE SYSTEM
    const userMessage = buildPrompt(formType, {
      formData,
      extractedTexts,
      formType,
    });

    // 🔍 LOG 2: See the built prompt that will be sent to Gemini
    console.log("\n=== GEMINI API - BUILT PROMPT ===");
    console.log(userMessage);
    console.log("=== END OF PROMPT ===\n");

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: config.model });

    // Call Gemini API
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const summary = response.text();

    // 🔍 LOG 3: See the response from Gemini
    console.log("=== GEMINI API - RESPONSE ===");
    console.log("Summary:", summary);
    console.log("===========================\n");

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
