import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollProgress — a thin amber line tracing the altitude of the page.
 */
export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const st = gsap.to(el, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.3,
      },
    })
    return () => st.scrollTrigger?.kill()
  }, [])

  return <div className="scroll-progress" ref={barRef} aria-hidden="true" />
}