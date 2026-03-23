"use client";
// components/ContactSection.tsx — Conversion Engine
// ─────────────────────────────────────────────────────────────────────────────
// Next.js 15: Server Action via useActionState + useFormStatus
// Framer Motion:
//   • AnimatePresence for success/error state transitions
//   • spring interactions on CTAs
//   • whileInView stagger reveals
// ─────────────────────────────────────────────────────────────────────────────

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useActionState, useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SOCIAL } from "@/lib/portfolio-data";
import {
  submitContactForm,
  initialContactState,
} from "@/app/actions/contact";
import {
  staggerContainer,
  staggerSlow,
  fadeUp,
  fadeLeft,
  fadeRight,
  liquidCard,
  springs,
} from "@/lib/motion";

// ── Inquiry types ─────────────────────────────────────────────────────────────

const INQUIRY_TYPES = [
  "Job opportunity",
  "Consulting / ML project",
  "Collaboration",
  "Other",
] as const;

// ── Engagement paths ──────────────────────────────────────────────────────────

const ENGAGEMENT_PATHS = [
  {
    icon:     "💼",
    title:    "Consulting & Projects",
    desc:     "Custom ML solutions, model deployment, and MLOps implementation",
    cta:      "Discuss Your Project →",
    href:     `mailto:scardubu@gmail.com?subject=Consulting%20Inquiry`,
    accentDim: "var(--accent-primary-dim)",
    accentText: "var(--accent-primary)",
  },
  {
    icon:     "🤝",
    title:    "Technical Partnerships",
    desc:     "Co-founder opportunities, technical advisorship, and strategic collaboration",
    cta:      "Explore Partnership →",
    href:     `mailto:scardubu@gmail.com?subject=Partnership%20Opportunity`,
    accentDim: "var(--accent-secondary-dim)",
    accentText: "var(--accent-secondary)",
  },
  {
    icon:     "🎓",
    title:    "Speaking & Mentorship",
    desc:     "Tech talks, workshops, and mentoring for ML engineers",
    cta:      "Send Invitation →",
    href:     `mailto:scardubu@gmail.com?subject=Speaking%20Inquiry`,
    accentDim: "var(--accent-fintech-dim)",
    accentText: "var(--accent-fintech)",
  },
] as const;

// ── Submit button — reads useFormStatus ───────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus();
  const prefersReduced = useReducedMotion();

  return (
    <motion.button
      type="submit"
      disabled={pending}
      className={cn(
        "btn btn-primary w-full justify-center",
        pending && "opacity-60 cursor-not-allowed"
      )}
      whileHover={pending || prefersReduced ? {} : { scale: 1.02, y: -1 }}
      whileTap={pending || prefersReduced ? {} : { scale: 0.97 }}
      transition={springs.snappy}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <motion.span
            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
          />
          Sending…
        </span>
      ) : (
        "Send Message →"
      )}
    </motion.button>
  );
}

// ── Form field wrapper — shows validation errors ──────────────────────────────

