// app/config/departments/tabshir2/index.js

import { tabshir2Registry } from "./registry";
import { getTabshir2Examples } from "./examplesLoader";
import {
  buildFormTemplates,
  buildAIConfig,
} from "@/app/config/builders/configBuilder";

/**
 * Complete Tabshir2 Department Configuration
 * Everything the app needs to work with Tabshir2 forms
 */
export const tabshir2Config = {
  departmentId: "tabshir2",
  // The registry itself
  registry: tabshir2Registry,

  // Function to get examples
  getExamples: getTabshir2Examples,

  // Built configurations
  formTemplates: buildFormTemplates(tabshir2Registry),
  aiConfig: buildAIConfig(tabshir2Registry),
};
