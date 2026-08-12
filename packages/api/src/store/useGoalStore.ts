import { create } from 'zustand';
import { Goal, GoalStatus } from '@you-il/types';
import { goalService } from '../services/goal.service';

interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
  fetchGoals: (userId: string) => Promise<void>;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateGoalStatus: (goalId: string, status: GoalStatus) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  loading: false,
  error: null,
  fetchGoals: async (userId: string) => {
    set({ loading: true, error: null });
    const response = await goalService.fetchGoals(userId);
    if (response.success && response.data) {
      set({ goals: response.data, loading: false });
    } else {
      // Fallback to mock goals if the backend is not deployed/unreachable
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
    }
  },
  addGoal: async (newGoal) => {
    set({ loading: true, error: null });
    const response = await goalService.createGoal({
      userId: newGoal.userId,
      title: newGoal.title,
      description: newGoal.description,
      priority: newGoal.priority,
      mbti: undefined,
    });
    if (response.success && response.data) {
      set((state) => ({
        goals: [response.data!, ...state.goals],
        loading: false,
      }));
    } else {
      // Fallback mock addition
      const mockCreated: Goal = {
        ...newGoal,
        id: Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({
        goals: [mockCreated, ...state.goals],
        loading: false,
      }));
    }
  },
  updateGoalStatus: async (goalId, status) => {
    // Optimistic update
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === goalId ? { ...g, status, updatedAt: new Date().toISOString() } : g
      ),
    }));
    await goalService.updateGoalStatus(goalId, status);
  },
}));