function Field({
  label,
  required,
  error,
  children,
}: {
  label:    string;
  required?: boolean;
  error?:   string[];
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-caption text-muted">
        {label}
        {required && (
          <span className="text-[var(--accent-danger)] ml-0.5" aria-label="required">
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && error.length > 0 && (
          <motion.p
            className="text-caption text-[var(--accent-danger)]"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={springs.snappy}
            role="alert"
          >
            {error[0]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onReset }: { onReset: () => void }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 py-12 text-center"
      initial={prefersReduced ? {} : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={springs.bouncy}
    >
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
        style={{ background: "var(--success)" + "18" }}
        initial={prefersReduced ? {} : { scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ ...springs.bouncy, delay: 0.1 }}
      >
        ✅
      </motion.div>
      <div>
        <h3 className="text-headline text-primary mb-2">Message Sent!</h3>
        <p className="text-body text-secondary max-w-sm">
          Thanks for reaching out. I typically respond within 24 hours.
        </p>
      </div>
      <motion.button
        onClick={onReset}
        className="btn btn-ghost"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={springs.snappy}
      >
        Send another message
      </motion.button>
    </motion.div>
  );
}

// ── Contact form ──────────────────────────────────────────────────────────────

function ContactForm() {
  const [state, action] = useActionState(
    submitContactForm,
    initialContactState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Show toast on error, reset on success
  useEffect(() => {
    if (state.status === "error" && state.message) {
      toast.error(state.message);
    }
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status, state.message]);

  return (
    <AnimatePresence mode="wait">
      {state.status === "success" ? (
        <SuccessState
          key="success"
          onReset={() => {
            // Reload to reset useActionState
            window.location.reload();
          }}
        />
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          action={action}
          noValidate
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={springs.default}
        >
          {/* Honeypot — hidden from users, traps bots */}
          <input
            type="text"
            name="honeypot"
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
            autoComplete="off"
            defaultValue=""
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required error={state.errors?.name}>
              <input
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={80}
                placeholder="Your name"
                autoComplete="name"
                aria-invalid={!!state.errors?.name}
              />
            </Field>
            <Field label="Email" error={state.errors?.email}>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                aria-invalid={!!state.errors?.email}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Company (optional)" error={state.errors?.company}>
              <input
                name="company"
                type="text"
                maxLength={100}
                placeholder="Company name"
                autoComplete="organization"
              />
            </Field>
            <Field label="Inquiry type" error={state.errors?.type}>
              <select name="type" defaultValue="Job opportunity">
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="How can Oscar help?" required error={state.errors?.message}>
            <textarea
              name="message"
              required
              minLength={20}
              maxLength={2000}
              rows={5}
              placeholder="Tell me about your project, team size, and timeline…"
              aria-invalid={!!state.errors?.message}
            />
          </Field>

          <SubmitButton />
        </motion.form>
      )}
    </AnimatePresence>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ContactSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="contact-heading"
    >
      {/* Header */}
      <motion.div
        className="mb-12 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p className="text-caption text-muted mb-2" variants={fadeUp}>
          Let&apos;s Work Together
        </motion.p>
        <motion.h2
          id="contact-heading"
          className="text-headline text-gradient-kinetic"
          variants={fadeUp}
        >
          Let&apos;s Build Something Exceptional
        </motion.h2>
        <motion.p
          className="text-subhead text-secondary mt-3 max-w-2xl mx-auto"
          variants={fadeUp}
        >
          Whether you need a production ML system, consulting on AI strategy, or
          a technical co-founder — let&apos;s talk.
        </motion.p>

        <motion.div
          className="inline-flex items-center gap-2 mt-4"
          variants={fadeUp}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--metric-live)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--metric-live)]" />
          </span>
          <span className="text-caption text-[var(--metric-live)] font-semibold">
            Available for new projects
          </span>
        </motion.div>
      </motion.div>

      {/* Engagement path cards */}
      <motion.div
        className="bento-grid mb-10"
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {ENGAGEMENT_PATHS.map((path, i) => (
          <motion.a
            key={path.title}
            href={path.href}
            className={cn(
              "col-span-12 sm:col-span-4",
              "liquid-glass liquid-glass-hover bento-cell",
              "flex flex-col gap-4 no-underline group"
            )}
            variants={liquidCard}
            whileHover={
              prefersReduced
                ? {}
                : {
                    y: -5,
                    boxShadow: "var(--shadow-liquid-3d-hover)",
                  }
            }
            whileTap={prefersReduced ? {} : { scale: 0.98 }}
            transition={springs.liquid}
          >
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: path.accentDim }}
              whileHover={prefersReduced ? {} : { rotate: 8, scale: 1.1 }}
              transition={springs.bouncy}
              aria-hidden="true"
            >
              {path.icon}
            </motion.div>
            <div>
              <h3 className="text-headline text-primary mb-1">
                {path.title}
              </h3>
              <p className="text-body text-secondary">{path.desc}</p>
            </div>
            <span
              className="text-caption font-semibold mt-auto group-hover:gap-2 flex items-center gap-1.5 transition-all"
              style={{ color: path.accentText }}
            >
              {path.cta}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Form + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Form panel */}
        <motion.div
          className="liquid-glass liquid-glass-cyan bento-cell flex flex-col gap-6"
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div>
            <p className="text-caption text-muted mb-1">Quick Message</p>
            <h3 className="text-headline text-primary">Send a Quick Message</h3>
          </div>
          <ContactForm />
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="flex flex-col gap-4"
          variants={fadeRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Direct contacts */}
          <div className="liquid-glass bento-cell-sm flex flex-col gap-4">
            <p className="text-caption text-muted uppercase tracking-widest">
              Direct Contact
            </p>
            {[
              { href: SOCIAL.email,    icon: "✉️", label: "scardubu@gmail.com",        bg: "var(--accent-primary-dim)" },
              { href: SOCIAL.linkedin, icon: "💼", label: "linkedin.com/in/oscardubu", bg: "var(--accent-secondary-dim)" },
              { href: SOCIAL.github,   icon: "🐙", label: "github.com/scardubu",       bg: "var(--accent-fintech-dim)" },
            ].map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 group no-underline"
                whileHover={prefersReduced ? {} : { x: 3 }}
                transition={springs.snappy}
              >
                <span
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-body text-secondary group-hover:text-primary transition-colors truncate">
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Location + availability */}
          <div className="liquid-glass bento-cell-sm flex flex-col gap-3">
            <p className="text-caption text-muted uppercase tracking-widest">
              Location & Availability
            </p>
            <p className="text-body text-secondary">
              Nigeria 🇳🇬 · Remote-First
            </p>
            <p className="text-caption text-muted">
              Typically responds within 24 hours
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--metric-live)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--metric-live)]" />
              </span>
              <span className="text-caption text-[var(--metric-live)] font-semibold">
                Open to new projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
