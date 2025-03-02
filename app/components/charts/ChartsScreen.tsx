import React, { useState } from 'react';
import { UserData } from '../../types';

interface ChartsScreenProps {
  userData: UserData;
  onBack: () => void;
}

const ChartsScreen: React.FC<ChartsScreenProps> = ({ userData, onBack }) => {
  const [timeWindow, setTimeWindow] = useState(15); // Default to 15 days
  
  // Calculate weight progress percentage
  const totalWeightLossGoal = userData.startWeight - userData.goalWeight;
  const currentWeightLoss = userData.startWeight - userData.currentWeight;
  const weightProgressPercent = (currentWeightLoss / totalWeightLossGoal) * 100;
  
  // Filter data based on timeWindow
  const weightData = userData.weightHistory.slice(-timeWindow);
  const calorieData = userData.calorieHistory.slice(-timeWindow);
  
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
          <h1 className="text-xl font-bold text-gray-800">History & Charts</h1>
        </div>
      </div>
      
      {/* Charts Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Weight Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Weight Progress</h2>
          <div className="text-xs text-gray-500 mb-1">
            Goal: {userData.goalWeight} lbs by {userData.targetDate}
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-2 bg-blue-500 rounded-full" 
              style={{width: `${Math.min(100, weightProgressPercent)}%`}}
            ></div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-40 flex items-end space-x-1">
            {weightData.map((day, i) => {
              const maxWeight = Math.max(...weightData.map(d => d.weight));
              const minWeight = Math.min(...weightData.map(d => d.weight)) - 1; // Some padding
              const range = maxWeight - minWeight;
              const height = `${((day.weight - minWeight) / range) * 100}%`;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center">
                    <div 
                      className="bg-blue-500 rounded-t w-full" 
                      style={{height}}
                    ></div>
                  </div>
                  {i % 3 === 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Time window selector */}
          <div className="flex justify-center mt-4 space-x-2">
            <button 
              onClick={() => setTimeWindow(7)}
              className={`px-3 py-1 text-xs rounded-full ${timeWindow === 7 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              7d
            </button>
            <button 
              onClick={() => setTimeWindow(15)}
              className={`px-3 py-1 text-xs rounded-full ${timeWindow === 15 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              15d
            </button>
            <button 
              onClick={() => setTimeWindow(30)}
              className={`px-3 py-1 text-xs rounded-full ${timeWindow === 30 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              30d
            </button>
          </div>
        </div>
        
        {/* Calories Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">Calorie Intake</h2>
          <div className="text-xs text-gray-500 mb-1">
            Daily Budget: {userData.dailyCalories} kcal
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-40 flex items-end space-x-1">
            {calorieData.map((day, i) => {
              const maxCalories = Math.max(...calorieData.map(d => Math.max(d.consumed, d.budget)));
              const height = `${(day.consumed / maxCalories) * 100}%`;
              const budgetHeight = `${(day.budget / maxCalories) * 100}%`;
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex justify-center relative">
                    {/* Budget line */}
                    <div 
                      className="absolute w-full border-t border-dashed border-gray-400" 
                      style={{bottom: budgetHeight}}
                    ></div>
                    
                    {/* Calorie bar */}
                    <div 
                      className={`rounded-t w-full ${day.consumed > day.budget ? 'bg-red-500' : 'bg-green-500'}`}
                      style={{height}}
                    ></div>
                  </div>
                  {i % 3 === 0 && (
                    <div className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsScreen;
