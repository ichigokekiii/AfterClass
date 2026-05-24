import type { DiscoveryProfile } from '@/constants/discovery';
import {
  getDiscoveryCourse,
  getDiscoveryDisplayName,
  getDiscoverySchool,
  getDiscoveryYear,
} from '@/constants/discovery';

type DiscoveryCardProps = {
  profile: DiscoveryProfile;
  compact?: boolean;
};

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DiscoveryCard({ profile, compact = true }: DiscoveryCardProps) {
  const name = getDiscoveryDisplayName(profile);
  const school = getDiscoverySchool(profile);
  const year = getDiscoveryYear(profile);
  const course = getDiscoveryCourse(profile);

  return (
    <article className="discovery-card" aria-label={`Profile for ${name}`}>
      <div className="discovery-card__photo-wrap">
        <img
          src={profile.photoUrl}
          alt={`${name}'s profile photo`}
          className="discovery-card__photo"
          width={313}
          height={319}
          draggable={false}
        />
      </div>

      <div className="discovery-card__details">
        <h2 className="discovery-card__name">{name}</h2>

        <div className="discovery-card__school-badge">
          <MapPinIcon />
          <span>{school}</span>
        </div>

        <div className="discovery-card__meta">
          <span className="discovery-card__meta-item">{year}</span>
          <span className="discovery-card__meta-divider" aria-hidden="true">
            ·
          </span>
          <span className="discovery-card__meta-item">{course}</span>
        </div>

        {compact ? (
          <p className="discovery-card__hint">Tap for full profile · Swipe right to like, left to pass</p>
        ) : null}
      </div>
    </article>
  );
}
