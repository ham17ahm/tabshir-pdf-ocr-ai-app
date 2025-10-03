// app/config/promptTemplates.js

import {
  getAllFormTypes,
  getPromptInstruction,
} from "./formTypes/registryUtils";
import { getExamples } from "@/app/utils/examplesLoader";

/**
 * Standard section formatters (reusable across all form types)
 */
const standardSections = [
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
    format: (data) => `Form Data:\n${JSON.stringify(data.formData, null, 2)}`,
  },
  {
    name: "pdfText",
    label: "Extracted PDF Text",
    format: (data) =>
      `Extracted PDF Text:\n${data.extractedTexts.join("\n\n")}`,
  },
];

/**
 * Dynamically build prompt templates from registry
 */
function buildPromptTemplates() {
  const templates = {};
  const formTypes = getAllFormTypes();

  formTypes.forEach((formType) => {
    templates[formType] = {
      instruction: getPromptInstruction(formType),
      sections: standardSections,
    };
  });

  return templates;
}

export const promptTemplates = buildPromptTemplates();
