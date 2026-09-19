import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
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

const HERO_SLIDES = [
  '/photos/agbada/468638126_18371867122115127_6050702171287759176_n.jpg',
  '/photos/kaftan/469005918_18371848198115127_1840532585173048531_n.jpg',
  '/photos/caps/512765680_574242359090242_3912759996769258010_n.jpg',
  '/photos/kaftan/474179295_458659130648566_4987006008118321141_n.jpg',
  '/photos/suit/466018795_18368563024115127_8237044931393756195_n.jpg',
  '/photos/agbada/470230684_431702050010941_3961850809088119725_n.jpg',
  '/photos/agbada/484303230_18386054032115127_1426785170446595455_n.jpg',
]

const STEPS = [
  { icon: faEye, title: '01 — Browse', text: 'Explore Grandeur’s collections.' },
  { icon: faShirt, title: '02 — Choose', text: 'Select your preferred design and size.' },
  { icon: faCube, title: '03 — Order', text: 'Add your items and provide your details.' },
  { icon: faStamp, title: '04 — Confirm', text: 'Receive confirmation of your order.' },
]

const COLLECTION_CARDS = [
  ...collections.map((c) => ({ ...c, to: `/shop?category=${c.slug}` })),
  {
    slug: 'all',
    title: 'All Collections',
    description: 'Every Grandeur piece, all in one place.',
    image: '/photos/agbada/491417480_18391426582115127_6895553817828692143_n.jpg',
    to: '/shop?category=all',
  },
]

export default function Home() {
  const prefersReduced = useReducedMotion()
  const [slide, setSlide] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (prefersReduced || paused) return undefined
    const timer = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500)
    return () => clearInterval(timer)
  }, [prefersReduced, paused])

  const slideMotion = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.4 },
      }
    : {
        initial: { opacity: 0, x: '4%' },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: '-3%' },
        transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <>
      {/* HERO */}
      <section
        className="hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide}
            className="hero__slide"
            {...slideMotion}
          >
            <img
              className={`hero__bg${slide % 2 === 1 ? ' hero__bg--alt' : ''}`}
              src={HERO_SLIDES[slide]}
              alt=""
              aria-hidden="true"
              onError={onImgError}
            />
          </motion.div>
        </AnimatePresence>
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
        <div className="hero__dots" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              className={`hero__dot${i === slide ? ' hero__dot--active' : ''}`}
              aria-selected={i === slide}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>

      {/* NATIVE WEAR FOCUS */}
      <section className="section native-focus">
        <div className="container">
          <div className="native-focus__grid">
            <Reveal className="native-focus__media">
              <div className="native-media__stack">
                <img
                  src="/photos/kaftan/474179295_458659130648566_4987006008118321141_n.jpg"
                  alt="Crisp detailing on a Grandeur kaftan chest"
                  onError={onImgError}
                />
                <img
                  className="native-media__tall"
                  src="/photos/agbada/488609268_18390734812115127_3730262705908840077_n.jpg"
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
                  <Link to="/shop?category=kaftans" className="btn btn--solid">
                    Explore Kaftans &amp; Agbada <FontAwesomeIcon icon={faArrowRight} />
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
              src="/photos/agbada/472231890_445906608590485_8925906217239826626_n.jpg"
              alt="A Grandeur agbada piece finished in the studio"
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

          <div className="collections-strip">
            <div className="collections-strip__track">
              {[...COLLECTION_CARDS, ...COLLECTION_CARDS].map((c, i) => {
                const clone = i >= COLLECTION_CARDS.length
                return (
                  <Link
                    to={c.to}
                    className="collection-card collection-card--slide"
                    key={`${c.slug}-${i}`}
                    aria-hidden={clone}
                    tabIndex={clone ? -1 : 0}
                  >
                    <div className="collection-card__media">
                      <img src={c.image} alt={`${c.title} collection`} loading="lazy" onError={onImgError} />
                      <div className="collection-card__overlay" />
                      <div className="collection-card__meta">
                        <span className="collection-card__num">
                          {String((i % COLLECTION_CARDS.length) + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h3>{c.title}</h3>
                          <p>{c.description}</p>
                          <span className="collection-card__cta">
                            Explore <FontAwesomeIcon icon={faArrowRight} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
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