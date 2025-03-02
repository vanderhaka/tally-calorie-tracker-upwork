// User data types
export interface WeightData {
  date: string;
  weight: number;
}

export interface CalorieData {
  date: string;
  consumed: number;
  budget: number;
}

export interface UserData {
  name?: string;
  email: string;
  password?: string;
  currentWeight: number;
  goalWeight: number;
  targetDate: string;
  dailyCalories: number;
  startDate: string;
  startWeight: number;
  height?: string;
  gender?: string;
  age?: string;
  activityLevel?: string;
  weightHistory: WeightData[];
  calorieHistory: CalorieData[];
}

// Onboarding form data
export interface OnboardingFormData {
  email: string;
  password: string;
  height: string;
  currentWeight: string;
  goalWeight: string;
  gender: string;
  age: string;
  activityLevel: string;
  targetDate: string;
}
