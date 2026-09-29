import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, Zap, Clock, Award, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import { microChallenges } from '../data/mockData';

interface MicroChallengesProps {
  onScreenChange: (screen: string) => void;
}

const MicroChallenges: React.FC<MicroChallengesProps> = ({ onScreenChange }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);

  const challenge = selectedChallenge
    ? microChallenges.find(c => c.id === selectedChallenge)
    : null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && challenge) {
      const currentEx = challenge.exercises[currentExercise];
      const targetTime = currentEx.duration || (currentEx.reps ? currentEx.reps * 2 : 30);
      
      interval = setInterval(() => {
        setTimer(timer + 1);
        
        if (timer >= targetTime) {
          handleExerciseComplete();
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timer, challenge, currentExercise]);

  const handleExerciseComplete = () => {
    if (!challenge) return;
    
    setCompletedExercises([...completedExercises, currentExercise]);
    setIsActive(false);
    setTimer(0);
    
    if (currentExercise < challenge.exercises.length - 1) {
      setTimeout(() => {
        setCurrentExercise(currentExercise + 1);
      }, 1000);
    }
  };

  const startChallenge = (challengeId: string) => {
    setSelectedChallenge(challengeId);
    setCurrentExercise(0);
    setTimer(0);
    setCompletedExercises([]);
  };

  const resetChallenge = () => {
    setSelectedChallenge(null);
    setCurrentExercise(0);
    setTimer(0);
    setCompletedExercises([]);
    setIsActive(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-600';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-red-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (selectedChallenge && challenge) {
    const currentEx = challenge.exercises[currentExercise];
    const isCompleted = completedExercises.includes(currentExercise);
    const allCompleted = completedExercises.length === challenge.exercises.length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <Header title={challenge.title} showProfile={false} />
        
        <div className="px-4 py-6 pb-32 max-w-md mx-auto">
          {allCompleted ? (
            // Challenge Completed
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-white" size={64} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Challenge Complete!</h2>
              <p className="text-gray-600 mb-4">Amazing work! You've earned {challenge.points} points</p>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Workout Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{challenge.exercises.length}</p>
                    <p className="text-sm text-gray-600">Exercises</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{challenge.duration} min</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => onScreenChange('rewards')}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  View Rewards
                </button>
                <button
                  onClick={resetChallenge}
                  className="w-full bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Try Another Challenge
                </button>
              </div>
            </div>
          ) : (
            // Active Exercise
            <div>
              {/* Exercise Progress */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">
                    Exercise {currentExercise + 1} of {challenge.exercises.length}
                  </h3>
                  <button
                    onClick={resetChallenge}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentExercise + (isCompleted ? 1 : 0)) / challenge.exercises.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Current Exercise */}
              <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl p-6 mb-6 text-white">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{currentEx.name}</h2>
                  <p className="text-orange-100 mb-6">{currentEx.description}</p>
                  
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    {isCompleted ? (
                      <Check size={64} />
                    ) : (
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {currentEx.duration ? formatTime(timer) : `${currentEx.reps || 0}`}
                        </div>
                        <div className="text-sm text-orange-100">
                          {currentEx.duration ? `/ ${formatTime(currentEx.duration)}` : 'reps'}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {!isCompleted && (
                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => setIsActive(!isActive)}
                        className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                      >
                        {isActive ? <Pause size={32} /> : <Play size={32} />}
                      </button>
                      <button
                        onClick={handleExerciseComplete}
                        className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
                      >
                        <Check size={32} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Exercise List */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 p-4 border-b border-gray-100">All Exercises</h3>
                <div className="divide-y divide-gray-100">
                  {challenge.exercises.map((exercise, index) => (
                    <div
                      key={exercise.id}
                      className={`p-4 flex items-center justify-between ${
                        index === currentExercise ? 'bg-orange-50 border-l-4 border-orange-500' :
                        completedExercises.includes(index) ? 'bg-green-50' : ''
                      }`}
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exercise.duration ? `${exercise.duration}s` : `${exercise.reps} reps`}
                        </p>
                      </div>
                      {completedExercises.includes(index) ? (
                        <Check className="text-green-500" size={20} />
                      ) : index === currentExercise ? (
                        <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                      ) : (
                        <div className="w-3 h-3 bg-gray-300 rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header title="Micro Challenges" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Today's Recommendation */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl p-6 mb-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Quick Boost Needed!</h2>
              <p className="text-orange-100 text-sm">Perfect for your energy level</p>
            </div>
          </div>
          <button
            onClick={() => startChallenge('1')}
            className="w-full bg-white bg-opacity-20 text-white font-semibold py-3 rounded-lg hover:bg-opacity-30 transition-colors flex items-center justify-center space-x-2"
          >
            <Play size={20} />
            <span>Start 5-Minute Power Boost</span>
          </button>
        </div>

        {/* Challenge Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Challenge</h3>
          <div className="space-y-3">
            {microChallenges.map((challenge) => (
              <div key={challenge.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} rounded-lg flex items-center justify-center`}>
                        <Zap className="text-white" size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock size={14} />
                          <span>{challenge.duration} min</span>
                          <span>•</span>
                          <span className="capitalize">{challenge.difficulty}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <Award size={14} className="mr-1" />
                            <span>{challenge.points} pts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {challenge.exercises.length} exercises including {challenge.exercises.slice(0, 2).map(e => e.name).join(', ')}
                    </p>
                  </div>
                  <button
                    onClick={() => startChallenge(challenge.id)}
                    className="p-2 text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Zap className="text-orange-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <p className="text-xs text-gray-600">Completed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="text-blue-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
              <p className="text-xs text-gray-600">This Week</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Award className="text-green-600" size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">1,150</p>
              <p className="text-xs text-gray-600">Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroChallenges;