'use client';

import React, { useState, useEffect } from 'react';
import { UserData } from '../types';
import OnboardingFlow from './onboarding/OnboardingFlow';
import Dashboard from './dashboard/Dashboard';
import ChartsScreen from './charts/ChartsScreen';
import SettingsScreen from './settings/SettingsScreen';
import Navigation from './layout/Navigation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progressBarColor, setProgressBarColor] = useState('bg-blue-500');
  const [debugConsumptionStep, setDebugConsumptionStep] = useState(0);

  // Define calorie consumption steps (0 to 1800 in 6 steps)
  const consumptionSteps = [0, 360, 720, 1080, 1440, 1800];

  // Simulate checking if user is logged in
  useEffect(() => {
    try {
      console.log('App component mounted');
      // In a real app, this would check localStorage or API
      if (typeof window !== 'undefined') {
        const hasCompletedOnboarding = window.localStorage.getItem('tallyOnboardingComplete');

        if (hasCompletedOnboarding === 'true') {
          setIsLoggedIn(true);
          setCurrentScreen('dashboard');

          // Fetch mock user data
          const mockUserData: UserData = {
            name: 'Alex Johnson',
            email: 'alex@example.com',
            currentWeight: 204.5,
            goalWeight: 195,
            targetDate: 'April 15, 2025',
            dailyCalories: 1800,
            startDate: '2025-02-15',
            startWeight: 210,
            weightHistory: [
              { date: '2025-02-15', weight: 210 },
              { date: '2025-02-16', weight: 209.5 },
              { date: '2025-02-18', weight: 209 },
              { date: '2025-02-20', weight: 208.2 },
              { date: '2025-02-22', weight: 207.8 },
              { date: '2025-02-24', weight: 207 },
              { date: '2025-02-25', weight: 206.3 },
              { date: '2025-02-27', weight: 205.8 },
              { date: '2025-03-01', weight: 205 },
              { date: '2025-03-02', weight: 204.5 },
            ],
            calorieHistory: [
              { date: '2025-02-20', consumed: 1750, budget: 1800 },
              { date: '2025-02-21', consumed: 1900, budget: 1800 },
              { date: '2025-02-22', consumed: 1600, budget: 1800 },
              { date: '2025-02-23', consumed: 1850, budget: 1800 },
              { date: '2025-02-24', consumed: 1720, budget: 1800 },
              { date: '2025-02-25', consumed: 1550, budget: 1800 },
              { date: '2025-02-26', consumed: 1780, budget: 1800 },
              { date: '2025-02-27', consumed: 1620, budget: 1800 },
              { date: '2025-02-28', consumed: 1700, budget: 1800 },
              { date: '2025-03-01', consumed: 1580, budget: 1800 },
              { date: '2025-03-02', consumed: 1200, budget: 1800 }
            ]
          };

          setUserData(mockUserData);
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      setError('Failed to load user data: ' + String(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCompleteOnboarding = (data: UserData) => {
    try {
      console.log('Onboarding completed with data:', data);
      // In a real app, this would send data to API
      setUserData(data);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tallyOnboardingComplete', 'true');
      }
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      setError('Failed to save onboarding data: ' + String(error));
    }
  };

  const handleLogout = () => {
    try {
      console.log('Logging out');
      // Clear user data and go back to onboarding
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('tallyOnboardingComplete');
      }
      setIsLoggedIn(false);
      setUserData(null);
      setCurrentScreen('onboarding');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      setError('Failed to log out: ' + String(error));
    }
  };

  // Debug function to cycle through consumption steps and toggle progress bar color
  const handleDebugClick = () => {
    // Cycle through consumption steps
    const nextStep = (debugConsumptionStep + 1) % consumptionSteps.length;
    setDebugConsumptionStep(nextStep);

    // Toggle progress bar color
    setProgressBarColor(progressBarColor === 'bg-blue-500' ? 'bg-purple-500' : 'bg-blue-500');

    // Update user data with new consumption value
    if (userData) {
      const updatedUserData = { ...userData };

      // Update the latest calorie history entry
      if (updatedUserData.calorieHistory.length > 0) {
        const latestEntry = { ...updatedUserData.calorieHistory[updatedUserData.calorieHistory.length - 1] };

        // Only update the consumed value, keep the budget fixed at 1800
        latestEntry.consumed = consumptionSteps[nextStep];
        latestEntry.budget = 1800; // Fixed budget value

        updatedUserData.calorieHistory[updatedUserData.calorieHistory.length - 1] = latestEntry;
      }

      setUserData(updatedUserData);
    }
  };

  // Calculate consumed calories for the debug button
  const getDebugCalorieText = () => {
    if (!userData || !userData.calorieHistory || userData.calorieHistory.length === 0) {
      return '0 / 1800 kcal';
    }

    const latestEntry = userData.calorieHistory[userData.calorieHistory.length - 1];
    return `${latestEntry.consumed} / 1800 kcal`;
  };

  // Render error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 p-4 border border-red-300 rounded bg-red-50 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Render the correct screen
  const renderScreen = () => {
    console.log('Rendering screen:', currentScreen);
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingFlow onComplete={handleCompleteOnboarding} progressBarColor={progressBarColor} />;
      case 'dashboard':
        return userData ? <Dashboard userData={userData} /> : null;
      case 'charts':
        return userData ? <ChartsScreen userData={userData} onBack={() => setCurrentScreen('dashboard')} /> : null;
      case 'settings':
        return userData ? <SettingsScreen userData={userData} onLogout={handleLogout} onBack={() => setCurrentScreen('dashboard')} /> : null;
      default:
        return <OnboardingFlow onComplete={handleCompleteOnboarding} progressBarColor={progressBarColor} />;
    }
  };

  // Only show navigation when logged in
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Debug button */}
      <button
        onClick={handleDebugClick}
        className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 z-50"
      >
        Debug ({getDebugCalorieText()})
      </button>

      {renderScreen()}

      {isLoggedIn && (
        <Navigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      )}
    </div>
  );
};

export default App;
