// app/config/promptTemplates.js

/**
 * Prompt template system
 * Define how prompts are constructed for each form type
 */

export const promptTemplates = {
  General: {
    instruction:
      "Summarize the following form submission and extracted PDF text in one sentence",

    sections: [
      {
        name: "formData",
        label: "Form Data",
        format: (data) => `Form Data:\n${formatFormData(data.formData)}`,
      },
      {
        name: "pdfText",
        label: "Extracted PDF Text",
        format: (data) =>
          `Extracted PDF Text:\n${data.extractedTexts.join("\n\n")}`,
      },
    ],
  },

  Instructions: {
    instruction:
      "Summarize the following form submission and extracted PDF text in one sentence",

    sections: [
      {
        name: "formData",
        label: "Form Data",
        format: (data) => `Form Data:\n${formatFormData(data.formData)}`,
      },
      {
        name: "pdfText",
        label: "Extracted PDF Text",
        format: (data) =>
          `Extracted PDF Text:\n${data.extractedTexts.join("\n\n")}`,
      },
    ],
  },

  "Tabshir Instructions": {
    instruction:
      "Summarize the following form submission and extracted PDF text in one sentence",

    sections: [
      {
        name: "formData",
        label: "Form Data",
        format: (data) => `Form Data:\n${formatFormData(data.formData)}`,
      },
      {
        name: "pdfText",
        label: "Extracted PDF Text",
        format: (data) =>
          `Extracted PDF Text:\n${data.extractedTexts.join("\n\n")}`,
      },
    ],
  },
};

// Default formatter for form data
function formatFormData(formData) {
  return JSON.stringify(formData, null, 2);
}
