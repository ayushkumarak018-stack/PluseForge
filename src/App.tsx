import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './screens/Dashboard';
import EmotionalWall from './screens/EmotionalWall';
import PainRecovery from './screens/PainRecovery';
import MotivationPrompts from './screens/MotivationPrompts';
import RewardsSystem from './screens/RewardsSystem';
import CommunityAccountability from './screens/CommunityAccountability';
import MicroChallenges from './screens/MicroChallenges';
import FitnessMap from './screens/FitnessMap';
import PeerSupport from './screens/PeerSupport';
import FitnessPlan from './screens/FitnessPlan';

type Screen = 
  | 'dashboard' 
  | 'emotional-wall' 
  | 'pain-recovery' 
  | 'motivation' 
  | 'rewards' 
  | 'community' 
  | 'challenges' 
  | 'fitness-map' 
  | 'support' 
  | 'fitness-plan';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onScreenChange={handleScreenChange} />;
      case 'emotional-wall':
        return <EmotionalWall onScreenChange={handleScreenChange} />;
      case 'pain-recovery':
        return <PainRecovery onScreenChange={handleScreenChange} />;
      case 'motivation':
        return <MotivationPrompts onScreenChange={handleScreenChange} />;
      case 'rewards':
        return <RewardsSystem onScreenChange={handleScreenChange} />;
      case 'community':
        return <CommunityAccountability onScreenChange={handleScreenChange} />;
      case 'challenges':
        return <MicroChallenges onScreenChange={handleScreenChange} />;
      case 'fitness-map':
        return <FitnessMap onScreenChange={handleScreenChange} />;
      case 'support':
        return <PeerSupport onScreenChange={handleScreenChange} />;
      case 'fitness-plan':
        return <FitnessPlan onScreenChange={handleScreenChange} />;
      default:
        return <Dashboard onScreenChange={handleScreenChange} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <Navigation currentScreen={currentScreen} onScreenChange={handleScreenChange} />
    </div>
  );
}

export default App;