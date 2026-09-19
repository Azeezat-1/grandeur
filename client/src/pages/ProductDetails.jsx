import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faPlus,
  faMinus,
  faBasketShopping,
  faRuler,
  faShirt,
  faLayerGroup,
  faBox,
} from '@fortawesome/free-solid-svg-icons'
import { getProductById, products, formatPrice } from '../data/products'
import { useCart } from '../context/CartContext'
import { IMG_FALLBACK } from '../lib/images'
import Reveal from '../components/Reveal'
import ProductCard from '../components/ProductCard'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

const DETAIL_LABELS = {
  embroidery: 'Embroidery',
  neckline: 'Neckline',
  pocket: 'Pocket',
  fabric: 'Fabric',
  sleeve: 'Sleeve / Cuff',
  agbada: 'Agbada Detailing',
  custom: 'Custom Tailoring',
}

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const product = getProductById(id)
  const [size, setSize] = useState(product?.sizes?.[0] || '')
  const [color, setColor] = useState(product?.colors?.[0] || '')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <FontAwesomeIcon icon={faBox} />
            <h3>We couldn&apos;t find that piece.</h3>
            <p>The product may have been removed from the collection.</p>
            <Link to="/shop" className="btn btn--solid">
              Back to the Shop
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const isNative = product.category === 'kaftans' || product.category === 'agbada'
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const changeQty = (delta) => {
    setQty((q) => Math.min(Math.max(1, q + delta), product.stock))
  }

  const handleAdd = () => {
    addItem(product.id, { size, color, qty })
  }

  return (
    <>
      <section className="section product-detail">
        <div className="container">
          <button className="back-link" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>

          <div className="product-detail__grid">
            <Reveal className="product-detail__media">
              <img src={product.image} alt={product.name} onError={onImgError} />
              {isNative && <span className="product-detail__badge">Made to Measure</span>}
            </Reveal>

            <div className="product-detail__info">
              <span className="eyebrow">{product.category.replace('-', ' ')}</span>
              <h1>{product.name}</h1>
              <p className="product-detail__price">{formatPrice(product.price)}</p>
              <p className="product-detail__desc">{product.description}</p>

              {product.sizes && (
                <div className="product-detail__group">
                  <p className="product-detail__label">
                    <FontAwesomeIcon icon={faRuler} /> Size
                  </p>
                  <div className="option-row">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        className={`option-btn ${size === s ? 'active' : ''}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && (
                <div className="product-detail__group">
                  <p className="product-detail__label">
                    <FontAwesomeIcon icon={faShirt} /> Colour
                  </p>
                  <div className="option-row">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        className={`option-btn ${color === c ? 'active' : ''}`}
                        onClick={() => setColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="product-detail__group">
                <p className="product-detail__label">Quantity</p>
                <div className="detail-qty">
                  <button onClick={() => changeQty(-1)} aria-label="Decrease quantity">
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => changeQty(1)} aria-label="Increase quantity">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
                <p className="stock-note">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Currently unavailable'}
                </p>
              </div>

              <button className="btn btn--solid product-detail__add" onClick={handleAdd} disabled={product.stock === 0}>
                <FontAwesomeIcon icon={faBasketShopping} /> Add to Bag
              </button>

              {isNative && (
                <div className="native-details">
                  <h3><FontAwesomeIcon icon={faLayerGroup} /> Tailoring Details</h3>
                  <dl>
                    {Object.entries(product.details || {}).map(([key, val]) => (
                      <div key={key}>
                        <dt>{DETAIL_LABELS[key] || key}</dt>
                        <dd>{val}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="native-details__note">
                    Every native piece is available made-to-measure with your exact measurements.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section related">
          <div className="container">
            <Reveal className="section-head">
              <h2 className="section-title">You may also like</h2>
            </Reveal>
            <div className="product-grid">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}