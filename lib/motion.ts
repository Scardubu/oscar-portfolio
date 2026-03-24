import { type Transition, type Variants } from "framer-motion";

export const ease = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  in: [0.4, 0, 1, 1] as [number, number, number, number],
  inOut: [0.4, 0, 0.2, 1] as [number, number, number, number],
} as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export const springs = {
  default: {
    type: "spring",
    stiffness: 220,
    damping: 24,
    mass: 0.9,
  } satisfies Transition,
  snappy: {
    type: "spring",
    stiffness: 320,
    damping: 26,
    mass: 0.7,
  } satisfies Transition,
  bouncy: {
    type: "spring",
    stiffness: 280,
    damping: 18,
    mass: 0.75,
  } satisfies Transition,
  liquid: {
    type: "spring",
    stiffness: 140,
    damping: 20,
    mass: 1,
  } satisfies Transition,
  layout: {
    type: "spring",
    stiffness: 260,
    damping: 30,
    mass: 0.8,
  } satisfies Transition,
  kinetic: {
    type: "spring",
    stiffness: 170,
    damping: 18,
    mass: 0.7,
  } satisfies Transition,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: ease.out },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: ease.out },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.28, ease: ease.out },
  },
};

export function stagger(
  delayChildren = 0.05,
  staggerChildren = 0.08
): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  };
}

export const staggerContainer = stagger();
export const staggerFast = stagger(0.02, 0.05);

export const viewportOnce = { once: true, margin: "-60px" } as const;

export const hoverLift = {
  whileHover: { y: -2, transition: { duration: 0.18, ease: ease.out } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
} as const;

export const filterTransition: Transition = {
  duration: 0.18,
  ease: ease.out,
};

export const testimonialSlide: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 28 : -28,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: springs.default,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -28 : 28,
    transition: springs.default,
  }),
};

export const mobileMenu: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.18, ease: ease.inOut },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.24, ease: ease.out },
  },
};

export const mobileMenuItems: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

export const mobileMenuItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: ease.out },
  },
};
