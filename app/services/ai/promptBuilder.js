// app/services/ai/promptBuilder.js

/**
 * Prompt builder service
 * Constructs prompts based on department configuration
 */
export class PromptBuilder {
  constructor(deptConfig, formType) {
    if (!deptConfig.promptTemplates[formType]) {
      throw new Error(`Invalid form type: ${formType}`);
    }

    this.template = deptConfig.promptTemplates[formType];
    this.formType = formType;
  }

  /**
   * Build the complete prompt
   * @param {Object} data - Contains formData, extractedTexts
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
 * @param {Object} deptConfig - Department configuration
 * @param {string} formType - The form type identifier
 * @param {Object} data - Contains formData, extractedTexts
 * @returns {string} Complete formatted prompt
 */
export function buildPrompt(deptConfig, formType, data) {
  const builder = new PromptBuilder(deptConfig, formType);
  return builder.build(data);
}
