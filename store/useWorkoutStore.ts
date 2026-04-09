// types/workout.ts
export interface WorkoutSet {
  id: string;
  weight: number | null;
  reps: number | null;
  completed: boolean;
}

export interface WorkoutExercise {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

export interface WorkoutStore {
  exercises: WorkoutExercise[];
  isActive: boolean;
  addSet: (exerciseId: string) => void;
  addExercise: (name: string) => void;
  startWorkout: () => void;
  // ... other actions
}