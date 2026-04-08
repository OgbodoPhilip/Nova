"use client";

import * as React from "react";
import {
  Camera,
  MapPin,
  Link as LinkIcon,
  Dumbbell,
  Scale,
  Ruler,
  ShieldCheck,
  Bell,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ProfileView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="relative group">
        <div className="h-48 w-full bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-3xl overflow-hidden border">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>
        <div className="absolute -bottom-12 left-8 flex items-end gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl border-4 border-background bg-muted overflow-hidden shadow-xl">
              <img
                src="https://i.pravatar.cc/150?u=nova-user"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 rounded-xl shadow-lg h-8 w-8"
            >
              <Camera size={14} />
            </Button>
          </div>
          <div className="pb-4">
            <h2 className="text-3xl font-bold tracking-tight">Alex Rivera</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin size={14} /> New York, USA •{" "}
              <span className="text-primary font-bold">Elite Member</span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
        {/* 2. Left Column: Identity & Bio (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-2 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg">Public Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Short Bio</Label>
                <Textarea
                  placeholder="Tell the community about your fitness journey..."
                  className="rounded-xl bg-muted/30 border-none resize-none h-24"
                  defaultValue="Training for my first marathon. Focused on high-volume strength and mobility. 🏃‍♂️💨"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Instagram Handle</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="@username"
                      className="pl-10 rounded-xl bg-muted/30 border-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <Input
                    placeholder="nova.app/alex"
                    className="rounded-xl bg-muted/30 border-none"
                  />
                </div>
              </div>
              <Button className="rounded-xl px-8 font-bold shadow-lg shadow-primary/10">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck size={18} className="text-primary" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y">
              {[
                {
                  icon: Moon,
                  label: "Dark Mode",
                  desc: "Toggle between light and dark themes.",
                  checked: true,
                },
                {
                  icon: Bell,
                  label: "Push Notifications",
                  desc: "Get reminded about your workout schedule.",
                  checked: false,
                },
                {
                  icon: Dumbbell,
                  label: "Public Workouts",
                  desc: "Let others see your activity feed.",
                  checked: true,
                },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-6">
                  <div className="flex gap-4">
                    <pref.icon className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {pref.desc}
                      </p>
                    </div>
                  </div>
                  <Switch checked={pref.checked} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 3. Right Column: nova & Stats (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 rounded-3xl bg-primary/5 border-primary/20">
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <Scale className="text-primary w-6 h-6" />
                <span className="text-2xl font-bold">78.4 kg</span>
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Weight
                </span>
              </CardContent>
            </Card>
            <Card className="border-2 rounded-3xl bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-6 flex flex-col items-center gap-2">
                <Ruler className="text-blue-500 w-6 h-6" />
                <span className="text-2xl font-bold">182 cm</span>
                <span className="text-xs font-bold uppercase text-muted-foreground">
                  Height
                </span>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg italic">Body Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <p className="text-xs font-bold text-muted-foreground uppercase">
                  Target Weight
                </p>
                <p className="text-sm font-bold">75 kg</p>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  className="h-full bg-primary"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center">
                3.4kg to go until your goal! 🔥
              </p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full h-12 rounded-2xl border-2 font-bold text-destructive hover:bg-destructive/10"
          >
            Log Out Account
          </Button>
        </div>
      </div>
    </div>
  );
}
