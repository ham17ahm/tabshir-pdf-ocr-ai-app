// app/api/ai/openai/route.js

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";
import { tabshirConfig } from "@/app/config/departments/tabshir";
import { psofficeConfig } from "@/app/config/departments/psoffice";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    });

    const summary = completion.choices[0].message.content;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
