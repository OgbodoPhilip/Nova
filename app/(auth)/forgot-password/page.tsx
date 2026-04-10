'use client';

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Zap, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  Send 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: any) => {
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1800));
    console.log("Reset link sent to:", data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tighter text-zinc-900 dark:text-white">
              nova
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-3xl p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="request"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Forgot Password?
                  </h1>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                    No worries! Enter your email and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-400">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                      <Input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="h-14 pl-11 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 focus:border-indigo-500 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-500 ml-1">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 font-semibold text-lg text-white shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.985]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Sending reset link...
                      </>
                    ) : (
                      <>
                        Send Reset Link
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                    Check your inbox
                  </h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed">
                    We've sent a password reset link to your email.<br />
                    Please check your spam folder if you don't see it.
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-14 rounded-2xl border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setIsSubmitted(false)}
                >
                  Didn't receive the email? Try again
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}