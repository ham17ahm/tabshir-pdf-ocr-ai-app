// app/services/ai/promptBuilder.js

/**
 * Prompt builder service
 * Constructs prompts based on department configuration
 */
export class PromptBuilder {
  constructor(deptConfig, formType) {
    this.deptConfig = deptConfig;
    this.formType = formType;
    this.registry = deptConfig.registry;

    if (!this.registry[formType]) {
      throw new Error(`Invalid form type: ${formType}`);
    }

    this.formConfig = this.registry[formType];
  }

  /**
   * Build the complete prompt
   * @param {Object} data - Contains formData, extractedTexts
   * @returns {string} Complete formatted prompt
   */
  build(data) {
    const { formData, extractedTexts } = data;

    // Check if this form uses the NEW template format
    if (this.formConfig.promptTemplate) {
      return this.buildFromTemplate(formData, extractedTexts);
    }

    // Otherwise use OLD format (for backward compatibility)
    return this.buildLegacyFormat(formData, extractedTexts);
  }

  /**
   * Build prompt using NEW template format
   */
  buildFromTemplate(formData, extractedTexts) {
    // Get examples for this form type
    const examples = this.deptConfig.getExamples(this.formType);

    // Format extracted texts
    const formattedExtractedTexts = extractedTexts
      .map((text, index) => `Page ${index + 1}:\n${text}`)
      .join("\n\n");

    // Format examples
    const formattedExamples = examples
      .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
      .join("\n\n");

    // Call the template function (it's now a function, not a string)
    const prompt = this.formConfig.promptTemplate(
      formData,
      formattedExtractedTexts,
      formattedExamples
    );

    return prompt.trim();
  }

  /**
   * Build prompt using OLD format (backward compatibility)
   */
  buildLegacyFormat(formData, extractedTexts) {
    const template = this.deptConfig.promptTemplates[this.formType];

    if (!template) {
      throw new Error(`No prompt template found for: ${this.formType}`);
    }

    // Start with the instruction
    const parts = [template.instruction];

    // Add each section
    template.sections.forEach((section) => {
      const sectionData = {
        formData,
        extractedTexts,
        formType: this.formType,
      };

      const formattedSection = section.format(sectionData);

      if (formattedSection) {
        parts.push(formattedSection);
      }
    });

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
