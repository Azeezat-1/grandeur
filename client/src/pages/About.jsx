import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faRulerCombined, faHandSparkles, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IMG_FALLBACK } from '../lib/images'

const HERO = 'https://images.unsplash.com/photo-1558769132-94e457f0e3af?q=80&w=2000&auto=format&fit=crop'

function onImgError(e) {
  if (e.currentTarget.src !== IMG_FALLBACK) e.currentTarget.src = IMG_FALLBACK
}

const PILLARS = [
  {
    icon: faRulerCombined,
    title: 'Bespoke Tailoring',
    text: 'Every suit, kaftan and agbada is cut to your measurements and finished to order.',
  },
  {
    icon: faHandSparkles,
    title: 'Craftsmanship',
    text: 'Clean seams, structured collars and embroidery carried out with patience and precision.',
  },
  {
    icon: faSuitcase,
    title: 'Native Wear Focus',
    text: 'From simple kaftans to full kaftan + agbada ceremony sets, we own the details.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A fashion house built on craft."
        lead="Grandeur is bespoke men's fashion — Nigerian native wear, suiting and tailoring, taught and tailored with intention."
        image={HERO}
      />

      <section className="section about-story">
        <div className="container about__grid">
          <Reveal className="about__content">
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title">
              We dress men, and we train the people who make the clothes.
            </h2>
            <p>
              Grandeur exists for the man who understands that how he dresses precedes him. We
              specialise in men&apos;s fashion — kaftans, agbada, native wear, suits, shirts and
              casual pieces — made with the kind of attention that turns clothing into presence.
            </p>
            <p>
              Our atelier pairs traditional Nigerian craftsmanship with clean modern tailoring.
              The result is a wardrobe that is unmistakably yours, unmistakably refined, and
              unmistakably Grandeur.
            </p>
            <p>
              We are equally committed to the craft&apos;s future, training aspiring fashion
              designers and tailors in the skills that make premium menswear possible.
            </p>
            <Link to="/shop" className="btn btn--solid">
              Explore the Collections <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </Reveal>
          <Reveal className="about__media about__media--stack" delay={0.1}>
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop"
              alt="Structured tailoring detail on a garment"
              onError={onImgError}
            />
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
              alt="Premium clothing displayed in a studio"
              onError={onImgError}
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--dark pillars">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow eyebrow--light">The Grandeur Standard</span>
              <h2 className="section-title">Three things we never compromise on.</h2>
            </div>
          </Reveal>
          <div className="pillars__grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="pillar">
                  <FontAwesomeIcon icon={p.icon} />
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}