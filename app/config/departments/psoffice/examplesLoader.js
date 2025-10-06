// app/config/departments/psoffice/examplesLoader.js

import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";
import { psofficeRegistry } from "./registry";

// PS Office will import their examples here when ready
// import PSGeneralExamples from "./examples/PSGeneral.json";

/**
 * Map of example file names to their imported data
 */
const examplesFileMap = {
  // PS Office will add their examples here
  // "PSGeneral.json": PSGeneralExamples,
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
