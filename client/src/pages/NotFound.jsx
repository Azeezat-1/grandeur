import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <FontAwesomeIcon icon={faCompass} />
          <h3>404 Page not found</h3>
          <p>The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
          <Link to="/" className="btn btn--solid">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}