'use client';

import { useWorkoutStore } from "@/store/useWorkoutStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Plus, Timer, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ActiveSession() {
  const { exercises, addSet, addExercise, isActive, startWorkout } = useWorkoutStore();

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-3xl bg-muted/30">
        <Dumbbell className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">No active session</h3>
        <p className="text-muted-foreground mb-6">Ready to crush your goals today?</p>
        <Button onClick={startWorkout} size="lg" className="rounded-full px-8">
          Start Empty Workout
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-primary/10 p-4 rounded-2xl border border-primary/20">
        <div className="flex items-center gap-3">
          <Timer className="w-5 h-5 text-primary animate-pulse" />
          <span className="font-mono font-bold text-lg text-primary">00:24:15</span>
        </div>
        <Button variant="destructive" size="sm" className="rounded-full">End Session</Button>
      </div>

      <AnimatePresence>
        {exercises.map((ex) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="border-2 overflow-hidden">
              <CardHeader className="bg-muted/50 py-3 flex flex-row items-center justify-between">
                <CardTitle className="text-md font-bold text-primary">{ex.name}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><X size={16}/></Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-4 px-6 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest border-b">
                  <span>Set</span>
                  <span>kg</span>
                  <span>Reps</span>
                  <span className="text-right">Status</span>
                </div>
                {ex.sets.map((set, idx) => (
                  <div key={set.id} className="grid grid-cols-4 px-6 py-3 items-center hover:bg-muted/30 transition-colors">
                    <span className="text-sm font-bold">{idx + 1}</span>
                    <Input type="number" className="h-8 w-16 bg-transparent border-none focus-visible:ring-1" placeholder="0" />
                    <Input type="number" className="h-8 w-16 bg-transparent border-none focus-visible:ring-1" placeholder="0" />
                    <div className="flex justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  className="w-full rounded-none h-12 border-t text-muted-foreground hover:text-primary gap-2"
                  onClick={() => addSet(ex.id)}
                >
                  <Plus size={16} /> Add Set
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button variant="outline" className="w-full py-8 border-2 border-dashed rounded-2xl gap-2" onClick={() => addExercise("Bench Press")}>
        <Plus className="w-5 h-5" /> Add Exercise
      </Button>
    </div>
  );
}