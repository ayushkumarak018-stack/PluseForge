import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Play, BookOpen, Target } from 'lucide-react';
import Header from '../components/Header';

interface PainRecoveryProps {
  onScreenChange: (screen: string) => void;
}

const PainRecovery: React.FC<PainRecoveryProps> = ({ onScreenChange }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [painLevel, setPainLevel] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const bodyParts = [
    'Lower Back', 'Neck & Shoulders', 'Knees', 'Ankles', 
    'Wrists', 'Hips', 'Upper Back', 'Calves'
  ];

  const getRecommendations = (bodyPart: string, level: number) => {
    const recommendations = {
      'Lower Back': {
        exercises: ['Cat-Cow Stretch', 'Child\'s Pose', 'Knee-to-Chest Stretch', 'Pelvic Tilts'],
        tips: ['Apply heat for 15-20 minutes', 'Avoid prolonged sitting', 'Sleep with pillow between knees'],
        recovery: level > 7 ? '2-3 days' : level > 4 ? '1-2 days' : '12-24 hours'
      },
      'Knees': {
        exercises: ['Quad Stretches', 'Hamstring Stretches', 'Calf Raises', 'Wall Sits'],
        tips: ['Ice for 15 minutes if swollen', 'Elevate when resting', 'Avoid high-impact activities'],
        recovery: level > 7 ? '3-5 days' : level > 4 ? '2-3 days' : '1-2 days'
      },
      'Neck & Shoulders': {
        exercises: ['Neck Rolls', 'Shoulder Blade Squeezes', 'Upper Trap Stretch', 'Chin Tucks'],
        tips: ['Check your posture', 'Use ergonomic workspace setup', 'Take breaks from screens'],
        recovery: level > 7 ? '2-4 days' : level > 4 ? '1-2 days' : '6-12 hours'
      }
    };
    
    return recommendations[bodyPart as keyof typeof recommendations] || {
      exercises: ['Gentle stretching', 'Light movement', 'Rest and recovery'],
      tips: ['Listen to your body', 'Stay hydrated', 'Get adequate sleep'],
      recovery: '1-3 days'
    };
  };

  const handleAssessment = () => {
    if (selectedBodyPart && painLevel > 0) {
      setShowRecommendations(true);
    }
  };

  const recommendations = showRecommendations ? getRecommendations(selectedBodyPart, painLevel) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header title="Pain Recovery Assistant" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {!showRecommendations ? (
          <>
            {/* Assessment Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="text-green-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Pain Assessment</h2>
                <p className="text-gray-600">Let's identify your pain and create a recovery plan</p>
              </div>

              {/* Body Part Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Which area needs attention?</label>
                <div className="grid grid-cols-2 gap-2">
                  {bodyParts.map((part) => (
                    <button
                      key={part}
                      onClick={() => setSelectedBodyPart(part)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedBodyPart === part
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {part}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pain Level */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Pain Level (1-10): {painLevel}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={(e) => setPainLevel(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>No Pain</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>

              <button
                onClick={handleAssessment}
                disabled={!selectedBodyPart || painLevel === 0}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
              >
                Get Recovery Plan
              </button>
            </div>

            {/* Quick Relief Tips */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Relief Tips</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                  <CheckCircle className="text-blue-500" size={16} />
                  <span className="text-sm text-gray-700">Apply ice for acute injuries</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg">
                  <CheckCircle className="text-orange-500" size={16} />
                  <span className="text-sm text-gray-700">Use heat for muscle tension</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-gray-700">Gentle movement promotes healing</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Recovery Recommendations */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="text-blue-600" size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedBodyPart} Recovery Plan</h2>
                <p className="text-gray-600">Pain Level: {painLevel}/10</p>
              </div>

              {/* Recovery Timeline */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="text-yellow-500" size={20} />
                  <h3 className="font-semibold text-gray-900">Expected Recovery Time</h3>
                </div>
                <p className="text-lg font-bold text-blue-600">{recommendations?.recovery}</p>
                <p className="text-sm text-gray-600">With proper care and exercises</p>
              </div>

              {/* Recommended Exercises */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Play className="text-green-500 mr-2" size={20} />
                  Recommended Exercises
                </h3>
                <div className="space-y-2">
                  {recommendations?.exercises.map((exercise, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-gray-800 font-medium">{exercise}</span>
                      <button className="text-green-600 hover:text-green-700">
                        <Play size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recovery Tips */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BookOpen className="text-blue-500 mr-2" size={20} />
                  Recovery Tips
                </h3>
                <div className="space-y-2">
                  {recommendations?.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2">
                      <CheckCircle className="text-blue-500 mt-0.5" size={16} />
                      <span className="text-gray-700 text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  New Assessment
                </button>
                <button
                  onClick={() => onScreenChange('challenges')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Start Recovery
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PainRecovery;