import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassBentoProps {
  children: React.ReactNode;
  className?: string;
}

export function LiquidGlassBento({
  children,
  className,
}: LiquidGlassBentoProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
