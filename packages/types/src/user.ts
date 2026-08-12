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
