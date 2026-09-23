import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSpinner, faShieldHalved } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import { formatPrice } from '../data/products'
import { IMG_FALLBACK } from '../lib/images'
import api from '../lib/api'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  note: '',
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const { getProductById } = useProducts()
  const navigate = useNavigate()

  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const setField = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((er) => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const er = {}
    if (!form.fullName.trim()) er.fullName = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'A valid email is required'
    if (!/^[0-9+()\s-]{7,20}$/.test(form.phone)) er.phone = 'A valid phone number is required'
    if (!form.address.trim()) er.address = 'Delivery address is required'
    if (!form.city.trim()) er.city = 'City is required'
    if (!form.state.trim()) er.state = 'State is required'
    return er
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length > 0) {
      setSubmitError('Please correct the highlighted fields.')
      return
    }
    setSubmitError('')
    setSubmitting(true)

    const orderPayload = {
      customer: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      },
      address: {
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        note: form.note.trim(),
      },
      items: items.map((i) => ({
        product: i.id,
        name: getProductById(i.id)?.name,
        price: getProductById(i.id)?.price,
        qty: i.qty,
        size: i.size,
        color: i.color,
      })),
      total: subtotal,
    }

    try {
      await api.post('/orders', orderPayload)
      clearCart()
      navigate('/order-confirmation')
    } catch (err) {
      setSubmitting(false)
      setSubmitError(
        err.response?.data?.message ||
          'We couldn’t submit your order right now. Please try again.',
      )
    }
  }

  if (items.length === 0 && !submitting) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <h3>Your bag is empty.</h3>
            <p>Add a few pieces before heading to checkout.</p>
            <Link to="/shop" className="btn btn--solid">
              Explore the Shop
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section checkout">
      <div className="container checkout__grid">
        <div className="checkout__form">
          <Link to="/cart" className="back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to bag
          </Link>
          <h1 className="page-title">Checkout</h1>
          <p className="checkout__intro">
            Fill in your details to confirm your order. We&apos;ll reach out to arrange delivery.
          </p>

          {submitError && <div className="alert alert--error">{submitError}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-section">
              <h2>Contact Information</h2>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    value={form.fullName}
                    onChange={setField}
                    autoComplete="name"
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
                </div>
              </div>
              <div className="form-row form-row--2">
                <div className="field">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={setField}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={setField}
                    autoComplete="tel"
                    placeholder="+234 708 025 0212"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2>Delivery Details</h2>
              <div className="field">
                <label htmlFor="address">Delivery Address *</label>
                <input
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={setField}
                  autoComplete="street-address"
                  placeholder="Street address"
                  aria-invalid={!!errors.address}
                />
                {errors.address && <span className="error-msg">{errors.address}</span>}
              </div>
              <div className="form-row form-row--2">
                <div className="field">
                  <label htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={setField}
                    autoComplete="address-level2"
                    placeholder="City"
                    aria-invalid={!!errors.city}
                  />
                  {errors.city && <span className="error-msg">{errors.city}</span>}
                </div>
                <div className="field">
                  <label htmlFor="state">State *</label>
                  <input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={setField}
                    autoComplete="address-level1"
                    placeholder="State"
                    aria-invalid={!!errors.state}
                  />
                  {errors.state && <span className="error-msg">{errors.state}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="note">Additional Note</label>
                <textarea
                  id="note"
                  name="note"
                  value={form.note}
                  onChange={setField}
                  placeholder="Delivery instructions, measurements, colour preferences…"
                />
              </div>
            </div>

            <button type="submit" className="btn btn--solid checkout__submit" disabled={submitting}>
              {submitting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> Placing your order…
                </>
              ) : (
                <>
                  Place Order <FontAwesomeIcon icon={faArrowRight} />
                </>
              )}
            </button>
          </form>
        </div>

        <aside className="checkout__summary">
          <h2>Order Summary</h2>
          <ul className="checkout__items">
            {items.map((item) => {
              const product = getProductById(item.id)
              return (
                <li key={`${item.id}-${item.size}-${item.color}`}>
                  <div className="checkout__thumb-wrap">
                    <img src={product.image} alt={product.name} onError={onImgError} />
                    <span className="checkout__qty">{item.qty}</span>
                  </div>
                  <div>
                    <p className="checkout__name">{product.name}</p>
                    <p className="checkout__meta">
                      {item.size} · {item.color}
                    </p>
                  </div>
                  <span className="checkout__price">{formatPrice(product.price * item.qty)}</span>
                </li>
              )
            })}
          </ul>
          <dl className="checkout__totals">
            <div>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Delivery</dt>
              <dd>To be confirmed</dd>
            </div>
            <div className="checkout__grand">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <p className="checkout__secure">
            <FontAwesomeIcon icon={faShieldHalved} /> No payment is processed on this site.
          </p>
        </aside>
      </div>
    </section>
  )
}