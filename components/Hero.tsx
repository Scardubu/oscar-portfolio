"use client";
// components/Hero.tsx — Authority Engine
// ─────────────────────────────────────────────────────────────────────────────
// Framer Motion powered:
//   • useScroll + useTransform: orbs + retro-grid parallax on scroll
//   • spring physics: kinetic word-reveal headline
//   • whileInView: metric band countUp gate
//   • useReducedMotion: full motion opt-out
//   • AnimatePresence: scroll indicator fade
// ─────────────────────────────────────────────────────────────────────────────

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { HERO, HERO_METRICS } from "@/lib/portfolio-data";
import {
  staggerContainer,
  fadeDown,
  fadeUp,
  scaleIn,
  kineticWord,
  staggerFast,
  metricEntry,
  springs,
  parallaxRange,
} from "@/lib/motion";

// ── Kinetic Headline — spring word-by-word reveal ─────────────────────────────

function KineticHeadline({
  text,
  gradient = "kinetic",
  className,
  delayOffset = 0,
}: {
  text:          string;
  gradient?:     "kinetic" | "accent" | "fintech";
  className?:    string;
  delayOffset?:  number;
}) {
  const words = text.split(" ");
  const gradientClass =
    gradient === "kinetic"
      ? "text-gradient-kinetic"
      : gradient === "accent"
      ? "text-gradient-accent"
      : "text-gradient-fintech";

  return (
    <motion.span
      className={cn("inline-block", gradientClass, className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.18em]">
          <motion.span
            className="inline-block"
            variants={kineticWord}
            custom={i}
            style={{ display: "inline-block" }}
            transition={{
              ...springs.kinetic,
              delay: delayOffset + i * 0.06,
            }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

// ── Metric cell — whileInView countUp ────────────────────────────────────────

function MetricCell({
  value,
  suffix,
  label,
  type,
  index,
}: {
  value:  number;
  suffix: string;
  label:  string;
  type:   "live" | "documented" | "backtested" | "snapshot";
  index:  number;
}) {
  const [started, setStarted] = useState(false);
  const isQualitative = value === 0 && suffix === "";
  const count = useCountUp({
    target:   value,
    decimals: value % 1 !== 0 ? 1 : 0,
    delay:    index * 100,
    start:    started,
  });

  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-1.5 px-4 py-4",
        "border-r border-white/[0.06] last:border-r-0"
      )}
      variants={metricEntry}
      custom={index}
      transition={{ ...springs.bouncy, delay: index * 0.1 }}
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.5 }}
    >
      <span
        className={cn(
          "text-gradient-accent font-mono leading-none",
          isQualitative ? "text-sm font-semibold" : "text-metric tabular-nums"
        )}
        aria-live="polite"
        aria-label={isQualitative ? label : `${value}${suffix} ${label}`}
      >
        {isQualitative ? label : `${count}${suffix}`}
      </span>
      {!isQualitative && (
        <span className="text-caption text-muted text-center leading-tight">
          {label}
        </span>
      )}
      {type === "live" && (
        <span className="relative inline-flex h-1.5 w-1.5" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--metric-live)] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--metric-live)]" />
        </span>
      )}
    </motion.div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth spring-wrapped scroll progress
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  // Orb transforms
  const cyanY = useTransform(smoothProgress, [0, 1], ["0%", "-22%"]);
  const violetY = useTransform(smoothProgress, [0, 1], ["0%", "-14%"]);
  const gridY = useTransform(smoothProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);
  const scanlineY = useTransform(scrollYProgress, [0, 1], ["-100vh", "100vh"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={cn(
        "relative min-h-[100dvh] flex flex-col justify-center",
        "pt-24 pb-16 overflow-hidden",
        "dopamine-bg"
      )}
      aria-labelledby="hero-heading"
    >
      {/* ── Retro grid floor — scroll parallax ── */}
      <motion.div
        className="retro-grid-perspective pointer-events-none absolute inset-x-0 bottom-0 h-72"
        style={prefersReduced ? {} : { y: gridY }}
        aria-hidden="true"
      />

      {/* ── Cyan orb — top-left, faster parallax ── */}
      <motion.div
        className="pointer-events-none absolute top-[8%] left-[4%] w-[44vw] h-[44vw] max-w-[640px] max-h-[640px]"
        style={
          prefersReduced
            ? {}
            : {
                y: cyanY,
                background:
                  "radial-gradient(ellipse, rgba(0,217,255,0.14) 0%, transparent 65%)",
                filter: "blur(52px)",
              }
        }
        aria-hidden="true"
      />

      {/* ── Violet orb — bottom-right, slower parallax ── */}
      <motion.div
        className="pointer-events-none absolute bottom-[4%] right-[4%] w-[38vw] h-[38vw] max-w-[540px] max-h-[540px]"
        style={
          prefersReduced
            ? {}
            : {
                y: violetY,
                background:
                  "radial-gradient(ellipse, rgba(124,58,237,0.11) 0%, transparent 65%)",
                filter: "blur(52px)",
              }
        }
        aria-hidden="true"
      />

      {/* ── Scanline — scroll-driven CRT sweep ── */}
      {!prefersReduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 opacity-[0.03]"
          style={{
            y: scanlineY,
            height: "2px",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.8) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        style={prefersReduced ? {} : { y: contentY }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left — text column */}
          <motion.div
            className="flex flex-col gap-6 max-w-3xl"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Location + availability badges */}
            <motion.div
              className="inline-flex items-center gap-2 self-start flex-wrap"
              variants={fadeDown}
            >
              <span className="badge badge-primary">{HERO.location}</span>
              <motion.span
                className="badge"
                style={{
                  background: "var(--accent-secondary-dim)",
                  color: "var(--accent-secondary-text)",
                  borderColor: "var(--accent-secondary-border)",
                }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springs.bouncy, delay: 0.3 }}
              >
                {HERO.availability}
              </motion.span>
            </motion.div>

            {/* Kinetic headline */}
            <motion.h1
              id="hero-heading"
              className="text-kinetic overflow-hidden"
              variants={staggerFast}
            >
              <KineticHeadline text="Full-Stack ML" gradient="kinetic" />
              <br />
              <KineticHeadline
                text="Engineer."
                gradient="accent"
                delayOffset={0.18}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-subhead text-secondary max-w-xl"
              variants={fadeUp}
              transition={{ ...springs.default, delay: 0.35 }}
            >
              I architect production AI systems that distill frontier intelligence into elegant, trusted tools people rely on every single day.{" "}
              <strong className="text-[var(--text-primary)] font-semibold">
                SabiScore
              </strong>{" "}
              powers real-time insights that sharpen every decision — engineered for seamless flow and unwavering performance at global scale.
              From Nigeria to audiences worldwide, I fuse cutting-edge AI research with intuitive product mastery.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3"
              variants={fadeUp}
              transition={{ ...springs.default, delay: 0.45 }}
            >
              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.03, y: -1 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springs.snappy}
              >
                <Link href={HERO.cta.primary.href} className="btn btn-primary">
                  {HERO.cta.primary.label}
                </Link>
              </motion.div>

              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.02 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springs.snappy}
              >
                <a
                  href={HERO.cta.secondary.href}
                  download
                  className="btn btn-ghost"
                >
                  {HERO.cta.secondary.label}
                </a>
              </motion.div>

              <motion.div
                whileHover={prefersReduced ? {} : { scale: 1.02 }}
                whileTap={prefersReduced ? {} : { scale: 0.97 }}
                transition={springs.snappy}
              >
                <Link href={HERO.cta.scroll.href} className="btn btn-outline">
                  {HERO.cta.scroll.label}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — headshot */}
          <motion.div
            className="hidden lg:block relative"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ ...springs.liquid, delay: 0.5 }}
          >
            <motion.div
              className="liquid-glass liquid-glass-cyan rounded-[var(--radius-3xl)] overflow-hidden w-[280px] h-[340px]"
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      scale: 1.02,
                      boxShadow: "var(--shadow-liquid-3d-hover)",
                    }
              }
              transition={springs.liquid}
            >
              <Image
                src="/headshot.webp"
                alt="Oscar Ndugbu — Full-Stack ML Engineer based in Nigeria"
                fill
                sizes="280px"
                className="object-cover object-center"
                priority
              />
            </motion.div>

            {/* Floating metric badge */}
            <motion.div
              className="liquid-glass liquid-glass-teal absolute -bottom-4 -left-8 px-4 py-3 rounded-2xl"
              initial={{ opacity: 0, x: 16, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ...springs.liquid, delay: 0.9 }}
              animate-continuously={
                prefersReduced
                  ? undefined
                  : {
                      y: [0, -6, 0],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <p className="text-caption text-muted">Reliability</p>
              <p className="text-metric text-gradient-fintech font-mono">
                Always-On
              </p>
            </motion.div>

            {/* Second floating badge — top right */}
            <motion.div
              className="liquid-glass liquid-glass-cyan absolute -top-4 -right-6 px-3 py-2 rounded-xl"
              initial={{ opacity: 0, x: -12, y: 8 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ ...springs.liquid, delay: 1.1 }}
            >
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--metric-live)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--metric-live)]" />
                </span>
                <p className="text-caption text-[var(--metric-live)]">
                  Global Impact
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Metrics band ── */}
        <motion.div
          className="mt-16 liquid-glass liquid-glass-cyan rounded-[var(--radius-2xl)] overflow-hidden noise-overlay"
          variants={staggerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {HERO_METRICS.map((m, i) => (
              <MetricCell
                key={m.label}
                value={m.value}
                suffix={m.suffix}
                label={m.label}
                type={m.type}
                index={i}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="text-caption text-muted tracking-widest uppercase text-[0.6rem]">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[var(--accent-primary)] to-transparent"
          animate={prefersReduced ? {} : { scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
