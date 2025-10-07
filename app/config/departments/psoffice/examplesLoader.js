// app/config/departments/psoffice/examplesLoader.js

import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";
import { psofficeRegistry } from "./registry";

// Import PS Office examples
import PSGeneralExamples from "./examples/PSGeneral.json";
import PSInstructionsExamples from "./examples/PSInstructions.json";
import PSTabshirInstructionsExamples from "./examples/PSTabshirInstructions.json";

/**
 * Map of example file names to their imported data
 */
const examplesFileMap = {
  "PSGeneral.json": PSGeneralExamples,
  "PSInstructions.json": PSInstructionsExamples,
  "PSTabshirInstructions.json": PSTabshirInstructionsExamples,
};

/**
 * Get examples for a specific PS Office form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getPSOfficeExamples(formType) {
  if (!isValidFormType(psofficeRegistry, formType)) {
    console.warn(`Invalid form type for PS Office: ${formType}`);
    return [];
  }

  const fileName = getExamplesFileName(psofficeRegistry, formType);
  const examples = examplesFileMap[fileName];

  if (!examples) {
    console.warn(`No examples found for PS Office: ${fileName}`);
    return [];
  }

  return examples.examples || [];
}
