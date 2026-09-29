import React, { useState } from 'react';
import { Users, Calendar, Target, TrendingUp, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import Header from '../components/Header';

interface CommunityAccountabilityProps {
  onScreenChange: (screen: string) => void;
}

const CommunityAccountability: React.FC<CommunityAccountabilityProps> = ({ onScreenChange }) => {
  const [selectedTab, setSelectedTab] = useState<'groups' | 'challenges' | 'progress'>('groups');

  const accountabilityGroups = [
    {
      id: '1',
      name: 'Morning Warriors',
      members: 24,
      description: 'Early morning workout enthusiasts',
      avatar: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSession: '6:00 AM Tomorrow',
      joined: true
    },
    {
      id: '2',
      name: 'Weight Loss Journey',
      members: 156,
      description: 'Supporting each other in healthy weight management',
      avatar: 'https://images.pexels.com/photos/4327024/pexels-photo-4327024.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSession: '7:00 PM Today',
      joined: false
    },
    {
      id: '3',
      name: 'Strength Builders',
      members: 89,
      description: 'Building strength and muscle together',
      avatar: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextSession: '5:30 PM Tomorrow',
      joined: true
    }
  ];

  const groupChallenges = [
    {
      id: '1',
      title: '30-Day Consistency Challenge',
      group: 'Morning Warriors',
      participants: 18,
      daysLeft: 12,
      progress: 60,
      reward: 'Golden Streak Badge'
    },
    {
      id: '2',
      title: 'Weekly Step Challenge',
      group: 'Weight Loss Journey',
      participants: 87,
      daysLeft: 3,
      progress: 75,
      reward: '200 Bonus Points'
    },
    {
      id: '3',
      title: 'Strength Training Streak',
      group: 'Strength Builders',
      participants: 34,
      daysLeft: 8,
      progress: 40,
      reward: 'Custom Workout Plan'
    }
  ];

  const progressData = [
    { name: 'Alex Kumar', progress: 85, streak: 7, points: 2450 },
    { name: 'Sarah M.', progress: 92, streak: 12, points: 2890 },
    { name: 'Mike R.', progress: 78, streak: 5, points: 2150 },
    { name: 'Emma L.', progress: 88, streak: 9, points: 2680 },
    { name: 'You', progress: 85, streak: 7, points: 2450 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header title="Community Accountability" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Overview Stats */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Your Community Impact</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users size={24} />
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-indigo-100">Groups Joined</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target size={24} />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-xs text-indigo-100">Active Goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp size={24} />
              </div>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-indigo-100">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'groups' as const, label: 'Groups', icon: Users },
              { id: 'challenges' as const, label: 'Challenges', icon: Target },
              { id: 'progress' as const, label: 'Progress', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center justify-center space-x-1 p-3 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-indigo-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-indigo-500'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'groups' && (
          <div className="space-y-4">
            {accountabilityGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <img
                    src={group.avatar}
                    alt={group.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{group.name}</h3>
                      {group.joined && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                          Joined
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Users size={12} className="mr-1" />
                          {group.members} members
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {group.nextSession}
                        </span>
                      </div>
                      <button
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          group.joined
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            : 'bg-indigo-500 text-white hover:bg-indigo-600'
                        }`}
                      >
                        {group.joined ? 'View' : 'Join'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'challenges' && (
          <div className="space-y-4">
            {groupChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                  <span className="text-xs text-gray-500">{challenge.daysLeft} days left</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{challenge.group} • {challenge.participants} participants</p>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-semibold text-gray-900">{challenge.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target size={16} className="text-yellow-500" />
                    <span className="text-sm text-gray-700">Reward: {challenge.reward}</span>
                  </div>
                  <button className="bg-indigo-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-indigo-600 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'progress' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Group Leaderboard</h3>
              <div className="space-y-3">
                {progressData.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-xs text-gray-500">{user.streak} day streak</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{user.progress}%</p>
                      <p className="text-xs text-gray-500">{user.points} pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onScreenChange('emotional-wall')}
                className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl hover:shadow-md transition-all"
              >
                <MessageSquare className="text-purple-500 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900">Share Update</p>
              </button>
              <button
                onClick={() => onScreenChange('support')}
                className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl hover:shadow-md transition-all"
              >
                <Users className="text-indigo-500 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-gray-900">Get Support</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityAccountability;