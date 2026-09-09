import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollReveal
 * Wrapper that fades + lifts its children into view when scrolled into the
 * viewport. Accepts a `delay` and optional `y` offset; `as` allows changing
 * the rendered element. Falls back to a plain visible element on mobile /
 * prefers-reduced-motion.
 */
export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  as: Tag = 'div',
  once = true,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once,
        },
      },
    )

    return () => {
      const st = ScrollTrigger.getAll()
      st.forEach((s) => {
        if (s.trigger === el) s.kill()
      })
    }
  }, [y, delay, once])

  return (
    <Tag ref={ref} className={`reveal ${className}`}>
      {children}
    </Tag>
  )
}
