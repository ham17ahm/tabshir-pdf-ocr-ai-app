// app/services/formSubmissionService.js

import { getAIService } from "@/app/services/ai/aiServiceFactory";
import { formAIConfig } from "@/app/config/aiProviderConfig";

export const submitFormData = async (formData, extractedTexts, formType) => {
  try {
    const aiConfig = formAIConfig[formType];

    if (!aiConfig) {
      throw new Error(`No AI configuration found for form type: ${formType}`);
    }

    const aiService = getAIService(aiConfig.provider);

    // Call the AI service (no more prompt parameter)
    const summary = await aiService.summarize(
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
