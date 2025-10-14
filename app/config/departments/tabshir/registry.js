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
          "e.g., Travel permission, Accommodation request, Complaint acknowledgment",
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
        openai: "gpt-4o-mini",
        gemini: "models/gemini-flash-lite-latest",
      },
      temperature: 0.7,
      maxTokens: 500,
    },
    useRAG: true,
    ragConfig: {
      topK: 8, // Number of examples to retrieve (you can change this)
    },
  },
};
