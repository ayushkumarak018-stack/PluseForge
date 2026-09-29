import { User, Post, WorkoutChallenge, Achievement, FitnessGoal } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Kumar',
  avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  level: 12,
  points: 2450,
  streak: 7
};

export const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      id: '2',
      name: 'Priya Singh',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 8,
      points: 1200,
      streak: 3
    },
    content: "Just completed my first 5K run! 🏃‍♀️ The pain in my knees is finally manageable thanks to the recovery exercises. Feeling so proud and energetic!",
    mood: 'proud',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 24,
    comments: 8
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Rahul Sharma',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 15,
      points: 3100,
      streak: 12
    },
    content: "Having a tough day motivation-wise. The weather is gloomy and I'm struggling to get started with my workout routine. Any tips?",
    mood: 'struggling',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    likes: 15,
    comments: 12
  },
  {
    id: '3',
    user: {
      id: '4',
      name: 'Maya Patel',
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      level: 10,
      points: 1850,
      streak: 5
    },
    content: "Morning yoga session complete! ✨ Feeling so energetic and ready to tackle the day. The emotional motivation prompts really helped me push through.",
    mood: 'energetic',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    likes: 31,
    comments: 6
  }
];

export const microChallenges: WorkoutChallenge[] = [
  {
    id: '1',
    title: '5-Minute Power Boost',
    duration: 5,
    difficulty: 'easy',
    points: 50,
    exercises: [
      { id: '1', name: 'Jumping Jacks', reps: 30, description: 'Classic cardio warm-up' },
      { id: '2', name: 'Push-ups', reps: 10, description: 'Modified on knees if needed' },
      { id: '3', name: 'Mountain Climbers', duration: 30, description: 'Keep core engaged' },
      { id: '4', name: 'Plank', duration: 45, description: 'Hold steady, breathe normally' }
    ]
  },
  {
    id: '2',
    title: 'Stress Relief Stretch',
    duration: 8,
    difficulty: 'easy',
    points: 40,
    exercises: [
      { id: '1', name: 'Neck Rolls', reps: 5, description: 'Slow and controlled movements' },
      { id: '2', name: 'Shoulder Shrugs', reps: 10, description: 'Release shoulder tension' },
      { id: '3', name: 'Cat-Cow Pose', reps: 8, description: 'Gentle spine mobility' },
      { id: '4', name: 'Child\'s Pose', duration: 60, description: 'Deep breathing and relaxation' }
    ]
  },
  {
    id: '3',
    title: 'Core Crusher',
    duration: 10,
    difficulty: 'medium',
    points: 100,
    exercises: [
      { id: '1', name: 'Crunches', reps: 20, description: 'Focus on form over speed' },
      { id: '2', name: 'Russian Twists', reps: 30, description: 'Engage obliques' },
      { id: '3', name: 'Bicycle Crunches', reps: 40, description: 'Alternating legs' },
      { id: '4', name: 'Dead Bug', reps: 16, description: '8 each side, controlled movement' }
    ]
  }
];

export const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first workout',
    icon: 'footprints',
    unlocked: true,
    progress: 1,
    maxProgress: 1
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: 'calendar-check',
    unlocked: true,
    progress: 7,
    maxProgress: 7
  },
  {
    id: '3',
    title: 'Pain Fighter',
    description: 'Complete 10 recovery sessions',
    icon: 'heart-pulse',
    unlocked: false,
    progress: 6,
    maxProgress: 10
  },
  {
    id: '4',
    title: 'Community Helper',
    description: 'Help 5 peers in support sessions',
    icon: 'users',
    unlocked: false,
    progress: 3,
    maxProgress: 5
  },
  {
    id: '5',
    title: 'Micro Master',
    description: 'Complete 50 micro challenges',
    icon: 'zap',
    unlocked: false,
    progress: 23,
    maxProgress: 50
  },
  {
    id: '6',
    title: 'Emotion Explorer',
    description: 'Share 20 posts on the emotional wall',
    icon: 'heart',
    unlocked: false,
    progress: 12,
    maxProgress: 20
  }
];

export const fitnessGoals: FitnessGoal[] = [
  {
    id: '1',
    title: 'Daily Steps',
    target: 10000,
    current: 7500,
    unit: 'steps',
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Weekly Workouts',
    target: 5,
    current: 3,
    unit: 'sessions',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Monthly Distance',
    target: 50,
    current: 32,
    unit: 'km',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
  }
];

export const motivationalPrompts = [
  {
    mood: 'struggling',
    prompts: [
      "Remember why you started. Every champion was once a beginner who refused to give up.",
      "Progress isn't always visible, but it's always happening. Trust the process.",
      "Your body can do it. It's your mind you have to convince.",
      "The hardest part is showing up. You're already winning by being here."
    ]
  },
  {
    mood: 'motivated',
    prompts: [
      "You're on fire! This energy is contagious - spread it around!",
      "Channel this motivation into action. What's your next move?",
      "This is your moment to shine. Show yourself what you're capable of!",
      "Motivation got you started. Now let discipline keep you going."
    ]
  },
  {
    mood: 'tired',
    prompts: [
      "Rest is not quitting. Sometimes the most productive thing you can do is recharge.",
      "Listen to your body. A gentle stretch or walk might be exactly what you need.",
      "Tired muscles are muscles that have worked hard. Honor your effort with proper care.",
      "Tomorrow's energy starts with today's rest. Be kind to yourself."
    ]
  }
];