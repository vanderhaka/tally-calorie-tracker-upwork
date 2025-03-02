import { OnboardingFormData, UserData, WeightEntry, CalorieEntry } from '../types';

// Calculate daily calorie target based on user data
export const calculateCalories = (formData: OnboardingFormData): number => {
  // Simplified BMR calculation using Mifflin-St Jeor Equation
  let bmr = 0;
  if (formData.gender === 'male') {
    bmr = 10 * Number(formData.currentWeight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) + 5;
  } else {
    bmr = 10 * Number(formData.currentWeight) + 6.25 * Number(formData.height) - 5 * Number(formData.age) - 161;
  }
  
  // Activity multiplier
  const activityMultipliers: {[key: string]: number} = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };
  
  const tdee = bmr * activityMultipliers[formData.activityLevel];
  
  // For weight loss, create a 500 calorie deficit
  return Math.round(tdee - 500);
};

// Generate mock weight history data
export const generateMockData = (formData: OnboardingFormData): {
  weightHistory: WeightEntry[],
  calorieHistory: CalorieEntry[],
  dailyCalories: number
} => {
  const dailyCalories = calculateCalories(formData);
  
  // Create mock weight history data
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 15); // Start 15 days ago
  
  const weightHistory: WeightEntry[] = [];
  const calorieHistory: CalorieEntry[] = [];
  
  // Generate some realistic weight data
  let currentWeight = parseFloat(formData.currentWeight);
  for (let i = 15; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Small random fluctuations in weight
    if (i < 15) {
      const fluctuation = (Math.random() - 0.3) * 0.7; // Slightly biased toward loss
      currentWeight += fluctuation;
    }
    
    weightHistory.push({
      date: date.toISOString().split('T')[0],
      weight: Math.round(currentWeight * 10) / 10 // Round to 1 decimal place
    });
    
    // Add calorie data for the last 10 days
    if (i <= 10) {
      calorieHistory.push({
        date: date.toISOString().split('T')[0],
        consumed: Math.round(dailyCalories * (0.8 + Math.random() * 0.4)), // 80-120% of target
        budget: dailyCalories
      });
    }
  }
  
  return {
    weightHistory,
    calorieHistory,
    dailyCalories
  };
};

// Create user data object from form data
export const createUserData = (formData: OnboardingFormData): UserData => {
  const startDate = new Date().toISOString().split('T')[0];
  const dailyCalories = calculateCalories(formData);
  const mockData = generateMockData(formData);

  return {
    email: formData.email,
    currentWeight: Number(formData.currentWeight),
    goalWeight: Number(formData.goalWeight),
    targetDate: formData.targetDate,
    dailyCalories,
    startDate,
    startWeight: Number(formData.currentWeight),
    weightHistory: mockData.weightHistory,
    calorieHistory: mockData.calorieHistory
  };
};
