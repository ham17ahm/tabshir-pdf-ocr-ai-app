// app/config/departments/tabshir1/examplesLoader.js

import * as ExamplesFiles from "./examples";
import {
  getExamplesFileName,
  isValidFormType,
} from "@/app/config/formTypes/registryUtils";
import { tabshir1Registry } from "./registry";

/**
 * Get examples for a specific Tabshir1 form type
 * @param {string} formType - The form type identifier
 * @returns {Array} Array of example objects
 */
export function getTabshir1Examples(formType) {
  if (!isValidFormType(tabshir1Registry, formType)) {
    throw new Error(`Invalid form type for Tabshir1: ${formType}`);
  }

  const fileName = getExamplesFileName(tabshir1Registry, formType);

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
