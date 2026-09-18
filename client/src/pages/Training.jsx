import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faRulerCombined,
  faScissors,
  faScrewdriverWrench,
  faShirt,
  faLayerGroup,
  faPaintBrush,
  faSuitcase,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IMG_FALLBACK } from '../lib/images'

const HERO =
  'https://images.unsplash.com/photo-1558769132-94e457f0e3af?q=80&w=2000&auto=format&fit=crop'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

const MODULES = [
  { icon: faPaintBrush, title: 'Fashion Design Fundamentals', text: 'Design thinking, proportion and the principles behind wearable garments.' },
  { icon: faRulerCombined, title: 'Pattern Making', text: 'Drafting, cutting and fitting patterns that translate into clean clothes.' },
  { icon: faScissors, title: 'Sewing & Garment Construction', text: 'Machine work, construction order and building garments that hold their shape.' },
  { icon: faShirt, title: 'Fabric Knowledge', text: 'Understanding weave, weight, drape and how to choose the right cloth.' },
  { icon: faSuitcase, title: 'Men’s Tailoring', text: 'Suits, shirts and trousers cut and finished to a premium standard.' },
  { icon: faLayerGroup, title: 'Kaftan & Agbada Construction', text: 'Structured kaftans and flowing agbada — Grandeur’s speciality craft.' },
  { icon: faScrewdriverWrench, title: 'Finishing Techniques', text: 'Seams, cuffs, collars, buttons and the details buyers notice first.' },
  { icon: faUserGraduate, title: 'Professional Development', text: 'Styling, client work, pricing and running your own tailoring business.' },
]

export default function Training() {
  return (
    <>
      <PageHero
        eyebrow="Grandeur Academy"
        title="Hands-on tailoring training."
        lead="Learn real construction — pattern making, sewing, men's tailoring, and dedicated kaftan and agbada craft — in a working fashion studio."
        image={HERO}
      />

      <section className="section training-page">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">What You&apos;ll Learn</span>
              <h2 className="section-title">A complete foundation, taught by making.</h2>
            </div>
            <p className="section-lead">
              Our training is hands-on. You work with fabric, machines and real projects — not just
              theory. By the end, you&apos;ll have constructed garments you can show clients.
            </p>
          </Reveal>

          <div className="training-grid">
            {MODULES.map((m, i) => (
              <Reveal key={m.title} delay={(i % 4) * 0.05}>
                <article className="training-card">
                  <FontAwesomeIcon icon={m.icon} />
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark academy">
        <div className="container academy__grid">
          <Reveal>
            <img
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop"
              alt="A tailor working at a sewing machine in a studio"
              onError={onImgError}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow eyebrow--light">Join the atelier</span>
            <h2 className="section-title">Start your tailoring career with Grandeur.</h2>
            <p>
              Whether you&apos;re starting from zero or refining existing skills, the Grandeur
              academy meets you where you are — with structured projects, mentorship and the
              standards of a real premium brand.
            </p>
            <ul className="feature-list feature-list--light">
              <li>Small, mentored cohorts</li>
              <li>Working studio, real fabric and machines</li>
              <li>Kaftan &amp; agbada construction as a core module</li>
              <li>Guidance on starting your own practice</li>
            </ul>
            <Link to="/contact" className="btn btn--gold">
              Apply for Training <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}