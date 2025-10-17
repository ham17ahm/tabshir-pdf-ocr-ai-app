// app/config/departments/tabshir/registry.js

export const tabshir2Registry = {
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
        name: "aiProvider",
        label: "AI Provider",
        type: "select",
        options: ["OpenAI", "Gemini"],
        placeholder: "Select AI provider",
        required: true,
      },
      {
        name: "letterType",
        label: "Type of Letter",
        type: "text",
        placeholder:
          "Be specific: e.g., Permission to attend Jalsa Salana, Airport pickup arrangement, Accommodation request for guest",

        required: true,
      },
      {
        name: "context",
        label: "Context / Instructions",
        type: "textarea",
        placeholder: "Brief description of what needs to be done",
        required: true,
      },
    ],
    ai: {
      provider: "openai",
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
      // maxTokens: 500,
      max_completion_tokens: 500,
    },
    useRAG: true,
    ragConfig: {
      topK: 10, // Number of examples to retrieve (you can change this)
    },
  },
};
