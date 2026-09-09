import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ChapterHero.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * Particles — a handful of slow floating lights. `type` switches the feel:
 * 'dust'  → warm streetlight dust
 * 'ember' → coal-fire embers (taste)
 * 'mote'  → pale moonlight motes (heritage)
 */
function Particles({ type = 'dust', count = 14 }) {
  return (
    <div className={`ch-particles ch-particles--${type}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="ch-particles__bit"
          style={{
            left: `${(i * 61) % 100}%`,
            animationDelay: `${(i * 0.53) % 5}s`,
            animationDuration: `${8 + (i % 6) * 1.5}s`,
          }}
        />
      ))}
    </div>
  )
}

/**
 * ChapterHero — the large cinematic opener shared by every chapter.
 * Slow masked text entrance, drifting background, giant ghost numeral,
 * and a floating particle field. `accent` warms or cools the glow.
 */
export default function ChapterHero({
  chapter,
  label,
  lines = [],
  sub,
  img,
  alt = '',
  video,
  accent = 'gold',
  particles = 'dust',
  scrollTarget = '#journey',
  scrollLabel = 'enter',
}) {
  const scope = useRef(null)
  const imgRef = useRef(null)

  // Entrance timeline
  useEffect(() => {
    const el = scope.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set('[data-ch-fade]', { autoAlpha: 1, y: 0 })
      gsap.set('[data-ch-line]', { y: '0%', autoAlpha: 1 })
      return
    }

    const tl = gsap.timeline({ delay: 0.35, defaults: { ease: 'power3.out' } })
    tl.fromTo(
      '[data-ch-eyebrow]',
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.8 },
    )
      .fromTo(
        '[data-ch-line]',
        { autoAlpha: 0, y: '112%' },
        { autoAlpha: 1, y: '0%', duration: 1.2, stagger: 0.16 },
        '-=0.3',
      )
      .fromTo(
        '[data-ch-sub]',
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        '-=0.65',
      )
      .fromTo(
        '[data-ch-scroll]',
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.9 },
        '-=0.5',
      )
      .fromTo(
        '[data-ch-numeral]',
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 1.6 },
        '-=1.1',
      )
    return () => tl.kill()
  }, [])

  // Slow image parallax — skip for video backgrounds
  useEffect(() => {
    if (video) return
    const el = scope.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const st = gsap.to(imgRef.current, {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => st.scrollTrigger?.kill()
  }, [])

  return (
    <section
      className={`ch-hero ch-hero--${accent}`}
      ref={scope}
      data-ch-accent={accent}
    >
      <div className="ch-hero__media">
        {video ? (
          <video
            ref={imgRef}
            src={video}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
        ) : (
          <img ref={imgRef} src={img} alt={alt} />
        )}
      </div>
      <div className="ch-hero__wash" />
      <Particles type={particles} />

      {/* Ghost chapter numeral */}
      <span className="ch-hero__numeral" data-ch-numeral aria-hidden="true">
        {chapter}
      </span>

      <div className="ch-hero__content">
        <p className="ch-hero__eyebrow" data-ch-eyebrow>
          {label}
        </p>
        <h1 className="ch-hero__title">
          {lines.map((line, i) => (
            <span className="ch-hero__mask" key={i}>
              <span className="ch-hero__line" data-ch-line>
                {line.em ? (
                  <>
                    {line.before}
                    <em>{line.em}</em>
                    {line.after}
                  </>
                ) : (
                  line.text
                )}
              </span>
            </span>
          ))}
        </h1>
        <p className="ch-hero__sub" data-ch-sub>
          {sub}
        </p>
      </div>

      <a className="ch-hero__scroll" href={scrollTarget} data-ch-scroll>
        <span>{scrollLabel}</span>
        <i className="ch-hero__caret" aria-hidden="true" />
      </a>
    </section>
  )
}