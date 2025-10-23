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

### Step 4: Register in Prompt Index

**IMPORTANT:** Add your new prompt files to `prompts/index.js`:

```javascript
// Import your new prompt
import * as CategoryX_Urdu from "./CategoryX_Urdu.js";
import * as CategoryX_English from "./CategoryX_English.js";

// Add to the promptBuilders object
export const promptBuilders = {
  // ... existing entries
  CategoryX_Urdu: CategoryX_Urdu.buildPrompt,
  CategoryX_English: CategoryX_English.buildPrompt,
};
```

### Step 5: Done!

That's it! The system will now find your prompts via the index file.

## File Naming Rules

- Language-specific: `CategoryName_Language.js` (e.g., `Category1_Urdu.js`)
- Language-agnostic: `CategoryName.js` (e.g., `Category4.js`)
- Index key format: `'CategoryName_Language'` or `'CategoryName'`

## Troubleshooting

If you get "Prompt file not found" error, check:

1. ✅ File name matches exactly: `CategoryX_Urdu.js` or `CategoryX_English.js`
2. ✅ File exports `buildPrompt` function
3. ✅ Registry has `promptStrategy: "auto-discover"`
4. ✅ **Prompt is registered in `prompts/index.js`** ← Most common issue!
5. ✅ Index key matches format: `'CategoryX_Urdu'` not `'categoryX_urdu'`

## Example: Adding Category5

```javascript
// 1. Create prompts/Category5_Urdu.js
export function buildPrompt(data) { /* ... */ }

// 2. Edit prompts/index.js
import * as Category5_Urdu from './Category5_Urdu.js';

export const promptBuilders = {
  // ... existing entries
  'Category5_Urdu': Category5_Urdu.buildPrompt,
};

// 3. Add to registry.js
Category5: {
  displayName: "Category 5",
  promptStrategy: "auto-discover",
  // ... rest of config
}
```
