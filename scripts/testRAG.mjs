// scripts/testRAG.mjs

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testSearch() {
  console.log("🔍 Testing RAG search...\n");

  // Test query
  const testQuery = "Travel permission and airport pickup arrangement";

  console.log(`Query: "${testQuery}"\n`);

  // 1. Convert query to embedding
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: testQuery,
  });

  const queryEmbedding = embeddingResponse.data[0].embedding;

  // 2. Search Pinecone
  const index = pinecone.index("tabshir-correspondence");
  const searchResults = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  // 3. Display results
  console.log("📋 Top 5 Similar Examples:\n");
  searchResults.matches.forEach((match, idx) => {
    console.log(`${idx + 1}. Category: ${match.metadata.category}`);
    console.log(`   Similarity Score: ${(match.score * 100).toFixed(2)}%`);
    console.log(`   Description: ${match.metadata.description}`);
    console.log(`   Text Preview: ${match.metadata.text.substring(0, 150)}...`);
    console.log();
  });
}

testSearch();
