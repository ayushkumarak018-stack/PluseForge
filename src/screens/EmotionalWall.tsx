import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Plus, Smile, Frown, Star, Zap, ThumbsUp } from 'lucide-react';
import Header from '../components/Header';
import { mockPosts, currentUser } from '../data/mockData';
import { Post } from '../types';

interface EmotionalWallProps {
  onScreenChange: (screen: string) => void;
}

const EmotionalWall: React.FC<EmotionalWallProps> = ({ onScreenChange }) => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [selectedMood, setSelectedMood] = useState<Post['mood']>('happy');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const moodIcons = {
    happy: { icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    motivated: { icon: Zap, color: 'text-blue-500', bg: 'bg-blue-100' },
    struggling: { icon: Frown, color: 'text-gray-500', bg: 'bg-gray-100' },
    proud: { icon: Star, color: 'text-purple-500', bg: 'bg-purple-100' },
    energetic: { icon: ThumbsUp, color: 'text-green-500', bg: 'bg-green-100' }
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: currentUser,
        content: newPost,
        mood: selectedMood,
        timestamp: new Date(),
        likes: 0,
        comments: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Header title="Emotional Wall" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Create Post Button */}
        <button
          onClick={() => setShowCreatePost(!showCreatePost)}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-4 mb-6 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus size={20} />
          <span className="font-semibold">Share Your Feelings</span>
        </button>

        {/* Create Post Form */}
        {showCreatePost && (
          <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">How are you feeling?</label>
              <div className="flex space-x-2">
                {Object.entries(moodIcons).map(([mood, { icon: Icon, color, bg }]) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood as Post['mood'])}
                    className={`p-2 rounded-lg transition-all ${
                      selectedMood === mood ? `${bg} ${color}` : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <Icon size={20} />
                  </button>
                ))}
              </div>
            </div>
            
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share what's on your mind, your struggles, victories, or anything fitness-related..."
              className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
            
            <div className="flex justify-end space-x-2 mt-3">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => {
            const MoodIcon = moodIcons[post.mood].icon;
            return (
              <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{post.user.name}</h4>
                      <span className="text-xs text-gray-500">Level {post.user.level}</span>
                      <div className={`p-1 rounded ${moodIcons[post.mood].bg}`}>
                        <MoodIcon size={12} className={moodIcons[post.mood].color} />
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{post.content}</p>
                    <div className="flex items-center justify-between text-gray-500">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 hover:text-pink-500 transition-colors">
                          <Heart size={16} />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                          <MessageCircle size={16} />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                          <Share size={16} />
                        </button>
                      </div>
                      <span className="text-xs">{formatTime(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mood Insights */}
        <div className="mt-8 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3">Community Mood Insights</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Smile className="text-yellow-500 mx-auto mb-2" size={20} />
              <p className="text-sm font-semibold text-gray-900">68%</p>
              <p className="text-xs text-gray-600">Feeling Happy</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Zap className="text-blue-500 mx-auto mb-2" size={20} />
              <p className="text-sm font-semibold text-gray-900">24%</p>
              <p className="text-xs text-gray-600">Motivated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalWall;