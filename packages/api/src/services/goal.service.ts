import { apiClient } from '../client';
import { Goal, GoalStatus, CreateGoalDTO, ApiResponse } from '@you-il/types';

export const goalService = {
  async fetchGoals(userId: string): Promise<ApiResponse<Goal[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Goal[]>>(`/api/goals?userId=${userId}`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to fetch goals',
      };
    }
  },

  async createGoal(goalData: CreateGoalDTO & { userId: string }): Promise<ApiResponse<Goal>> {
    try {
      const response = await apiClient.post<ApiResponse<Goal>>('/api/goals', goalData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to create goal',
      };
    }
  },

  async updateGoalStatus(goalId: string, status: GoalStatus): Promise<ApiResponse<Goal>> {
    try {
      const response = await apiClient.patch<ApiResponse<Goal>>(`/api/goals/${goalId}`, { status });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to update goal status',
      };
    }
  },
};
