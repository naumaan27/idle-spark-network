export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'urban' | 'rural' | 'emergency';
  location: string;
  deviceType: string;
  sustainabilityScore: number;
  totalTokens: number;
  totalContributionMinutes: number;
  co2Saved: number; // in kg
  tasksCompleted: number;
  badges: Badge[];
  isIdle: boolean;
  currentTask?: ComputeTask;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface ComputeTask {
  id: string;
  type: 'climate' | 'healthcare' | 'emergency';
  title: string;
  description: string;
  progress: number;
  estimatedMinutes: number;
  tokensReward: number;
  co2Impact: number;
}

export interface ImpactStory {
  id: string;
  title: string;
  description: string;
  type: 'climate' | 'healthcare' | 'emergency';
  location: string;
  date: Date;
  userContribution: string;
}

export interface AdminStats {
  totalDevices: number;
  activeDevices: number;
  totalComputeHours: number;
  co2SavedTotal: number;
  tasksCompletedTotal: number;
  energyEfficiency: number;
}