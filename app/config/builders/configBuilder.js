// app/config/builders/configBuilder.js

import {
  getAllFormTypes,
  getFormFields,
  getAIConfig,
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
