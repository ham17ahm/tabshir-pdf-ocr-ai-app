// app/config/departments/tabshir3/index.js

import { tabshir3Registry } from "./registry";
import {
  buildFormTemplates,
  buildAIConfig,
} from "@/app/config/builders/configBuilder";

/**
 * Complete Tabshir3 Department Configuration
 * CLIENT-SAFE: No server-only imports
 */
export const tabshir3Config = {
  departmentId: "tabshir3",

  // The registry itself
  registry: tabshir3Registry,

  // Built configurations
  formTemplates: buildFormTemplates(tabshir3Registry),
  aiConfig: buildAIConfig(tabshir3Registry),

  // Flag indicating this department uses Google Sheets
  // The API routes will handle fetching data differently
  usesGoogleSheets: true,
};
