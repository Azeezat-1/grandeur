import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function OrderConfirmation() {
  return (
    <section className="section confirmation">
      <div className="container confirmation__card">
        <span className="confirmation__icon" aria-hidden="true">
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className="eyebrow">Order Received</span>
        <h1 className="section-title">Thank you. Your order is in good hands.</h1>
        <p>
          We&apos;ve received your order and will contact you shortly to confirm measurements,
          sizing and delivery arrangements. Keep an eye on your inbox and phone.
        </p>
        <div className="confirmation__actions">
          <Link to="/shop" className="btn btn--solid">
            Continue Shopping <FontAwesomeIcon icon={faArrowRight} />
          </Link>
          <a href="tel:+2348000000000" className="btn btn--outline">
            <FontAwesomeIcon icon={faPhone} /> Call Us
          </a>
        </div>
      </div>
    </section>
  )
}