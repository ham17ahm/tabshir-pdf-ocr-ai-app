// app/services/ai/promptBuilder.js

/**
 * Prompt builder service
 * Constructs prompts based on templates
 */

import { promptTemplates } from "@/app/config/promptTemplates";

export class PromptBuilder {
  constructor(formType) {
    this.template = promptTemplates[formType];

    if (!this.template) {
      throw new Error(`No prompt template found for form type: ${formType}`);
    }
  }

  /**
   * Build the complete prompt
   */
  build(data) {
    const { formData, extractedTexts, formType } = data;

    // Start with the instruction
    const parts = [this.template.instruction];

    // Add each section in order
    this.template.sections.forEach((section) => {
      const sectionData = {
        formData,
        extractedTexts,
        formType,
      };

      // Use custom formatter if available
      let formattedSection;
      if (
        section.name === "formData" &&
        this.template.customFormatters?.formData
      ) {
        formattedSection = `${
          section.label
        }:\n${this.template.customFormatters.formData(formData)}`;
      } else {
        formattedSection = section.format(sectionData);
      }

      parts.push(formattedSection);
    });

    // Join all parts with double newlines
    return parts.join("\n\n").trim();
  }
}

/**
 * Convenience function to build a prompt
 */
export function buildPrompt(formType, data) {
  const builder = new PromptBuilder(formType);
  return builder.build(data);
}
