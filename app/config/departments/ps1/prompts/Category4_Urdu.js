// app/config/departments/ps1/prompts/Category1_Urdu.js

/**
 * Prompt template for Category1 - Urdu language
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

INSTRUCTIONS: "${formData.instructions}"
OUTPUT LANGUAGE: ${language}

EXAMPLES OF DESIRED OUTPUT:
${formattedExamples}

STRUCTURED FORMAT:
${template}

EXTRACTED PDF TEXT:
${formattedExtractedTexts}

Your task is to write a formal letter in response to the letter provided in the "Extracted PDF Text" section contextually, in light of the examples given STRICTLY following the STRUCTURED FORMAT above.

IMPORTANT STYLE/GUIDANCE
- Follow the STRUCTURED FORMAT exactly as provided
- Incorporate the instructions in the final letter according to the structure
- Keep the formal and professional language style, wording and linguistics`;
}
