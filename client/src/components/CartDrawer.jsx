import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus, faMinus, faTrashCan, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'
import { formatPrice } from '../data/products'
import { IMG_FALLBACK } from '../lib/images'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, count, subtotal, increaseQty, decreaseQty, removeItem } = useCart()
  const { getProductById } = useProducts()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="drawer__head">
              <p className="drawer__title">Your Bag ({count})</p>
              <button className="drawer__close" onClick={() => setIsOpen(false)} aria-label="Close bag">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="drawer__empty">
                <FontAwesomeIcon icon={faBasketShopping} />
                <p>Your bag is empty.</p>
                <Link to="/shop" className="btn btn--solid" onClick={() => setIsOpen(false)}>
                  Explore the Shop
                </Link>
              </div>
            ) : (
              <>
                <ul className="drawer__list">
                  {items.map((item) => {
                    const product = getProductById(item.id)
                    return (
                      <li className="drawer__item" key={`${item.id}-${item.size}-${item.color}`}>
                        <Link to={`/product/${product.id}`} onClick={() => setIsOpen(false)} className="drawer__img">
                          <img src={product.image} alt={product.name} onError={onImgError} />
                        </Link>
                        <div className="drawer__info">
                          <Link to={`/product/${product.id}`} onClick={() => setIsOpen(false)} className="drawer__name">
                            {product.name}
                          </Link>
                          <p className="drawer__meta">
                            {item.size} · {item.color}
                          </p>
                          <div className="drawer__row">
                            <div className="qty-control">
                              <button onClick={() => decreaseQty(item.id, item.size, item.color)} aria-label="Decrease quantity">
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <span>{item.qty}</span>
                              <button onClick={() => increaseQty(item.id, item.size, item.color)} aria-label="Increase quantity">
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                            <button
                              className="drawer__remove"
                              onClick={() => removeItem(item.id, item.size, item.color)}
                              aria-label={`Remove ${product.name}`}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </div>
                        </div>
                        <p className="drawer__price">{formatPrice(product.price * item.qty)}</p>
                      </li>
                    )
                  })}
                </ul>

                <div className="drawer__foot">
                  <div className="drawer__subtotal">
                    <span>Subtotal</span>
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                  <Link to="/checkout" className="btn btn--solid" onClick={() => setIsOpen(false)}>
                    Proceed to Checkout
                  </Link>
                  <Link to="/cart" className="btn btn--outline drawer__viewcart" onClick={() => setIsOpen(false)}>
                    View Full Bag
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}