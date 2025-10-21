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
 * Get form fields configuration
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {Array} Array of field configurations
 */
export function getFormFields(registry, formType) {
  if (!(formType in registry)) {
    throw new Error(`Form type "${formType}" not found in registry`);
  }
  const config = registry[formType];
  return config.fields;
}

/**
 * Get AI provider configuration
 * @param {Object} registry - Form type registry object
 * @param {string} formType - Form type identifier
 * @returns {Object} AI configuration object
 */
export function getAIConfig(registry, formType) {
  if (!(formType in registry)) {
    throw new Error(`Form type "${formType}" not found in registry`);
  }
  const config = registry[formType];
  return config.ai;
}
