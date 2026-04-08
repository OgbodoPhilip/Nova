"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- React Icons Imports ---
import { FaGithub, FaGoogle, FaArrowRight } from "react-icons/fa6";
import { FiZap, FiCheckCircle } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
});

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("User Data:", data);
    toast.success("Account created! Redirecting to dashboard...");
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE: Brand Reinforcement */}
      <div className="hidden lg:flex w-1/2 bg-primary p-12 flex-col justify-between text-primary-foreground relative overflow-hidden">
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <FiZap className="w-8 h-8 fill-current" />
            <span className="text-2xl font-bold tracking-tighter">nova</span>
          </Link>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-extrabold leading-tight mb-6"
          >
            Your journey to <br /> peak performance <br /> starts here.
          </motion.h2>
          <ul className="space-y-4">
            {[
              "Real-time nova Tracking",
              "Expert Coaching Access",
              "Advanced Analytics",
            ].map((text, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-lg opacity-90"
              >
                <FiCheckCircle className="w-5 h-5 text-green-400" /> {text}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-black/10 rounded-full blur-3xl" />

        <p className="relative z-10 text-sm opacity-70">
          © 2026 nova Inc. Join 50k+ active users today.
        </p>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an account
            </h1>
            <p className="text-muted-foreground mt-2">
              Already have one?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="rounded-xl h-12 gap-2">
              <FaGoogle className="w-4 h-4" /> Google
            </Button>
            <Button variant="outline" className="rounded-xl h-12 gap-2">
              <FaGithub className="w-4 h-4" /> GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-muted-foreground">
              <span className="bg-background px-2">Or continue with email</span>
            </div>
          </div>

          {/* Core Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="John Doe"
                className={`h-12 rounded-xl bg-muted/50 border-none ${errors.name ? "ring-2 ring-destructive" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="name@example.com"
                className="h-12 rounded-xl bg-muted/50 border-none"
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl bg-muted/50 border-none"
              />
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-md font-bold group shadow-lg shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Join nova"}
              <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
            By clicking continue, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
