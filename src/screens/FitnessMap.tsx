import React, { useState } from 'react';
import { MapPin, Trophy, Lock, Star, Navigation, Target, TrendingUp, Calendar } from 'lucide-react';
import Header from '../components/Header';

interface FitnessMapProps {
  onScreenChange: (screen: string) => void;
}

const FitnessMap: React.FC<FitnessMapProps> = ({ onScreenChange }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const milestones = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first workout',
      position: { x: 20, y: 80 },
      status: 'completed',
      points: 50,
      date: '2024-01-15'
    },
    {
      id: '2',
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      position: { x: 35, y: 65 },
      status: 'completed',
      points: 100,
      date: '2024-01-22'
    },
    {
      id: '3',
      title: 'Strength Seeker',
      description: 'Complete 10 strength workouts',
      position: { x: 50, y: 50 },
      status: 'current',
      points: 200,
      progress: 7,
      maxProgress: 10
    },
    {
      id: '4',
      title: 'Cardio Champion',
      description: 'Run/walk 50km total distance',
      position: { x: 65, y: 35 },
      status: 'current',
      points: 300,
      progress: 32,
      maxProgress: 50
    },
    {
      id: '5',
      title: 'Flexibility Master',
      description: 'Complete 20 yoga/stretch sessions',
      position: { x: 80, y: 20 },
      status: 'locked',
      points: 250,
      requirement: 'Complete Strength Seeker'
    },
    {
      id: '6',
      title: 'Community Builder',
      description: 'Help 10 community members',
      position: { x: 25, y: 40 },
      status: 'current',
      points: 400,
      progress: 3,
      maxProgress: 10
    },
    {
      id: '7',
      title: 'Consistency King',
      description: 'Maintain a 30-day streak',
      position: { x: 70, y: 60 },
      status: 'locked',
      points: 500,
      requirement: 'Complete Week Warrior'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'from-green-400 to-green-600';
      case 'current': return 'from-blue-400 to-blue-600';
      case 'locked': return 'from-gray-300 to-gray-500';
      default: return 'from-gray-300 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return Trophy;
      case 'current': return Target;
      case 'locked': return Lock;
      default: return MapPin;
    }
  };

  const currentMilestone = selectedMilestone
    ? milestones.find(m => m.id === selectedMilestone)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header title="Gamified Fitness Map" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Journey Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 mb-6 text-white">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-2">Your Fitness Journey</h2>
            <p className="text-blue-100">Level 12 • 2,450 points</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Trophy size={20} />
              </div>
              <p className="text-lg font-bold">2</p>
              <p className="text-xs text-blue-100">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target size={20} />
              </div>
              <p className="text-lg font-bold">3</p>
              <p className="text-xs text-blue-100">In Progress</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star size={20} />
              </div>
              <p className="text-lg font-bold">2</p>
              <p className="text-xs text-blue-100">Locked</p>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="relative h-80 bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 rounded-xl overflow-hidden">
            {/* Path lines connecting milestones */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: '#3B82F6', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>
              {/* Connect milestones with curved paths */}
              <path
                d="M 20,80 Q 27,72 35,65"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
                className="animate-pulse"
              />
              <path
                d="M 35,65 Q 42,57 50,50"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M 50,50 Q 57,42 65,35"
                stroke="#E5E7EB"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Milestone markers */}
            {milestones.map((milestone) => {
              const StatusIcon = getStatusIcon(milestone.status);
              return (
                <button
                  key={milestone.id}
                  onClick={() => setSelectedMilestone(milestone.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                  style={{
                    left: `${milestone.position.x}%`,
                    top: `${milestone.position.y}%`,
                    zIndex: 2
                  }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(milestone.status)} rounded-full flex items-center justify-center shadow-lg ${
                    milestone.status === 'current' ? 'animate-pulse ring-4 ring-blue-200' : ''
                  }`}>
                    <StatusIcon className="text-white" size={20} />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {milestone.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Milestone Details */}
        {currentMilestone && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-start space-x-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getStatusColor(currentMilestone.status)} rounded-full flex items-center justify-center`}>
                {React.createElement(getStatusIcon(currentMilestone.status), { className: 'text-white', size: 24 })}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{currentMilestone.title}</h3>
                <p className="text-gray-600 mb-3">{currentMilestone.description}</p>
                
                {currentMilestone.status === 'current' && currentMilestone.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {currentMilestone.progress}/{currentMilestone.maxProgress}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(currentMilestone.progress / (currentMilestone.maxProgress || 1)) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-sm font-medium text-gray-900">{currentMilestone.points} points</span>
                    </div>
                    {currentMilestone.date && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="text-green-500" size={16} />
                        <span className="text-sm text-gray-600">{currentMilestone.date}</span>
                      </div>
                    )}
                  </div>
                  {currentMilestone.status === 'locked' && (
                    <span className="text-xs text-gray-500">{currentMilestone.requirement}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next Milestones */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Navigation className="text-blue-500 mr-2" size={20} />
            Next Milestones
          </h3>
          <div className="space-y-3">
            {milestones.filter(m => m.status === 'current').slice(0, 3).map((milestone) => (
              <div key={milestone.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">
                    {milestone.progress}/{milestone.maxProgress} completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{milestone.points} pts</p>
                  <p className="text-xs text-gray-500">
                    {Math.round((milestone.progress / (milestone.maxProgress || 1)) * 100)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onScreenChange('challenges')}
            className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-xl hover:shadow-md transition-all"
          >
            <Target className="text-blue-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-gray-900">Start Workout</p>
          </button>
          <button
            onClick={() => onScreenChange('rewards')}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-xl hover:shadow-md transition-all"
          >
            <Trophy className="text-yellow-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-gray-900">View Rewards</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessMap;