import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBagShopping,
  faPhone,
  faGraduationCap,
  faEye,
  faShirt,
  faScissors,
  faLayerGroup,
  faCube,
  faStamp,
} from '@fortawesome/free-solid-svg-icons'
import Reveal from '../components/Reveal'
import { collections } from '../data/products'
import { IMG_FALLBACK } from '../lib/images'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=2000&auto=format&fit=crop'

const STEPS = [
  { icon: faEye, title: '01 — Browse', text: 'Explore Grandeur’s collections.' },
  { icon: faShirt, title: '02 — Choose', text: 'Select your preferred design and size.' },
  { icon: faCube, title: '03 — Order', text: 'Add your items and provide your details.' },
  { icon: faStamp, title: '04 — Confirm', text: 'Receive confirmation of your order.' },
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <img className="hero__bg" src={HERO_IMAGE} alt="" aria-hidden="true" onError={onImgError} />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <motion.span
            className="eyebrow eyebrow--light"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Bespoke Men&apos;s Fashion
          </motion.span>
          <motion.h1
            className="hero__title"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.09 }}
            aria-label="Tailored for the man who leads."
          >
            {['Tailored', 'for', 'the', 'man', 'who', 'leads.'].map((word, i) => (
              <motion.span
                key={i}
                className="hero__word"
                aria-hidden="true"
                variants={{
                  hidden: { opacity: 0, y: 36, rotate: 2 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.28 + i * 0.09 },
                  },
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Grandeur crafts refined kaftans, agbada, suits and native wear with obsessive attention
            to detail — and trains the next generation of fashion designers and tailors.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.68 }}
          >
            <Link to="/shop" className="btn btn--gold">
              <FontAwesomeIcon icon={faBagShopping} /> Shop Now
            </Link>
            <Link to="/contact" className="btn btn--ghost">
              <FontAwesomeIcon icon={faPhone} /> Reach Out to Us
            </Link>
            <Link to="/training" className="hero__action-link">
              Apply for Tailoring Training <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </motion.div>
        </div>
        <div className="hero__scroll" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* NATIVE WEAR FOCUS */}
      <section className="section native-focus">
        <div className="container">
          <div className="native-focus__grid">
            <Reveal className="native-focus__media">
              <div className="native-media__stack">
                <img
                  src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
                  alt="Crisp detailing on a Grandeur kaftan chest"
                  onError={onImgError}
                />
                <img
                  className="native-media__tall"
                  src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=900&auto=format&fit=crop"
                  alt="Structured embroidery on a premium kaftan"
                  onError={onImgError}
                />
              </div>
            </Reveal>
            <div className="native-focus__content">
              <Reveal>
                <span className="eyebrow">Grandeur Native Wear</span>
                <h2 className="section-title">Kaftan to Agbada. Crafted end to end.</h2>
                <p className="section-lead">
                  From a simple elegant kaftan to a full kaftan + agbada statement set, every piece
                  is engineered in layers — neckline, chest, pocket, sleeve, cuff, embroidery and
                  fabric. This is Nigerian men&apos;s tailoring, done properly.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="feature-list">
                  <li><FontAwesomeIcon icon={faScissors} /> Made-to-measure kaftans</li>
                  <li><FontAwesomeIcon icon={faLayerGroup} /> Coordinated kaftan + agbada sets</li>
                  <li><FontAwesomeIcon icon={faEye} /> Detail-driven embroidery &amp; finishing</li>
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="native-focus__actions">
                  <Link to="/shop?category=native-wear" className="btn btn--solid">
                    Explore Native Wear <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section--dark about">
        <div className="container about__grid">
          <Reveal className="about__content">
            <span className="eyebrow eyebrow--light">About Grandeur</span>
            <h2 className="section-title">
              Where craft, creativity and confidence meet.
            </h2>
            <p>
              Grandeur is a men&apos;s fashion house built on bespoke tailoring. We cut suits,
              kaftans, agbada and everyday native wear for men who value how they present
              themselves. Every seam is considered; every finish is measured.
            </p>
            <p>
              Beyond the atelier, we train aspiring designers and tailors — teaching real garment
              construction, pattern making and the disciplines behind premium men&apos;s fashion.
            </p>
            <Link to="/about" className="text-link">
              More about Grandeur <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </Reveal>
          <Reveal className="about__media" delay={0.1}>
            <img
              src="https://images.unsplash.com/photo-1558769132-94e457f0e3af?q=80&w=1200&auto=format&fit=crop"
              alt="Clothing laid out in a premium fashion studio"
              onError={onImgError}
            />
          </Reveal>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="section collections-home">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">The Collections</span>
              <h2 className="section-title">Dress with intention.</h2>
            </div>
            <Link to="/collections" className="text-link">
              View all collections <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </Reveal>

          <div className="collections-grid collections-grid--emphasized">
            {collections.map((c, i) => {
              const emphasized = c.slug === 'native-wear'
              return (
                <Link
                  to={`/shop?category=${c.slug}`}
                  className={`collection-card ${emphasized ? 'collection-card--feature' : ''}`}
                  key={c.slug}
                >
                  <Reveal delay={i * 0.06}>
                    <div className="collection-card__media">
                      <img src={c.image} alt={`${c.title} collection`} loading="lazy" onError={onImgError} />
                      <div className="collection-card__overlay" />
                      <div className="collection-card__meta">
                        <span className="collection-card__num">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3>{c.title}</h3>
                          <p>{c.description}</p>
                          <span className="collection-card__cta">Explore <FontAwesomeIcon icon={faArrowRight} /></span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="section how-to-home">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">How to Order</span>
              <h2 className="section-title">From inspiration to your door.</h2>
            </div>
            <Link to="/how-to-order" className="text-link">
              How to order <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </Reveal>
          <ol className="steps">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <li className="step">
                  <FontAwesomeIcon icon={step.icon} />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* TRAINING CTA */}
      <section className="section training-cta">
        <div className="container training-cta__inner">
          <Reveal>
            <span className="eyebrow eyebrow--light">Grandeur Academy</span>
            <h2 className="section-title">
              Become the tailor behind the outfits.
            </h2>
            <p>
              Hands-on training in fashion design, pattern making, sewing and men&apos;s tailoring —
              including dedicated kaftan and agbada construction.
            </p>
            <Link to="/training" className="btn btn--gold">
              <FontAwesomeIcon icon={faGraduationCap} /> Apply for Training
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}