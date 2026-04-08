import { create } from 'zustand';

interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutSession {
  isActive: boolean;
  startTime: Date | null;
  exercises: Exercise[];
}

export const useWorkoutStore = create<WorkoutSession>((set) => ({
  isActive: false,
  startTime: null,
  exercises: [],
  startWorkout: () => set({ isActive: true, startTime: new Date(), exercises: [] }),
  addExercise: (name: string) => set((state) => ({
    exercises: [...state.exercises, { id: Math.random().toString(), name, sets: [] }]
  })),
  addSet: (exerciseId: string) => set((state) => ({
    exercises: state.exercises.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, sets: [...ex.sets, { id: Math.random().toString(), weight: 0, reps: 0, completed: false }] }
        : ex
    )
  })),
}));