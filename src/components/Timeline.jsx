import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from './SectionLabel'
import './Timeline.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Timeline — a cinematic night in Lahore, hour by hour.
 * A thin gold line draws downward as you scroll while each moment
 * rises into view. `moments` = [{ time, title, line }].
 */
export default function Timeline({ label = 'One Night in Lahore', moments = [] }) {
  const scope = useRef(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set('[data-tl-fill]', { scaleY: 1 })
      gsap.set('[data-tl-row]', { autoAlpha: 1, y: 0 })
      return
    }

    const fill = el.querySelector('[data-tl-fill]')
    const rows = [...el.querySelectorAll('[data-tl-row]')]

    const fillTween = gsap.to(fill, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 72%',
        end: 'bottom 60%',
        scrub: 0.6,
      },
    })

    const reveals = rows.map((row) =>
      gsap.fromTo(
        row,
        { autoAlpha: 0, y: 46 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', once: true },
        },
      ),
    )

    return () => {
      fillTween.scrollTrigger?.kill()
      reveals.forEach((r) => r.scrollTrigger?.kill())
    }
  }, [])

  return (
    <section className="tl" ref={scope}>
      <div className="container">
        <SectionLabel center>{label}</SectionLabel>
        <div className="tl__line">
          <span className="tl__fill" data-tl-fill />
        </div>
        <div className="tl__rows">
          {moments.map((m, i) => (
            <article className="tl__row" key={m.time} data-tl-row>
              <span className="tl__dot" aria-hidden="true" />
              <time className="tl__time">{m.time}</time>
              <div className="tl__copy">
                <h3 className="tl__title">{m.title}</h3>
                <p className="tl__text">{m.line}</p>
              </div>
              <span className="tl__no">
                {String(i + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}