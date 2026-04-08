"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, User, Calendar, Activity, LogOut, 
  Flame, Target, TrendingUp, Play, Award, Plus, Menu, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';

export default function ColorfulNovaDashboard() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(1);
  const [loggedWorkouts, setLoggedWorkouts] = useState(47);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const progressData = [
    { day: 'Mon', strength: 82, cardio: 65 },
    { day: 'Tue', strength: 85, cardio: 78 },
    { day: 'Wed', strength: 88, cardio: 72 },
    { day: 'Thu', strength: 91, cardio: 85 },
    { day: 'Fri', strength: 89, cardio: 80 },
    { day: 'Sat', strength: 94, cardio: 88 },
    { day: 'Sun', strength: 92, cardio: 82 },
  ];

  const upcomingWorkouts = [
    { id: 1, name: "Upper Body Strength", time: "Tomorrow • 07:00 AM", type: "Strength", duration: "60 min", intensity: "High", emoji: "💪" },
    { id: 2, name: "HIIT Cardio Blast", time: "Friday • 06:30 PM", type: "Cardio", duration: "45 min", intensity: "Very High", emoji: "⚡" },
    { id: 3, name: "Mobility & Recovery", time: "Sunday • 09:00 AM", type: "Recovery", duration: "40 min", intensity: "Low", emoji: "🧘" },
  ];

  const handleLogWorkout = () => {
    setLoggedWorkouts(prev => prev + 1);
    setIsLogModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-['Syne'] overflow-x-hidden">
      {/* Background Neon Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar - Desktop Only */}
      <aside className="w-80 bg-black/40 backdrop-blur-xl border-r border-white/10 p-8 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center gap-4 mb-16">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            <span className="font-black text-3xl tracking-tighter">N</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic">NOVA</h1>
        </div>

        <nav className="flex-1 space-y-3">
          {[
            { label: "Dashboard", icon: <BarChart3 size={24} />, active: true },
            { label: "Profile", icon: <User size={24} /> },
            { label: "Schedule", icon: <Calendar size={24} /> },
            { label: "Progress", icon: <Activity size={24} /> },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ x: 10 }}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer
                ${item.active ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg' : 'hover:bg-white/5 text-zinc-500 hover:text-white'}`}
            >
              {item.icon}
              {item.label}
            </motion.div>
          ))}
        </nav>

        <Button variant="ghost" className="mt-auto justify-start gap-3 text-zinc-500 hover:text-rose-400 font-bold">
          <LogOut size={20} /> Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 max-w-[1600px] mx-auto w-full">
        {/* Mobile Header */}
        <div className="lg:hidden flex justify-between items-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center font-black">N</div>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu />
          </Button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl lg:text-7xl font-black tracking-tighter leading-none"
            >
              LEVEL <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">UP</span>, ALEX.
            </motion.h1>
            <p className="text-zinc-400 mt-4 text-xl font-medium tracking-tight uppercase opacity-60 italic">Daily Protocol: Phase 4 Strength</p>
          </div>

          <Button 
            onClick={() => setIsLogModalOpen(true)}
            className="w-full lg:w-auto rounded-full h-16 px-10 bg-white text-black hover:bg-zinc-200 text-xl font-black shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center gap-3 group transition-all active:scale-95"
          >
            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> LOG WORKOUT
          </Button>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "COMPLETED", value: loggedWorkouts, change: "+12 MONTHLY", icon: <Target className="text-violet-400" />, color: "violet" },
            { title: "BURNED", value: "18.4K", change: "8% INCREASE", icon: <Flame className="text-orange-400" />, color: "orange" },
            { title: "STREAK", value: "26", change: "RECORD BREAKING 🔥", icon: <TrendingUp className="text-emerald-400" />, color: "emerald" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="bg-white/[0.03] backdrop-blur-md border-white/5 rounded-[2rem] hover:bg-white/[0.06] transition-all overflow-hidden relative group">
                <div className={`absolute top-0 left-0 w-1 h-full bg-${stat.color}-500 opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-white/5">{stat.icon}</div>
                    <Badge className="bg-white/10 text-white border-none font-black text-[10px] tracking-widest">{stat.change}</Badge>
                  </div>
                  <h3 className="text-zinc-500 text-xs font-black tracking-[0.2em] uppercase mb-2">{stat.title}</h3>
                  <p className="text-6xl font-black tracking-tighter">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Upcoming Workouts - Visual List */}
          <div className="lg:col-span-7">
            <Card className="bg-white/[0.03] backdrop-blur-md border-white/5 rounded-[2.5rem]">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-3xl font-black tracking-tighter flex items-center gap-4">
                  UPCOMING SESSIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                {upcomingWorkouts.map((workout) => (
                  <motion.div
                    key={workout.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedWorkout(workout.id)}
                    className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4
                      ${selectedWorkout === workout.id ? 'border-violet-500 bg-violet-600/10' : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'}`}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-black/40 rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                        {workout.emoji}
                      </div>
                      <div>
                        <p className="font-black text-2xl tracking-tight">{workout.name}</p>
                        <p className="text-zinc-500 font-bold uppercase text-xs tracking-widest mt-1">{workout.time}</p>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-3 w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                      <Badge className="bg-violet-500/20 text-violet-300 border-none font-bold uppercase">{workout.duration}</Badge>
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{workout.intensity}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Data Visuals */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="bg-white/[0.03] backdrop-blur-md border-white/5 rounded-[2.5rem] overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-xl font-black tracking-tighter flex items-center gap-3">
                  STRENGTH VELOCITY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorStrength" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="day" stroke="#ffffff20" fontSize={12} fontBold="bold" />
                    <YAxis hide />
                    <Tooltip contentStyle={{ backgroundColor: '#000', borderRadius: '16px', border: '1px solid #ffffff10' }} />
                    <Area type="monotone" dataKey="strength" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorStrength)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Coach Insights */}
            <motion.div whileHover={{ y: -5 }} className="cursor-pointer">
              <Card className="bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">⚡</div>
                <CardContent className="p-8">
                  <div className="flex gap-6 items-start relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 flex-shrink-0 border-2 border-white/20 shadow-xl overflow-hidden">
                      <img src="https://i.pravatar.cc/100?u=coach" alt="Coach" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 tracking-tight">COACH INSIGHT</h3>
                      <p className="text-zinc-300 leading-snug font-medium italic">
                        "Your deadlift PR is tracking 12% above projection. Let's spike the volume on Friday's accessory work."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Log Workout Modal */}
      <Dialog open={isLogModalOpen} onOpenChange={setIsLogModalOpen}>
        <DialogContent className="sm:max-w-md bg-black border-white/10 rounded-[2.5rem] backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tighter">COMMIT DATA</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest text-zinc-500">Protocol Name</Label>
              <Input placeholder="e.g. Upper Body" className="h-14 bg-white/5 border-white/10 rounded-2xl font-bold" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-zinc-500">Minutes</Label>
                <Input type="number" defaultValue={60} className="h-14 bg-white/5 border-white/10 rounded-2xl font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest text-zinc-500">Cals</Label>
                <Input type="number" defaultValue={520} className="h-14 bg-white/5 border-white/10 rounded-2xl font-bold" />
              </div>
            </div>
            <Button onClick={handleLogWorkout} className="w-full h-16 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-xl font-black uppercase tracking-tighter shadow-xl shadow-violet-500/20">
              SAVE WORKOUT
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-black z-50 p-8 flex flex-col"
          >
            <div className="flex justify-end mb-12">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X />
              </Button>
            </div>
            <nav className="flex-1 flex flex-col gap-8">
              {["Dashboard", "Profile", "Schedule", "Progress"].map(item => (
                <a key={item} href="#" className="text-5xl font-black tracking-tighter hover:text-violet-500 transition-colors uppercase italic">{item}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}