"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

// --- React Icons Imports ---
import { FiZap, FiEye, FiEyeOff, FiLoader, FiLock } from "react-icons/fi";
import { FaGithub, FaGoogle } from "react-icons/fa6";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    // Simulate Production Auth Latency
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Login Attempt:", data);
    toast.success("Welcome back, Athlete! ⚡");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* RIGHT SIDE: The Form */}
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-center p-8 lg:p-24">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="text-muted-foreground text-sm">
              Enter your credentials to access your nova.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-2 hover:bg-muted transition-all"
            >
              <FaGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border-2 hover:bg-muted transition-all"
            >
              <FaGithub className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or email
              </span>
            </div>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 rounded-xl bg-muted/30 border-2 focus:border-primary transition-all"
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl bg-muted/30 border-2 pr-12 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl font-bold text-md shadow-lg shadow-primary/20"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-bold hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>

      {/* LEFT SIDE: Visual Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative p-12 overflow-hidden justify-center items-center">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,#3b82f6_0%,transparent_50%)] animate-pulse" />

        <div className="relative z-10 max-w-lg text-center space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex p-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <FiZap className="w-12 h-12 text-primary fill-current" />
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-white tracking-tight">
              Consistent progress, <br /> visually mapped.
            </h2>
            <p className="text-zinc-400 text-lg">
              "The best way to predict your future health is to track it today."
            </p>
          </div>

          <div className="pt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Streak", val: "12 Days" },
              { label: "Goal", val: "85%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-md"
              >
                <p className="text-zinc-500 text-xs uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-white font-bold text-xl">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
