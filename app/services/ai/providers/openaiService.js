// app/services/ai/providers/openaiService.js

const DEFAULT_CONFIG = {
  model: "gpt-4o-mini",
  temperature: 0.7,
  maxTokens: 500,
};

export const openaiService = {
  providerName: "OpenAI",

  async summarize(formData, extractedTexts, formType, config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    try {
      const response = await fetch("/api/ai/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          extractedTexts,
          formType,
          config: finalConfig,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error("OpenAI service error:", error);
      throw error;
    }
  },
};
