import React, { useState } from 'react';
import { Award, Trophy, Star, Gift, Lock, CheckCircle, Zap, Target, Crown } from 'lucide-react';
import Header from '../components/Header';
import { achievements, currentUser } from '../data/mockData';

interface RewardsSystemProps {
  onScreenChange: (screen: string) => void;
}

const RewardsSystem: React.FC<RewardsSystemProps> = ({ onScreenChange }) => {
  const [selectedTab, setSelectedTab] = useState<'achievements' | 'rewards' | 'leaderboard'>('achievements');

  const rewards = [
    { id: '1', title: 'Premium Avatar', cost: 500, unlocked: true, type: 'avatar' },
    { id: '2', title: 'Custom Workout Plan', cost: 1000, unlocked: true, type: 'feature' },
    { id: '3', title: 'Exclusive Badge', cost: 750, unlocked: false, type: 'badge' },
    { id: '4', title: 'Personal Coach Session', cost: 2000, unlocked: false, type: 'session' },
    { id: '5', title: 'Fitness Gear Discount', cost: 1500, unlocked: false, type: 'discount' },
    { id: '6', title: 'VIP Community Access', cost: 3000, unlocked: false, type: 'access' }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', points: 5240, level: 18, badge: 'Crown' },
    { rank: 2, name: 'Mike Chen', points: 4890, level: 17, badge: 'Trophy' },
    { rank: 3, name: 'Alex Kumar', points: 2450, level: 12, badge: 'Star' },
    { rank: 4, name: 'Emily Davis', points: 2180, level: 11, badge: 'Star' },
    { rank: 5, name: 'David Wilson', points: 1950, level: 10, badge: 'Medal' }
  ];

  const getIconForAchievement = (iconName: string) => {
    switch (iconName) {
      case 'footprints': return Target;
      case 'calendar-check': return CheckCircle;
      case 'heart-pulse': return Award;
      case 'users': return Trophy;
      case 'zap': return Zap;
      case 'heart': return Star;
      default: return Award;
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'Crown': return Crown;
      case 'Trophy': return Trophy;
      default: return Star;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <Header title="Beyond Badge Rewards" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* User Stats */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-6 text-white">
          <div className="text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="text-white" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-1">{currentUser.points} Points</h2>
            <p className="text-yellow-100 mb-4">Level {currentUser.level} • Rank #3</p>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold">6</p>
                <p className="text-xs text-yellow-100">Unlocked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{currentUser.streak}</p>
                <p className="text-xs text-yellow-100">Day Streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-yellow-100">Rewards</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'achievements' as const, label: 'Achievements', icon: Award },
              { id: 'rewards' as const, label: 'Rewards', icon: Gift },
              { id: 'leaderboard' as const, label: 'Leaderboard', icon: Trophy }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center justify-center space-x-1 p-3 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'achievements' && (
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const Icon = getIconForAchievement(achievement.icon);
              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl p-4 shadow-sm border ${
                    achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      achievement.unlocked
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}>
                      {achievement.unlocked ? <Icon size={24} /> : <Lock size={24} />}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? 'text-green-700' : 'text-gray-900'
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.unlocked ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {selectedTab === 'rewards' && (
          <div className="grid grid-cols-2 gap-3">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className={`bg-white rounded-xl p-4 shadow-sm border ${
                  reward.unlocked ? 'border-green-200' : 'border-gray-100'
                } ${currentUser.points >= reward.cost ? 'hover:shadow-md cursor-pointer' : ''}`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    reward.unlocked
                      ? 'bg-green-100 text-green-600'
                      : currentUser.points >= reward.cost
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    {reward.unlocked ? (
                      <CheckCircle size={24} />
                    ) : currentUser.points >= reward.cost ? (
                      <Gift size={24} />
                    ) : (
                      <Lock size={24} />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{reward.cost} points</p>
                  <button
                    disabled={reward.unlocked || currentUser.points < reward.cost}
                    className={`w-full py-2 rounded-lg text-xs font-medium transition-colors ${
                      reward.unlocked
                        ? 'bg-green-100 text-green-700'
                        : currentUser.points >= reward.cost
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {reward.unlocked ? 'Unlocked' : currentUser.points >= reward.cost ? 'Redeem' : 'Locked'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'leaderboard' && (
          <div className="space-y-3">
            {leaderboard.map((user) => {
              const BadgeIcon = getBadgeIcon(user.badge);
              return (
                <div
                  key={user.rank}
                  className={`bg-white rounded-xl p-4 shadow-sm border ${
                    user.name === currentUser.name
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                      user.rank === 1
                        ? 'bg-yellow-500 text-white'
                        : user.rank === 2
                          ? 'bg-gray-400 text-white'
                          : user.rank === 3
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                      {user.rank <= 3 ? <BadgeIcon size={20} /> : user.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">Level {user.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{user.points.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RewardsSystem;