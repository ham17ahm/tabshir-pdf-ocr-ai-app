// app/config/departments/tabshir/examplesLoader.js

import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";
import { tabshirRegistry } from "./registry";

// Import Tabshir's examples
import GeneralExamples from "./examples/General.json";
import InstructionsExamples from "./examples/Instructions.json";
import TabshirInstructionsExamples from "./examples/TabshirInstructions.json";

/**
 * Map of example file names to their imported data
 */
const examplesFileMap = {
  "General.json": GeneralExamples,
  "Instructions.json": InstructionsExamples,
  "TabshirInstructions.json": TabshirInstructionsExamples,
};

/**
 * Get examples for a specific Tabshir form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getTabshirExamples(formType) {
  if (!isValidFormType(tabshirRegistry, formType)) {
    console.warn(`Invalid form type for Tabshir: ${formType}`);
    return [];
  }

  const fileName = getExamplesFileName(tabshirRegistry, formType);
  const examples = examplesFileMap[fileName];

  if (!examples) {
    console.warn(`No examples found for Tabshir: ${fileName}`);
    return [];
  }

  return examples.examples || [];
}
