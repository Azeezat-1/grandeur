import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faBasketShopping, faPhone } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Collections', to: '/collections' },
  { label: 'Training', to: '/training' },
  { label: 'How to Order', to: '/how-to-order' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const { count, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          {/* LEFT — brand */}
          <div className="header-left">
            <Link to="/" className="brand" aria-label="Grandeur Tailors home">
              <img src="/logo.png" alt="Grandeur Tailors" className="brand-logo" />
            </Link>
          </div>

          {/* CENTER — navigation */}
          <nav className="header-center" aria-label="Primary">
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    end={link.to === '/'}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT — CTA + cart */}
          <div className="header-right">
            <a href="tel:+2348000000000" className="header-cta">
              <FontAwesomeIcon icon={faPhone} />
              <span>+234 800 000 0000</span>
            </a>
            <button
              className="cart-btn"
              onClick={() => setIsOpen(true)}
              aria-label={`Open bag, ${count} item${count === 1 ? '' : 's'}`}
            >
              <FontAwesomeIcon icon={faBasketShopping} />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="container">
              <nav aria-label="Mobile">
                <ul>
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.to}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1 }}
                    >
                      <NavLink
                        to={link.to}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                        onClick={() => setMenuOpen(false)}
                        end={link.to === '/'}
                      >
                        {link.label}
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <a href="tel:+2348000000000" className="mobile-cta">
                <FontAwesomeIcon icon={faPhone} /> +234 800 000 0000
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}