"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Plus, Upload, User, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Initial static data
const initialTestimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marathon Runner",
    content: "nova changed how I track my recovery. The visual data is incredibly intuitive.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    rating: 5,
    color: "from-orange-400 to-rose-400",
  },
  {
    name: "Marcus Chen",
    role: "Weightlifter",
    content: "The best workout logger I've used. Clean, fast, and the Cmd+K shortcut is a breeze.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    rating: 5,
    color: "from-blue-400 to-indigo-500",
  },
];

export default function FullyInteractiveTestimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  
  // State for form data and image preview
  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection and conversion to Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set preview as Base64 string
      };
      reader.readAsDataURL(file); // Convert file to Data URL
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colors = ["from-purple-400 to-fuchsia-500", "from-emerald-400 to-cyan-500", "from-yellow-400 to-orange-500"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newEntry = {
      ...formData,
      // If user uploaded a photo, use it. Otherwise, generate a DiceBear fallback.
      avatar: imagePreview || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || Date.now()}`,
      color: randomColor,
    };

    setTestimonials([newEntry, ...testimonials]);
    
    // Reset Form
    setFormData({ name: "", role: "", content: "", rating: 5 });
    setImagePreview(null);
    setShowForm(false);
  };

  return (
    <section className="relative py-24 bg-[#0A0A0A] min-h-screen overflow-hidden text-white font-['Syne']">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight  ">
            Community Voices
          </h2>
          
          <motion.button whileTap={{scale:0.85}}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 mx-auto px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all border border-white/10 group"
          >
            <Plus className={`w-5 h-5 transition-transform ${showForm ? 'rotate-45' : ''}`} />
            <span className="font-bold uppercase tracking-widest text-sm">{showForm ? "Cancel" : "Drop a Review"}</span>
          </motion.button>
        </div>

        {/* Dynamic Form with Image Upload */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="max-w-xl mx-auto mb-16 overflow-hidden"
            >
              <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col gap-5">
                
                {/* Image Upload Area */}
                <div className="flex items-center gap-4">
                  <div className={`relative w-16 h-16 rounded-full overflow-hidden flex items-center justify-center border-2 ${imagePreview ? 'border-orange-500' : 'border-dashed border-white/20'}`}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-white/20" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm font-bold hover:bg-white/15"
                    >
                      <Upload className="w-4 h-4" />
                      {imagePreview ? "Change Photo" : "Upload Photo"}
                    </button>
                    {imagePreview && (
                        <button type="button" onClick={() => setImagePreview(null)} className="text-xs text-rose-500 font-bold text-left hover:underline">Remove</button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageChange} 
                      accept="image/*" 
                      className="hidden" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                  <input
                    required
                    placeholder="Role (e.g. Pro Runner)"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
                <textarea
                  required
                  placeholder="Tell us about your nova journey..."
                  rows={3}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="bg-white/5 border border-white/10 p-3 rounded-xl focus:outline-none focus:border-orange-500"
                />
                <div className="flex justify-between items-center">
                   <div className="flex gap-2">
                    {[1,2,3,4,5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`w-6 h-6 cursor-pointer ${star <= formData.rating ? 'fill-orange-400 text-orange-400' : 'text-white/20'}`}
                      />
                    ))}
                   </div>
                   <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-500/20">
                      Send Review <Send className="w-4 h-4" />
                   </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name + i}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -30 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="break-inside-avoid"
              >
                <Card className="relative border-none bg-white/5 backdrop-blur-md overflow-hidden group shadow-xl shadow-black/30">
                 
                 
                  
                  <CardContent className="p-8 relative">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className={`w-3 h-3 ${index < t.rating ? "fill-orange-400 text-orange-400" : "fill-white/10 text-transparent"}`} />
                      ))}
                    </div>
                    
                    <p className="text-gray-200 mb-8 italic leading-relaxed text-sm">&ldquo;{t.content}&rdquo;</p>
                    
                    <div className="flex items-center gap-4">
                      {/* Avatar Frame with custom image support */}
                      <div className={`p-[1.5px] rounded-full bg-red-500 ${t.color}`}>
                        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-900 border-2 border-gray-900">
                          <img src={t.avatar} className="w-full h-full object-cover" alt={t.name} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white leading-none mb-1">{t.name}</h4>
                        <p className={`text-[10px] font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r text-white`}>{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}