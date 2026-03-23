"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LiquidGlassCard } from "./LiquidGlassCard";
import { glassItemVariants } from "./LiquidGlassMotion";

interface LiquidGlassItemProps
  extends Omit<React.ComponentProps<typeof LiquidGlassCard>, "children"> {
  children: React.ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  rowSpan?: 1 | 2 | 3;
  className?: string;
}

export function LiquidGlassItem({
  children,
  colSpan = 1,
  rowSpan = 1,
  className,
  ...cardProps
}: LiquidGlassItemProps) {
  return (
    <motion.div
      variants={glassItemVariants}
      className={cn(
        colSpan === 2 && "md:col-span-2",
        colSpan === 3 && "md:col-span-3",
        colSpan === 4 && "md:col-span-4",
        colSpan === 5 && "md:col-span-5",
        colSpan === 6 && "md:col-span-6",
        colSpan === 7 && "md:col-span-7",
        colSpan === 8 && "md:col-span-8",
        colSpan === 9 && "md:col-span-9",
        colSpan === 10 && "md:col-span-10",
        colSpan === 11 && "md:col-span-11",
        colSpan === 12 && "md:col-span-12",
        rowSpan === 2 && "md:row-span-2",
        rowSpan === 3 && "md:row-span-3",
        className
      )}
    >
      <LiquidGlassCard {...cardProps} className="h-full w-full">
        {children}
      </LiquidGlassCard>
    </motion.div>
  );
}
