import { aiService } from './services/ai.service';

export * from './client';
export * from './services/goal.service';
export * from './services/ai.service';
export * from './store/useGoalStore';

// Backwards-compatibility wrapper for getAiGoalSuggestions
export async function getAiGoalSuggestions(goalTitle: string, mbti?: string): Promise<string> {
  const response = await aiService.getAiGoalSuggestions({
    title: goalTitle,
    mbti: mbti as any,
  });
  if (response.success && response.data) {
    return response.data.insights;
  }
  // Fallback if backend API is not responding or not configured
  return `[Mock Gemini Insight for ${mbti || 'P-System'}]: Since you have a lazy/Procrastinator streak, break "${goalTitle}" down into micro-steps of less than 5 minutes. Start with one simple task today!`;
}

// Backwards-compatibility mock for Supabase
export const supabase = {
  auth: {},
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
  }),
};

// Backwards-compatibility mock for GeminiApiClient
export class GeminiApiClient {
  async generateGoalInsights(goalTitle: string, mbti?: string): Promise<string> {
    return getAiGoalSuggestions(goalTitle, mbti);
  }
}
