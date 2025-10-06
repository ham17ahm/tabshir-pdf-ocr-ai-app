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

    const aiService = getAIService(aiConfig.provider);

    // Call the AI service with department config
    const summary = await aiService.summarize(
      deptConfig,
      formData,
      extractedTexts,
      formType,
      aiConfig.config
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
