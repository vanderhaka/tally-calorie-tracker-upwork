import React from 'react';
import { OnboardingFormData } from '../../types';

interface WeightGoalsStepProps {
  formData: OnboardingFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WeightGoalsStep: React.FC<WeightGoalsStepProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Set Your Goal</h2>
      <p className="text-gray-600">Let's define what success looks like for you.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Current Weight (lbs)</label>
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your current weight"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Goal Weight (lbs)</label>
          <input
            type="number"
            name="goalWeight"
            value={formData.goalWeight}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your target weight"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Date</label>
          <input
            type="date"
            name="targetDate"
            value={formData.targetDate}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default WeightGoalsStep;
