import { Link } from 'react-router-dom'
import './Footer.css'

const links = [
  { to: '/streets', label: 'Streets' },
  { to: '/taste', label: 'Taste' },
  { to: '/heritage', label: 'Heritage' },
  { to: '/end', label: 'The End' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__word">
          <span className="footer__mono">ANL</span>
          <span>A Night in Lahore</span>
        </div>

        <p className="footer__tagline">Until the next night.</p>

        <nav className="footer__nav" aria-label="Footer">
          {links.map((l) => (
            <Link key={l.to} to={l.to}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container footer__base">
        <span>Lahore, Pakistan · after dusk</span>
        <span>© {new Date().getFullYear()} A Night in Lahore</span>
      </div>
    </footer>
  )
}