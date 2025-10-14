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
    const prompt = `You are an administrative assistant for the Ahmadiyya Muslim Jamaat who specializes in processing formal correspondence and drafting responses.

Here are examples of similar correspondence from the database that match this type of request:
<examples>
${formattedExamples}
</examples>

Here is the raw letter or report you need to process:
<letter>
${formattedExtractedTexts}
</letter>

Type of letter to generate: ${formData.letterType}

Context and instructions:
<context>
${formData.context}
</context>

Language for the final letter:
<language>
${formData.language}
</language>

Your task is to:
1. Carefully analyze the provided letter/report to understand its content, purpose, and any specific issues or requests it contains.
2. Consider the context provided to understand what type of response or action is required.
3. Draft an appropriate response that follows the exact style, format, tone, and structure demonstrated in the examples.
4. Ensure your response addresses the specific matters raised in the original correspondence.
5. Maintain the formal, administrative tone consistent with Ahmadiyya Muslim Jamaat correspondence.

Important guidelines:
- Study the examples carefully to understand the proper formal language, structure, and style.
- Your response must be appropriately formal and administrative in nature.
- Address relevant points from the original letter while following the context instructions.
- Use proper structure as shown in the examples.
- Maintain consistency with the organizational hierarchy and protocols demonstrated in the examples.
- Ensure your response is complete.

Your output should consist only of the drafted correspondence that follows the style and format of the examples provided, without any additional commentary or explanation.`;

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
