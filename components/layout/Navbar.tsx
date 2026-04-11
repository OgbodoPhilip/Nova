'use client';

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Zap, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
 { name: "Dashboard", href: "/dashboard" },
  { name: "Features", href: "/feature" },
  { name: "Workouts", href: "/workouts" },
  { name: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);
  const pathname = usePathname();

  // Mobile Sheet Control
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-close mobile menu when route changes
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-2 md:py-2 transition-all duration-500">
      <nav
        className={cn(
          "mx-auto max-w-7xl transition-all duration-500",
          "rounded-3xl border flex items-center justify-between px-5 md:px-8 py-3",
          isScrolled
            ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl border-white/20 dark:border-zinc-800 shadow-xl shadow-indigo-500/10"
            : "bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-transparent"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-10">
          <motion.div
            whileHover={{ rotate: -12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/40"
          >
            <Zap className="w-5 h-5 text-white" fill="currentColor" />
          </motion.div>
          <div className="font-black text-3xl tracking-tighter">
            <span className="text-slate-900 dark:text-white">nova</span>
            <span className="text-indigo-600 dark:text-indigo-400">.</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/30 dark:border-zinc-700/50 relative shadow-inner"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              onMouseEnter={() => setHoveredPath(item.href)}
              className={cn(
                "relative px-7 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full",
                isActive(item.href)
                  ? "text-white"
                  : "text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-white"
              )}
            >
              <motion.div whileTap={{scale:0.8}} className="relative z-10">{item.name}</motion.div>

              {isActive(item.href) && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full shadow-lg shadow-indigo-500/30"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}

              <AnimatePresence>
                {hoveredPath === item.href && !isActive(item.href) && (
                  <motion.div
                    layoutId="hoverGlow"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="absolute inset-0 bg-indigo-400/10 dark:bg-indigo-500/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>

        {/* Right Side - Theme Toggler + Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-white/30 dark:border-zinc-700"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full sm:w-96 border-none bg-white dark:bg-zinc-950 p-0 [&>button:first-of-type]:hidden"
              >
                <div className="h-full flex flex-col">
                  {/* Mobile Header - Logo + Close Button */}
                  <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-zinc-800">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 p-2.5 rounded-2xl">
                        <Zap className="w-5 h-5 text-white" fill="currentColor" />
                      </div>
                      <span className="font-black text-3xl tracking-tighter">
                        nova<span className="text-indigo-600">.</span>
                      </span>
                    </div>

                    {/* Custom Close Button - without asChild */}
                    <SheetClose className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
                      <X className="w-8 h-8 text-slate-900 dark:text-white" />
                    </SheetClose>
                  </div>

                  {/* Navigation Links */}
                  <nav className="flex-1 p-8 space-y-8">
                    {navItems.map((item) => (
                      <SheetClose key={item.name}>
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between text-3xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {item.name}
                          <ArrowRight className="w-7 h-7 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Bottom Actions */}
                  <div className="p-8 border-t border-slate-100 dark:border-zinc-800 space-y-4">
                    <Link href="/signup" onClick={() => setOpen(false)}>
                      <Button className="w-full h-16 rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-lg font-semibold">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full mt-3 h-16 rounded-3xl text-lg font-semibold border-2"
                      >
                        Log in
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-6">
            <motion.div whileTap={{scale:0.9}}>

           
            <Link
              href="/login"
              className="text-lg font-medium text-slate-600 dark:text-white hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Login
            </Link>

             </motion.div>


            <motion.div whileTap={{scale:0.9}}>

            
            <Link href="/signup">
              <Button 
                size="lg"
                className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/30 border-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span  className="relative flex items-center gap-2 font-semibold">
                  Get Started <Sparkles className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            </motion.div>
          </div>

          {/* Theme Toggler */}
         
          <AnimatedThemeToggler />
         
        </div>
      </nav>
    </header>
  );
}