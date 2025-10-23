// app/services/ai/promptDiscovery.js

/**
 * Discover and load prompt builder functions using department indexes
 */

export async function discoverPromptBuilder(deptConfig, category, language) {
  const departmentId = deptConfig.departmentId;

  // Check if category uses auto-discovery
  const categoryConfig = deptConfig.registry[category];
  const strategy = categoryConfig?.promptStrategy || "auto-discover";

  // If manual strategy, use old method
  if (strategy === "manual") {
    return deptConfig.getPromptBuilder?.(category, language);
  }

  // AUTO-DISCOVERY: Import the department's prompt index
  try {
    let promptIndex;

    // Import the appropriate department's prompt index
    if (departmentId === "ps1") {
      promptIndex = await import(
        "@/app/config/departments/ps1/prompts/index.js"
      );
    } else if (departmentId === "tabshir3") {
      promptIndex = await import(
        "@/app/config/departments/tabshir3/prompts/index.js"
      );
    }
    // Add other departments here as needed

    if (!promptIndex) {
      throw new Error(`No prompt index found for department: ${departmentId}`);
    }

    // Use the index's getPromptBuilder function
    const promptBuilder = promptIndex.getPromptBuilder(category, language);

    if (promptBuilder) {
      console.log(
        `✅ Found prompt: ${category}_${language} (or generic ${category})`
      );
      return promptBuilder;
    }
  } catch (error) {
    console.error("Error loading prompt:", error.message);
  }

  return null;
}
