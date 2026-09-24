import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faSpinner,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faXTwitter, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const HERO = '/photos/caps/513079191_574242352423576_1914461248101949094_n.jpg'

const CONTACT_PLACEHOLDERS = [
  { icon: faPhone, label: 'Phone / WhatsApp', value: '+234 708 025 0212' },
  { icon: faEnvelope, label: 'Email', value: 'info@grandeurtailors.com' },
  { icon: faLocationDot, label: 'Location', value: 'Lagos, Nigeria' },
]

const SOCIALS = [
  { icon: faInstagram, label: 'Instagram', href: 'https://www.instagram.com/grandeurtailors' },
  { icon: faFacebookF, label: 'Facebook', href: 'https://web.facebook.com/p/Grandeur-Tailors-and-Clothiers-100095134473462/?_rdc=1&_rdr' },
  { icon: faXTwitter, label: 'X (Twitter)', href: 'https://x.com/grandeurtailors' },
  { icon: faWhatsapp, label: 'WhatsApp', href: 'https://wa.me/2347080250212' },
  { icon: faTiktok, label: 'TikTok', href: '#' },
]

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const setField = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const er = {}
    if (!form.name.trim()) er.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'A valid email is required'
    if (!/^[0-9+()\s-]{7,15}$/.test(form.phone)) er.phone = 'A valid phone number is required'
    if (form.message.trim().length < 10) er.message = 'Message should be at least 10 characters'
    return er
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length > 0) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setForm(initialForm)
      setTimeout(() => setSent(false), 5000)
    }, 800)
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        lead="Orders, bespoke requests, training applications or a general question, reach out and we'll respond promptly."
        image={HERO}
      />

      <section className="section contact">
        <div className="container contact__grid">
          <Reveal className="contact__info">
            <h2>Get in touch</h2>
            <p>
              These details are placeholders, swap in the real Grandeur contact information here.
            </p>
            <ul className="contact__cards">
              {CONTACT_PLACEHOLDERS.map((c) => (
                <li key={c.label}>
                  <span className="contact__icon">
                    <FontAwesomeIcon icon={c.icon} />
                  </span>
                  <div>
                    <p>{c.label}</p>
                    <strong>{c.value}</strong>
                  </div>
                </li>
              ))}
            </ul>
            <div className="contact__social">
              <p>Follow Grandeur</p>
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} aria-label={s.label}>
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="contact__form-wrap" delay={0.1}>
            {sent && (
              <div className="alert alert--success">
                <FontAwesomeIcon icon={faCheck} /> Thank you, your message has been received.
              </div>
            )}
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <h2>Send a message</h2>
              <div className="field">
                <label htmlFor="name">Name *</label>
                <input id="name" name="name" value={form.name} onChange={setField} autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div className="form-row form-row--2">
                <div className="field">
                  <label htmlFor="email">Email *</label>
                  <input id="email" name="email" type="email" value={form.email} onChange={setField} autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone *</label>
                  <input id="phone" name="phone" value={form.phone} onChange={setField} autoComplete="tel" placeholder="+234 708 025 0212" aria-invalid={!!errors.phone} />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" value={form.message} onChange={setField} placeholder="Tell us what you need…" aria-invalid={!!errors.message} />
                {errors.message && <span className="error-msg">{errors.message}</span>}
              </div>
              <button type="submit" className="btn btn--solid" disabled={submitting}>
                {submitting ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin /> Sending…
                  </>
                ) : (
                  <>
                    Send Message <FontAwesomeIcon icon={faPaperPlane} />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  )
}