import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const HeroScene = lazy(() =>
  import('./three/HeroScene').then((m) => ({ default: m.default })),
)

/**
 * Detects WebGL support synchronously at mount-time (client-only app).
 */
function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    return Boolean(window.WebGLRenderingContext && ctx)
  } catch {
    return false
  }
}

/**
 * Decides whether to enable the WebGL hero scene.
 * Disabled on reduced-motion or small/low-power devices.
 */
function useGLEnabled() {
  const [enabled] = useState(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.innerWidth < 640
    return !reduce && !small && detectWebGL()
  })
  return enabled
}

export default function Hero() {
  const scope = useRef(null)
  const navigate = useNavigate()
  const glEnabled = useGLEnabled()

  // Entrance timeline
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = scope.current
    if (!el) return

    if (reduce) {
      gsap.set('[data-hero-fade]', { autoAlpha: 1, y: 0 })
      gsap.set('[data-hero-line]', { autoAlpha: 1, y: '0%' })
      gsap.set('[data-hero-bg]', { autoAlpha: 1 })
      return
    }

    const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })

    // 1. The night resolves slowly out of black
    tl.fromTo('[data-hero-bg]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.8, ease: 'power2.out' })
      // 2. Location / date appears
      .fromTo('[data-hero-eyebrow]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=1.1')
      // 3. Title reveals line by line
      .fromTo(
        '[data-hero-line]',
        { autoAlpha: 0, y: '112%' },
        { autoAlpha: 1, y: '0%', duration: 1.25, stagger: 0.16 },
        '-=0.45',
      )
      // 4. Subtitle fades upward
      .fromTo('[data-hero-sub]', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9 }, '-=0.7')
      // 5. Scroll cue
      .fromTo('[data-hero-scroll]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.5')

    return () => tl.kill()
  }, [])

  // Parallax the foreground away as the user scrolls.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const el = scope.current
    const st = gsap.to('[data-hero-foreground]', {
      yPercent: -16,
      autoAlpha: 0.15,
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

  // Gentle continuous drift for the scene wrapper.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const parallax = gsap.to('[data-hero-scene]', {
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => parallax.scrollTrigger?.kill()
  }, [])

  const goStreets = () => navigate('/streets')

  return (
    <section className="hero" ref={scope}>
      {/* Scene layer */}
      <div className="hero__scene" data-hero-scene data-hero-bg>
        {glEnabled ? (
          <Suspense fallback={<div className="hero-cv-fallback" />}>
            <HeroScene />
          </Suspense>
        ) : (
          <div className="hero__fallback" />
        )}
      </div>

      {/* Warm glows + vignette over the scene */}
      <div className="hero__glow hero__glow--moon" />
      <div className="hero__glow hero__glow--warm" />
      <div className="hero__vignette" />

      {/* Editorial edge labels */}
      <span className="hero__coordinate hero__coordinate--left" data-hero-fade>
        N 31°32′ · Lahore
      </span>
      <span className="hero__coordinate hero__coordinate--right" data-hero-fade>
        after dusk
      </span>

      <div className="hero__content" data-hero-foreground>
        <p className="hero__eyebrow" data-hero-fade>
          Lahore · Pakistan — one night
        </p>

        <h1 className="hero__title">
          <span className="hero__mask">
            <span className="hero__line" data-hero-line>
              A Night
            </span>
          </span>
          <span className="hero__mask">
            <span className="hero__line" data-hero-line>
              In
            </span>
          </span>
          <span className="hero__mask">
            <span className="hero__line hero__line--accent" data-hero-line>
              Lahore
            </span>
          </span>
        </h1>

        <p className="hero__sub" data-hero-fade>
          Where every street has a story.
        </p>

        <button className="hero__cta" data-hero-fade onClick={goStreets}>
          Begin the journey
          <i aria-hidden="true" />
        </button>
      </div>

      <div className="hero__scroll" data-hero-scroll>
        <span className="hero__scroll-line" />
        <span>scroll to explore</span>
      </div>

      <div className="hero__baseline" aria-hidden="true" />
    </section>
  )
}