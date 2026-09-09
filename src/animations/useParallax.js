import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useParallax
 * Moves an element vertically at a fraction of scroll velocity to create depth.
 * `speed` > 0 scrolls slower than the page (feels farther), < 0 scrolls faster
 * (feels closer).
 */
export default function useParallax(speed = -0.2) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const st = gsap.to(el, {
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const y = (self.progress - 0.5) * speed * 300
          gsap.set(el, { y })
        },
      },
    })

    return () => st.scrollTrigger?.kill()
  }, [speed])

  return ref
}
