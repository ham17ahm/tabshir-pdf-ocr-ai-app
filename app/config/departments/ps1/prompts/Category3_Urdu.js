// app/config/departments/ps1/prompts/Category3_Urdu.js

/**
 * Prompt template for Category3 - Urdu language
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

  return `{
  "task": "formal_acknowledgement_letter_generation",
  "objective": "Write a formal acknowledgement letter using the specified format by extracting relevant details from provided correspondence or report",
  "letter_template": {
    "format": "${template}",
    "variables": {
      "date_of_report": {
        "description": "Date of the report and/or any reference provided",
        "extraction_from": "raw correspondence"
      },
      "executive_summary": {
        "description": "Very brief executive summary of the matter at hand",
        "constraints": "No more than one comprehensively constructed sentence",
        "extraction_from": "raw correspondence"
      }
    }
  },
  "input_required": {
    "correspondence": {
      "type": "string",
      "description": "Raw correspondence or report text from which to extract details"
    }
  },
  "output": {
    "type": "formal_letter",
    "format": "text",
    "structure": "Complete acknowledgement letter following the specified template"
  },
  "instructions": [
    "Extract the date of the report from the provided correspondence",
    "If a reference number is provided, include it with the date",
    "Create a concise executive summary (one sentence) of the matter",
    "Generate the formal acknowledgement letter using the extracted information",
    "Maintain the formal tone and exact phrasing of the template"
  ]
}

[RAW CORRESPONDENCE]=

${formattedExtractedTexts}
`;
}
