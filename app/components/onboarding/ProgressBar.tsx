import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(totalSteps)].map((_, i) => (
        <div 
          key={i}
          className={`h-1 w-6 rounded-full ${
            i < currentStep ? 'bg-blue-500' : 'bg-gray-200'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
