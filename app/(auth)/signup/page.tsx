'use client';

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
import { FiZap, FiLoader } from "react-icons/fi";
import { FaGithub, FaGoogle, FaArrowRight } from "react-icons/fa6";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("User Data:", data);
    toast.success("Account created successfully! Welcome to nova ⚡");
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg">
            <FiZap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Create your account
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-lg">
            Join thousands of athletes on nova
          </p>
        </div>

        {/* Social Signup Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
          >
            <FaGoogle className="h-5 w-5" />
            Google
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-2xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center justify-center gap-3"
          >
            <FaGithub className="h-5 w-5" />
            GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-zinc-50 dark:bg-zinc-950 px-4 text-sm text-zinc-500">
              or continue with email
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-400">
              Full Name
            </Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="John Doe"
              className="h-14 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:border-indigo-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-400">
              Email address
            </Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@example.com"
              className="h-14 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:border-indigo-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-400">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-14 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 focus:border-indigo-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 font-semibold text-lg text-white shadow-xl shadow-indigo-500/30 transition-all active:scale-[0.985] flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <FiLoader className="mr-3 h-5 w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <FaArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center mt-8 text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

        {/* Terms */}
        <p className="text-center mt-6 text-xs text-zinc-500 dark:text-zinc-500 px-6 leading-relaxed">
          By creating an account, you agree to our{" "}
          <Link href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-zinc-700 dark:hover:text-zinc-300">
            Privacy Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}