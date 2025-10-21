// app/config/departments/psoffice/registry.js

export const tabshir1Registry = {
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
        name: "instructions",
        label: "Instructions by Huzoor Anwar (aa)",
        type: "textarea",
        placeholder: "Enter exact instruction either in Urdu or English",
        required: true,
      },
    ],
    ai: {
      provider: "gemini",
      availableProviders: ["OpenAI", "Gemini"],
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
    },
    // CHANGED: Now we have separate prompts for each language
    promptTemplates: {
      Urdu: (
        formData,
        extractedTexts,
        examples
      ) => `Below you will find a structure and example data to help you write a formal letter.

VERBATIM INSTRUCTIONS: "${formData.instructions}"
OUTPUT LANGUAGE: ${formData.language}

EXAMPLES OF DESIRED OUTPUT:
${examples}

STRUCTURED FORMAT:
[آپ کی طرف سے / آپ کا / آپ کی جانب سے] خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوا جس میں [آپ نے / آپ نے لکھا ہے کہ / آپ نے تحریر کیا ہے کہ] [Executive summary or gist of the crux of the matter, explained in well written Urdu in a natural way]۔ اطلاعاً تحریر ہے کہ یہ خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ملاحظہ فرما لیا ہے اور ارشاد فرمایا ہے کہ "[Verbatim Instructions as provided]"۔ ارشاد حضورانور برائے تعمیل ارسال خدمت ہے۔ جزاکم اللہ خیراً

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples and the context above, following the structured format.

IMPORTANT STYLE/GUIDANCE
- Preserve a clear three-step structure as described below. The paragraph containing Huzoor's instructions MUST be the second paragraph.
- Reproduce the instructions in full (do not summarize). Enclose them in quotation marks (" … ").

PROCEDURE:

1) First paragraph — Provide a short and minimal gist of the letter in Urdu, written in a natural way, using common phrases, limited to only a few comprehensive sentences, covering only the crux of the matter and directly relevant points (no unnecessary or unrelated details).
2) Second paragraph — Write:
     اطلاعاً تحریر ہے کہ یہ خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ملاحظہ فرما لیا ہے اور ارشاد فرمایا ہے کہ:
**"[Insert the full, verbatim instruction(s) here without summarizing.]"**
3) Closing sentence — Conclude with:
     ارشاد حضورانور برائے تعمیل ارسال خدمت ہے۔ جزاکم اللہ خیراً`,

      English: (
        formData,
        extractedTexts,
        examples
      ) => `Below you will find a structure and example data to help you write a formal letter.

VERBATIM INSTRUCTIONS: "${formData.instructions}"
OUTPUT LANGUAGE: ${formData.language}

EXAMPLES OF DESIRED OUTPUT:
${examples}

STRUCTURED FORMAT:
Your letter was received in the service of Hazoor Anwar, may Allah be his Helper, in which you wrote [Executive summary or gist of the crux of the matter, explained in well-written English in a natural way]. This is to inform you that this letter has been reviewed by Hazoor Anwar, may Allah be his Helper, and he has instructed that "[Verbatim Instructions as provided]". The instruction of Hazoor Anwar is sent for compliance. Jazakumullah Khairan

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples and the context above, following the structured format.

IMPORTANT STYLE/GUIDANCE
- Preserve a clear three-step structure as described below. The paragraph containing Huzoor's instructions MUST be the second paragraph.
- Reproduce the instructions in full (do not summarize). Enclose them in quotation marks (" … ").

PROCEDURE:

1) First paragraph — Provide a short and minimal gist of the letter in English, written in a natural way, using common phrases, limited to only a few comprehensive sentences, covering only the crux of the matter and directly relevant points (no unnecessary or unrelated details).
2) Second paragraph — Write:
     This is to inform you that this letter has been reviewed by Hazoor Anwar, may Allah be his Helper, and he has instructed that:
**"[Insert the full, verbatim instruction(s) here without summarizing.]"**
3) Closing sentence — Conclude with:
     The instruction of Hazoor Anwar is sent for compliance. Jazakumullah Khairan`,
    },
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
        name: "instructions",
        label: "Instructions by Tabshir",
        type: "text",
        placeholder: "Enter exact instructions in either Urdu or English",
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

VERBATIM INSTRUCTIONS: "${formData.instructions}"
OUTPUT LANGUAGE: ${formData.language}

EXAMPLES OF DESIRED OUTPUT:
${examples}

STRUCTURED FORMAT:
[آپ کی طرف سے/آپ کا/آپ کی جانب سے] خط حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں موصول ہوا جس میں [آپ نے / آپ نے لکھا ہے کہ / آپ نے تحریر کیا ہے کہ] [Executive summary or gist of the crux of the matter, explained in well written Urdu in a natural way]۔ اطلاعاً تحریر ہے کہ یہ معاملہ حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں پیش ہوا۔ حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ارشاد فرمایا ہے کہ “[Verbatim Instructions as provided]”۔ ارشاد حضورانور ارسال خدمت ہے۔ جزاکم اللہ خیراً

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples and the context above, following the structured format.

IMPORTANT STYLE/GUIDANCE
- Preserve a clear three-step structure as described below. The paragraph containing Huzoor’s instructions MUST be the second paragraph.
- Reproduce the instructions in full (do not summarize). Enclose them in quotation marks (“ … ”).

PROCEDURE:

1) First paragraph — Provide a short and minimal gist of the letter in Urdu, written in a natural way, using common phrases, limited to only a few comprehensive sentences, covering only the crux of the matter and directly relevant points (no unnecessary or unrelated details).
2) Second paragraph — Write:
اطلاعاً تحریر ہے کہ یہ معاملہ حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز کی خدمت میں پیش ہوا۔ حضورانور ایدہ اللہ تعالیٰ بنصرہ العزیز نے ارشاد فرمایا ہے کہ
**“[Insert the full, verbatim instruction(s) here without summarizing.]”**
3) Closing sentence — Conclude with:
     ارشاد حضورانور ارسال خدمت ہے۔ جزاکم اللہ خیراً`,
  },
};
