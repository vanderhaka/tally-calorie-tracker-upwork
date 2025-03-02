import React from 'react';
import { OnboardingFormData } from '../../types';

interface AccountStepProps {
  formData: OnboardingFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountStep: React.FC<AccountStepProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
      <p className="text-gray-600">Let's get started with Tally - your simple weight tracking companion.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountStep;
