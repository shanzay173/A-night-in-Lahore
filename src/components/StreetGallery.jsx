import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StreetGallery.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * StreetGallery
 * An editorial, layered image gallery. Images sit at different sizes with
 * offset columns rather than identical cards. Each frame reveals on scroll and
 * zooms gently on hover, with an elegant time/location label dissolving in.
 *
 *   <StreetGallery items={[{ img, alt, title, place, time }]} />
 */
export default function StreetGallery({ items = [], labelStart = '01' }) {
  const scope = useRef(null)

  useEffect(() => {
    const el = scope.current
    if (!el) return
    const frames = [...el.querySelectorAll('[data-sg-frame]')]

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(frames, { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' })
      return
    }

    const tweens = frames.map((frame, i) =>
      gsap.fromTo(
        frame,
        { autoAlpha: 0, y: 70, clipPath: 'inset(0% 0% 4% 0%)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.3,
          ease: 'power3.out',
          delay: (i % 2) * 0.12,
          scrollTrigger: { trigger: frame, start: 'top 88%', once: true },
        },
      ),
    )
    return () => tweens.forEach((t) => t.scrollTrigger?.kill())
  }, [])

  return (
    <div className="sg" ref={scope}>
      {items.map((item, i) => (
        <figure
          className={`sg__frame sg__frame--${(i % 4) + 1}`}
          key={`${item.title}-${i}`}
          data-sg-frame
          data-cursor="View"
        >
          <div className="sg__media">
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption className="sg__cap">
            <span className="sg__idx">{String(labelStart + i).padStart(2, '0')}</span>
            <span className="sg__title">{item.title}</span>
            <span className="sg__place">{item.place}</span>
            <span className="sg__time">{item.time}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}