import { Link } from 'react-router-dom';

export function MeetupCompletePage() {
  return (
    <div className="done-page">
      <h1 className="done-page__title">Meetup complete</h1>
      <p className="done-page__body">Post-date feedback and safety check-ins will live here.</p>
      <Link className="done-page__link" to="/matches">
        Back to matches
      </Link>
      <Link className="done-page__link" to="/home">
        Open discovery
      </Link>
    </div>
  );
}
