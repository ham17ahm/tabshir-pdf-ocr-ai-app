/**
 * Service for handling form submissions with AI processing
 */

import { getAIService } from "@/app/services/ai/aiServiceFactory";
import { formAIConfig } from "@/app/config/aiProviderConfig";

export const submitFormData = async (formData, extractedTexts, formType) => {
  try {
    // Get the AI configuration for this form type
    const aiConfig = formAIConfig[formType];

    if (!aiConfig) {
      throw new Error(`No AI configuration found for form type: ${formType}`);
    }

    // Get the appropriate AI service based on the form type
    const aiService = getAIService(aiConfig.provider);

    // Call the AI service to get summary
    const summary = await aiService.summarize(
      formData,
      extractedTexts,
      formType,
      aiConfig.prompt,
      aiConfig.config
    );

    // Return the response with the AI summary
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
