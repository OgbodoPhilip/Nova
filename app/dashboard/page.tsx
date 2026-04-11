'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Flame, Dumbbell, Zap, Heart, Calendar, TrendingUp, Award, 
  PlayCircle, Plus, Moon, Sun, Trophy 
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

  // Calculate Total XP
  const totalXP = rewards.reduce((sum, reward) => sum + reward.xp, 0);

  // Count-up animations
  useEffect(() => {
    const animateValue = (setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) => {
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

  // Theme
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
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
      weight: newWeight.trim() || "—",
      reps: newReps.trim() || "—"
    };

    setActivities([newActivity, ...activities]);
    setNewTitle('');
    setNewWeight('');
    setNewReps('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 p-4 md:p-6 lg:p-10 mt-22 md:mt-14">
      <div className="max-w-7xl mx-auto">


        {/* STATS GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
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
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-blue-500/50 transition-all"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 mb-4">
                <stat.icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color}`} />
              </div>
              <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-x-1">
                <span className="text-4xl md:text-5xl font-bold tabular-nums">{stat.value}</span>
                <span className="text-base md:text-xl text-zinc-400">{stat.suffix}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Today's Focus */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-bold">Today's Focus</h3>
            <p className="text-blue-600 dark:text-blue-400 mt-1 uppercase tracking-wider font-semibold">Push • Pull • Legs • 75 min</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Log */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <p className="uppercase text-sm tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">Activity Log</p>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl gap-4 border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex items-center gap-x-4">
                      <Award className="w-6 h-6 text-amber-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-base">{activity.title}</p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{activity.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-x-8">
                      <div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Weight</p>
                        <p className="font-mono font-bold text-lg">{activity.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">Reps</p>
                        <p className="font-mono font-bold text-lg">{activity.reps}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add New Activity */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-4 uppercase tracking-widest">Log New Activity</p>
                <div className="grid grid-cols-1 gap-3">
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Weight (kg)"
                      value={newWeight}
                      onChange={(e) => setNewWeight(e.target.value)}
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <input
                      type="text"
                      placeholder="Reps"
                      value={newReps}
                      onChange={(e) => setNewReps(e.target.value)}
                      className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent dark:border-zinc-700 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={addActivity}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl flex items-center justify-center gap-x-2 font-bold"
                  >
                    <Plus className="w-5 h-5" /> ADD ACTIVITY
                  </motion.button>
                </div>
              </div>
            </div>

            {/* REWARDS HISTORY */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-x-3">
                  <Trophy className="w-6 h-6 text-amber-500" />
                  <p className="uppercase text-sm tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">Rewards History</p>
                </div>
                
                <div className="bg-blue-600/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-5 py-4 rounded-2xl font-semibold flex items-center justify-between">
                  <span className="text-sm uppercase tracking-tighter">Total Accumulated XP</span>
                  <span className="font-mono text-3xl font-black">{totalXP.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                {rewards.map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-5 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                        <Award className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-semibold">{reward.title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{reward.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-blue-500">+{reward.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CLAIM REWARD BAR */}
        <motion.div className="mt-10 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-x-5">
            <span className="text-5xl">🏆</span>
            <div>
              <p className="font-bold text-xl md:text-2xl">NEW PERSONAL RECORD!</p>
              <p className="opacity-90 text-sm md:text-base">You just smashed your bench press PR by 10 kg</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClaimReward}
            className="bg-white text-black px-8 md:px-10 py-4 md:py-6 rounded-3xl font-bold text-base md:text-lg whitespace-nowrap w-full md:w-auto"
          >
            CLAIM REWARD
          </motion.button>
        </motion.div>

        {/* Reward Toast */}
        <AnimatePresence>
          {showRewardToast && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-x-4 z-50"
            >
              <Trophy className="w-7 h-7" />
              <div>
                <p className="font-bold text-lg">Reward Recorded Successfully!</p>
                <p className="text-blue-100 text-sm">+650 XP • New Badge Unlocked</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GymDashboard;