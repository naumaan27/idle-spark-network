import { User, Badge, ComputeTask, ImpactStory, AdminStats } from '@/types';

export const badges: Badge[] = [
  {
    id: '1',
    name: 'Climate Hero',
    description: 'Contributed to 100+ climate simulations',
    icon: '🌱',
    unlockedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Mesh Guardian',
    description: 'Maintained network connectivity for 24+ hours',
    icon: '🔗',
    unlockedAt: new Date('2024-02-01')
  },
  {
    id: '3',
    name: 'Health Supporter',
    description: 'Helped process 50+ healthcare diagnostics',
    icon: '🏥',
    unlockedAt: new Date('2024-01-30')
  },
  {
    id: '4',
    name: 'Emergency Responder',
    description: 'Participated in emergency alert system',
    icon: '🚨',
    unlockedAt: new Date('2024-02-10')
  }
];

export const computeTasks: ComputeTask[] = [
  {
    id: '1',
    type: 'climate',
    title: 'Climate Simulation Analysis',
    description: 'Analyzing atmospheric data for carbon capture optimization',
    progress: 67,
    estimatedMinutes: 23,
    tokensReward: 45,
    co2Impact: 2.3
  },
  {
    id: '2',
    type: 'healthcare',
    title: 'AI Health Diagnostic',
    description: 'Processing medical imaging for rural clinic in Bihar',
    progress: 89,
    estimatedMinutes: 8,
    tokensReward: 30,
    co2Impact: 1.2
  },
  {
    id: '3',
    type: 'emergency',
    title: 'Disaster Response Modeling',
    description: 'Emergency evacuation route optimization',
    progress: 34,
    estimatedMinutes: 45,
    tokensReward: 60,
    co2Impact: 3.1
  }
];

export const impactStories: ImpactStory[] = [
  {
    id: '1',
    title: 'Rural Health Clinic Breakthrough',
    description: 'Your compute helped a clinic in Bihar run AI health scans that detected early-stage diabetes in 23 patients, enabling timely treatment.',
    type: 'healthcare',
    location: 'Bihar, India',
    date: new Date('2024-02-08'),
    userContribution: 'Processed 156MB of medical imaging data'
  },
  {
    id: '2',
    title: 'Emergency Alert Success',
    description: 'You enabled an emergency alert during a disaster drill in coastal Gujarat, helping coordinate evacuation of 500+ residents.',
    type: 'emergency',
    location: 'Gujarat, India',
    date: new Date('2024-02-05'),
    userContribution: 'Maintained mesh network connectivity for 3.2 hours'
  },
  {
    id: '3',
    title: 'Climate Model Advancement',
    description: 'Your contribution helped refine carbon capture models that could remove 12,000 tons of CO₂ annually when implemented.',
    type: 'climate',
    location: 'Global Research Network',
    date: new Date('2024-02-01'),
    userContribution: 'Analyzed 890MB of atmospheric simulation data'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    userType: 'urban',
    location: 'Mumbai, Maharashtra',
    deviceType: 'iPhone 15 Pro',
    sustainabilityScore: 87,
    totalTokens: 2450,
    totalContributionMinutes: 1840,
    co2Saved: 23.7,
    tasksCompleted: 156,
    badges: [badges[0], badges[1], badges[2]],
    isIdle: true,
    currentTask: computeTasks[0]
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    userType: 'rural',
    location: 'Jaipur, Rajasthan',
    deviceType: 'OnePlus Nord 3',
    sustainabilityScore: 72,
    totalTokens: 1680,
    totalContributionMinutes: 1220,
    co2Saved: 15.9,
    tasksCompleted: 89,
    badges: [badges[0], badges[2]],
    isIdle: false,
    currentTask: undefined
  },
  {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    email: 'dr.rajesh@emergency.gov.in',
    userType: 'emergency',
    location: 'New Delhi',
    deviceType: 'Samsung Galaxy S24',
    sustainabilityScore: 94,
    totalTokens: 3890,
    totalContributionMinutes: 2650,
    co2Saved: 34.2,
    tasksCompleted: 234,
    badges: badges,
    isIdle: true,
    currentTask: computeTasks[2]
  }
];

export const adminStats: AdminStats = {
  totalDevices: 45678,
  activeDevices: 12453,
  totalComputeHours: 892356,
  co2SavedTotal: 125.8, // in tons
  tasksCompletedTotal: 567890,
  energyEfficiency: 96.3
};

// Current user (urban user for demo)
export const currentUser = mockUsers[0];