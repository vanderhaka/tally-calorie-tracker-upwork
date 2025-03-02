import React from 'react';
import { UserData } from '../../types';

interface SettingsScreenProps {
  userData: UserData;
  onLogout: () => void;
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ userData, onLogout, onBack }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="mr-2 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        </div>
      </div>
      
      {/* Settings Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="bg-blue-100 text-blue-500 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium">Profile</h2>
                <p className="text-sm text-gray-500">Manage your personal information</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{userData.name}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{userData.email}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Goals Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="bg-green-100 text-green-500 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium">Weight Goals</h2>
                <p className="text-sm text-gray-500">Your targets and progress</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Goal Weight</p>
                <p>{userData.goalWeight} lbs</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Target Date</p>
                <p>{userData.targetDate}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Daily Calorie Budget</p>
                <p>{userData.dailyCalories} kcal</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Preferences Section */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <div className="bg-purple-100 text-purple-500 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="font-medium">Preferences</h2>
                <p className="text-sm text-gray-500">Customize your experience</p>
              </div>
            </div>
          </div>
          
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <p>Units</p>
                <p className="text-sm text-gray-500">Pounds, feet/inches</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle-units" 
                  className="sr-only"
                />
                <label 
                  htmlFor="toggle-units" 
                  className="block overflow-hidden h-6 rounded-full cursor-pointer bg-gray-300"
                >
                  <span className="block h-6 w-6 rounded-full bg-white"></span>
                </label>
              </div>
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div>
                <p>Notifications</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="toggle-notifications" 
                  className="sr-only"
                  defaultChecked
                />
                <label 
                  htmlFor="toggle-notifications" 
                  className="block overflow-hidden h-6 rounded-full cursor-pointer bg-blue-500"
                >
                  <span className="block h-6 w-6 rounded-full bg-white transform translate-x-4"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sign Out Button */}
        <button 
          onClick={onLogout}
          className="w-full bg-red-50 text-red-600 border border-red-100 rounded-lg py-3 mb-4 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V9.5a1 1 0 00-2 0V15H4V5h10.5a1 1 0 000-2H3z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M19 10a1 1 0 00-1-1h-4.586l.293-.293a1 1 0 10-1.414-1.414l-2 2a1 1 0 000 1.414l2 2a1 1 0 001.414-1.414l-.293-.293H18a1 1 0 001-1z" />
          </svg>
          Sign Out
        </button>
        
        <p className="text-center text-gray-500 text-xs mb-6">
          Tally App v1.0.0
        </p>
      </div>
    </div>
  );
};

export default SettingsScreen;
