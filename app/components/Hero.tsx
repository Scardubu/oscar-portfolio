"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// PRD Feature 1: Hero Section - "First Impression Credibility Builder"

interface Metric {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

const HERO_METRICS: Metric[] = [
  { value: 8300, suffix: "+", label: "Concurrent Users", decimals: 0 },
  { value: 73.7, suffix: "%", label: "ML Accuracy", decimals: 1 },
  { value: 99.94, suffix: "%", label: "System Uptime", decimals: 2 },
  { value: 150, suffix: "ms", label: "Page Load Time", decimals: 0 },
];

const ROTATING_TECH = [
  "XGBoost",
  "FastAPI",
  "Next.js",
  "Docker",
  "Blockchain",
];

// PRD Hero-002: Animated counter component with Intersection Observer
function CountUpMetric({ metric, inView }: { metric: Metric; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds per PRD
    const steps = 60;
    const increment = metric.value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= metric.value) {
        setCount(metric.value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, metric.value]);

  const displayValue =
    metric.decimals !== undefined
      ? count.toFixed(metric.decimals)
      : Math.floor(count).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <div className="font-mono text-3xl font-semibold text-[var(--accent-primary)] md:text-4xl">
        {displayValue}
        {metric.suffix}
      </div>
      <div className="text-sm text-[var(--text-secondary)] md:text-base">
        {metric.label}
      </div>
    </motion.div>
  );
}

// PRD Hero-003: Rotating text effect cycling through technologies
function RotatingTech() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_TECH.length);
    }, 2000); // Rotate every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={index}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="text-gradient-accent"
    >
      {ROTATING_TECH[index]}
    </motion.span>
  );
}

// PRD Hero-001 to Hero-006: Main Hero component
export function Hero() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  // PRD Hero-004: Smooth scroll to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="bg-gradient-hero relative flex min-h-screen items-center overflow-hidden px-4 py-20 md:px-8 lg:px-16"
      aria-label="Hero section"
    >
      {/* PRD: Split screen layout - text left 60%, visual right 40% on desktop */}
      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[60%_40%] lg:gap-16">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-8"
        >
          {/* PRD Hero-001: Full name, title, tagline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-bold leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl"
            >
              Oscar Ndugbu
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl font-medium text-[var(--text-secondary)] md:text-2xl lg:text-3xl"
            >
              Full-Stack Machine Learning Engineer
            </motion.h2>

            {/* PRD Hero-001: Tagline with rotating tech */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-[var(--text-secondary)] md:text-xl"
            >
              Building AI products that ship—from model to production at scale
              with <RotatingTech />
            </motion.p>
          </div>

          {/* PRD Hero-002: Metrics grid with count-up animation */}
          <motion.div
            ref={metricsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-2 gap-6 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] p-6 md:grid-cols-4 md:gap-8 md:p-8"
          >
            {HERO_METRICS.map((metric, idx) => (
              <CountUpMetric key={idx} metric={metric} inView={metricsInView} />
            ))}
          </motion.div>

          {/* PRD Hero-004: Primary + Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group bg-[var(--accent-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)]/90"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-[var(--accent-primary)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10"
            >
              <Mail className="mr-2 h-4 w-4" />
              Let&apos;s Talk
            </Button>
          </motion.div>

          {/* Subtle link to Skills section */}
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={() => scrollToSection("skills")}
            className="self-start text-sm text-[var(--text-secondary)] underline-offset-4 hover:text-[var(--accent-primary)] hover:underline"
          >
            Explore full skills map
          </motion.button>
        </motion.div>

        {/* Right: Professional headshot */}
        {/* PRD Hero-006: Headshot with hover effect, optimized <50KB WebP */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-[var(--accent-primary)] shadow-2xl shadow-[var(--accent-primary)]/20 transition-transform duration-300 hover:scale-105 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
            <Image
              src="/headshot.webp"
              alt="Oscar Ndugbu - Full-Stack ML Engineer"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            />
          </div>

          {/* Decorative gradient blur */}
          <div className="absolute -z-10 h-[400px] w-[400px] rounded-full bg-gradient-accent opacity-20 blur-3xl" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-8 w-5 rounded-full border-2 border-[var(--accent-primary)]"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mx-auto mt-1 h-2 w-1 rounded-full bg-[var(--accent-primary)]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
