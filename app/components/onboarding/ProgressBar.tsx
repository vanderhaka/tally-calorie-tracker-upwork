import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, color = 'bg-blue-500' }) => {
  const getStepColor = (index: number) => {
    // Calculate percentage thresholds based on total steps
    const greenThreshold = Math.floor(totalSteps * 0.8); // 0-80%
    const orangeThreshold = Math.floor(totalSteps * 0.9); // 80-90%
    
    // Return color based on index
    if (index >= orangeThreshold) {
      return 'bg-red-500'; // Last 10% (90-100%)
    } else if (index >= greenThreshold) {
      return 'bg-orange-500'; // 80-90%
    } else {
      return 'bg-green-500'; // 0-80%
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(totalSteps)].map((_, i) => (
        <div 
          key={i}
          className={`h-1 w-6 rounded-full ${
            i < currentStep ? getStepColor(i) : 'bg-gray-200'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
