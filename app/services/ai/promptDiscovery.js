// app/services/ai/promptDiscovery.js

/**
 * Dynamically discover and load prompt builder functions
 * Supports both language-specific and language-agnostic prompts
 */

/**
 * Discover and import a prompt builder function
 * @param {Object} deptConfig - Department configuration
 * @param {string} category - Category name (e.g., "Category1")
 * @param {string} language - Language (e.g., "Urdu" or "English")
 * @returns {Promise<Function|null>} - The buildPrompt function or null
 */
export async function discoverPromptBuilder(deptConfig, category, language) {
  const departmentId = deptConfig.departmentId; // e.g., "ps1"

  // Check if category uses auto-discovery
  const categoryConfig = deptConfig.registry[category];
  const strategy = categoryConfig?.promptStrategy || "auto-discover";

  // If manual strategy, fall back to the old method
  if (strategy === "manual") {
    return deptConfig.getPromptBuilder?.(category, language);
  }

  // AUTO-DISCOVERY LOGIC

  // Step 1: Try language-specific prompt (e.g., Category1_Urdu.js)
  try {
    const specificModule = await import(
      `@/app/config/departments/${departmentId}/prompts/${category}_${language}.js`
    );
    console.log(`✅ Found prompt: ${category}_${language}.js`);
    return specificModule.buildPrompt;
  } catch (error) {
    // File not found, continue to next attempt
  }

  // Step 2: Try language-agnostic prompt (e.g., Category1.js)
  try {
    const genericModule = await import(
      `@/app/config/departments/${departmentId}/prompts/${category}.js`
    );
    console.log(`✅ Found prompt: ${category}.js (language-agnostic)`);
    return genericModule.buildPrompt;
  } catch (error) {
    // File not found
  }

  // Step 3: Not found - return null (error will be thrown by caller)
  return null;
}
