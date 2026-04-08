'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Smartphone, 
  Infinity 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Intelligent Progress Tracking",
    description: "AI-powered insights that analyze your strength gains, body composition, and recovery trends over time.",
    gradient: "from-violet-500 to-fuchsia-500",
    stats: "92% faster progress visibility"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Personalized Training Plans",
    description: "Dynamic workout programs that adapt based on your goals, recovery status, and performance data.",
    gradient: "from-blue-500 to-cyan-500",
    stats: "Smart progression algorithms"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Advanced Analytics Dashboard",
    description: "Beautiful, real-time visualizations of volume, strength curves, muscle balance, and more.",
    gradient: "from-emerald-500 to-teal-500",
    stats: "15+ premium charts"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Rest & Recovery Intelligence",
    description: "Track sleep, HRV, stress, and readiness score to optimize your training schedule.",
    gradient: "from-amber-500 to-orange-500",
    stats: "Avoid overtraining"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Community & Accountability",
    description: "Train with friends, join challenges, and get motivated by a supportive fitness community.",
    gradient: "from-rose-500 to-pink-500",
    stats: "Global leaderboards"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Achievement System",
    description: "Earn badges, milestones, and rewards as you hit PRs and maintain consistency.",
    gradient: "from-purple-500 to-indigo-500",
    stats: "100+ achievements"
  }
];

const techHighlights = [
  { label: "Built with Next.js 15", desc: "App Router + React 19" },
  { label: "Real-time Sync", desc: "Supabase + WebSockets" },
  { label: "AI Insights", desc: "Powered by advanced models" },
  { label: "End-to-end Encrypted", desc: "Your data stays private" },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-medium tracking-widest">NEXT-GENERATION FITNESS OS</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Everything you need to<br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              transform your body
            </span>
          </h1>

          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
            Powerful tools. Beautiful design. Real results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold bg-white text-black hover:bg-zinc-100">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-full text-lg border-white/20 hover:bg-white/5">
              Watch 2-min Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-zinc-900 border border-white/10 rounded-3xl p-10 hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-8 text-white shadow-xl shadow-black/50`}>
                {feature.icon}
              </div>

              <h3 className="text-3xl font-semibold tracking-tight mb-4">
                {feature.title}
              </h3>

              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                {feature.description}
              </p>

              <div className="text-sm font-mono text-emerald-400 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                {feature.stats}
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl -z-10" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Advanced Tech Section */}
      <div className="bg-black py-24 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">Built for serious athletes</h2>
            <p className="text-zinc-400 text-xl">Enterprise-grade technology wrapped in beautiful design</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techHighlights.map((tech, i) => (
              <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors">
                <div className="text-violet-400 mb-4">
                  <Infinity className="w-9 h-9" />
                </div>
                <h4 className="font-semibold text-xl mb-2">{tech.label}</h4>
                <p className="text-zinc-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-28 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">💪</div>
          <h2 className="text-5xl font-bold tracking-tighter mb-6">
            Ready to level up?
          </h2>
          <p className="text-2xl text-zinc-400 mb-10">
            Join thousands of athletes already transforming with Vitals.
          </p>
          
          <Button size="lg" className="h-16 px-12 rounded-full text-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:brightness-110 transition-all">
            Get Started — It's Free
          </Button>
          
          <p className="text-zinc-500 mt-6 text-sm">No credit card required • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}