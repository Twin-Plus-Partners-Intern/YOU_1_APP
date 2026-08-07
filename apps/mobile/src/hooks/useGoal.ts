import { useEffect, useState } from 'react';
import { useGoalStore, getAiGoalSuggestions } from '@you-il/api';
import { Goal } from '@you-il/types';

export function useGoal(userId: string) {
  const { goals, loading, error, fetchGoals, addGoal, updateGoalStatus } = useGoalStore();
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchGoals(userId);
    }
  }, [userId, fetchGoals]);

  const createGoal = async (
    title: string, 
    description?: string, 
    priority: Goal['priority'] = 'MEDIUM', 
    mbti?: string
  ) => {
    setAiLoading(true);
    try {
      // Get AI suggestions for this goal
      const suggestions = await getAiGoalSuggestions(title, mbti);
      
      await addGoal({
        userId,
        title,
        description,
        status: 'PENDING',
        priority,
        targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        aiInsights: suggestions,
      });
    } finally {
      setAiLoading(false);
    }
  };

  const completeGoal = (goalId: string) => {
    updateGoalStatus(goalId, 'COMPLETED');
  };

  return {
    goals,
    loading: loading || aiLoading,
    error,
    createGoal,
    completeGoal,
    refreshGoals: () => fetchGoals(userId),
  };
}
