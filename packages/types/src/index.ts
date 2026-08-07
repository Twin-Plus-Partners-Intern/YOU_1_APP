export type MbtiType = 
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  mbti?: MbtiType;
  createdAt: string;
}

export type GoalStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
export type GoalPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: GoalStatus;
  priority: GoalPriority;
  targetDate?: string;
  aiInsights?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  goalId: string;
  title: string;
  isCompleted: boolean;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

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
