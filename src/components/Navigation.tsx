import React from 'react';
import { 
  Home, 
  MessageSquare, 
  Activity, 
  Heart, 
  Award, 
  Users, 
  Zap, 
  Map, 
  UserPlus, 
  Calendar
} from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onScreenChange: (screen: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'emotional-wall', icon: MessageSquare, label: 'Share' },
    { id: 'pain-recovery', icon: Activity, label: 'Recovery' },
    { id: 'motivation', icon: Heart, label: 'Motivate' },
    { id: 'rewards', icon: Award, label: 'Rewards' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'challenges', icon: Zap, label: 'Challenges' },
    { id: 'fitness-map', icon: Map, label: 'Map' },
    { id: 'support', icon: UserPlus, label: 'Support' },
    { id: 'fitness-plan', icon: Calendar, label: 'Plan' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              currentScreen === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Secondary navigation for remaining features */}
      <div className="flex justify-around items-center max-w-md mx-auto mt-2 pt-2 border-t border-gray-100">
        {navItems.slice(5).map((item) => (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center p-1 rounded-lg transition-colors ${
              currentScreen === item.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-400 hover:text-blue-600'
            }`}
          >
            <item.icon size={18} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;