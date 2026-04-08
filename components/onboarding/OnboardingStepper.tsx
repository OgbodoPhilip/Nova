"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFitnessStore } from "@/store/useFitnessStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Target,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: 1, title: "About You", icon: <User className="w-4 h-4" /> },
  { id: 2, title: "Current nova", icon: <Dumbbell className="w-4 h-4" /> },
  { id: 3, title: "Your Goal", icon: <Target className="w-4 h-4" /> },
];

export default function OnboardingStepper() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const { user, updateWeight } = useFitnessStore(); // Connecting to our store

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      {/* Top Navigation / Progress */}
      <div className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  currentStep >= step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-transparent text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.icon
                )}
              </div>
              <span
                className={`text-xs font-bold uppercase tracking-tighter ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progressValue} className="h-1.5" />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] bg-card border-2 rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Let's get to know you.
                </h2>
                <p className="text-muted-foreground">
                  This helps us calibrate your daily calorie and activity
                  targets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Age</Label>
                    <Input
                      type="number"
                      placeholder="25"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  What are your nova?
                </h2>
                <p className="text-muted-foreground">
                  Accurate data leads to better results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Weight (kg)</Label>
                    <Input
                      type="number"
                      defaultValue={user.weight}
                      onChange={(e) => updateWeight(Number(e.target.value))}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Height (cm)</Label>
                    <Input
                      type="number"
                      placeholder="180"
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  What's your focus?
                </h2>
                <p className="text-muted-foreground">
                  Select the primary goal for your fitness journey.
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {["Lose Weight", "Maintain Fitness", "Build Muscle"].map(
                    (goal) => (
                      <button
                        key={goal}
                        className="w-full p-4 text-left rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all font-bold"
                      >
                        {goal}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="flex justify-between mt-8">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="rounded-xl h-12 px-6"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>

        <Button
          onClick={
            currentStep === steps.length
              ? () => console.log("Finish")
              : nextStep
          }
          className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20"
        >
          {currentStep === steps.length ? "Finish Setup" : "Continue"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
