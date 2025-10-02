// app/config/promptTemplates.js

/**
 * Prompt template system
 * Define how prompts are constructed for each form type
 */

import { getExamples } from "@/app/utils/examplesLoader";

export const promptTemplates = {
  General: {
    instruction: `Below you will find: 1) Examples of Desired Output 2) Form Data in JSON 3) Extracted PDF Text.
    Your task is to write a formal letter in response to the raw letter provided in the “Extracted PDF Text” section, in light of the examples following the information in the Form Data. The Form Data consists of the “language” which is the output language of the final letter. The “context” is for you to comprehend how and what to write the letter.
    Important: Produce only the body content of the letter (i.e., the main message), without any structural elements such as date, recipient address, subject line, salutation, complimentary close, or signature block.
`,

    sections: [
      {
        name: "examples",
        label: "Examples of Desired Output",
        format: (data) => {
          const examples = getExamples(data.formType);
          if (examples.length === 0) return "";

          const examplesText = examples
            .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
            .join("\n\n");

          return `Examples of Desired Output:\n${examplesText}`;
        },
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
  },

  Instructions: {
    instruction: `Below you will find: 1) Examples of Desired Output 2) Form Data in JSON 3) Extracted PDF Text.
    Your task is to write a formal letter in response to the raw letter provided in the “Extracted PDF Text” section, in light of the examples following the information in the Form Data. The Form Data consists of the “language” which is the output language of the final letter. The “context” is for you to comprehend how and what to write the letter. The “instructions” are the verbatim guidance that needs to be included in the final letter.
    Important: Produce only the body of the letter (i.e., the main message), without any elements such as date, recipient address, subject line, salutation, or signature block.
`,

    sections: [
      {
        name: "examples",
        label: "Examples of Desired Output",
        format: (data) => {
          const examples = getExamples(data.formType);
          if (examples.length === 0) return "";

          const examplesText = examples
            .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
            .join("\n\n");

          return `Examples of Desired Output:\n${examplesText}`;
        },
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
  },

  "Tabshir Instructions": {
    instruction: `Below you will find: 1) Examples of Desired Output 2) Form Data in JSON 3) Extracted PDF Text.
    Your task is to write a formal letter in response to the raw letter provided in the “Extracted PDF Text” section, in light of the examples following the information in the Form Data. The Form Data consists of the “language” which is the output language of the final letter. The “context” is for you to comprehend how and what to write the letter. The “tabshir instructions” are the verbatim guidance that needs to be included in the final letter.
    Important: Produce only the body content of the letter (i.e., the main message), without any structural elements such as date, recipient address, subject line, salutation, complimentary close, or signature block.
`,

    sections: [
      {
        name: "examples",
        label: "Examples of Desired Output",
        format: (data) => {
          const examples = getExamples(data.formType);
          if (examples.length === 0) return "";

          const examplesText = examples
            .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
            .join("\n\n");

          return `Examples of Desired Output:\n${examplesText}`;
        },
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
  },
};

// Default formatter for form data
function formatFormData(formData) {
  return JSON.stringify(formData, null, 2);
}
