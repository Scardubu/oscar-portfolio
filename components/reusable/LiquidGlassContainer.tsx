"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { glassContainerVariants } from "./LiquidGlassMotion";

interface LiquidGlassContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
}

export function LiquidGlassContainer({
  children,
  className,
  as = "div",
}: LiquidGlassContainerProps) {
  const Tag = motion(as as any);

  return (
    <Tag
      variants={glassContainerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={cn("w-full", className)}
    >
      {children}
    </Tag>
  );
}
