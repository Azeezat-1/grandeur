import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShirt, faCube, faStamp, faArrowRight, faMessage } from '@fortawesome/free-solid-svg-icons'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'

const HERO = '/photos/agbada/498134117_18395966638115127_5672086864893682746_n.jpg'

const STEPS = [
  {
    icon: faEye,
    num: '01',
    title: 'Browse',
    text: 'Explore Grandeur’s collections — kaftans, agbada sets, suits and caps.',
    to: '/shop',
    cta: 'Browse the shop',
  },
  {
    icon: faShirt,
    num: '02',
    title: 'Choose',
    text: 'Select your preferred design, size and colour. For native wear you can request made-to-measure with your exact measurements.',
    to: '/collections',
    cta: 'View collections',
  },
  {
    icon: faCube,
    num: '03',
    title: 'Order',
    text: 'Add your items to the bag, then provide your contact and delivery details at checkout. We’ll confirm everything with you.',
    to: '/checkout',
    cta: 'Go to checkout',
  },
  {
    icon: faStamp,
    num: '04',
    title: 'Confirm',
    text: 'Receive confirmation of your order. Our team reaches out to finalise sizing, timing and delivery arrangements.',
    to: '/contact',
    cta: 'Ask a question',
  },
]

export default function HowToOrder() {
  return (
    <>
      <PageHero
        eyebrow="How to Order"
        title="Four simple steps to your Grandeur pieces."
        lead="From browsing the collections to confirming your order — here's exactly how it works."
        image={HERO}
      />

      <section className="section howto">
        <div className="container">
          <div className="howto-list">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.06}>
                <article className="howto-step">
                  <span className="howto-step__num">{s.num}</span>
                  <span className="howto-step__icon">
                    <FontAwesomeIcon icon={s.icon} />
                  </span>
                  <div className="howto-step__body">
                    <h2>{s.title}</h2>
                    <p>{s.text}</p>
                    <Link to={s.to} className="text-link">
                      {s.cta} <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="howto-note">
            <FontAwesomeIcon icon={faMessage} />
            <div>
              <h3>Prefer to order by phone?</h3>
              <p>
                Call or message us directly and we&apos;ll walk you through available designs,
                measurements and delivery.
              </p>
            </div>
            <Link to="/contact" className="btn btn--outline">
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}