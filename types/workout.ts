export type MuscleGroup = 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Cardio';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleGroup;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment: string;
  color: string; // Dynamic branding color
  image: string;
}

export const workoutData: Exercise[] = [
  { id: '1', name: 'Incline Bench Press', category: 'Chest', difficulty: 'Intermediate', equipment: 'Barbell', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80' },
  { id: '2', name: 'Deadlift', category: 'Back', difficulty: 'Advanced', equipment: 'Barbell', color: 'bg-red-600', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80' },
  { id: '3', name: 'Bulgarian Split Squat', category: 'Legs', difficulty: 'Intermediate', equipment: 'Dumbbells', color: 'bg-green-500', image: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=400&q=80' },
  { id: '4', name: 'Overhead Press', category: 'Shoulders', difficulty: 'Intermediate', equipment: 'Barbell', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1541534741688-6078c6bc35e5?w=400&q=80' },
  { id: '5', name: 'Hammer Curls', category: 'Arms', difficulty: 'Beginner', equipment: 'Dumbbells', color: 'bg-purple-500', image: 'https://images.unsplash.com/photo-1581009146145-b5ef03a726ec?w=400&q=80' },
  { id: '6', name: 'Hanging Leg Raises', category: 'Core', difficulty: 'Advanced', equipment: 'Pull-up Bar', color: 'bg-yellow-500', image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80' },
  // Add more as needed...
];