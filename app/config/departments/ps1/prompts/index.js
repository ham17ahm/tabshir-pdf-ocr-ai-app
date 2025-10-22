// app/config/departments/ps1/prompts/index.js

/**
 * PROMPTS MAPPING
 * Maps Category + Language combinations to their prompt template functions
 */

import { buildPrompt as Category1_Urdu } from "./Category1_Urdu.js";
import { buildPrompt as Category1_English } from "./Category1_English.js";

// Future prompts - uncomment as you create them
import { buildPrompt as Category2_Urdu } from "./Category2_Urdu.js";
// import { buildPrompt as Category2_English } from "./Category2_English.js";

/**
 * Prompt mapping registry
 * Key format: "CategoryName_Language"
 */
export const PROMPTS_MAPPING = {
  Category1_Urdu: Category1_Urdu,
  Category1_English: Category1_English,

  // Future mappings - uncomment as needed
  Category2_Urdu: Category2_Urdu,
  // "Category2_English": Category2_English,
  // "Category3_Urdu": Category2_Urdu,  // Reusing Category2's Urdu prompt
  // "Category3_English": Category2_English,  // Reusing Category2's English prompt
};

/**
 * Get the prompt builder function for a category + language combination
 * @param {string} category - The category name (e.g., "Category1")
 * @param {string} language - The language (e.g., "Urdu" or "English")
 * @returns {Function|null} - The prompt builder function or null if not found
 */
export function getPromptBuilder(category, language) {
  const key = `${category}_${language}`;
  return PROMPTS_MAPPING[key] || null;
}
