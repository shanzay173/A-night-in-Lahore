import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionLabel from '../components/SectionLabel'
import Button from '../components/Button'
import { images } from '../data/images'
import './End.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * The End — the final scene of the night.
 *
 * A single, spacious cinema frame: a slow-dawning city background, a quiet
 * lift of the words, and a fade-to-black as the viewer scrolls away.
 * The colour grading leans from deep night toward the first peach of dawn.
 */
export default function End() {
  const scope = useRef(null)
  const mediaRef = useRef(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set('[data-en-bg]', { autoAlpha: 1 })
      gsap.set('[data-en-fade]', { autoAlpha: 1, y: 0 })
      return
    }

    // 1. Slowly bring the background up out of black, with a barely-there
    //    Ken Burns zoom that keeps the frame feeling alive the whole stay.
    const bg = gsap
      .timeline({ delay: 0.4 })
      .fromTo('[data-en-bg]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 2.2, ease: 'power2.out' })
      .fromTo(
        mediaRef.current,
        { scale: 1.08 },
        { scale: 1.18, duration: 26, ease: 'none' },
        '<',
      )

    // 2. The words rise in one gentle, unhurried motion.
    const words = gsap
      .timeline({ delay: 0.9, defaults: { ease: 'power3.out' } })
      .fromTo(
        '[data-en-fade]',
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.14 },
      )

    // 3. As the viewer scrolls toward the bottom, sink into a fade-to-black.
    const fade = gsap.to('[data-en-curtain]', {
      autoAlpha: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      bg.kill()
      words.kill()
      fade.scrollTrigger?.kill()
    }
  }, [])

  return (
    <section className="en" ref={scope}>
      <div className="en__bg" data-en-bg>
        <img
          ref={mediaRef}
          src={images.ending.closing}
          alt="The Badshahi Mosque as the first light gathers in the sky"
        />
      </div>

      {/* Dark-to-dawn grading so the words stay legible, with a soft vignette. */}
      <div className="en__wash" aria-hidden="true" />
      <div className="en__curtain" data-en-curtain aria-hidden="true" />

      <div className="en__inner">
        <p className="en__label" data-en-fade>
          <SectionLabel center variant="moon">04 / The End</SectionLabel>
        </p>
        <h1 className="en__title" data-en-fade>
          The night <em>ends.</em>
        </h1>
        <p className="en__sub" data-en-fade>
          But Lahore doesn’t.
        </p>
        <p className="en__body" data-en-fade>
          The streets quiet down, the lights begin to fade, but Lahore never
          truly sleeps. Some cities are visited. Lahore is <em>felt</em>.
        </p>

        <div className="en__cta" data-en-fade>
          <Button to="/" variant="solid">
            Begin Again
          </Button>
          <Button to="/streets" variant="outline">
            Enter Lahore
          </Button>
        </div>
      </div>
    </section>
  )
}