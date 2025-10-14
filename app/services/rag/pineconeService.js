// app/services/rag/pineconeService.js

import { Pinecone } from "@pinecone-database/pinecone";

let pineconeClient = null;
let index = null;

/**
 * Initialize Pinecone connection
 */
export async function initPinecone() {
  if (pineconeClient) {
    return pineconeClient;
  }

  pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  return pineconeClient;
}

/**
 * Get the Pinecone index
 */
export async function getPineconeIndex() {
  if (index) {
    return index;
  }

  const pc = await initPinecone();
  index = pc.index("tabshir-correspondence");

  return index;
}
