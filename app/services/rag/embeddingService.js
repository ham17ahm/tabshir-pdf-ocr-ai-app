// app/services/rag/embeddingService.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Convert text to vector embedding
 * @param {string} text - The text to convert
 * @returns {Promise<number[]>} - Array of 1536 numbers
 */
export async function getEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Error getting embedding:", error);
    throw error;
  }
}

/**
 * Convert multiple texts to embeddings (batch)
 * @param {string[]} texts - Array of texts
 * @returns {Promise<number[][]>} - Array of embeddings
 */
export async function getBatchEmbeddings(texts) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: texts,
    });

    return response.data.map((item) => item.embedding);
  } catch (error) {
    console.error("Error getting batch embeddings:", error);
    throw error;
  }
}
