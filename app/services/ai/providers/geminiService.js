// app/services/ai/providers/geminiService.js

export const geminiService = {
  providerName: "Gemini",

  async summarize(formData, extractedTexts, formType, config) {
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
          config: config,
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
