// hooks/useScrollReveal.ts
// ─────────────────────────────────────────────────────────────────────
// GPU-safe IntersectionObserver scroll reveal.
// Adds data-revealed attribute; CSS animation handles the visual state.
// ─────────────────────────────────────────────────────────────────────
'use client'

import { useEffect, useRef } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?:      boolean
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
) {
  const ref = useRef<T>(null)
  const { threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.setAttribute('data-revealed', 'true')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.setAttribute('data-revealed', 'true')
            if (once) observer.unobserve(el)
          } else if (!once) {
            el.removeAttribute('data-revealed')
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return ref
}


export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEff(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}
