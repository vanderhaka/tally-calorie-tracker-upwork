import React from 'react';
import { OnboardingFormData } from '../../types';
import { calculateCalories } from '../../utils/calculations';

interface DailyPlanStepProps {
  formData: OnboardingFormData;
}

const DailyPlanStep: React.FC<DailyPlanStepProps> = ({ formData }) => {
  const dailyCalories = calculateCalories(formData);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Daily Plan</h2>
      <p className="text-gray-600">Here's what we recommend based on your goals.</p>
      
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div className="text-center">
          <span className="text-4xl font-bold text-blue-500">{dailyCalories}</span>
          <p className="text-gray-500">Daily Calorie Target</p>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Current Weight</span>
            <span className="font-medium">{formData.currentWeight} lbs</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Goal Weight</span>
            <span className="font-medium">{formData.goalWeight} lbs</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Target Date</span>
            <span className="font-medium">{formData.targetDate}</span>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            With this plan, you can expect to lose about 1-2 lbs per week, which is a healthy and sustainable rate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanStep;
