import { Link } from 'react-router-dom';

export function DonePage() {
  return (
    <div className="done-page">
      <h1 className="done-page__title">You’re in</h1>
      <p className="done-page__body">Onboarding preview complete.</p>
      <Link className="done-page__link" to="/home">
        Open main page
      </Link>
      <Link className="done-page__link" to="/">
        Restart preview
      </Link>
    </div>
  );
}
