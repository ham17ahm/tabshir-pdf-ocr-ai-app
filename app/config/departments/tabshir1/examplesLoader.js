// app/config/departments/tabshir1/examplesLoader.js

import * as ExamplesFiles from "./examples";
import { getExampleFileName } from "./examplesMapping";

/**
 * Get examples for a specific category + language combination
 * @param {string} category - The category name (e.g., "Category 1")
 * @param {string} language - The language (e.g., "Urdu" or "English")
 * @returns {Array} Array of example objects
 */
export function getTabshir1Examples(category, language) {
  // Get the filename from our mapping
  const fileName = getExampleFileName(category, language);

  if (!fileName) {
    console.error(`No example file configured for ${category} + ${language}`);
    return [];
  }

  // Remove .json extension to get the export name
  const exportName = fileName.replace(".json", "");

  // Get the examples from the imported files
  const examples = ExamplesFiles[exportName];

  if (!examples) {
    console.error(
      `Example file "${fileName}" not found. Make sure it exists and is exported in examples/index.js`
    );
    return [];
  }

  return examples.examples || [];
}
