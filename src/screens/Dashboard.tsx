import React from 'react';
import { TrendingUp, Flame, Target, Users, Zap, Heart } from 'lucide-react';
import Header from '../components/Header';
import { currentUser, fitnessGoals } from '../data/mockData';

interface DashboardProps {
  onScreenChange: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onScreenChange }) => {
  const quickActions = [
    { id: 'challenges', icon: Zap, title: 'Quick Challenge', subtitle: '5-min workout', color: 'bg-orange-500' },
    { id: 'emotional-wall', icon: Heart, title: 'Share Feelings', subtitle: 'Express yourself', color: 'bg-pink-500' },
    { id: 'pain-recovery', icon: Target, title: 'Pain Check', subtitle: 'Recovery guide', color: 'bg-green-500' },
    { id: 'support', icon: Users, title: 'Get Support', subtitle: 'Connect with peers', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header title="PulseForge" />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
              <p className="text-blue-100">Ready to boost your fitness journey?</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full mb-2">
                <Flame className="text-orange-300" size={24} />
              </div>
              <p className="text-sm font-semibold">{currentUser.streak} day streak</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onScreenChange(action.id)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:scale-105"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <action.icon size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h4>
                <p className="text-gray-600 text-xs">{action.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Goals */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Goals</h3>
          <div className="space-y-3">
            {fitnessGoals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                  <span className="text-sm text-gray-600">
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {Math.round((goal.current / goal.target) * 100)}% complete
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentUser.level}</p>
              <p className="text-xs text-gray-600">Level</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="text-green-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentUser.points}</p>
              <p className="text-xs text-gray-600">Points</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Flame className="text-orange-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{currentUser.streak}</p>
              <p className="text-xs text-gray-600">Day Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;