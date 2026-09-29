import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { currentUser } from '../data/mockData';

interface HeaderProps {
  title: string;
  showProfile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showProfile = true }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          {showProfile && (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
            />
          )}
          <div>
            <h1 className="text-lg font-bold text-gray-900">{title}</h1>
            {showProfile && (
              <p className="text-sm text-gray-600">Level {currentUser.level} • {currentUser.points} pts</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;