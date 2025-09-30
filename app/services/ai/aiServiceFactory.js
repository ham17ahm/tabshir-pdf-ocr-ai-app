/**
 * Factory function for AI service selection
 * Returns the appropriate AI service handler
 */

import { openaiService } from "./providers/openaiService";
import { geminiService } from "./providers/geminiService";

export const AI_PROVIDERS = {
  OPENAI: "openai",
  GEMINI: "gemini",
};

export function getAIService(provider) {
  switch (provider) {
    case AI_PROVIDERS.OPENAI:
      return openaiService;
    case AI_PROVIDERS.GEMINI:
      return geminiService;
    default:
      throw new Error(`Unknown AI provider: ${provider}`);
  }
}
