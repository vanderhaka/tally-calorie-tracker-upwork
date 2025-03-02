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
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
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

  // Navigate directly to a specific step
  const goToStep = (stepNumber: number) => {
    // Only allow going to a step if we've already been there or it's the next step
    if (stepNumber <= step + 1) {
      setStep(stepNumber);
    }
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

  // Array of step titles for the interactive step indicator
  const stepTitles = ["Account", "Info", "Goals", "Plan"];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Progress indicator */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Tally</h1>
          <div className="flex flex-col items-end">
            <div className="text-sm text-gray-600 mb-1">Step {step} of 4: {getStepTitle()}</div>
            <ProgressBar currentStep={step} totalSteps={4} />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {renderStepContent()}
      </div>

      {/* Bottom action button with interactive progress bar */}
      <div className="bg-white p-4 border-t relative z-20">
        {/* Interactive Step Indicator */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            {stepTitles.map((title, i) => {
              const stepNum = i + 1;
              const isActive = stepNum === step;
              const isPast = stepNum < step;
              const isFuture = stepNum > step;
              const isAccessible = stepNum <= step + 1;

              return (
                <button
                  key={i}
                  onClick={() => isAccessible && goToStep(stepNum)}
                  disabled={!isAccessible}
                  className={`
                    flex flex-col items-center justify-center relative
                    ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                  `}
                >
                  {/* Circle indicator */}
                  <div 
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-blue-500 text-white' : 
                        isPast ? 'bg-green-500 text-white' : 
                        'bg-gray-200 text-gray-500'}
                      ${isAccessible && !isActive ? 'hover:bg-gray-300' : ''}
                      mb-1 transition-colors
                    `}
                  >
                    {isPast ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  
                  {/* Step title */}
                  <span className={`text-xs ${isActive ? 'font-medium text-blue-500' : isPast ? 'font-medium text-green-500' : 'text-gray-500'}`}>
                    {title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

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
