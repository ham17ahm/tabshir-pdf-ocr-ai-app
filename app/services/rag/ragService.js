// app/services/rag/ragService.js

import { getPineconeIndex } from "./pineconeService";
import { getEmbedding } from "./embeddingService";

/**
 * Search for similar correspondence examples
 * @param {string} query - The text to search for (incoming letter + context)
 * @param {number} topK - Number of similar examples to return (default: 5)
 * @returns {Promise<Array>} - Array of similar examples
 */
export async function searchSimilarExamples(query, topK = 5) {
  try {
    // 1. Convert the query to a vector
    const queryEmbedding = await getEmbedding(query);

    // 2. Search Pinecone for similar vectors
    const index = await getPineconeIndex();
    const searchResults = await index.query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
    });

    // 3. Extract and return the examples
    const examples = searchResults.matches.map((match) => ({
      text: match.metadata.text,
      category: match.metadata.category,
      description: match.metadata.description,
      score: match.score, // similarity score (0-1)
    }));

    return examples;
  } catch (error) {
    console.error("Error searching similar examples:", error);
    throw error;
  }
}

/**
 * Format examples for AI prompt
 * @param {Array} examples - Array of example objects
 * @returns {string} - Formatted examples text
 */
export function formatExamplesForPrompt(examples) {
  if (!examples || examples.length === 0) {
    return "No similar examples found.";
  }

  return examples
    .map((ex, index) => `Example ${index + 1}:\n${ex.text}`)
    .join("\n\n");
}

/**
 * Build search query from user inputs
 * @param {Object} params - { letterType, context, extractedTexts }
 * @returns {string} - Search query (just letter type)
 */
export function buildSearchQuery({ letterType, context, extractedTexts }) {
  // Search only by letter type for focused results
  return letterType || "";
}
