// app/utils/examplesLoader.js

import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";

// Import all example JSON files
import GeneralExamples from "@/app/config/examples/General.json";
import InstructionsExamples from "@/app/config/examples/Instructions.json";
import TabshirInstructionsExamples from "@/app/config/examples/TabshirInstructions.json";

/**
 * Map of example file names to their imported data
 * When adding new examples, import the JSON file above and add it here
 */
const examplesFileMap = {
  "General.json": GeneralExamples,
  "Instructions.json": InstructionsExamples,
  "TabshirInstructions.json": TabshirInstructionsExamples,
};

/**
 * Get examples for a specific form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getExamples(formType) {
  if (!isValidFormType(formType)) {
    console.warn(`Invalid form type: ${formType}`);
    return [];
  }

  const fileName = getExamplesFileName(formType);
  const examples = examplesFileMap[fileName];

  if (!examples) {
    console.warn(`No examples found for file: ${fileName}`);
    return [];
  }

  return examples.examples || [];
}
