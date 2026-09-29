export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
}

export interface Post {
  id: string;
  user: User;
  content: string;
  mood: 'happy' | 'motivated' | 'struggling' | 'proud' | 'energetic';
  timestamp: Date;
  likes: number;
  comments: number;
}

export interface WorkoutChallenge {
  id: string;
  title: string;
  duration: number;
  exercises: Exercise[];
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Exercise {
  id: string;
  name: string;
  reps?: number;
  duration?: number;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface PainAssessment {
  bodyPart: string;
  painLevel: number;
  description: string;
  recommendations: string[];
}

export interface FitnessGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
}