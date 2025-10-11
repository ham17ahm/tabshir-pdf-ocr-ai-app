// app/services/formSubmissionService.js

import { getAIService } from "@/app/services/ai/aiServiceFactory";

export const submitFormData = async (
  deptConfig,
  formData,
  extractedTexts,
  formType
) => {
  try {
    const aiConfig = deptConfig.aiConfig[formType];

    if (!aiConfig) {
      throw new Error(`No AI configuration found for form type: ${formType}`);
    }

    // CHANGED: Check if user selected an AI provider in the form
    let selectedProvider = aiConfig.provider; // default from registry

    if (formData.aiProvider) {
      // User selected a provider - convert to lowercase to match AI_PROVIDERS
      selectedProvider = formData.aiProvider.toLowerCase();
    }

    const aiService = getAIService(selectedProvider);

    // CHANGED: Select the correct model for the chosen provider
    const modelConfig = {
      model: aiConfig.models
        ? aiConfig.models[selectedProvider]
        : aiConfig.model,
      temperature: aiConfig.temperature,
      maxTokens: aiConfig.maxTokens,
    };

    // Call the AI service with department config
    const summary = await aiService.summarize(
      deptConfig,
      formData,
      extractedTexts,
      formType,
      modelConfig
    );

    return {
      success: true,
      submissionId: `SUB-${Date.now()}`,
      message: `Form submitted successfully for ${formType}`,
      data: {
        processedAt: new Date().toISOString(),
        formType,
        provider: aiService.providerName,
        summary: summary,
        status: "processed",
      },
    };
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  }
};
