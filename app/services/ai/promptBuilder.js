// app/services/ai/promptBuilder.js

import { promptTemplates } from "@/app/config/promptTemplates";
import { isValidFormType } from "@/app/config/formTypes/registryUtils";

/**
 * Prompt builder service
 * Constructs prompts based on templates from registry
 */
export class PromptBuilder {
  constructor(formType) {
    if (!isValidFormType(formType)) {
      throw new Error(`Invalid form type: ${formType}`);
    }

    this.template = promptTemplates[formType];
    this.formType = formType;
  }

  /**
   * Build the complete prompt
   * @param {Object} data - Contains formData, extractedTexts, formType
   * @returns {string} Complete formatted prompt
   */
  build(data) {
    const { formData, extractedTexts } = data;

    // Start with the instruction
    const parts = [this.template.instruction];

    // Add each section
    this.template.sections.forEach((section) => {
      const sectionData = {
        formData,
        extractedTexts,
        formType: this.formType,
      };

      const formattedSection = section.format(sectionData);

      // Only add non-empty sections
      if (formattedSection) {
        parts.push(formattedSection);
      }
    });

    // Join all parts with double newlines
    return parts.join("\n\n").trim();
  }
}

/**
 * Convenience function to build a prompt
 * @param {string} formType - The form type identifier
 * @param {Object} data - Contains formData, extractedTexts, formType
 * @returns {string} Complete formatted prompt
 */
export function buildPrompt(formType, data) {
  const builder = new PromptBuilder(formType);
  return builder.build(data);
}
