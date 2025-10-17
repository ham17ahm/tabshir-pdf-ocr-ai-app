// app/config/departments/tabshir1/index.js

import { tabshir1Registry } from "./registry";
import { getTabshir1Examples } from "./examplesLoader";
import {
  buildFormTemplates,
  buildAIConfig,
} from "@/app/config/builders/configBuilder";

/**
 * Complete Tabshir1 Department Configuration
 * Everything the app needs to work with Tabshir1 forms
 */
export const tabshir1Config = {
  departmentId: "tabshir1",
  // The registry itself
  registry: tabshir1Registry,

  // Function to get examples
  getExamples: getTabshir1Examples,

  // Built configurations
  formTemplates: buildFormTemplates(tabshir1Registry),
  aiConfig: buildAIConfig(tabshir1Registry),
};
