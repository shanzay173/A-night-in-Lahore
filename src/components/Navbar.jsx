import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/streets', label: 'Streets', no: '01' },
  { to: '/taste', label: 'Taste', no: '02' },
  { to: '/heritage', label: 'Heritage', no: '03' },
  { to: '/end', label: 'The End', no: '04' },
]

/**
 * LahoreNow — a small live clock that keeps the city's current time,
 * so the night always knows what hour it is.
 */
function LahoreNow() {
  const [time, setTime] = useState('')

  useEffect(() => {
    let id
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Karachi',
          }).format(new Date()),
        )
      } catch {
        setTime('')
      }
    }
    tick()
    id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null
  return (
    <span className="nav__clock" aria-label="Current time in Lahore">
      <i aria-hidden="true" />
      Lahore<span>/ {time}</span>
    </span>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes (incl. browser back).
  // This is an intentional sync to the external navigation history.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className={`nav ${scrolled || menuOpen ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="A Night in Lahore — home">
          <span className="nav__mono" aria-hidden="true">
            ANL
          </span>
          <span className="nav__word">A Night in Lahore</span>
        </Link>

        <nav className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`} aria-label="Primary">
          <ul className="nav__list">
            {links.map((l) => (
              <li key={l.to} className="nav__item">
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `nav__link ${isActive ? 'nav__link--active' : ''}`
                  }
                >
                  <span className="nav__no">{l.no}</span>
                  <span className="nav__txt">{l.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <LahoreNow />
        </nav>

        <button
          className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}