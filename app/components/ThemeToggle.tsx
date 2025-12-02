"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface ThemeToggleProps {
  variant?: "floating" | "inline";
  className?: string;
}

export function ThemeToggle({ variant = "floating", className }: ThemeToggleProps = {}) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return true;
    }

    const stored = window.localStorage.getItem("theme");
    if (stored) {
      return stored === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const baseClasses =
    variant === "floating"
      ? "fixed right-6 top-6 z-50 flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 p-3 shadow-lg backdrop-blur-sm"
      : "flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-sm text-gray-300 backdrop-blur-sm";

  return (
    <motion.button
      suppressHydrationWarning
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={twMerge(
        baseClasses,
        "transition-all hover:border-cyan-400/50 hover:text-white hover:shadow-cyan-500/20",
        className,
      )}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-slate-300" />
      )}
    </motion.button>
  );
}
