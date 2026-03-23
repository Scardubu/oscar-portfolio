"use client";

import * as React from "react";
import {
  forwardRef,
  type ComponentPropsWithRef,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  glassFloatMotion,
  glassHoverMotion,
  glassTapMotion,
} from "./LiquidGlassMotion";

type Variant = "default" | "cyan" | "violet" | "teal" | "float";

interface LiquidGlassCardOwnProps {
  variant?: Variant;
  hover?: boolean;
  depth?: boolean;
  motion?: boolean;
  className?: string;
  children: ReactNode;
  as?: ElementType;
}

type LiquidGlassCardProps<T extends ElementType = "div"> =
  LiquidGlassCardOwnProps &
    Omit<ComponentPropsWithRef<T>, keyof LiquidGlassCardOwnProps>;

const variantClass: Record<Variant, string> = {
  default: "liquid-glass",
  cyan: "liquid-glass liquid-glass-cyan",
  violet: "liquid-glass liquid-glass-violet",
  teal: "liquid-glass liquid-glass-teal",
  float: "liquid-glass liquid-glass-float",
};

function LiquidGlassCardInner<T extends ElementType = "div">(
  {
    as,
    variant = "default",
    hover = true,
    depth = false,
    motion: enableMotion = true,
    className,
    children,
    ...rest
  }: LiquidGlassCardProps<T>,
  ref: React.ForwardedRef<any>
) {
  const reducedMotion = useReducedMotion();
  const Tag = as ?? "div";

  const classes = cn(
    variantClass[variant],
    hover && !depth && "liquid-glass-hover",
    depth && "liquid-glass-depth-shell",
    className
  );

  const content = depth ? (
    <div className="liquid-depth-layer h-full w-full rounded-[inherit] p-6 md:p-8">
      {children}
    </div>
  ) : (
    children
  );

  const sharedProps = {
    ref,
    className: classes,
    ...(rest as Record<string, unknown>),
  };

  if (enableMotion && !reducedMotion) {
    const MotionTag = motion(Tag as any);

    return (
      <MotionTag
        {...sharedProps}
        {...(variant === "float" ? glassFloatMotion : undefined)}
        {...(hover && !depth ? glassHoverMotion : undefined)}
        {...(hover && !depth ? glassTapMotion : undefined)}
      >
        {content}
      </MotionTag>
    );
  }

  return (
    // @ts-expect-error polymorphic ref typing
    <Tag {...sharedProps}>
      {content}
    </Tag>
  );
}

export const LiquidGlassCard = forwardRef(LiquidGlassCardInner) as <
  T extends ElementType = "div"
>(
  props: LiquidGlassCardProps<T> & { ref?: React.ForwardedRef<any> }
) => React.ReactElement;

LiquidGlassCard.displayName = "LiquidGlassCard";