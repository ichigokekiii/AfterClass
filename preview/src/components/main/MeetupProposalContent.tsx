import meetupVenueImage from '@assets/meetup-venue.png';

import { ProfileDetailSections } from '@/components/main/ProfileDetailSections';
import type { DiscoveryProfile } from '@/constants/discovery';
import type { MeetupProposal } from '@/constants/meetup';
import { formatMatchAvailability, getMatchAvailability } from '@/constants/meetup';

type MeetupProposalContentProps = {
  profile: DiscoveryProfile;
  proposal: MeetupProposal;
  showProfileSections?: boolean;
};

export function MeetupProposalContent({
  profile,
  proposal,
  showProfileSections = true,
}: MeetupProposalContentProps) {
  const availability = getMatchAvailability(profile.id);
  const availabilityLabel = availability ? formatMatchAvailability(availability) : null;

  return (
    <>
      <section className="profile-detail-sheet__section meetup-page__intro">
        <h3 className="profile-detail-sheet__section-title">Found a Spot for you!</h3>
        <p className="meetup-page__summary">
          Oh hey — you both said you&apos;re open to meeting. You both set a{' '}
          <strong>{proposal.radiusKm} km</strong> radius. Your shared best daytime options are around{' '}
          <strong>{proposal.areaLabel}</strong>. I&apos;m suggesting you meet at{' '}
          <strong>{proposal.venueName}</strong>.
        </p>

        {availabilityLabel ? (
          <p className="match-detail-sheet__availability">
            Scheduled for <strong>{availabilityLabel}</strong>
          </p>
        ) : null}

        <img
          src={meetupVenueImage}
          alt={`${proposal.venueName} interior`}
          className="meetup-page__venue-photo"
          width={342}
          height={150}
        />

        <p className="meetup-page__venue-caption">{proposal.venueDescription}</p>
      </section>

      {showProfileSections ? <ProfileDetailSections profile={profile} /> : null}
    </>
  );
}
