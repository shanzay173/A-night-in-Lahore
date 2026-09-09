import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * TextReveal
 * Reveals text with a cinematic wipe: an inner mask translates up and away
 * while the text fades in. Use for page-entrance effects on hero titles.
 */
export default function TextReveal({
  children,
  className = '',
  as: Tag = 'span',
  delay = 0,
  stagger = 0.08,
  ...rest
}) {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lines = Array.from(el.children)

    if (reduce) {
      gsap.set(lines, { autoAlpha: 1, y: 0 })
      return
    }

    gsap.fromTo(
      lines,
      { autoAlpha: 0, y: '110%' },
      {
        autoAlpha: 1,
        y: '0%',
        duration: 1.15,
        delay,
        stagger,
        ease: 'power4.out',
      },
    )
  }, [delay, stagger])

  return (
    <Tag ref={innerRef} className={`text-reveal ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
