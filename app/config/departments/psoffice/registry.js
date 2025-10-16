// app/config/departments/psoffice/registry.js

export const psofficeRegistry = {
  "Category 1": {
    displayName: "Category 1",
    fields: [
      {
        name: "aiProvider",
        label: "AI Provider",
        type: "select",
        options: ["OpenAI", "Gemini"],
        placeholder: "Select AI provider",
        required: true,
      },
      {
        name: "language",
        label: "Language",
        type: "select",
        options: ["English", "Urdu"],
        placeholder: "Select language",
        required: true,
      },
      {
        name: "context",
        label: "Instructions by Huzoor Anwar (aa)",
        type: "textarea",
        placeholder: "Enter exact instruction either in Urdu or English",
        required: true,
      },
    ],
    ai: {
      provider: "gemini", // Default provider
      availableProviders: ["OpenAI", "Gemini"],
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
    },
    promptTemplate: (
      formData,
      extractedTexts,
      examples
    ) => `Below you will find a structure and example data to help you write a formal letter.

CONTEXT: ${formData.context}
OUTPUT LANGUAGE: ${formData.language}

EXAMPLES OF DESIRED OUTPUT:
${examples}

STRUCTURED FORMAT:
[آپ کی طرف سے/آپ کا/آپ کی جانب سے] خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوا جس میں آپ نے [لکھا ہے/تحریر کیا ہے] کہ [Executive summary or gist of the crux of the matter, explained in well written Urdu in a natural way]۔ اطلاعاً تحریر ہے کہ یہ خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ملاحظہ فرما لیا ہے اور ارشاد فرمایا ہے کہ “[Verbatim Instructions as provided]”۔ ارشاد حضورانور برائے تعمیل ارسال خدمت ہے۔ جزاکم اللہ خیراً

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples and the context above, following the structured format.

IMPORTANT STYLE/GUIDANCE
- Preserve a clear three-step structure as described below. The paragraph containing Huzoor’s instructions MUST be the second paragraph.
- Reproduce the instructions in full (do not summarize). Enclose them in quotation marks (“ … ”).

PROCEDURE:

1) First paragraph — Provide a short and minimal gist of the letter in Urdu, written in a natural way, using common phrases, limited to only a few comprehensive sentences, covering only the crux of the matter and directly relevant points (no unnecessary or unrelated details).
2) Second paragraph — Write:
     اطلاعاً تحریر ہے کہ یہ خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ملاحظہ فرما لیا ہے اور ارشاد فرمایا ہے کہ:
**“[Insert the full, verbatim instruction(s) here without summarizing.]”**
3) Closing sentence — Conclude with:
     ارشاد حضورانور برائے تعمیل ارسال خدمت ہے۔ جزاکم اللہ خیراً`,
    examplesFile: "Category1.json",
  },

  "Category 2": {
    displayName: "Category 2",
    fields: [
      {
        name: "aiProvider",
        label: "AI Provider",
        type: "select",
        options: ["OpenAI", "Gemini"],
        placeholder: "Select AI provider",
        required: true,
      },
      {
        name: "language",
        label: "Language",
        type: "select",
        options: ["English", "Urdu"],
        placeholder: "Select language",
        required: true,
      },
      {
        name: "context",
        label: "Context",
        type: "textarea",
        placeholder: "Enter context",
        required: true,
      },
      {
        name: "instructions",
        label: "Instructions",
        type: "text",
        placeholder: "Enter instructions",
        required: true,
      },
    ],
    ai: {
      provider: "gemini", // Default provider
      availableProviders: ["OpenAI", "Gemini"],
      models: {
        openai: "gpt-4o-mini",
        gemini: "models/gemini-flash-lite-latest",
      },
      temperature: 0.7,
      maxTokens: 500,
    },
    promptTemplate: (
      formData,
      extractedTexts,
      examples
    ) => `Below you will find examples and data to help you write a formal letter.

CONTEXT: ${formData.context}
OUTPUT LANGUAGE: ${formData.language}
INSTRUCTIONS TO INCLUDE: ${formData.instructions}

EXAMPLES OF DESIRED OUTPUT:
${examples}

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in context of the Extracted PDF Text, strictly following the style and structure of the examples, given the information provided. The "context" is for you to comprehend how and what to write the letter about. The "instructions" are the verbatim guidance that needs to be included in the final letter.
Please only provide the main part of the letter, without any dates, subject line, salutations and similar components of a formal letter.`,
    examplesFile: "PSInstructions.json",
  },

  "Category 3": {
    displayName: "Category 3",
    fields: [
      {
        name: "aiProvider",
        label: "AI Provider",
        type: "select",
        options: ["OpenAI", "Gemini"],
        placeholder: "Select AI provider",
        required: true,
      },
      {
        name: "language",
        label: "Language",
        type: "select",
        options: ["English", "Urdu"],
        placeholder: "Select language",
        required: true,
      },
      {
        name: "context",
        label: "Context",
        type: "textarea",
        placeholder: "Enter context",
        required: true,
      },
      {
        name: "tabshirInstructions",
        label: "Tabshir Instructions",
        type: "text",
        placeholder: "Enter Tabshir instructions",
        required: true,
      },
    ],
    ai: {
      provider: "gemini", // Default provider
      availableProviders: ["OpenAI", "Gemini"],
      models: {
        openai: "gpt-4o-mini",
        gemini: "models/gemini-flash-lite-latest",
      },
      temperature: 0.7,
      maxTokens: 500,
    },
    promptTemplate: (
      formData,
      extractedTexts,
      examples
    ) => `Below you will find examples and data to help you write a formal letter.

CONTEXT: ${formData.context}
OUTPUT LANGUAGE: ${formData.language}
TABSHIR INSTRUCTIONS TO INCLUDE: ${formData.tabshirInstructions}

EXAMPLES OF DESIRED OUTPUT:
${examples}

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples following the information provided. The "context" is for you to comprehend how and what to write the letter. The "tabshir instructions" are the verbatim guidance that needs to be included in the final letter.`,
    examplesFile: "PSTabshirInstructions.json",
  },
};
