import { createClient } from '@supabase/supabase-js';
import { create } from 'zustand';
import { Goal } from '@you-il/types';

declare const process: { env: { [key: string]: string | undefined } };

// Supabase client instance (configured using env variables or placeholders)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Zustand Store for Goal Management
interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  fetchGoals: (userId: string) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoalStatus: (goalId: string, status: Goal['status']) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  loading: false,
  error: null,
  fetchGoals: async (userId: string) => {
    set({ loading: true, error: null });
    try {
      // In a real application, fetch from supabase:
      // const { data, error } = await supabase.from('goals').select('*').eq('userId', userId);
      // For demonstration, we use mock goals:
      const mockGoals: Goal[] = [
        {
          id: '1',
          userId,
          title: 'Learn React Native New Architecture',
          description: 'Build high-performance applications with turbo modules and Fabric renderer.',
          status: 'IN_PROGRESS',
          priority: 'HIGH',
          targetDate: '2026-12-31',
          aiInsights: 'Focus on understanding JSI (JavaScript Interface) and new codegen rules.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          userId,
          title: 'Establish Health & Fitness Routine',
          description: 'Work out 4 times a week and eat clean.',
          status: 'PENDING',
          priority: 'MEDIUM',
          targetDate: '2026-10-15',
          aiInsights: 'Consistency is key. Schedule workouts in your morning calendar.',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
      set({ goals: mockGoals, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch goals', loading: false });
    }
  },
  addGoal: async (newGoal) => {
    set({ loading: true, error: null });
    try {
      const createdGoal: Goal = {
        ...newGoal,
        id: Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        goals: [createdGoal, ...state.goals],
        loading: false
      }));
    } catch (err: any) {
      set({ error: err.message || 'Failed to add goal', loading: false });
    }
  },
  updateGoalStatus: (goalId, status) => {
    set((state) => ({
      goals: state.goals.map((g) => 
        g.id === goalId ? { ...g, status, updatedAt: new Date().toISOString() } : g
      )
    }));
  }
}));

// Google Gemini API Client Template
export class GeminiApiClient {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
  }

  async generateGoalInsights(goalTitle: string, mbti?: string): Promise<string> {
    if (!this.apiKey) {
      console.warn('Gemini API key is missing. Returning mock insights.');
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      return `[Mock Gemini Insight for ${mbti || 'P-System'}]: Since you have a lazy/Procrastinator streak, break "${goalTitle}" down into micro-steps of less than 5 minutes. Start with one simple task today!`;
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/gemini-1.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Analyze the following goal: "${goalTitle}". The user's MBTI style is ${mbti || 'unknown (leaning lazy/procrastinator)'}. Provide actionable, hyper-practical micro-tasks tailored to their personality to beat procrastination. Keep it concise.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = (await response.json()) as any;
      return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No suggestions could be generated. Try again!'
      );
    } catch (error: any) {
      console.error('Error calling Gemini API:', error);
      return `Failed to fetch AI insights: ${error.message}`;
    }
  }
}

// Mock AI Service Caller
export async function getAiGoalSuggestions(goalTitle: string, mbti?: string): Promise<string> {
  const client = new GeminiApiClient();
  return client.generateGoalInsights(goalTitle, mbti);
}
