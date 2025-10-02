/**
 * Utility to load example JSON files for each form type
 */

import GeneralExamples from "@/app/config/examples/General.json";
import InstructionsExamples from "@/app/config/examples/Instructions.json";
import TabshirInstructionsExamples from "@/app/config/examples/TabshirInstructions.json";

const examplesMap = {
  General: GeneralExamples,
  Instructions: InstructionsExamples,
  "Tabshir Instructions": TabshirInstructionsExamples,
};

/**
 * Get examples for a specific form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getExamples(formType) {
  const examples = examplesMap[formType];

  if (!examples) {
    console.warn(`No examples found for form type: ${formType}`);
    return [];
  }

  return examples.examples || [];
}
