// app/config/promptTemplates.js

/**
 * Prompt template system
 * Define how prompts are constructed for each form type
 */

export const promptTemplates = {
  "Option 1": {
    // The main instruction
    instruction:
      "Summarize the following form submission and extracted PDF text in one sentence",

    // How to format the sections (order matters)
    sections: [
      {
        name: "formType",
        label: "Form Type",
        format: (data) => `Form Type: ${data.formType}`,
      },
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

    // Optional: Custom formatters for this form type
    customFormatters: {
      formData: (formData) => {
        // Custom formatting for Option 1 - e.g., make it more readable
        return Object.entries(formData)
          .map(([key, value]) => `- ${key}: ${value}`)
          .join("\n");
      },
    },
  },

  "Option 2": {
    instruction:
      "Provide a one-sentence summary of this company form and document data",

    sections: [
      {
        name: "formType",
        label: "Form Type",
        format: (data) => `Form Type: ${data.formType}`,
      },
      {
        name: "formData",
        label: "Company Information",
        format: (data) =>
          `Company Information:\n${formatFormData(data.formData)}`,
      },
      {
        name: "pdfText",
        label: "Document Content",
        format: (data) =>
          `Document Content:\n${data.extractedTexts.join("\n---\n")}`,
      },
    ],
  },
};

// Default formatter for form data
function formatFormData(formData) {
  return JSON.stringify(formData, null, 2);
}
