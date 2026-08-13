import { GoalPriority } from './goal';
import { MbtiType } from './user';

export interface CreateGoalDTO {
  title: string;
  description?: string;
  priority?: GoalPriority;
  mbti?: MbtiType;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
