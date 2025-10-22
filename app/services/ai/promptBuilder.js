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
   * @param {Object} data - Contains formData, extractedTexts, ragExamples, googleSheetsData
   * @returns {Promise<string>} Complete formatted prompt
   */
  async build(data) {
    const { formData, extractedTexts, ragExamples, googleSheetsData } = data;

    // Check if this form uses RAG
    if (this.formConfig.useRAG && ragExamples) {
      return this.buildWithRAG(formData, extractedTexts, ragExamples);
    }

    // Check if this form uses Google Sheets
    if (this.formConfig.useGoogleSheets && googleSheetsData) {
      return this.buildFromGoogleSheets(
        formData,
        extractedTexts,
        googleSheetsData
      );
    }

    // CHANGED: Check for BOTH old and new template format
    if (this.formConfig.promptTemplate || this.formConfig.promptTemplates) {
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
You are an administrative assistant specialising in drafting formal letters for the Ahmadiyya Muslim Jamaat. Your letters precisely match the style, tone, sentence and phrase structure of the provided examples.
</system_role>

<reference_examples>
${formattedExamples}
</reference_examples>

<input_letter>
${formattedExtractedTexts}
</input_letter>

<parameters>
<context>${formData.context}</context>
<output_language>${formData.language}</output_language>
</parameters>

<instructions>
<task>
Draft a formal response that addresses the input letter according to the specified context in the stated language.
</task>

<requirements>
- Mirror the exact style, format, and tone of the examples
- Address the specific matter raised in the input letter
- Use appropriate formal administrative language as shown in the examples
- Ensure structural consistency with example correspondence
- Output ONLY the main paragraph of the drafted letter (no commentary, explanations, salutations etc.)
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
Formal letter in ${formData.language}, ready for official use.
</output_format>`;
    return prompt.trim();
  }

  /**
   * Build prompt using Google Sheets templates and examples
   */
  buildFromGoogleSheets(formData, extractedTexts, googleSheetsData) {
    const { template, examples } = googleSheetsData;
    const language = formData.language;
    const category = this.formType;

    // Get the prompt builder function for this category + language
    const promptBuilder = this.deptConfig.getPromptBuilder?.(
      category,
      language
    );

    if (!promptBuilder) {
      throw new Error(
        `No prompt template found for ${category} in ${language} language. Please contact the administrator.`
      );
    }

    // Format the data
    const formattedExtractedTexts = extractedTexts
      .map((text, index) => `Page ${index + 1}:\n${text}`)
      .join("\n\n");

    const formattedExamples = examples
      .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
      .join("\n\n");

    // Call the prompt builder with all the data
    const prompt = promptBuilder({
      language,
      formattedExamples,
      template,
      formattedExtractedTexts,
      formData,
    });

    return prompt.trim();
  }

  /**
   * Build prompt using NEW template format (for non-RAG forms)
   */
  buildFromTemplate(formData, extractedTexts) {
    // Get the category (formType) and language from formData
    const category = this.formType;
    const language = formData.language;

    // Fetch examples using BOTH category and language
    const examples = this.deptConfig.getExamples(category, language);

    // Check if examples were found
    if (!examples || examples.length === 0) {
      console.warn(`No examples found for ${category} + ${language}`);
    }

    const formattedExtractedTexts = extractedTexts
      .map((text, index) => `Page ${index + 1}:\n${text}`)
      .join("\n\n");

    const formattedExamples = examples
      .map((ex, index) => `Example ${index + 1}:\n${ex.example}`)
      .join("\n\n");

    // CHANGED: Get the language-specific prompt template
    const promptTemplates = this.formConfig.promptTemplates;

    // Check if we have language-specific templates
    let promptTemplate;
    if (
      promptTemplates &&
      typeof promptTemplates === "object" &&
      !Array.isArray(promptTemplates)
    ) {
      // New format: { Urdu: fn, English: fn }
      promptTemplate = promptTemplates[language];

      if (!promptTemplate) {
        throw new Error(
          `No prompt template found for ${category} in ${language} language. Please contact the administrator.`
        );
      }
    } else {
      // Old format: single promptTemplate function (backward compatibility)
      promptTemplate = this.formConfig.promptTemplate;

      if (!promptTemplate) {
        throw new Error(`No prompt template found for ${category}`);
      }
    }

    const prompt = promptTemplate(
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
 * @returns {Promise<string>} Complete formatted prompt
 */
export async function buildPrompt(deptConfig, formType, data) {
  const builder = new PromptBuilder(deptConfig, formType);
  return await builder.build(data);
}
