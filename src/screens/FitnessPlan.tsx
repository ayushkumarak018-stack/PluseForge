import React, { useState } from 'react';
import { Calendar, Clock, Target, TrendingUp, Play, Check, ChevronRight, Plus } from 'lucide-react';
import Header from '../components/Header';

interface FitnessPlanProps {
  onScreenChange: (screen: string) => void;
}

const FitnessPlan: React.FC<FitnessPlanProps> = ({ onScreenChange }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();

  const weeklyPlan = [
    {
      day: 'Monday',
      focus: 'Upper Body Strength',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 12, completed: true },
        { name: 'Dumbbell Rows', sets: 3, reps: 10, completed: true },
        { name: 'Shoulder Press', sets: 3, reps: 8, completed: false },
        { name: 'Plank', duration: 60, completed: false }
      ],
      duration: 45,
      completed: false
    },
    {
      day: 'Tuesday',
      focus: 'Cardio & Core',
      exercises: [
        { name: 'Running', duration: 20, completed: false },
        { name: 'Bicycle Crunches', sets: 3, reps: 20, completed: false },
        { name: 'Mountain Climbers', duration: 30, completed: false },
        { name: 'Russian Twists', sets: 3, reps: 15, completed: false }
      ],
      duration: 35,
      completed: false
    },
    {
      day: 'Wednesday',
      focus: 'Lower Body Power',
      exercises: [
        { name: 'Squats', sets: 4, reps: 15, completed: false },
        { name: 'Lunges', sets: 3, reps: 12, completed: false },
        { name: 'Deadlifts', sets: 3, reps: 8, completed: false },
        { name: 'Calf Raises', sets: 3, reps: 20, completed: false }
      ],
      duration: 50,
      completed: false
    },
    {
      day: 'Thursday',
      focus: 'Active Recovery',
      exercises: [
        { name: 'Yoga Flow', duration: 20, completed: false },
        { name: 'Light Walking', duration: 15, completed: false },
        { name: 'Stretching', duration: 10, completed: false }
      ],
      duration: 45,
      completed: false
    },
    {
      day: 'Friday',
      focus: 'Full Body Circuit',
      exercises: [
        { name: 'Burpees', sets: 3, reps: 8, completed: false },
        { name: 'Jump Squats', sets: 3, reps: 12, completed: false },
        { name: 'Push-up to T', sets: 3, reps: 10, completed: false },
        { name: 'High Knees', duration: 30, completed: false }
      ],
      duration: 40,
      completed: false
    },
    {
      day: 'Saturday',
      focus: 'Outdoor Activity',
      exercises: [
        { name: 'Hiking/Walking', duration: 60, completed: false },
        { name: 'Bodyweight Exercises', duration: 15, completed: false }
      ],
      duration: 75,
      completed: false
    },
    {
      day: 'Sunday',
      focus: 'Rest & Recovery',
      exercises: [
        { name: 'Gentle Yoga', duration: 30, completed: false },
        { name: 'Meditation', duration: 10, completed: false }
      ],
      duration: 40,
      completed: false
    }
  ];

  const currentPlan = weeklyPlan[selectedDay];
  const completedExercises = currentPlan.exercises.filter(ex => ex.completed).length;
  const progressPercentage = (completedExercises / currentPlan.exercises.length) * 100;

  const stats = {
    totalWorkouts: 15,
    completedThisWeek: 3,
    averageDuration: 42,
    currentStreak: 5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header title="Digital Fitness Plan" showProfile={false} />
      
      <div className="px-4 py-6 pb-32 max-w-md mx-auto">
        {/* Plan Overview */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-2">Your Personalized Plan</h2>
          <p className="text-emerald-100 mb-4">Tailored for your fitness level and goals</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.completedThisWeek}/7</p>
              <p className="text-xs text-emerald-100">This Week</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.currentStreak}</p>
              <p className="text-xs text-emerald-100">Day Streak</p>
            </div>
          </div>
        </div>

        {/* Week Calendar */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-900">This Week</h3>
            <span className="text-sm text-gray-600">Week of {today.toLocaleDateString()}</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekDays.map((day, index) => {
              const isToday = index === 1; // Tuesday is today for demo
              const dayPlan = weeklyPlan[index];
              const dayCompleted = dayPlan.exercises.filter(ex => ex.completed).length > 0;
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDay(index)}
                  className={`p-3 rounded-lg text-center transition-all ${
                    selectedDay === index
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : dayCompleted
                        ? 'bg-green-100 text-green-700'
                        : isToday
                          ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-300'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs font-medium">{day}</div>
                  <div className="text-lg font-bold">{index + 25}</div>
                  {dayCompleted && <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Workout */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{currentPlan.day}</h3>
              <div className="flex items-center space-x-2">
                <Clock className="text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{currentPlan.duration} min</span>
              </div>
            </div>
            <p className="text-emerald-600 font-medium mb-3">{currentPlan.focus}</p>
            
            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-semibold text-gray-900">
                {completedExercises}/{currentPlan.exercises.length} exercises
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Exercise List */}
          <div className="divide-y divide-gray-100">
            {currentPlan.exercises.map((exercise, index) => (
              <div
                key={index}
                className={`p-4 flex items-center justify-between ${
                  exercise.completed ? 'bg-green-50' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    exercise.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {exercise.completed ? <Check size={16} /> : <span className="text-sm font-medium">{index + 1}</span>}
                  </div>
                  <div>
                    <h4 className={`font-medium ${exercise.completed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {exercise.sets && exercise.reps
                        ? `${exercise.sets} sets × ${exercise.reps} reps`
                        : `${exercise.duration} seconds`}
                    </p>
                  </div>
                </div>
                <button className={`p-2 rounded-full transition-colors ${
                  exercise.completed
                    ? 'text-green-500'
                    : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'
                }`}>
                  {exercise.completed ? <Check size={20} /> : <Play size={20} />}
                </button>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="p-4 border-t border-gray-100">
            {progressPercentage === 100 ? (
              <button className="w-full bg-green-500 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2">
                <Check size={20} />
                <span>Workout Complete!</span>
              </button>
            ) : (
              <button
                onClick={() => onScreenChange('challenges')}
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
              >
                {completedExercises === 0 ? 'Start Workout' : 'Continue Workout'}
              </button>
            )}
          </div>
        </div>

        {/* Weekly Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Weekly Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Target className="text-emerald-600" size={20} />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.totalWorkouts}</p>
              <p className="text-xs text-gray-600">Total Workouts</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Clock className="text-blue-600" size={20} />
              </div>
              <p className="text-lg font-bold text-gray-900">{stats.averageDuration}min</p>
              <p className="text-xs text-gray-600">Avg Duration</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onScreenChange('pain-recovery')}
            className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl hover:shadow-md transition-all"
          >
            <Target className="text-orange-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-gray-900">Pain Check</p>
          </button>
          <button className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-xl hover:shadow-md transition-all">
            <Plus className="text-purple-500 mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-gray-900">Custom Plan</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FitnessPlan;