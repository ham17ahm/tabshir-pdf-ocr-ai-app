// app/config/departments/psoffice/index.js

import { psofficeRegistry } from "./registry";
import { getPSOfficeExamples } from "./examplesLoader";
import {
  buildFormTemplates,
  buildAIConfig,
} from "@/app/config/builders/configBuilder";

/**
 * Complete PS Office Department Configuration
 * Everything the app needs to work with PS Office forms
 */
export const psofficeConfig = {
  departmentId: "psoffice",
  // The registry itself
  registry: psofficeRegistry,

  // Function to get examples
  getExamples: getPSOfficeExamples,

  // Built configurations
  formTemplates: buildFormTemplates(psofficeRegistry),
  aiConfig: buildAIConfig(psofficeRegistry),
  // Remove the old promptTemplates since we use the new format
};
