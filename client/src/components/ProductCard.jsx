import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/products'
import { IMG_FALLBACK } from '../lib/images'
import { useState } from 'react'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.article
      className="product-card"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link to={`/product/${product.id}`} className="product-card__media" aria-label={product.name}>
        <img src={product.image} alt={product.name} loading="lazy" onError={onImgError} />
        <span className="product-card__cat">{product.category.replace('-', ' ')}</span>
        <button className="product-card__quick" onClick={handleAdd} aria-label={`Add ${product.name} to bag`}>
          <FontAwesomeIcon icon={faBasketShopping} />
          <span>{added ? 'Added' : 'Add to Bag'}</span>
        </button>
      </Link>
      <div className="product-card__body">
        <Link to={`/product/${product.id}`} className="product-card__name">
          {product.name}
        </Link>
        <p className="product-card__price">{formatPrice(product.price)}</p>
        <Link to={`/product/${product.id}`} className="product-card__view">
          View Details <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    </motion.article>
  )
}