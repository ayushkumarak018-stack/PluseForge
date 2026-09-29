import React, { useState } from 'react';
import { MessageCircle, Users, Heart, Calendar, Video, Phone, UserPlus, Star } from 'lucide-react';
import Header from '../components/Header';

interface PeerSupportProps {
  onScreenChange: (screen: string) => void;
}

const PeerSupport: React.FC<PeerSupportProps> = ({ onScreenChange }) => {
  const [selectedTab, setSelectedTab] = useState<'mentors' | 'sessions' | 'community'>('mentors');

  const mentors = [
    {
      id: '1',
      name: 'Sarah Johnson',
      specialties: ['Weight Loss', 'Nutrition', 'Mental Health'],
      experience: '3 years',
      rating: 4.9,
      sessions: 124,
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'available',
      nextAvailable: '2:00 PM Today'
    },
    {
      id: '2',
      name: 'Mike Chen',
      specialties: ['Strength Training', 'Injury Recovery'],
      experience: '5 years',
      rating: 4.8,
      sessions: 89,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'busy',
      nextAvailable: '6:00 PM Today'
    },
    {
      id: '3',
      name: 'Emma Davis',
      specialties: ['Yoga', 'Flexibility', 'Stress Management'],
      experience: '2 years',
      rating: 5.0,
      sessions: 67,
      avatar: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'available',
      nextAvailable: 'Now'
    }
  ];

  const upcomingSessions = [
    {
      id: '1',
      mentor: 'Sarah Johnson',
      topic: 'Overcoming Workout Plateaus',
      time: '2:00 PM Today',
      duration: '30 min',
      type: 'video',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      mentor: 'Group Session',
      topic: 'Motivation Monday Check-in',
      time: '7:00 PM Today',
      duration: '45 min',
      type: 'group',
      participants: 12
    }
  ];

  const supportGroups = [
    {
      id: '1',
      name: 'New Beginners Circle',
      members: 45,
      topic: 'Starting your fitness journey',
      lastMessage: '2 minutes ago',
      activeNow: 8
    },
    {
      id: '2',
      name: 'Weight Loss Warriors',
      members: 128,
      topic: 'Sustainable weight management',
      lastMessage: '5 minutes ago',
      activeNow: 15
    },
    {
      id: '3',
      name: 'Mental Health & Fitness',
      members: 67,
      topic: 'Mind-body wellness connection',
      lastMessage: '12 minutes ago',
      activeNow: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Header title="Peer Support Network" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Support Overview */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold mb-2">You're Not Alone</h2>
            <p className="text-purple-100">Connect with peers who understand your journey</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users size={20} />
              </div>
              <p className="text-lg font-bold">5</p>
              <p className="text-xs text-purple-100">Active Connections</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageCircle size={20} />
              </div>
              <p className="text-lg font-bold">12</p>
              <p className="text-xs text-purple-100">Support Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart size={20} />
              </div>
              <p className="text-lg font-bold">4.8</p>
              <p className="text-xs text-purple-100">Helpfulness Rating</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl p-1 mb-6 shadow-sm border border-gray-100">
          <div className="grid grid-cols-3 gap-1">
            {[
              { id: 'mentors' as const, label: 'Mentors', icon: UserPlus },
              { id: 'sessions' as const, label: 'Sessions', icon: Calendar },
              { id: 'community' as const, label: 'Groups', icon: Users }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center justify-center space-x-1 p-3 rounded-lg transition-all ${
                  selectedTab === tab.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                <tab.icon size={16} />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {selectedTab === 'mentors' && (
          <div className="space-y-4">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      mentor.status === 'available' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400 fill-current" size={14} />
                        <span className="text-sm text-gray-600">{mentor.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{mentor.experience} experience • {mentor.sessions} sessions</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Available: {mentor.nextAvailable}</span>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                          <MessageCircle size={16} />
                        </button>
                        <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Video size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'sessions' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Upcoming Sessions</h3>
              <div className="space-y-3">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{session.topic}</h4>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {session.duration}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {session.avatar ? (
                        <img src={session.avatar} alt={session.mentor} className="w-6 h-6 rounded-full" />
                      ) : (
                        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Users className="text-white" size={12} />
                        </div>
                      )}
                      <span className="text-sm text-gray-600">{session.mentor}</span>
                      {session.participants && (
                        <span className="text-xs text-gray-500">• {session.participants} participants</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {session.time}
                      </span>
                      <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-600 transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule New Session */}
            <button className="w-full bg-white border-2 border-dashed border-purple-300 text-purple-600 font-semibold py-4 rounded-xl hover:border-purple-500 hover:text-purple-700 transition-colors">
              + Schedule Support Session
            </button>
          </div>
        )}

        {selectedTab === 'community' && (
          <div className="space-y-4">
            {supportGroups.map((group) => (
              <div key={group.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                    {group.activeNow} active
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{group.topic}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-500 flex items-center">
                      <Users size={12} className="mr-1" />
                      {group.members} members
                    </span>
                    <span className="text-xs text-gray-500">Last active: {group.lastMessage}</span>
                  </div>
                  <button className="bg-purple-500 text-white px-3 py-1 rounded-lg text-xs font-medium hover:bg-purple-600 transition-colors">
                    Join Chat
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Support */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Need Immediate Support?</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white bg-opacity-80 p-3 rounded-lg hover:bg-opacity-100 transition-colors">
                  <Heart className="text-pink-500 mx-auto mb-2" size={20} />
                  <p className="text-sm font-medium text-gray-900">Crisis Support</p>
                </button>
                <button className="bg-white bg-opacity-80 p-3 rounded-lg hover:bg-opacity-100 transition-colors">
                  <Phone className="text-green-500 mx-auto mb-2" size={20} />
                  <p className="text-sm font-medium text-gray-900">Call Mentor</p>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerSupport;