import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";
import { tabshirConfig } from "@/app/config/departments/tabshir";
import { psofficeConfig } from "@/app/config/departments/psoffice";
import {
  searchSimilarExamples,
  buildSearchQuery,
} from "@/app/services/rag/ragService";

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

    // Check if this form type uses RAG
    const formConfig = deptConfig.registry[formType];
    const useRAG = formConfig?.useRAG || false;

    let ragExamples = null;

    // If RAG is enabled, search for similar examples
    if (useRAG) {
      console.log("\n🔍 RAG ENABLED - Searching for similar examples...");

      // Build search query from user inputs
      const searchQuery = buildSearchQuery({
        letterType: formData.letterType,
        context: formData.context,
        extractedTexts: extractedTexts,
      });

      console.log("Search Query:", searchQuery.substring(0, 200) + "...");

      // Get number of examples from config (default to 5 if not specified)
      const topK = formConfig.ragConfig?.topK || 5;

      // Search for similar examples
      ragExamples = await searchSimilarExamples(searchQuery, topK);

      console.log(`Found ${ragExamples.length} similar examples`);
      console.log(
        "Similarity scores:",
        ragExamples.map((ex) => `${(ex.score * 100).toFixed(1)}%`).join(", ")
      );
    }

    // BUILD THE PROMPT (passing RAG examples if available)
    const userMessage = buildPrompt(deptConfig, formType, {
      formData,
      extractedTexts,
      ragExamples, // NEW: Pass RAG examples
    });

    // 🔍 LOG: See the built prompt
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
