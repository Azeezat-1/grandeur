import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowDownShortWide, faArrowUpWideShort, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { categories } from '../data/products'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const HERO_IMAGES = [
  '/photos/shop/470144664_430396553474824_3054171908720115215_n.jpg',
  '/photos/agbada/468638126_18371867122115127_6050702171287759176_n.jpg',
  '/photos/kaftan/469005918_18371848198115127_1840532585173048531_n.jpg',
  '/photos/suit/466018795_18368563024115127_8237044931393756195_n.jpg',
  '/photos/caps/512765680_574242359090242_3912759996769258010_n.jpg',
  '/photos/agbada/470230684_431702050010941_3961850809088119725_n.jpg',
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A–Z' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const activeCategory = params.get('category') || 'all'
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')
  const { products, loading, error, refresh } = useProducts()

  useEffect(() => {
    if (!params.get('category')) setParams({ category: 'all' }, { replace: true })
  }, [params, setParams])

  const shown = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter((p) => p.category === activeCategory)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.replace('-', ' ').includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)),
      )
    }
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        list.sort((a, b) => b.price - a.price)
        break
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured))
    }
    return list
  }, [products, activeCategory, search, sort])

  const selectCategory = (slug) => {
    setParams({ category: slug })
  }

  return (
    <>
      <PageHero
        eyebrow="The Shop"
        title="Grandeur Collections"
        lead="Browse bespoke pieces built for confidence. Native wear, suiting and everyday luxury."
        images={HERO_IMAGES}
      />

      <section className="section shop">
        <div className="container">
          <div className="shop__toolbar">
            <div className="shop__filters" role="group" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  className={`pill ${activeCategory === c.slug ? 'active' : ''}`}
                  onClick={() => selectCategory(c.slug)}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <div className="shop__utilities">
              <div className="search-box">
                <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search pieces…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                />
              </div>
              <div className="sort-box">
                <FontAwesomeIcon
                  icon={sort === 'price-desc' ? faArrowDownShortWide : faArrowUpWideShort}
                  aria-hidden="true"
                />
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="shop__count" aria-live="polite">
            {shown.length} piece{shown.length === 1 ? '' : 's'} {activeCategory !== 'all' ? `in ${activeCategory.replace('-', ' ')}` : ''}
          </p>

          {loading ? (
            <div className="empty-state" aria-busy="true">
              <h3>Loading the collection…</h3>
              <p>Please give us a moment.</p>
            </div>
          ) : error ? (
            <div className="empty-state" role="alert">
              <h3>We couldn&apos;t load the shop right now.</h3>
              <p>{error}</p>
              <button className="btn btn--outline" onClick={refresh}>
                <FontAwesomeIcon icon={faRotateRight} /> Try again
              </button>
            </div>
          ) : shown.length === 0 ? (
            <div className="empty-state">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <h3>No pieces match your search.</h3>
              <p>Try a different keyword or category.</p>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setSearch('')
                  setParams({ category: 'all' })
                }}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {shown.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 0.05}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}