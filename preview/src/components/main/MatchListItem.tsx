import type { ConfirmedMatch } from '@/constants/confirmedMatches';
import { getDiscoveryDisplayName, getDiscoverySchool } from '@/constants/discovery';
import { formatMatchAvailability, getMatchAvailability, getMatchProfile } from '@/constants/meetup';

type MatchListItemProps = {
  match: ConfirmedMatch;
  countdown: string;
  onOpen: () => void;
};

export function MatchListItem({ match, countdown, onOpen }: MatchListItemProps) {
  const profile = getMatchProfile(match.profileId);
  if (!profile) {
    return null;
  }

  const name = getDiscoveryDisplayName(profile);
  const school = getDiscoverySchool(profile);
  const availability = getMatchAvailability(match.profileId);
  const availabilityLabel = availability ? formatMatchAvailability(availability) : 'Date pending';

  return (
    <button type="button" className="match-list-item" onClick={onOpen} aria-label={`Open meetup details for ${name}`}>
      <img src={profile.photoUrl} alt="" className="match-list-item__photo" width={64} height={64} />

      <span className="match-list-item__content">
        <span className="match-list-item__top">
          <span className="match-list-item__name">{name}</span>
          <span className="match-list-item__expiry" aria-live="polite">
            Expires in {countdown}
          </span>
        </span>

        <span className="match-list-item__school">{school}</span>
        <span className="match-list-item__availability">{availabilityLabel}</span>
      </span>

      <span className="match-list-item__chevron" aria-hidden="true">
        ›
      </span>
    </button>
  );
}
