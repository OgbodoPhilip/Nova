'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Flame, Dumbbell, Heart, TrendingUp,
  Award, Plus, Trophy
} from 'lucide-react';

interface Activity {
  id: number;
  title: string;
  time: string;
  weight: string;
  reps: string;
}

interface Reward {
  id: number;
  title: string;
  xp: number;
  date: string;
}

const GymDashboard: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, title: "Deadlift", time: "Yesterday • 4 sets", weight: "180", reps: "5" },
    { id: 2, title: "Bench Press", time: "2 days ago • 5 sets", weight: "110", reps: "8" },
    { id: 3, title: "Pull-ups", time: "3 days ago", weight: "Bodyweight", reps: "15" },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newReps, setNewReps] = useState('');

  const [showRewardToast, setShowRewardToast] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([
    { id: 1, title: "First Deadlift PR", xp: 500, date: "Apr 8, 2026" },
    { id: 2, title: "1000kg Volume Club", xp: 750, date: "Apr 5, 2026" },
  ]);

  const [streak, setStreak] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [calories, setCalories] = useState(0);
  const [volume, setVolume] = useState(0);

  const totalXP = rewards.reduce((sum, reward) => sum + reward.xp, 0);

  useEffect(() => {
    const animateValue = (setter: any, target: number, duration: number) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    animateValue(setStreak, 17, 1200);
    animateValue(setTotalWorkouts, 42, 1400);
    animateValue(setCalories, 2840, 1600);
    animateValue(setVolume, 12480, 1800);
  }, []);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  const handleClaimReward = () => {
    confetti({ particleCount: 250, spread: 90, origin: { y: 0.6 } });

    const newReward: Reward = {
      id: Date.now(),
      title: "Bench Press PR Breakthrough",
      xp: 650,
      date: new Date().toLocaleDateString()
    };

    setRewards([newReward, ...rewards]);
    setShowRewardToast(true);
    setTimeout(() => setShowRewardToast(false), 2800);
  };

  const addActivity = () => {
    if (!newTitle.trim()) return;

    const newActivity: Activity = {
      id: Date.now(),
      title: newTitle.trim(),
      time: "Today • Just now",
      weight: newWeight || "—",
      reps: newReps || "—"
    };

    setActivities([newActivity, ...activities]);
    setNewTitle('');
    setNewWeight('');
    setNewReps('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 px-3 sm:px-4 md:px-6 lg:px-10 py-6 md:py-8">
      <div className="max-w-7xl xl:max-w-[1400px] mx-auto">

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            { icon: Flame, label: "STREAK", value: streak, suffix: " days", color: "text-orange-500" },
            { icon: Dumbbell, label: "WORKOUTS", value: totalWorkouts, suffix: "", color: "text-emerald-500" },
            { icon: Heart, label: "CALORIES", value: calories, suffix: " kcal", color: "text-red-500" },
            { icon: TrendingUp, label: "VOLUME", value: volume, suffix: " kg", color: "text-cyan-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 md:p-8"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 mb-4">
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
              <p className="text-xs md:text-sm text-zinc-500">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  {stat.value}
                </span>
                <span className="text-sm md:text-lg text-zinc-400">
                  {stat.suffix}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ACTIVITY */}
          <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6 md:p-8">
            <p className="font-bold mb-6">Activity Log</p>

            <div className="space-y-4">
              {activities.map((a) => (
                <div key={a.id} className="flex flex-col gap-4 sm:flex-row sm:justify-between bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl">
                  <div className="flex gap-3">
                    <Award className="text-amber-500" />
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-xs text-zinc-500">{a.time}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 sm:gap-8">
                    <p>{a.weight}kg</p>
                    <p>{a.reps} reps</p>
                  </div>
                </div>
              ))}
            </div>

            {/* ADD */}
            <div className="mt-6 space-y-3">
              <input
                placeholder="Exercise"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
              />

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  placeholder="Weight"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="flex-1 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                />
                <input
                  placeholder="Reps"
                  value={newReps}
                  onChange={(e) => setNewReps(e.target.value)}
                  className="flex-1 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800"
                />
              </div>

              <button
                onClick={addActivity}
                className="w-full bg-blue-600 text-white py-4 rounded-xl"
              >
                Add Activity
              </button>
            </div>
          </div>

          {/* REWARDS */}
          <div className="bg-white dark:bg-zinc-900 border rounded-3xl p-6 md:p-8">
            <p className="font-bold mb-4">Rewards</p>

            <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-xl">
              Total XP: {totalXP}
            </div>

            <div className="space-y-3 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
              {rewards.map((r) => (
                <div key={r.id} className="flex justify-between p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl">
                  <div>
                    <p>{r.title}</p>
                    <p className="text-xs text-zinc-500">{r.date}</p>
                  </div>
                  <p className="text-blue-500 font-bold">+{r.xp}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CLAIM */}
        <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-6 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <p className="text-xl font-bold">New PR!</p>
            <p className="text-sm opacity-90">Bench +10kg</p>
          </div>

          <button
            onClick={handleClaimReward}
            className="bg-white text-black px-6 py-3 rounded-xl w-full md:w-auto"
          >
            Claim
          </button>
        </div>

        {/* TOAST */}
        <AnimatePresence>
          {showRewardToast && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Reward added!
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default GymDashboard;
