// app/services/ai/promptBuilder.js

import { formatExamplesForPrompt } from "@/app/services/rag/ragService";

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
   * @param {Object} data - Contains formData, extractedTexts, ragExamples
   * @returns {string} Complete formatted prompt
   */
  build(data) {
    const { formData, extractedTexts, ragExamples } = data;

    // Check if this form uses RAG
    if (this.formConfig.useRAG && ragExamples) {
      return this.buildWithRAG(formData, extractedTexts, ragExamples);
    }

    // Check if this form uses the NEW template format
    if (this.formConfig.promptTemplate) {
      return this.buildFromTemplate(formData, extractedTexts);
    }

    // Otherwise use OLD format (for backward compatibility)
    return this.buildLegacyFormat(formData, extractedTexts);
  }

  /**
   * Build prompt using RAG examples
   */
  buildWithRAG(formData, extractedTexts, ragExamples) {
    // Format extracted texts
    const formattedExtractedTexts = extractedTexts
      .map((text, index) => `Page ${index + 1}:\n${text}`)
      .join("\n\n");

    // Format RAG examples
    const formattedExamples = formatExamplesForPrompt(ragExamples);

    // Build the prompt
    const prompt = `<system_role>
You are an administrative assistant specializing in formal correspondence for the Ahmadiyya Muslim Jamaat. You draft responses that precisely match organizational style, tone, and protocols.
</system_role>

<reference_examples>
${formattedExamples}
</reference_examples>

<input_letter>
${formattedExtractedTexts}
</input_letter>

<parameters>
<letter_type>${formData.letterType}</letter_type>
<context>${formData.context}</context>
<output_language>${formData.language}</output_language>
</parameters>

<instructions>
<task>
Draft a formal response that addresses the input letter according to the specified context and letter type.
</task>

<requirements>
- Mirror the exact style, format, and tone from the reference examples
- Address all specific matters raised in the input letter
- Follow organizational hierarchy and protocols shown in examples
- Use appropriate formal administrative language
- Ensure structural consistency with example correspondence
- Output ONLY the final drafted letter (no commentary or explanations)
</requirements>

<process>
1. Analyze the input letter for key issues, requests, and required actions
2. Review reference examples for applicable style patterns
3. Apply the context instructions to determine response approach
4. Draft the response following example structure and formality
5. Verify all points are addressed appropriately
</process>
</instructions>

<output_format>
Complete formal correspondence in ${formData.language}, ready for official use.
</output_format>`;

    return prompt.trim();
  }

  /**
   * Build prompt using NEW template format (for non-RAG forms)
   */
  buildFromTemplate(formData, extractedTexts) {
    const exampleKey = formData.exampleCategory || this.formType;
    const examples = this.deptConfig.getExamples(exampleKey);

    const formattedExtractedTexts = extractedTexts
      .map((text, index) => `Page ${index + 1}:\n${text}`)
      .join("\n\n");

    const formattedExamples = examples
      .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
      .join("\n\n");

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

    const parts = [template.instruction];

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
 * @param {Object} data - Contains formData, extractedTexts, ragExamples
 * @returns {string} Complete formatted prompt
 */
export function buildPrompt(deptConfig, formType, data) {
  const builder = new PromptBuilder(deptConfig, formType);
  return builder.build(data);
}
