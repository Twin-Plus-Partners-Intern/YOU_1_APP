import { apiClient } from '../client';
import { CreateGoalDTO, ApiResponse } from '@you-il/types';

export const aiService = {
  async getAiGoalSuggestions(goalData: CreateGoalDTO): Promise<ApiResponse<{ insights: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ insights: string }>>(
        '/api/ai/breakdown',
        goalData
      );
      return response.data;
    } catch (error: unknown) {
      let errorMessage = 'Failed to get AI insights';
      if (error && typeof error === 'object' && 'response' in error) {
        const res = (error as { response?: { data?: { error?: string } } }).response;
        if (res?.data?.error) {
          errorMessage = res.data.error;
        }
      } else if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
  },
};
