// app/services/googleSheetsService.js

import { google } from "googleapis";
import path from "path";

let sheets = null;

/**
 * Initialize Google Sheets API client
 */
function getSheets() {
  if (sheets) return sheets;

  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(
      process.cwd(),
      "google-sheets-reader-key",
      "google-sheets-credentials.json"
    ),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  sheets = google.sheets({ version: "v4", auth });
  return sheets;
}

/**
 * Fetch data from a specific sheet
 * @param {string} sheetName - Name of the sheet (e.g., "Templates" or "Examples")
 * @returns {Promise<Array>} Array of row objects
 */
async function fetchSheetData(sheetName) {
  const sheets = getSheets();
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:Z`, // Fetch all columns
  });

  const rows = response.data.values;

  if (!rows || rows.length === 0) {
    return [];
  }

  // First row is headers
  const headers = rows[0];
  const data = [];

  // Convert rows to objects
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] || "";
    });

    data.push(obj);
  }

  return data;
}

/**
 * Get templates for a specific category and language
 */
export async function getTemplate(category, language) {
  const templates = await fetchSheetData("Templates");

  const template = templates.find(
    (t) => t.Category === category && t.Language === language
  );

  return template ? template.Structured_Format : null;
}

/**
 * Get examples for a specific category and language
 */
export async function getExamples(category, language) {
  const examples = await fetchSheetData("Examples");

  const filtered = examples.filter(
    (ex) => ex.Category === category && ex.Language === language
  );

  return filtered.map((ex) => ({ example: ex.Example }));
}

/**
 * Get all unique categories from Templates sheet
 */
export async function getAllCategories() {
  const templates = await fetchSheetData("Templates");

  const categories = [...new Set(templates.map((t) => t.Category))];
  return categories.filter(Boolean); // Remove empty strings
}
