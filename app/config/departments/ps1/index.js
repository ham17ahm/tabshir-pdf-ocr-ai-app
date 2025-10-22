// app/config/departments/ps1/index.js

import { ps1Registry } from "./registry";
import {
  buildFormTemplates,
  buildAIConfig,
} from "@/app/config/builders/configBuilder";
import { getPromptBuilder } from "./prompts/index.js";

/**
 * Complete PS 1 Department Configuration
 * CLIENT-SAFE: No server-only imports
 */
export const ps1Config = {
  departmentId: "ps1",

  // The registry itself
  registry: ps1Registry,

  // Built configurations
  formTemplates: buildFormTemplates(ps1Registry),
  aiConfig: buildAIConfig(ps1Registry),

  // Flag indicating this department uses Google Sheets
  usesGoogleSheets: true,

  // Google Sheets Spreadsheet ID for PS 1
  googleSheetsId: "1GR2qxIIJm8wH5VulFTY1_zlNKKAfVv7LgCA6-cdtKeo",

  // NEW: Method to get prompt builder for a category + language
  getPromptBuilder: (category, language) => {
    return getPromptBuilder(category, language);
  },
};
