import { apiClient } from '../client';
import { CreateGoalDTO, ApiResponse } from '@you-il/types';

export const aiService = {
  async getAiGoalSuggestions(goalData: CreateGoalDTO): Promise<ApiResponse<{ insights: string }>> {
    try {
      const response = await apiClient.post<ApiResponse<{ insights: string }>>('/api/ai/breakdown', goalData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to get AI insights',
      };
    }
  },
};
