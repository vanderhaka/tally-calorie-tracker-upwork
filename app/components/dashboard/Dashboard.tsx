import React, { useState } from 'react';
import { UserData } from '../../types';

interface DashboardProps {
  userData: UserData;
}

const Dashboard: React.FC<DashboardProps> = ({ userData }) => {
  const [inputValue, setInputValue] = useState('');
  const [conversations, setConversations] = useState([
    { role: 'assistant', content: 'Welcome back! How can I help you today?' }
  ]);
  
  // Format today's date
  const today = new Date().toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric'
  });
  
  // Get today's calorie data
  const todayCalories = userData.calorieHistory[userData.calorieHistory.length - 1];
  
  // For testing, use a fixed total of 1800 kcal
  const FIXED_TOTAL_CALORIES = 1800;
  
  // Calculate calorie progress percentage based on consumed amount out of fixed 1800 kcal
  const calorieProgressPercent = Math.min((todayCalories.consumed / FIXED_TOTAL_CALORIES) * 100, 100);
  const caloriesRemaining = FIXED_TOTAL_CALORIES - todayCalories.consumed;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message to conversation
    const newConversations = [
      ...conversations,
      { role: 'user', content: inputValue }
    ];
    
    setConversations(newConversations);
    setInputValue('');
    
    // Simulate assistant response based on input
    setTimeout(() => {
      let responseContent = '';
      
      if (inputValue.toLowerCase().includes('weight') || /\d+(\.\d+)?\s*(lbs|kg)/.test(inputValue)) {
        responseContent = "Great! I've recorded your weight update. You're making good progress toward your goal!";
      } else if (inputValue.toLowerCase().includes('ate') || inputValue.toLowerCase().includes('had') || inputValue.toLowerCase().includes('food')) {
        responseContent = "I've logged that meal and estimated approximately 350 calories. You have 250 calories remaining for today.";
      } else if (inputValue.toLowerCase().includes('calories')) {
        responseContent = "A typical serving contains about 250-300 calories. Would you like me to log this for you?";
      } else {
        responseContent = "I've noted that. Is there anything else you'd like to track today?";
      }
      
      setConversations([
        ...newConversations,
        { role: 'assistant', content: responseContent }
      ]);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Tally</h1>
          <div className="text-sm text-gray-600">{today}</div>
        </div>
        
        {/* Calorie Summary */}
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <div>Consumed: {todayCalories.consumed} kcal</div>
            <div>{caloriesRemaining} kcal remaining</div>
          </div>
          
          {/* Improved Calorie Progress Bar */}
          <div className="relative h-4 mb-2 rounded-full overflow-hidden bg-gray-200">
            {/* Gradient background - fixed from 0 to 1800 kcal */}
            <div className="absolute top-0 left-0 w-full h-full flex">
              <div className="w-1/3 h-full bg-gradient-to-r from-green-500 to-green-400"></div>
              <div className="w-1/3 h-full bg-gradient-to-r from-green-400 to-yellow-500"></div>
              <div className="w-1/3 h-full bg-gradient-to-r from-yellow-500 to-red-500"></div>
            </div>
            
            {/* Indicator for the amount consumed */}
            {todayCalories.consumed > 0 && (
              <div 
                className="absolute top-0 left-0 flex items-center h-full"
                style={{ 
                  left: `${Math.min(calorieProgressPercent, 98)}%`,
                  transform: 'translateX(-50%)',
                  transition: 'left 0.5s ease-in-out'
                }}
              >
                {/* Glass circle indicator */}
                <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 backdrop-blur-sm border-2 border-white border-opacity-50 shadow-md transform -translate-y-1 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white shadow-inner"></div>
                </div>
              </div>
            )}
            
            {/* Progress fill */}
            <div 
              className="absolute top-0 left-0 h-full bg-transparent"
              style={{ 
                width: `${Math.min(calorieProgressPercent, 100)}%`,
                transition: 'width 0.5s ease-in-out'
              }}
            ></div>
          </div>
          
          {/* Calorie legend - fixed from 0 to 1800 */}
          <div className="flex justify-between text-xs text-gray-500 px-1">
            <div>0</div>
            <div>900</div>
            <div>1800</div>
          </div>
        </div>
      </div>
      
      {/* Conversation Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {conversations.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-none' 
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="bg-white p-4 border-t">
        <div className="flex items-center">
          <button className="text-gray-500 focus:outline-none mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Log a meal, weight, or ask a question..."
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSendMessage}
            className="ml-2 text-blue-500 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
