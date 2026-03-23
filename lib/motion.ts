/**
 * lib/motion.ts
 *
 * SINGLE SOURCE OF TRUTH for all Framer Motion variants and timing tokens.
 *
 * Rules enforced here:
 * - No infinite animations on primary content
 * - No counter animations from zero
 * - No layout animations for height/width/padding
 * - Every consuming component must call useReducedMotion()
 *   and pass {} variants when true
 *
 * Usage pattern (correct):
 *   const shouldAnimate = !useReducedMotion()
 *   <motion.div
 *     variants={shouldAnimate ? fadeUp : {}}
 *     initial={shouldAnimate ? 'hidden' : false}
 *     whileInView={shouldAnimate ? 'visible' : undefined}
 *     viewport={shouldAnimate ? viewportOnce : undefined}
 *   />
 *
 * NEVER use React.Fragment as a conditional motion wrapper.
 * NEVER mix animate="string" with viewport/whileInView on the same element.
 * NEVER suppress TypeScript errors with @ts-expect-error in motion props.
 */

import { type Variants, type Transition } from 'framer-motion'

// ─── Easing tokens ────────────────────────────────────────────────────────────

export const ease = {
  /** Snappy deceleration — primary entrance easing */
  out:    [0.16, 1, 0.3, 1]   as [number, number, number, number],
  /** Acceleration into exit */
  in:     [0.4, 0, 1, 1]      as [number, number, number, number],
  /** Balanced in-out — for transitions between states */
  inOut:  [0.4, 0, 0.2, 1]    as [number, number, number, number],
} as const

export const spring: Transition = {
  type:      'spring',
  stiffness: 300,
  damping:   30,
  mass:      0.8,
}

// ─── Shared variants ──────────────────────────────────────────────────────────

/**
 * Primary entrance motion — fade up 16px.
 * Use for cards, sections, hero text.
 */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
}

/**
 * Fade only — for elements that must not shift position.
 * Use for overlays, badges, tooltip content.
 */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: ease.out },
  },
}

/**
 * Slide in from left — for pipeline arc stages.
 */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: ease.out },
  },
}

/**
 * Scale in — for badges and chips.
 */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: ease.out },
  },
}

/**
 * Stagger container — wraps children that animate in sequence.
 *
 * IMPORTANT: This returns a Variants object, not a component prop.
 * Do NOT use this on an element that also has `animate="visible"`.
 * Stagger only works with whileInView or with explicit animate prop
 * set to "visible" via the parent orchestrating the sequence.
 *
 * Correct pattern:
 *   <motion.ul variants={stagger()} initial="hidden" whileInView="visible">
 *     <motion.li variants={fadeUp}>...</motion.li>
 *   </motion.ul>
 */
export function stagger(
  delayChildren  = 0.05,
  staggerChildren = 0.08,
): Variants {
  return {
    hidden:  {},
    visible: { transition: { delayChildren, staggerChildren } },
  }
}

// ─── Viewport trigger defaults ────────────────────────────────────────────────

/**
 * Standard viewport config for whileInView animations.
 * once: true  — animate once, do not re-trigger on scroll back
 * margin      — start animating 60px before element enters viewport
 */
export const viewportOnce = { once: true, margin: '-60px' } as const

// ─── Interaction tokens ───────────────────────────────────────────────────────

/**
 * Subtle lift on hover — for cards and interactive blocks.
 * Do NOT use on text, inline elements, or anything with layout impact.
 */
export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.18, ease: ease.out } },
  whileTap:   { scale: 0.98, transition: { duration: 0.1 } },
} as const

/**
 * Tab filter animation — for AnimatePresence filter transitions.
 * Use animate/exit directly, NOT with whileInView.
 * See SkillsMap.tsx for the correct pattern.
 */
export const filterTransition: Transition = {
  duration: 0.18,
  ease:     ease.out,
}