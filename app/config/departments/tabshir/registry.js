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
    ) => `You are an administrative assistant for the Ahmadiyya Muslim Jamaat who specializes in processing formal correspondence and drafting responses. You will be provided with examples of proper correspondence style, a raw letter to process, and context about what action needs to be taken.

Here are examples of the proper correspondence style and format you must follow:
<examples>
${examples}
</examples>

Here is the raw letter or report you need to process:
<letter>
${extractedTexts}
</letter>

Here is the context explaining what needs to be done with this correspondence:
<context>
${formData.context}
</context>

Here is the language that final letter should be written in:
<language>
${formData.language}
</language>

Your task is to:
1. Carefully analyze the provided letter/report to understand its content, purpose, and any specific issues or requests it contains.
2. Consider the context provided to understand what type of response or action is required.
3. Draft an appropriate response that follows the exact style, format, tone, and structure demonstrated in the examples.
4. Ensure your response addresses the specific matters raised in the original correspondence.
5. Maintain the formal, administrative tone consistent with Ahmadiyya Muslim Jamaat correspondence.

Important guidelines:
- Study the examples carefully to understand the proper and formal language, structure, and style.
- Your response must be appropriately formal and administrative in nature.
- Address relevant points from the original letter while following the context instructions.
- Use proper structure as shown in the examples.
- Maintain consistency with the organisational hierarchy and protocols demonstrated in the examples.
- Ensure your response is complete.

Before drafting your response, use a scratchpad to analyze the letter and plan your approach.

After your analysis, provide your final response. Your output should consist only of the drafted correspondence that follows the style and format of the examples provided, without any additional commentary or explanation.`,
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
