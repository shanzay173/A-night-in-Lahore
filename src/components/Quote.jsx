import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Quote.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Quote — a huge, cinematic statement between chapters.
 * Lines reveal one after another, each sliding up from under its mask.
 */
export default function Quote({ lines = [], source = '' }) {
  const scope = useRef(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el.querySelectorAll('[data-q-inner]'), { yPercent: 0, autoAlpha: 1 })
      return
    }

    const st = gsap.fromTo(
      el.querySelectorAll('[data-q-inner]'),
      { yPercent: 108, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.25,
        stagger: 0.18,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
      },
    )
    return () => st.scrollTrigger?.kill()
  }, [])

  return (
    <section className="quote" ref={scope}>
      <div className="quote__glow" aria-hidden="true" />
      <blockquote className="quote__inner container">
        <span className="quote__mark" aria-hidden="true">
          &ldquo;
        </span>
        {lines.map((line, i) => (
          <span className="quote__mask" data-q-mask key={i}>
            <span className="quote__line" data-q-inner>
              {line}
            </span>
          </span>
        ))}
        {source && <cite className="quote__source" data-q-inner>{source}</cite>}
      </blockquote>
    </section>
  )
}