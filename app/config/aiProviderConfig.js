// app/config/aiProviderConfig.js

import { AI_PROVIDERS } from "@/app/services/ai/aiServiceFactory";

export const formAIConfig = {
  "Option 1": {
    provider: AI_PROVIDERS.OPENAI,
    // ❌ REMOVED: prompt: "Summarize the following..."
    config: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 150,
    },
  },
  "Option 2": {
    provider: AI_PROVIDERS.GEMINI,
    // ❌ REMOVED: prompt: "Provide a one-sentence summary..."
    config: {
      model: "models/gemini-flash-lite-latest",
      temperature: 0.7,
      maxTokens: 150,
    },
  },
};
