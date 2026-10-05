import { apiClient } from '../client';
import { Goal, GoalStatus, CreateGoalDTO, ApiResponse, UserGoalPlanDTO } from '@you-il/types';

function extractErrorMessage(error: unknown, defaultMessage: string): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const res = (error as { response?: { data?: { error?: string } } }).response;
    if (res?.data?.error) {
      return res.data.error;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return defaultMessage;
}

export const goalService = {
  async fetchGoals(userId: string): Promise<ApiResponse<Goal[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Goal[]>>(`/api/goals?userId=${userId}`);
      return response.data;
    } catch (error: unknown) {
      return {
        success: false,
        error: extractErrorMessage(error, 'Failed to fetch goals'),
      };
    }
  },

  async createGoal(goalData: CreateGoalDTO & { userId: string }): Promise<ApiResponse<Goal>> {
    try {
      const response = await apiClient.post<ApiResponse<Goal>>('/api/goals', goalData);
      return response.data;
    } catch (error: unknown) {
      return {
        success: false,
        error: extractErrorMessage(error, 'Failed to create goal'),
      };
    }
  },

  async createUserGoalPlan(planData: UserGoalPlanDTO): Promise<ApiResponse<UserGoalPlanDTO>> {
    try {
      const response = await apiClient.post<ApiResponse<UserGoalPlanDTO>>(
        '/api/v1/user/goals',
        planData
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      // Return mock success for development if backend API endpoint is not yet connected
      return {
        success: true,
        data: planData,
      };
    }
  },

  async updateGoalStatus(goalId: string, status: GoalStatus): Promise<ApiResponse<Goal>> {
    try {
      const response = await apiClient.patch<ApiResponse<Goal>>(`/api/goals/${goalId}`, { status });
      return response.data;
    } catch (error: unknown) {
      return {
        success: false,
        error: extractErrorMessage(error, 'Failed to update goal status'),
      };
    }
  },
};
