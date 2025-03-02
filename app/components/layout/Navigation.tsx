import React from 'react';
import { Calendar, BarChart2, Settings } from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentScreen, 
  onNavigate 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-10">
      <button 
        onClick={() => onNavigate('dashboard')}
        className={`flex flex-col items-center focus:outline-none ${currentScreen === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <Calendar className="w-6 h-6" />
        <span className="text-xs mt-1">Today</span>
      </button>
      
      <button 
        onClick={() => onNavigate('charts')}
        className={`flex flex-col items-center focus:outline-none ${currentScreen === 'charts' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <BarChart2 className="w-6 h-6" />
        <span className="text-xs mt-1">Charts</span>
      </button>
      
      <button 
        onClick={() => onNavigate('settings')}
        className={`flex flex-col items-center focus:outline-none ${currentScreen === 'settings' ? 'text-blue-500' : 'text-gray-500'}`}
      >
        <Settings className="w-6 h-6" />
        <span className="text-xs mt-1">Settings</span>
      </button>
    </div>
  );
};

export default Navigation;
