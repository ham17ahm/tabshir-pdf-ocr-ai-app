// app/services/ai/providers/openaiService.js

export const openaiService = {
  providerName: "OpenAI",

  async summarize(deptConfig, formData, extractedTexts, formType, config) {
    try {
      const response = await fetch("/api/ai/openai", {
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
