import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faArrowDownShortWide, faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const HERO = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop'

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
  }, [activeCategory, search, sort])

  const selectCategory = (slug) => {
    setParams({ category: slug })
  }

  return (
    <>
      <PageHero
        eyebrow="The Shop"
        title="Grandeur Collections"
        lead="Browse bespoke pieces built for confidence. Native wear, suiting and everyday luxury."
        image={HERO}
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

          {shown.length === 0 ? (
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