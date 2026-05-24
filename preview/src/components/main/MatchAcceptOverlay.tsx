import { useEffect, useRef, useState } from 'react';

import { TypewriterText } from '@/components/main/TypewriterText';
import { MATCH_ACCEPT_SECONDS } from '@/constants/discovery';
import type { DiscoveryProfile } from '@/constants/discovery';
import { getDiscoveryDisplayName, getDiscoverySchool } from '@/constants/discovery';
import { formatMatchAvailability, getMatchAvailability } from '@/constants/meetup';

type MatchAcceptOverlayProps = {
  profile: DiscoveryProfile;
  onAccept: () => void;
  onKeepSearching: () => void;
  onExpire: () => void;
};

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3a1 1 0 0 1 1 1v1h8V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Zm12 8H5v8h14v-8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MatchAcceptOverlay({ profile, onAccept, onKeepSearching, onExpire }: MatchAcceptOverlayProps) {
  const [progress, setProgress] = useState(0);
  const expiredRef = useRef(false);

  const name = getDiscoveryDisplayName(profile);
  const school = getDiscoverySchool(profile);
  const availability = getMatchAvailability(profile.id);
  const availabilityLabel = availability ? formatMatchAvailability(availability) : null;

  useEffect(() => {
    expiredRef.current = false;
    const startedAt = Date.now();
    const durationMs = MATCH_ACCEPT_SECONDS * 1000;

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min((elapsed / durationMs) * 100, 100);

      setProgress(nextProgress);

      if (elapsed >= durationMs && !expiredRef.current) {
        expiredRef.current = true;
        window.clearInterval(tick);
        onExpire();
      }
    }, 50);

    return () => window.clearInterval(tick);
  }, [onExpire, profile.id]);

  return (
    <div className="match-accept-layer" role="presentation">
      <div className="match-accept-layer__content">
        <TypewriterText text="Found a Match!" className="match-accept-layer__headline" speedMs={72} />

        <figure className="match-accept-layer__identity">
          <img
            src={profile.photoUrl}
            alt=""
            className="match-accept-layer__photo"
            width={120}
            height={120}
          />
          <figcaption className="match-accept-layer__caption">
            <p className="match-accept-layer__name">{name}</p>
            <p className="match-accept-layer__school">
              <MapPinIcon />
              <span>{school}</span>
            </p>
            {availabilityLabel ? (
              <p className="match-accept-layer__availability">
                <CalendarIcon />
                <span>{availabilityLabel}</span>
              </p>
            ) : null}
          </figcaption>
        </figure>

        <div className="match-accept-layer__actions">
          <button
            type="button"
            className="match-accept-button"
            onClick={onAccept}
            aria-label={`Accept match with ${name}`}>
            <span className="match-accept-button__fill" style={{ width: `${progress}%` }} aria-hidden="true" />
            <span className="match-accept-button__label">Accept Match?</span>
          </button>

          <button type="button" className="match-accept-layer__secondary" onClick={onKeepSearching}>
            Keep searching
          </button>
        </div>
      </div>
    </div>
  );
}
