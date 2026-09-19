import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faXTwitter, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Collections', to: '/collections' },
  { label: 'Training', to: '/training' },
  { label: 'How to Order', to: '/how-to-order' },
  { label: 'Contact', to: '/contact' },
]

const SOCIALS = [
  { icon: faInstagram, label: 'Instagram', href: '#' },
  { icon: faFacebookF, label: 'Facebook', href: '#' },
  { icon: faXTwitter, label: 'X (Twitter)', href: '#' },
  { icon: faWhatsapp, label: 'WhatsApp', href: '#' },
  { icon: faTiktok, label: 'TikTok', href: '#' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <p className="footer-logo">GRANDEUR</p>
          <p className="footer-desc">
            Bespoke men&apos;s fashion and tailoring. Nigerian native wear, kaftans, agbada,
            suiting and craftsmanship built to detail.
          </p>
          <ul className="social-row">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={s.label}>
                  <FontAwesomeIcon icon={s.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className="footer-col" aria-label="Footer quick links">
          <p className="footer-heading">Quick Links</p>
          <ul>
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>
                  {l.label} <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <p className="footer-heading">Collections</p>
          <ul>
            <li><Link to="/shop?category=kaftans">Kaftans</Link></li>
            <li><Link to="/shop?category=agbada">Agbada</Link></li>
            <li><Link to="/shop?category=suits">Suits</Link></li>
            <li><Link to="/shop?category=caps">Caps</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Contact</p>
          <ul className="footer-contact">
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+2348000000000">+234 800 000 0000</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:hello@grandeur.example">hello@grandeur.example</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faLocationDot} />
              <span>Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Grandeur. All rights reserved.</p>
        <p>Bespoke Men&apos;s Fashion &amp; Tailoring</p>
      </div>
    </footer>
  )
}