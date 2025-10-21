// scripts/testGoogleSheets.mjs

import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const { getTemplate, getExamples, getAllCategories } = await import(
  "../app/services/googleSheetsService.js"
);

async function testGoogleSheets() {
  console.log("🧪 Testing Google Sheets Connection...\n");

  try {
    // Test 1: Get all categories
    console.log("📋 Test 1: Fetching all categories...");
    const categories = await getAllCategories();
    console.log("Categories found:", categories);
    console.log("✅ Success!\n");

    // Test 2: Get template for Category99 - English
    console.log("📋 Test 2: Fetching template for Category99 (English)...");
    const template = await getTemplate("Category99", "English");
    console.log("Template:", template);
    console.log("✅ Success!\n");

    // Test 3: Get examples for Category99 - English
    console.log("📋 Test 3: Fetching examples for Category99 (English)...");
    const examples = await getExamples("Category99", "English");
    console.log(`Found ${examples.length} examples:`);
    examples.forEach((ex, i) => {
      console.log(`  Example ${i + 1}:`, ex.example);
    });
    console.log("✅ Success!\n");

    console.log("🎉 All tests passed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error);
  }
}

testGoogleSheets();
