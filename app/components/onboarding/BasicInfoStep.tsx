import React from 'react';
import { OnboardingFormData } from '../../types';

interface BasicInfoStepProps {
  formData: OnboardingFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>
      <p className="text-gray-600">Help us customize Tally for your needs.</p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={onChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Years"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Height in centimeters"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sedentary">Sedentary (office job, little exercise)</option>
            <option value="light">Light Activity (light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate Activity (moderate exercise 3-5 days/week)</option>
            <option value="active">Very Active (hard exercise 6-7 days/week)</option>
            <option value="veryActive">Extra Active (very hard exercise & physical job)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;
