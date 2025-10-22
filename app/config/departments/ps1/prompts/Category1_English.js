// app/config/departments/ps1/prompts/Category1_English.js

/**
 * Prompt template for Category1 - English language
 * @param {Object} data - Contains all the data needed for the prompt
 * @returns {string} - The complete formatted prompt
 */
export function buildPrompt(data) {
  const {
    language,
    formattedExamples,
    template,
    formattedExtractedTexts,
    formData,
  } = data;

  return `Below you will find a structure and example data to help you write a formal letter.

VERBATIM INSTRUCTIONS: "${formData.instructions}"
OUTPUT LANGUAGE: ${language}

EXAMPLES OF DESIRED OUTPUT:
${formattedExamples}

STRUCTURED FORMAT:
${template}

EXTRACTED PDF TEXT:
${formattedExtractedTexts}

Your task is to write a formal letter in response to the raw letter provided in the "Extracted PDF Text" section, in light of the examples and the structured format above.

IMPORTANT STYLE/GUIDANCE
- Follow the structured format exactly as provided
- Reproduce the instructions in full (do not summarize)
- Keep the response formal and professional`;
}
