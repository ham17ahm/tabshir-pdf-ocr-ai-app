// app/config/departments/psoffice/examplesLoader.js

import * as ExamplesFiles from "./examples";
import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";
import { psofficeRegistry } from "./registry";

/**
 * Get examples for a specific PS Office form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getPSOfficeExamples(formType) {
  if (!isValidFormType(psofficeRegistry, formType)) {
    throw new Error(`Invalid form type for PS Office: ${formType}`);
  }

  const fileName = getExamplesFileName(psofficeRegistry, formType);

  // Remove .json extension to get the export name
  const exportName = fileName.replace(".json", "");

  const examples = ExamplesFiles[exportName];

  if (!examples) {
    throw new Error(
      `Example file not found: ${fileName}. Make sure it's exported in examples/index.js`
    );
  }

  return examples.examples || [];
}
