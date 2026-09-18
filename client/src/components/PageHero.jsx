import { motion } from 'framer-motion'
import { IMG_FALLBACK } from '../lib/images'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

export default function PageHero({ eyebrow, title, lead, image }) {
  return (
    <section className="page-hero">
      <img src={image} alt="" aria-hidden="true" onError={onImgError} />
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
    </section>
  )
}