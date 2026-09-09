import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Cursor
 * A small gold dot with a slow trailing ring. The ring enlarges and shows a
 * label (VIEW / EXPLORE…) over anything marked `[data-cursor="Label"]`.
 * Fine-pointer devices only; invisible on touch / reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dot = dotRef.current
    const ring = ringRef.current
    if (!fine || reduce || !dot || !ring) return

    document.documentElement.classList.add('has-cursor')

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    let visible = false

    const onMove = (e) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const label = target.getAttribute('data-cursor')
        ring.querySelector('.cursor-ring__label').textContent = label || 'view'
        ring.classList.add('is-active')
      } else {
        ring.classList.remove('is-active')
      }
    }

    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="cursor-ring__label">view</span>
      </div>
    </>
  )
}