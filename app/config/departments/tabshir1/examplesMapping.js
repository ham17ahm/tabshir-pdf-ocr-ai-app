/**
 * SINGLE SOURCE OF TRUTH
 * Maps Category + Language combinations to example files
 */

export const EXAMPLES_MAPPING = {
  "Category 1": {
    Urdu: "Category1_Urdu.json",
    English: "Category1_English.json",
  },
  "Category 2": {
    Urdu: "Category2_Urdu.json",
    English: "Category2_English.json",
  },
  "Category 3": {
    Urdu: "Category3_Urdu.json",
    English: "Category3_English.json",
  },
};

/**
 * Get the example filename for a category + language combination
 * @param {string} category - The category name
 * @param {string} language - The language (Urdu/English)
 * @returns {string|null} - The example filename or null if not found
 */
export function getExampleFileName(category, language) {
  const categoryMapping = EXAMPLES_MAPPING[category];

  if (!categoryMapping) {
    console.warn(`No examples mapping found for category: ${category}`);
    return null;
  }

  const fileName = categoryMapping[language];

  if (!fileName) {
    console.warn(`No example file found for ${category} + ${language}`);
    return null;
  }

  return fileName;
}
