import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Reveal.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reveal
 * Cinematic masked reveal: the content is hidden inside an overflow mask and
 * slides up into view when it enters the viewport. Prefers-reduced-motion
 * shows it instantly.
 *
 *   <Reveal as="h2" delay={0.05}>A line of text</Reveal>
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  once = true,
}) {
  const ref = useRef(null)
  const Inner = Tag === 'p' || Tag === 'span' ? 'span' : 'div'

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const inner = el.querySelector('[data-reveal-inner]')
    if (!inner) return

    if (reduce) {
      gsap.set(inner, { yPercent: 0, autoAlpha: 1 })
      return
    }

    const tween = gsap.fromTo(
      inner,
      { yPercent: 115 },
      {
        yPercent: 0,
        duration: 1.25,
        delay,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once },
      },
    )
    return () => tween?.scrollTrigger?.kill()
  }, [delay, once])

  return (
    <Tag ref={ref} className={`rveal ${className}`}>
      <Inner className="rveal__inner" data-reveal-inner>
        {children}
      </Inner>
    </Tag>
  )
}