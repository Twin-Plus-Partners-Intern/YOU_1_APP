export interface UserGoalPlanDTO {
  target: string; // Ví dụ: "Lose 5 kg, run 10 km"
  additionalDetails?: string; // Ví dụ: "I can exercise 3 days a week"
  startDate: string; // ISO Date: "2026-04-01"
  endDate: string; // ISO Date: "2026-04-30"
  dailyCommitment: {
    hours: number; // Ví dụ: 2
    minutes: number; // Ví dụ: 0
  };
}
