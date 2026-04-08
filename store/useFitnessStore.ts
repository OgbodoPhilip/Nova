import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Activity {
  id: string;
  type: string; // e.g., "Walking", "Gym", "Yoga"
  duration: number; // in minutes
  calories: number;
  date: string;
}

interface FitnessState {
  user: {
    name: string;
    weight: number; // in kg
    targetWeight: number;
    dailyStepGoal: number;
    dailyCalorieGoal: number;
  };
  activities: Activity[];
  // Actions
  addActivity: (activity: Omit<Activity, "id" | "date">) => void;
  updateWeight: (newWeight: number) => void;
}

export const useFitnessStore = create<FitnessState>()(
  persist(
    (set) => ({
      user: {
        name: "King",
        weight: 75,
        targetWeight: 70,
        dailyStepGoal: 10000,
        dailyCalorieGoal: 2200,
      },
      activities: [],
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            {
              ...activity,
              id: Math.random().toString(36),
              date: new Date().toISOString(),
            },
            ...state.activities,
          ],
        })),
      updateWeight: (newWeight) =>
        set((state) => ({
          user: { ...state.user, weight: newWeight },
        })),
    }),
    { name: "nova-storage" }, // This saves data to LocalStorage automatically!
  ),
);
