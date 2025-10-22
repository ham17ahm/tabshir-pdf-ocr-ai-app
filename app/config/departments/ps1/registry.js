// app/config/departments/ps1/registry.js

export const ps1Registry = {
  Category1: {
    displayName: "Category1",
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
        label: "Instructions",
        type: "textarea",
        placeholder: "Enter exact instruction either in Urdu or English",
        required: true,
      },
    ],
    ai: {
      provider: "gemini",
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
    },
    // This tells the system to use Google Sheets for templates/examples
    useGoogleSheets: true,
  },
  Category2: {
    displayName: "Janazah Report",
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
      // {
      //   name: "instructions",
      //   label: "Instructions",
      //   type: "textarea",
      //   placeholder: "Enter exact instruction either in Urdu or English",
      //   required: true,
      // },
    ],
    ai: {
      provider: "gemini",
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
    },
    // This tells the system to use Google Sheets for templates/examples
    useGoogleSheets: true,
  },
  Category3: {
    displayName: "Acknowledgement of Report",
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
    ],
    ai: {
      provider: "gemini",
      models: {
        openai: "gpt-5-2025-08-07",
        gemini: "models/gemini-2.5-pro",
      },
      temperature: 1,
    },
    // This tells the system to use Google Sheets for templates/examples
    useGoogleSheets: true,
  },
};
