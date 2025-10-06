// app/config/departments/tabshir/index.js

import { tabshirRegistry } from "./registry";
import { getTabshirExamples } from "./examplesLoader";
import {
  buildFormTemplates,
  buildAIConfig,
  buildPromptTemplates,
} from "@/app/config/builders/configBuilder";

/**
 * Complete Tabshir Department Configuration
 * Everything the app needs to work with Tabshir forms
 */
export const tabshirConfig = {
  departmentId: "tabshir",
  // The registry itself
  registry: tabshirRegistry,

  // Function to get examples
  getExamples: getTabshirExamples,

  // Built configurations
  formTemplates: buildFormTemplates(tabshirRegistry),
  aiConfig: buildAIConfig(tabshirRegistry),
  promptTemplates: buildPromptTemplates(tabshirRegistry, getTabshirExamples),
};
