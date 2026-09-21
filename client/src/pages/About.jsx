import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faRulerCombined, faHandSparkles, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { IMG_FALLBACK } from '../lib/images'

const HERO = '/photos/kaftan/474179295_458659130648566_4987006008118321141_n.jpg'

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
        lead="Grandeur is bespoke men's fashion, Nigerian native wear, suiting and tailoring, taught and tailored with intention."
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
              specialise in men&apos;s fashion, kaftans, agbada, native wear, suits and caps, made with the kind of attention that turns clothing into presence.
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
              src="/photos/agbada/488609268_18390734812115127_3730262705908840077_n.jpg"
              alt="Structured tailoring detail on a Grandeur kaftan"
              onError={onImgError}
            />
            <img
              src="/photos/agbada/557358807_18415228465115127_2700883447488426798_n.jpg"
              alt="Premium pieces from the Grandeur atelier"
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