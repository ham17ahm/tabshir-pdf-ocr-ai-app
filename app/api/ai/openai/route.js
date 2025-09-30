import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
