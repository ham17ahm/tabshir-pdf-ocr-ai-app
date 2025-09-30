/**
 * Configuration mapping form types to AI providers and their prompts
 * Add new mappings here to route different forms to different AI services
 */

import { AI_PROVIDERS } from "@/app/services/ai/aiServiceFactory";

export const formAIConfig = {
  "Option 1": {
    provider: AI_PROVIDERS.OPENAI,
    prompt:
      "Summarize the following form submission and extracted PDF text in one sentence",
    config: {
      model: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 150,
    },
  },
  "Option 2": {
    provider: AI_PROVIDERS.GEMINI,
    prompt:
      "Provide a one-sentence summary of this company form and document data",
    config: {
      model: "models/gemini-flash-lite-latest",
      temperature: 0.7,
      maxTokens: 150,
    },
  },
  // Future Option 3 can be added here easily
  // 'Option 3': {
  //   provider: AI_PROVIDERS.OPENAI,
  //   prompt: 'Your custom prompt here',
  //   config: { ... }
  // },
};
