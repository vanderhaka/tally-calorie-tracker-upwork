import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, color = 'bg-blue-500' }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(totalSteps)].map((_, i) => (
        <div 
          key={i}
          className={`h-1 w-6 rounded-full ${
            i < currentStep ? color : 'bg-gray-200'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
