// app/config/aiProviderConfig.js

import { AI_PROVIDERS } from "@/app/services/ai/aiServiceFactory";

export const formAIConfig = {
  General: {
    provider: AI_PROVIDERS.OPENAI,
    config: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 500,
    },
  },
  Instructions: {
    provider: AI_PROVIDERS.GEMINI,
    config: {
      model: "models/gemini-flash-lite-latest",
      temperature: 0.7,
      maxTokens: 500,
    },
  },
  "Tabshir Instructions": {
    provider: AI_PROVIDERS.OPENAI,
    config: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 500,
    },
  },
};
