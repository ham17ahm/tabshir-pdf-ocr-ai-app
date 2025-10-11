// app/config/departments/tabshir/examplesLoader.js

// Import Tabshir's examples
import GeneralExamples from "./examples/General.json";
import InstructionsExamples from "./examples/Instructions.json";
import TabshirInstructionsExamples from "./examples/TabshirInstructions.json";

/**
 * FLEXIBLE MAPPING: Example Category → Example File
 * Add new categories here as you create more example files
 */
const EXAMPLE_CATEGORY_MAP = {
  General: GeneralExamples,
  "Alternative Examples": InstructionsExamples, // Using Instructions as placeholder
  // Future: Add more mappings here
  // "Another Category": AnotherExamplesFile,
};

/**
 * Get examples for a specific category
 * @param {string} categoryName - The example category selected by user
 * @returns {Array} Array of example objects
 */
export function getTabshirExamples(categoryName) {
  const examples = EXAMPLE_CATEGORY_MAP[categoryName];

  if (!examples) {
    console.warn(`No examples found for category: ${categoryName}`);
    return [];
  }

  return examples.examples || [];
}
