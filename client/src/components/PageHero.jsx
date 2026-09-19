import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { IMG_FALLBACK } from '../lib/images'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function PageHero({ eyebrow, title, lead, image, images }) {
  const slides = images && images.length > 0 ? images : [image]
  const prefersReduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (prefersReduced || slides.length < 2 || paused) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [prefersReduced, slides.length, paused])

  return (
    <section
      className="page-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence>
        <motion.img
          key={index}
          className="page-hero__img"
          src={slides[index]}
          alt=""
          aria-hidden="true"
          onError={onImgError}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
      </AnimatePresence>
      <div className="page-hero__overlay" />
      <motion.div
        className="container page-hero__content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="eyebrow eyebrow--light">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p>{lead}</p>}
      </motion.div>
      {slides.length > 1 && (
        <div className="page-hero__dots" role="tablist" aria-label={`${eyebrow} slides`}>
          {slides.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              className={`page-hero__dot${i === index ? ' page-hero__dot--active' : ''}`}
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}