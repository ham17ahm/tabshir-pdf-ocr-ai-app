import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { formData, extractedTexts, formType, prompt, config } =
      await request.json();

    // Construct the message content
    const userMessage = `
${prompt}

Form Type: ${formType}

Form Data:
${JSON.stringify(formData, null, 2)}

Extracted PDF Text:
${extractedTexts.join("\n\n")}
    `.trim();

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
