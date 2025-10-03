// app/config/aiProviderConfig.js

import { getAllFormTypes, getAIConfig } from "./formTypes/registryUtils";

/**
 * Dynamically build AI provider configurations from registry
 */
function buildAIConfig() {
  const config = {};
  const formTypes = getAllFormTypes();

  formTypes.forEach((formType) => {
    const aiSettings = getAIConfig(formType);

    config[formType] = {
      provider: aiSettings.provider,
      config: {
        model: aiSettings.model,
        temperature: aiSettings.temperature,
        maxTokens: aiSettings.maxTokens,
      },
    };
  });

  return config;
}

export const formAIConfig = buildAIConfig();
