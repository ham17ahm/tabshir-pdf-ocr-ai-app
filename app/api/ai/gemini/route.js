import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";
import { tabshirConfig } from "@/app/config/departments/tabshir";
import { psofficeConfig } from "@/app/config/departments/psoffice";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Map department IDs to their configs
const departmentConfigs = {
  tabshir: tabshirConfig,
  psoffice: psofficeConfig,
};

export async function POST(request) {
  try {
    const { departmentId, formData, extractedTexts, formType, config } =
      await request.json();

    // Get the correct department config
    const deptConfig = departmentConfigs[departmentId];

    if (!deptConfig) {
      throw new Error(`Invalid department: ${departmentId}`);
    }

    // BUILD THE PROMPT USING THE DEPARTMENT CONFIG
    const userMessage = buildPrompt(deptConfig, formType, {
      formData,
      extractedTexts,
    });

    // 🔍 LOG: See the built prompt that will be sent to Gemini
    console.log("\n=== GEMINI API - BUILT PROMPT ===");
    console.log(userMessage);
    console.log("=== END OF PROMPT ===\n");

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
