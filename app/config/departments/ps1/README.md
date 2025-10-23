# PS1 Department - Adding New Categories

## Quick Start: Adding a New Category

### Step 1: Add to Registry

Edit `registry.js` and add your category:

```javascript
CategoryX: {
  displayName: "Your Category Name",
  promptStrategy: "auto-discover",  // Enable auto-discovery
  fields: [
    {
      name: "language",
      label: "Language",
      type: "select",
      options: ["English", "Urdu"],
      required: true,
    },
    // Add any other fields you need
  ],
  ai: {
    provider: "gemini",
    models: {
      openai: "gpt-5-2025-08-07",
      gemini: "models/gemini-2.5-pro",
    },
    temperature: 1,
  },
  useGoogleSheets: true,
},
```

### Step 2: Add Template & Examples to Google Sheets

In your spreadsheet:

- **Templates sheet**: Add row with Category, Language, Structured_Format
- **Examples sheet**: Add rows with Category, Language, Example

### Step 3: Create Prompt Files

Create files in `prompts/` folder:

- `CategoryX_Urdu.js` (for Urdu)
- `CategoryX_English.js` (for English)
- OR `CategoryX.js` (language-agnostic)

Each file must export a `buildPrompt` function:

```javascript
export function buildPrompt(data) {
  const {
    language,
    formattedExamples,
    template,
    formattedExtractedTexts,
    formData,
  } = data;

  return `Your prompt template here using the data above`;
}
```

### Step 4: Done!

That's it! The system will auto-discover your prompts.

## File Naming Rules

- Language-specific: `CategoryName_Language.js` (e.g., `Category1_Urdu.js`)
- Language-agnostic: `CategoryName.js` (e.g., `Category4.js`)

## Troubleshooting

If you get "Prompt file not found" error, check:

1. File name matches exactly: `CategoryX_Urdu.js` or `CategoryX_English.js`
2. File exports `buildPrompt` function
3. Registry has `promptStrategy: "auto-discover"`
