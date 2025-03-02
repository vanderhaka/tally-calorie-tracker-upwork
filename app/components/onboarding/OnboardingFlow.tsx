import React, { useState } from 'react';
import { OnboardingFormData, UserData } from '../../types';
import ProgressBar from './ProgressBar';
import AccountStep from './AccountStep';
import BasicInfoStep from './BasicInfoStep';
import WeightGoalsStep from './WeightGoalsStep';
import DailyPlanStep from './DailyPlanStep';
import { createUserData } from '../../utils/calculations';

interface OnboardingFlowProps {
  onComplete: (userData: UserData) => void;
  progressBarColor?: string;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, progressBarColor = 'bg-blue-500' }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>({
    email: '',
    password: '',
    height: '',
    currentWeight: '',
    goalWeight: '',
    gender: '',
    age: '',
    activityLevel: 'moderate',
    targetDate: '2025-04-15',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleComplete = () => {
    // Create user data and complete onboarding
    const userData = createUserData(formData);
    onComplete(userData);
  };

  // Get the step title based on current step
  const getStepTitle = () => {
    switch (step) {
      case 1: return "Account Setup";
      case 2: return "Personal Information";
      case 3: return "Weight Goals";
      case 4: return "Daily Plan";
      default: return "";
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <AccountStep formData={formData} onChange={handleInputChange} />;
      case 2:
        return <BasicInfoStep formData={formData} onChange={handleInputChange} />;
      case 3:
        return <WeightGoalsStep formData={formData} onChange={handleInputChange} />;
      case 4:
        return <DailyPlanStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Progress indicator */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Tally</h1>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-600 mb-1">Step {step} of 4: {getStepTitle()}</div>
            <ProgressBar currentStep={step} totalSteps={4} color={progressBarColor} />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {renderStepContent()}
      </div>

      {/* Bottom action button - added z-20 to ensure it appears above the navigation bar */}
      <div className="bg-white p-4 border-t relative z-20">
        {step < 4 ? (
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 text-white rounded-lg py-3 flex items-center justify-center font-medium"
          >
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="w-full bg-green-500 text-white rounded-lg py-3 flex items-center justify-center font-medium"
          >
            Get Started
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;
