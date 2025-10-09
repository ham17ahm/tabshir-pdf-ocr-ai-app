// app/config/departments/tabshir/registry.js

export const tabshirRegistry = {
  General: {
    displayName: "General",
    fields: [
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
    ],
    ai: {
      provider: "openai",
      model: "gpt-4o-mini",
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

EXAMPLES OF DESIRED OUTPUT:
${examples}

EXTRACTED PDF TEXT:
${extractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples following the information provided. The "context" is for you to comprehend how and what to write the letter.`,
    examplesFile: "General.json",
  },

  Instructions: {
    displayName: "Instructions",
    fields: [
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
      provider: "gemini",
      model: "models/gemini-flash-lite-latest",
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
    examplesFile: "Instructions.json",
  },

  "Tabshir Instructions": {
    displayName: "Tabshir Instructions",
    fields: [
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
      provider: "openai",
      model: "gpt-4o-mini",
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
    examplesFile: "TabshirInstructions.json",
  },
};
