// app/services/ai/providers/geminiService.js

export const geminiService = {
  providerName: "Gemini",

  async summarize(deptConfig, formData, extractedTexts, formType, config) {
    try {
      const response = await fetch("/api/ai/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Just pass the department identifier, not the whole config
          departmentId: deptConfig.departmentId,
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
