import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { collections } from '../data/products'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IMG_FALLBACK } from '../lib/images'

const HERO = 'https://images.unsplash.com/photo-1523398002811-999ca8dec234?q=80&w=2000&auto=format&fit=crop'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function Collections() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Six ways to wear confidence."
        lead="From ceremony native wear to tailored suiting, every Grandeur collection is built to detail."
        image={HERO}
      />

      <section className="section collections-page">
        <div className="container collections-page__grid">
          {collections.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.06}>
              <Link
                to={`/shop?category=${c.slug}`}
                className={`collection-card collection-card--page ${c.slug === 'native-wear' ? 'collection-card--feature' : ''}`}
              >
                <div className="collection-card__media">
                  <img src={c.image} alt={`${c.title} collection`} loading="lazy" onError={onImgError} />
                  <div className="collection-card__overlay" />
                  <div className="collection-card__meta">
                    <span className="collection-card__num">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h2>{c.title}</h2>
                      <p>{c.description}</p>
                      <span className="collection-card__cta">
                        Explore <FontAwesomeIcon icon={faArrowRight} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}