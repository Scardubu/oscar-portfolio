"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassLevel = "full" | "medium" | "light";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  chromatic?: boolean;
  level?: GlassLevel;
  as?: React.ElementType;
}

export function GlassCard({
  children,
  className,
  hover = true,
  chromatic = false,
  level = "full",
  as: Tag = "div",
}: GlassCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => el.classList.remove("shimmer-active"), 1400);
    return () => clearTimeout(t);
  }, []);

  const MotionTag = motion(Tag as "div");

  return (
    <MotionTag
      ref={ref}
      whileHover={hover ? { scale: 1.01, translateY: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        hover ? "glass-card card-depth" : "glass-no-hover",
        `glass-${level}`,
        chromatic && "glass-chromatic",
        className
      )}
    >
      {children}
    </MotionTag>
  );
}