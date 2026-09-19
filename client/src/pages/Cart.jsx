import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBasketShopping,
  faPlus,
  faMinus,
  faTrashCan,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { getProductById, formatPrice } from '../data/products'
import PageHero from '../components/PageHero'
import { IMG_FALLBACK } from '../lib/images'

const HERO = '/photos/agbada/491417480_18391426582115127_6895553817828692143_n.jpg'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function Cart() {
  const { items, count, subtotal, increaseQty, decreaseQty, removeItem, clearCart } = useCart()

  return (
    <>
      <PageHero eyebrow="Shopping Bag" title="Your Bag" lead="Review your selections before checkout." image={HERO} />

      <section className="section cart-page">
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-state">
              <FontAwesomeIcon icon={faBasketShopping} />
              <h3>Your bag is empty.</h3>
              <p>Explore the collections to find the pieces that fit your style.</p>
              <Link to="/shop" className="btn btn--solid">
                Explore the Shop
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-layout__items">
                <div className="cart-table__head">
                  <span>Item</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>
                <ul className="cart-list">
                  {items.map((item) => {
                    const product = getProductById(item.id)
                    return (
                      <li className="cart-item" key={`${item.id}-${item.size}-${item.color}`}>
                        <div className="cart-item__main">
                          <Link to={`/product/${product.id}`} className="cart-item__img">
                            <img src={product.image} alt={product.name} onError={onImgError} />
                          </Link>
                          <div className="cart-item__info">
                            <Link to={`/product/${product.id}`} className="cart-item__name">
                              {product.name}
                            </Link>
                            <p className="cart-item__meta">
                              {item.size} · {item.color}
                            </p>
                            <p className="cart-item__price">{formatPrice(product.price)}</p>
                            <button
                              className="cart-item__remove"
                              onClick={() => removeItem(item.id, item.size, item.color)}
                            >
                              <FontAwesomeIcon icon={faTrashCan} /> Remove
                            </button>
                          </div>
                        </div>
                        <div className="cart-item__qty">
                          <div className="qty-control">
                            <button onClick={() => decreaseQty(item.id, item.size, item.color)} aria-label="Decrease quantity">
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(item.id, item.size, item.color)} aria-label="Increase quantity">
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                        <p className="cart-item__line-total">{formatPrice(product.price * item.qty)}</p>
                      </li>
                    )
                  })}
                </ul>
                <button className="cart-clear" onClick={clearCart}>
                  <FontAwesomeIcon icon={faTrashCan} /> Clear bag
                </button>
              </div>

              <aside className="cart-summary">
                <h2>Order Summary</h2>
                <dl>
                  <div>
                    <dt>Items</dt>
                    <dd>{count}</dd>
                  </div>
                  <div>
                    <dt>Subtotal</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="cart-summary__total">
                    <dt>Total</dt>
                    <dd>{formatPrice(subtotal)}</dd>
                  </div>
                </dl>
                <Link to="/checkout" className="btn btn--solid cart-summary__cta">
                  Proceed to Checkout <FontAwesomeIcon icon={faArrowRight} />
                </Link>
                <Link to="/shop" className="back-link">
                  <FontAwesomeIcon icon={faArrowLeft} /> Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}