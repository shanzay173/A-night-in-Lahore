import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import Grain from './Grain'
import ScrollProgress from './ScrollProgress'
import Cursor from './Cursor'
import './Layout.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * PageTransition
 * Fades + lifts the page content into view each time the route changes.
 */
export function PageTransition({ children }) {
  const ref = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      gsap.set(el, { autoAlpha: 1 })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        onComplete: () => ScrollTrigger.refresh(),
      },
    )

    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(raf)
  }, [location.pathname])

  return (
    <main ref={ref} className="page">
      {children}
    </main>
  )
}

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
      <ScrollProgress />
      <Grain />
      <Cursor />
    </>
  )
}