"use client";

import { cn } from "@/lib/utils";

interface LiquidGlassRefractionSVGProps {
  className?: string;
}

export function LiquidGlassRefractionSVG({
  className,
}: LiquidGlassRefractionSVGProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 640"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      fill="none"
    >
      <defs>
        <linearGradient
          id="hero-refraction-gradient"
          x1="111.5"
          y1="42"
          x2="540.5"
          y2="588"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" stopOpacity="0.72" />
          <stop offset="0.45" stopColor="#00D9FF" stopOpacity="0.58" />
          <stop offset="1" stopColor="#7C3AED" stopOpacity="0.12" />
        </linearGradient>
        <filter
          id="hero-refraction-filter"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.007 0.016"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="B"
          />
          <feGaussianBlur stdDeviation="0.65" />
        </filter>
      </defs>

      <g className="hero-refraction-group" filter="url(#hero-refraction-filter)">
        <circle
          cx="320"
          cy="320"
          r="222"
          className="hero-refraction-stroke"
          stroke="url(#hero-refraction-gradient)"
        />
        <path
          d="M98 364C151 313.5 222.5 286.5 312 283.5C401.5 280.5 474 307.5 530 364"
          className="hero-refraction-stroke"
          stroke="url(#hero-refraction-gradient)"
          strokeLinecap="round"
        />
        <path
          d="M155 174.5C213.5 119.833 283 96 363.5 103C444 110 500.5 149.833 533 222.5"
          className="hero-refraction-stroke"
          stroke="url(#hero-refraction-gradient)"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
