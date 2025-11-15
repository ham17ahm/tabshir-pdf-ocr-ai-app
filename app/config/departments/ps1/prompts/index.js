// app/config/departments/ps1/prompts/index.js

/**
 * Prompt Builders Index for PS1 Department
 * Add new prompt files here as you create them
 */

// Import all prompt builders
import * as Category1_Urdu from "./Category1_Urdu.js";
import * as Category1_English from "./Category1_English.js";
import * as Category2_Urdu from "./Category2_Urdu.js";
import * as Category3_English from "./Category3_English.js";
import * as Category3_Urdu from "./Category3_Urdu.js";
import * as Category4_Urdu from "./Category4_Urdu.js";

/**
 * Prompt builder registry
 * Key format: "CategoryName_Language" or "CategoryName" for language-agnostic
 */
export const promptBuilders = {
  Category1_Urdu: Category1_Urdu.buildPrompt,
  Category1_English: Category1_English.buildPrompt,
  Category2_Urdu: Category2_Urdu.buildPrompt,
  Category3_English: Category3_English.buildPrompt,
  Category3_Urdu: Category3_Urdu.buildPrompt,
  Category4_Urdu: Category4_Urdu.buildPrompt,
};

/**
 * Get a prompt builder function
 * @param {string} category - Category name
 * @param {string} language - Language (Urdu/English)
 * @returns {Function|null} - The buildPrompt function or null
 */
export function getPromptBuilder(category, language) {
  // Try language-specific first
  const specificKey = `${category}_${language}`;
  if (promptBuilders[specificKey]) {
    return promptBuilders[specificKey];
  }

  // Try language-agnostic
  const genericKey = category;
  if (promptBuilders[genericKey]) {
    return promptBuilders[genericKey];
  }

  return null;
}
