// scripts/uploadToPinecone.mjs

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
import Papa from "papaparse";
import fs from "fs";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local from project root
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

// Initialize clients
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const INDEX_NAME = "tabshir-correspondence";
const BATCH_SIZE = 100; // Process 100 rows at a time

async function uploadData() {
  console.log("🚀 Starting upload process...\n");

  try {
    // 1. Read CSV file
    const csvPath = path.join(__dirname, "..", "correspondence-data.csv");
    const csvData = fs.readFileSync(csvPath, "utf8");

    // 2. Parse CSV
    const parsed = Papa.parse(csvData, {
      header: true,
      skipEmptyLines: true,
    });

    const rows = parsed.data;
    console.log(`📄 Found ${rows.length} rows in CSV\n`);

    // 3. Get Pinecone index
    const index = pinecone.index(INDEX_NAME);

    // 4. Process in batches
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}...`);

      try {
        await processBatch(batch, index, i);
        console.log(
          `✅ Uploaded ${Math.min(i + BATCH_SIZE, rows.length)} / ${
            rows.length
          } rows\n`
        );
      } catch (error) {
        console.log(`⚠️  Skipping batch, continuing with next...\n`);
      }
    }

    console.log("🎉 Upload complete!");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

async function processBatch(batch, index, startIndex) {
  try {
    // Prepare texts for embedding with truncation
    const textsToEmbed = batch.map((row) => {
      // Combine all fields
      const fullText = `${row.Category} ${row.MainText} ${row.Description}`;

      // Truncate to ~2000 characters (roughly 500 tokens) per item
      // This ensures 100 items won't exceed 8192 tokens
      return fullText.substring(0, 2000);
    });

    // Get embeddings from OpenAI
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: textsToEmbed,
    });

    // Prepare vectors for Pinecone
    const vectors = embeddingResponse.data.map((item, idx) => ({
      id: `doc-${startIndex + idx}`, // Unique ID
      values: item.embedding,
      metadata: {
        category: batch[idx].Category || "",
        text: batch[idx].MainText || "",
        description: batch[idx].Description || "",
      },
    }));

    // Upload to Pinecone
    await index.upsert(vectors);
  } catch (error) {
    console.error(
      `⚠️  Error processing batch starting at ${startIndex}:`,
      error.message
    );
    console.log("Skipping this batch and continuing...\n");
  }
}

// Run the upload
uploadData();
