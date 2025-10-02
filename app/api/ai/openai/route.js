// app/api/ai/openai/route.js

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildPrompt } from "@/app/services/ai/promptBuilder";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { formData, extractedTexts, formType, config } = await request.json();

    // BUILD THE PROMPT USING THE TEMPLATE SYSTEM
    const userMessage = buildPrompt(formType, {
      formData,
      extractedTexts,
      formType,
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
