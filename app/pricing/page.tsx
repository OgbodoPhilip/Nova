'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Users, Shield, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for beginners getting started",
    color: "zinc",
    popular: false,
    features: [
      "Unlimited workout logging",
      "Basic progress tracking",
      "5 workout templates",
      "Community access",
      "Mobile app access",
      "Email support"
    ]
  },
  {
    name: "Pro",
    monthlyPrice: 12,
    yearlyPrice: 9,
    description: "Best for dedicated fitness enthusiasts",
    color: "violet",
    popular: true,
    features: [
      "Everything in Starter",
      "AI-powered insights & recommendations",
      "Advanced analytics & beautiful charts",
      "Personalized adaptive training plans",
      "Rest & recovery intelligence",
      "Achievement system + streaks",
      "Priority customer support",
      "Data export (CSV & PDF)"
    ]
  },
  {
    name: "Elite",
    monthlyPrice: 29,
    yearlyPrice: 24,
    description: "For serious athletes & coaches",
    color: "amber",
    popular: false,
    features: [
      "Everything in Pro",
      "2 monthly 1-on-1 coaching calls",
      "Custom program design by experts",
      "Team & gym management tools",
      "API access",
      "Dedicated success manager",
      "Early access to new features",
      "White-glove onboarding"
    ]
  }
];

const faqs = [
  {
    question: "Can I change or cancel my plan anytime?",
    answer: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings. No long-term contracts or hidden fees."
  },
  {
    question: "How does the 14-day free trial work?",
    answer: "When you choose Pro or Elite, you'll get full access to all premium features for 14 days at no cost. You can cancel anytime during the trial and won't be charged."
  },
  {
    question: "Is my payment information secure?",
    answer: "Absolutely. We use Stripe, the same secure payment infrastructure trusted by companies like Spotify, Airbnb, and Amazon."
  },
  {
    question: "Do you offer discounts for teams or gyms?",
    answer: "Yes! Elite plan includes team management features. Contact our sales team for custom pricing tailored for gyms, studios, or corporate wellness programs."
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "Your data remains accessible for 30 days after cancellation. You can export all your workouts, progress, and measurements before your account is archived."
  },
  {
    question: "Is Vitals available on mobile?",
    answer: "Yes. Vitals has a beautiful native mobile experience on both iOS and Android. All features are fully synchronized across web and mobile."
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Hero Header */}
      <div className="pt-32 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(at_center,#6b21a820_0%,transparent_70%)]" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-6">
            <Zap className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-semibold tracking-[2px] text-violet-300">PRICING</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Invest in your strongest self
          </h1>
          <p className="text-2xl text-zinc-400 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. 
            Start free today.
          </p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center items-center gap-4 mb-16">
        <span className={`text-lg font-medium ${!isYearly ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
        
        <Switch 
          checked={isYearly} 
          onCheckedChange={setIsYearly}
          className="data-[state=checked]:bg-violet-600"
        />
        
        <div className="flex items-center gap-2">
          <span className={`text-lg font-medium ${isYearly ? 'text-white' : 'text-zinc-500'}`}>Yearly</span>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs font-bold px-3 py-1">
            SAVE 25%
          </Badge>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? "/month, billed yearly" : "/month";

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-3xl p-10 flex flex-col h-full transition-all duration-500 group
                  ${plan.popular 
                    ? 'bg-gradient-to-b from-violet-950 via-zinc-950 to-black border-2 border-violet-500 shadow-2xl shadow-violet-600/40 scale-[1.04]' 
                    : 'bg-zinc-900 border border-zinc-800 hover:border-zinc-700'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-10 py-2.5 text-sm font-bold tracking-widest shadow-xl">
                      <Star className="w-4 h-4 mr-2" fill="currentColor" /> MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div className="mb-12">
                  <div className={`text-3xl font-bold tracking-tight mb-3 
                    ${plan.color === 'violet' ? 'text-violet-400' : plan.color === 'amber' ? 'text-amber-400' : 'text-zinc-400'}`}>
                    {plan.name}
                  </div>

                  <div className="flex items-baseline">
                    <span className="text-7xl font-bold tracking-tighter">${price}</span>
                    <span className="text-2xl text-zinc-500 ml-3">{period}</span>
                  </div>

                  <p className="text-zinc-400 mt-6 text-lg leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div className="flex-1 space-y-6 mb-12">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`mt-1.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                        ${plan.color === 'violet' ? 'bg-violet-500/20 text-violet-400' : 
                          plan.color === 'amber' ? 'bg-amber-500/20 text-amber-400' : 
                          'bg-emerald-500/20 text-emerald-400'}`}>
                        <Check className="w-4 h-4" strokeWidth={4} />
                      </div>
                      <span className="text-zinc-300 text-[17px] leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="lg"
                  className={`w-full h-16 text-lg font-semibold rounded-2xl transition-all active:scale-[0.985]
                    ${plan.popular 
                      ? 'bg-white text-black hover:bg-zinc-100 shadow-2xl' 
                      : plan.color === 'amber' 
                        ? 'border-2 border-amber-400 hover:bg-amber-400/10 text-amber-400' 
                        : 'border border-zinc-700 hover:bg-zinc-800'}`}
                >
                  {plan.name === "Starter" ? "Get Started Free" : 
                   plan.name === "Pro" ? "Start 14-Day Free Trial" : "Contact Sales"}
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Trust Bar */}
      <div className="bg-black py-16 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-10 text-center md:text-left">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-emerald-400" />
            <div>
              <p className="font-semibold">14-Day Money Back Guarantee</p>
              <p className="text-sm text-zinc-500">Try risk-free. Cancel anytime.</p>
            </div>
          </div>
          
          <div className="h-px w-12 bg-white/20 md:hidden" />
          
          <div className="flex items-center gap-4">
            <Users className="w-10 h-10 text-violet-400" />
            <div>
              <p className="font-semibold">12,450+ happy athletes</p>
              <p className="text-sm text-zinc-500">Join the Vitals community</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Advanced & Colourful */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
          <p className="text-zinc-400 text-xl">Everything you need to know about Vitals pricing</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-8 py-7 flex items-center justify-between text-left hover:bg-zinc-800/50 transition-colors group"
              >
                <span className="text-xl font-medium pr-8">{faq.question}</span>
                <ChevronDown 
                  className={`w-6 h-6 text-violet-400 transition-transform duration-300 flex-shrink-0
                    ${openFaq === index ? 'rotate-180' : ''}`} 
                />
              </button>

              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-zinc-400 text-lg leading-relaxed border-t border-zinc-800">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-zinc-400 text-lg">Still have questions?</p>
          <Button 
            variant="outline" 
            className="mt-4 border-violet-500 text-violet-400 hover:bg-violet-500/10 rounded-full px-10 h-14"
          >
            Contact Our Support Team
          </Button>
        </div>
      </div>
    </div>
  );
}