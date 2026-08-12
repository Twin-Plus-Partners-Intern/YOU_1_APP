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
