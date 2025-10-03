// app/config/formTemplates.js

import { getAllFormTypes, getFormFields } from "./formTypes/registryUtils";

/**
 * Dynamically build form templates from registry
 */
function buildFormTemplates() {
  const templates = {};
  const formTypes = getAllFormTypes();

  formTypes.forEach((formType) => {
    templates[formType] = getFormFields(formType);
  });

  return templates;
}

export const formTemplates = buildFormTemplates();
