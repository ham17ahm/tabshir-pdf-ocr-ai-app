// app/config/formTypes/registryUtils.js

import { formTypeRegistry } from "./registry";

/**
 * Get all available form type names
 * @returns {string[]} Array of form type names
 */
export function getAllFormTypes() {
  return Object.keys(formTypeRegistry);
}

/**
 * Check if a form type exists in registry
 * @param {string} formType - Form type identifier
 * @returns {boolean}
 */
export function isValidFormType(formType) {
  return formType in formTypeRegistry;
}

/**
 * Get complete configuration for a form type
 * @param {string} formType - Form type identifier
 * @returns {Object} Complete form configuration
 * @throws {Error} If form type doesn't exist
 */
export function getFormConfig(formType) {
  if (!isValidFormType(formType)) {
    throw new Error(`Form type "${formType}" not found in registry`);
  }
  return formTypeRegistry[formType];
}

/**
 * Get form fields configuration
 * @param {string} formType - Form type identifier
 * @returns {Array} Array of field configurations
 */
export function getFormFields(formType) {
  const config = getFormConfig(formType);
  return config.fields;
}

/**
 * Get AI provider configuration
 * @param {string} formType - Form type identifier
 * @returns {Object} AI configuration object
 */
export function getAIConfig(formType) {
  const config = getFormConfig(formType);
  return config.ai;
}

/**
 * Get prompt instruction template
 * @param {string} formType - Form type identifier
 * @returns {string} Prompt instruction text
 */
export function getPromptInstruction(formType) {
  const config = getFormConfig(formType);
  return config.prompt.instruction;
}

/**
 * Get examples file name
 * @param {string} formType - Form type identifier
 * @returns {string} Examples file name
 */
export function getExamplesFileName(formType) {
  const config = getFormConfig(formType);
  return config.examplesFile;
}
