import meetupMapImage from '@assets/meetup-map.png';
import meetupVenueImage from '@assets/meetup-venue.png';
import logoSun from '@assets/logo-sun.png';

type MeetupMapPreviewProps = {
  matchPhotoUrl: string;
  matchLabel: string;
  className?: string;
};

function MapPinIcon() {
  return (
    <svg className="meetup-page__pin-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 4C16.27 4 10 10.27 10 18c0 10.5 14 26 14 26s7-7.75 7-13c0-7.73-6.27-14-14-14Zm0 18.5A4.5 4.5 0 1 1 24 13.5a4.5 4.5 0 0 1 0 9Z"
        fill="var(--color-primary)"
      />
    </svg>
  );
}

type MapMarkerProps = {
  photoUrl: string;
  label: string;
  className: string;
};

function MapMarker({ photoUrl, label, className }: MapMarkerProps) {
  return (
    <div className={`meetup-page__marker ${className}`} aria-label={label}>
      <MapPinIcon />
      <img src={photoUrl} alt="" className="meetup-page__marker-photo" width={28} height={28} />
    </div>
  );
}

export function MeetupMapPreview({ matchPhotoUrl, matchLabel, className = '' }: MeetupMapPreviewProps) {
  return (
    <div className={`meetup-map-preview ${className}`.trim()} aria-hidden="true">
      <img src={meetupMapImage} alt="" className="meetup-map-preview__image" />

      <div className="meetup-map-preview__ui">
        <svg className="meetup-page__route" viewBox="0 0 402 505" preserveAspectRatio="none">
          <path
            d="M90 204 C 140 170, 170 250, 194 284 C 218 318, 270 340, 317 364"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeDasharray="8 8"
            strokeLinecap="round"
          />
        </svg>

        <MapMarker photoUrl={logoSun} label="Your location" className="meetup-page__marker--self" />
        <MapMarker photoUrl={matchPhotoUrl} label={matchLabel} className="meetup-page__marker--match" />

        <div className="meetup-page__venue-marker">
          <span className="meetup-page__venue-ring" />
          <img src={meetupVenueImage} alt="" className="meetup-page__venue-thumb" width={72} height={72} />
        </div>
      </div>
    </div>
  );
}
