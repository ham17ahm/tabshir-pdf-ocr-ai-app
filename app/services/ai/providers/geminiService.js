// app/services/ai/providers/geminiService.js

const DEFAULT_CONFIG = {
  model: "gemini-1.5-flash",
  temperature: 0.7,
  maxTokens: 500,
};

export const geminiService = {
  providerName: "Gemini",

  async summarize(formData, extractedTexts, formType, config = {}) {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };

    try {
      const response = await fetch("/api/ai/gemini", {
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
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return data.summary;
    } catch (error) {
      console.error("Gemini service error:", error);
      throw error;
    }
  },
};
