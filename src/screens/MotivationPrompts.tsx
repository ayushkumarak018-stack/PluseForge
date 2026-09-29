import React, { useState, useEffect } from 'react';
import { Heart, RefreshCw, Share, BookOpen, Sparkles, Sun, Moon } from 'lucide-react';
import Header from '../components/Header';
import { motivationalPrompts } from '../data/mockData';

interface MotivationPromptsProps {
  onScreenChange: (screen: string) => void;
}

const MotivationPrompts: React.FC<MotivationPromptsProps> = ({ onScreenChange }) => {
  const [currentMood, setCurrentMood] = useState<'struggling' | 'motivated' | 'tired'>('motivated');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [promptIndex, setPromptIndex] = useState(0);

  const moods = [
    { id: 'motivated' as const, label: 'Motivated', icon: Sparkles, color: 'from-yellow-400 to-orange-500' },
    { id: 'struggling' as const, label: 'Struggling', icon: Heart, color: 'from-blue-400 to-blue-600' },
    { id: 'tired' as const, label: 'Tired', icon: Moon, color: 'from-purple-400 to-purple-600' }
  ];

  useEffect(() => {
    const prompts = motivationalPrompts.find(m => m.mood === currentMood)?.prompts || [];
    setCurrentPrompt(prompts[promptIndex] || '');
  }, [currentMood, promptIndex]);

  const getNewPrompt = () => {
    const prompts = motivationalPrompts.find(m => m.mood === currentMood)?.prompts || [];
    const newIndex = (promptIndex + 1) % prompts.length;
    setPromptIndex(newIndex);
  };

  const dailyGoals = [
    { title: 'Morning Stretch', completed: true, time: '5 min' },
    { title: 'Mindful Breathing', completed: false, time: '3 min' },
    { title: 'Positive Affirmation', completed: false, time: '2 min' },
    { title: 'Gratitude Journal', completed: false, time: '5 min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header title="Daily Motivation" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Mood Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => {
                  setCurrentMood(mood.id);
                  setPromptIndex(0);
                }}
                className={`p-4 rounded-xl transition-all ${
                  currentMood === mood.id
                    ? `bg-gradient-to-r ${mood.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <mood.icon size={24} className="mx-auto mb-2" />
                <span className="text-sm font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Motivation Card */}
        <div className={`bg-gradient-to-r ${moods.find(m => m.id === currentMood)?.color} rounded-2xl p-6 mb-6 text-white shadow-xl`}>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <blockquote className="text-lg font-medium leading-relaxed mb-4 text-center">
              "{currentPrompt}"
            </blockquote>
            <div className="flex justify-center space-x-4">
              <button
                onClick={getNewPrompt}
                className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <RefreshCw size={16} />
                <span>New Quote</span>
              </button>
              <button className="flex items-center space-x-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                <Share size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daily Wellness Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Sun className="text-yellow-500 mr-2" size={20} />
            Daily Wellness Goals
          </h3>
          <div className="space-y-3">
            {dailyGoals.map((goal, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  goal.completed ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    goal.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}>
                    {goal.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <h4 className={`font-medium ${goal.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                      {goal.title}
                    </h4>
                    <p className="text-xs text-gray-500">{goal.time}</p>
                  </div>
                </div>
                <button
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    goal.completed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {goal.completed ? 'Done' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation Resources */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="text-purple-500 mr-2" size={20} />
            Motivation Resources
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onScreenChange('emotional-wall')}
              className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg hover:shadow-md transition-all"
            >
              <Heart className="text-pink-500 mx-auto mb-2" size={20} />
              <p className="text-sm font-medium text-gray-900">Share Progress</p>
            </button>
            <button
              onClick={() => onScreenChange('support')}
              className="p-4 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg hover:shadow-md transition-all"
            >
              <Sun className="text-blue-500 mx-auto mb-2" size={20} />
              <p className="text-sm font-medium text-gray-900">Get Support</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationPrompts;