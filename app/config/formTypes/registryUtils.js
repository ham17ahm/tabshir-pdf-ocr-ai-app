// app/config/formTypes/registryUtils.js

/**
 * Generic utility functions that work with ANY registry
 * No longer tied to a specific department
 */

/**
 * Get all available form type names from a registry
 * @param {Object} registry - Form type registry object
 * @returns {string[]} Array of form type names
 */
export function getAllFormTypes(registry) {
  return Object.keys(registry);
}

/**
 * Check if a form type exists in registry
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {boolean}
 */
export function isValidFormType(registry, formType) {
  return formType in registry;
}

/**
 * Get complete configuration for a form type
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {Object} Complete form configuration
 * @throws {Error} If form type doesn't exist
 */
export function getFormConfig(registry, formType) {
  if (!isValidFormType(registry, formType)) {
    throw new Error(`Form type "${formType}" not found in registry`);
  }
  return registry[formType];
}

/**
 * Get form fields configuration
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {Array} Array of field configurations
 */
export function getFormFields(registry, formType) {
  const config = getFormConfig(registry, formType);
  return config.fields;
}

/**
 * Get AI provider configuration
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {Object} AI configuration object
 */
export function getAIConfig(registry, formType) {
  const config = getFormConfig(registry, formType);
  return config.ai;
}

/**
 * Get prompt instruction template
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {string} Prompt instruction text
 */
export function getPromptInstruction(registry, formType) {
  const config = getFormConfig(registry, formType);
  return config.prompt.instruction;
}

/**
 * Get examples file name
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {string} Examples file name
 */
export function getExamplesFileName(registry, formType) {
  const config = getFormConfig(registry, formType);
  return config.examplesFile;
}
