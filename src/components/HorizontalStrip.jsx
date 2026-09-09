import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useMediaQuery from '../animations/useMediaQuery'
import './HorizontalStrip.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * HorizontalStrip
 * The vertical scroll drives a horizontal journey. On desktop the strip is
 * pinned and translated as you scroll; on touch devices it becomes a native
 * horizontal snap-scroller so the content always remains reachable.
 *
 * The pin is created inside `useLayoutEffect` and given an explicit `pinSpacer`
 * so ScrollTrigger never injects an anonymous wrapper around this component's
 * root element. Without that, React's unmount can't remove the pinned root and
 * throws `removeChild`, which blanked the next page on navigation.
 *
 *   <HorizontalStrip label="after midnight" items={[{ img, alt, title, caption }]} />
 */
export default function HorizontalStrip({ label = '', items = [] }) {
  const scope = useRef(null)
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const isDesktop = useMediaQuery('(min-width: 900px)')

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Reduced-motion users keep the native horizontal scroller instead of
    // the pinned vertical-scroll journey, so content always stays reachable.
    if (!isDesktop || reduce) return
    const el = scope.current
    const pinEl = pinRef.current
    const track = trackRef.current
    if (!el || !pinEl || !track) return

    const distance = () => track.scrollWidth - window.innerWidth

    const st = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: () => `+=${distance()}`,
        scrub: 1,
        pin: true,
        pinSpacer: pinEl,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
    return () => st.scrollTrigger?.kill()
  }, [isDesktop])

  // When reduced motion is preferred, fall back to the native scroller.
  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section
      className={`hstrip ${isDesktop && !reduced ? 'hstrip--pin' : ''}`}
    >
      <div className="hstrip__pinner" ref={pinRef}>
        <div className="hstrip__inner" ref={scope}>
          <div className="hstrip__head">
            <div className="hstrip__label">
              {label}
            </div>
            <span className="hstrip__hint">scroll / swipe</span>
          </div>

          <div className="hstrip__scroller">
            <div className="hstrip__track" ref={trackRef}>
              {items.map((item, i) => (
                <figure className="hstrip__slide" key={`${item.title}-${i}`} data-cursor="View">
                  <div className="hstrip__media">
                    <img src={item.img} alt={item.alt} loading="lazy" decoding="async" />
                  </div>
                  <figcaption className="hstrip__cap">
                    <span className="hstrip__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hstrip__title">{item.title}</span>
                    <span className="hstrip__line">{item.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
