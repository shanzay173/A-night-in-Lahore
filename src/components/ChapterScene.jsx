import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ChapterScene.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * ChapterScene — a full-viewport editorial scene. A full-bleed image resolves
 * with a clip-path wipe while the words drift in as the user scrolls.
 * `side` toggles which side the copy sits on for desktop.
 */
export default function ChapterScene({
  img,
  alt = '',
  side = 'left',
  eyebrow,
  title,
  meta,
  body,
}) {
  const scope = useRef(null)
  const imgRef = useRef(null)
  const isLeft = side === 'left'

  useEffect(() => {
    const el = scope.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const image = el.querySelector('[data-cs-img]')
    const texts = el.querySelectorAll('[data-cs-fade]')

    if (reduce) {
      gsap.set([image, ...texts], {
        autoAlpha: 1,
        x: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'center 40%',
        scrub: 0.8,
      },
      defaults: { ease: 'none' },
    })

    tl.fromTo(
      image,
      { clipPath: isLeft ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 },
    ).fromTo(
      texts,
      { autoAlpha: 0, x: isLeft ? 44 : -44 },
      { autoAlpha: 1, x: 0, duration: 1, stagger: 0.16 },
      0,
    )
    return () => tl.scrollTrigger?.kill()
  }, [isLeft])

  // Slow parallax drift inside the frame
  useEffect(() => {
    const el = scope.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const st = gsap.to(imgRef.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
    return () => st.scrollTrigger?.kill()
  }, [])

  return (
    <section className={`cs cs--${side}`} ref={scope}>
      <div className="cs__frame" data-cs-img>
        <img ref={imgRef} src={img} alt={alt} loading="lazy" className="cs__img" />
      </div>
      <div className="cs__shade" />
      <div className="cs__text">
        <p className="cs__eyebrow" data-cs-fade>
          {eyebrow}
        </p>
        <h2 className="cs__title" data-cs-fade>
          {title}
        </h2>
        {meta && (
          <p className="cs__meta" data-cs-fade>
            {meta}
          </p>
        )}
        <p className="cs__body" data-cs-fade>
          {body}
        </p>
      </div>
    </section>
  )
}