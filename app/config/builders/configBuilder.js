// app/config/builders/configBuilder.js

import {
  getAllFormTypes,
  getFormFields,
  getAIConfig,
  getPromptInstruction,
} from "@/app/config/formTypes/registryUtils";

/**
 * Build form templates from a registry
 * @param {Object} registry - Department's form registry
 * @returns {Object} Form templates
 */
export function buildFormTemplates(registry) {
  const templates = {};
  const formTypes = getAllFormTypes(registry);

  formTypes.forEach((formType) => {
    templates[formType] = getFormFields(registry, formType);
  });

  return templates;
}

/**
 * Build AI provider configurations from a registry
 * @param {Object} registry - Department's form registry
 * @returns {Object} AI configurations
 */
export function buildAIConfig(registry) {
  const config = {};
  const formTypes = getAllFormTypes(registry);

  formTypes.forEach((formType) => {
    const aiSettings = getAIConfig(registry, formType);

    // CHANGED: Support both old (model) and new (models) format
    if (aiSettings.models) {
      // New format with multiple provider models
      config[formType] = {
        provider: aiSettings.provider,
        models: aiSettings.models,
        temperature: aiSettings.temperature,
        maxTokens: aiSettings.maxTokens,
      };
    } else {
      // Old format with single model (for backward compatibility)
      config[formType] = {
        provider: aiSettings.provider,
        model: aiSettings.model,
        temperature: aiSettings.temperature,
        maxTokens: aiSettings.maxTokens,
      };
    }
  });

  return config;
}

/**
 * Build prompt templates from a registry
 * @param {Object} registry - Department's form registry
 * @param {Function} getExamplesFn - Function to get examples for this department
 * @returns {Object} Prompt templates
 */
export function buildPromptTemplates(registry, getExamplesFn) {
  const templates = {};
  const formTypes = getAllFormTypes(registry);

  // Standard sections that work for all departments
  const standardSections = [
    {
      name: "examples",
      label: "Examples of Desired Output",
      format: (data) => {
        const examples = getExamplesFn(data.formType);
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

  formTypes.forEach((formType) => {
    templates[formType] = {
      instruction: getPromptInstruction(registry, formType),
      sections: standardSections,
    };
  });

  return templates;
}
