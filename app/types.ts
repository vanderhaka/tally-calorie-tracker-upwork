export interface OnboardingFormData {
  email: string;
  password: string;
  height: string;
  currentWeight: string;
  goalWeight: string;
  age: string;
  gender: string;
  activityLevel: string;
  targetDate: string;
}

export interface UserData {
  name?: string;
  email: string;
  currentWeight: number;
  goalWeight: number;
  targetDate: string;
  dailyCalories: number;
  startDate: string;
  startWeight: number;
  weightHistory: { date: string; weight: number }[];
  calorieHistory: { date: string; consumed: number; budget: number }[];
}

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface CalorieEntry {
  date: string;
  consumed: number;
  budget: number;
}
