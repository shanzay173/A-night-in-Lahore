import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useParallax from '../animations/useParallax'
import ScrollReveal from '../animations/ScrollReveal'
import './CinematicImage.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * CinematicImage
 * A large image that reveals with a vertical mask wipe and scrolls with
 * parallax. `height` tunes the section height on desktop.
 */
export default function CinematicImage({
  src,
  alt = '',
  caption,
  height = '78vh',
  parallax = -0.12,
}) {
  const wrapRef = useRef(null)
  const imgRef = useParallax(parallax)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set('.ci__img', { autoAlpha: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' })
      return
    }

    const st = gsap.fromTo(
      '.ci__img',
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          once: true,
        },
      },
    )
    return () => st.scrollTrigger?.kill()
  }, [])

  return (
    <figure className="ci" ref={wrapRef} style={{ '--ci-h': height }}>
      <div className="ci__frame">
        <img ref={imgRef} src={src} alt={alt} className="ci__img" loading="lazy" />
      </div>
      {caption && (
        <ScrollReveal className="ci__caption" as="figcaption">
          <span className="ci__caption-rule" />
          {caption}
        </ScrollReveal>
      )}
    </figure>
  )
}
