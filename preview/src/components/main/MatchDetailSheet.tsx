import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MeetupMapPreview } from '@/components/main/MeetupMapPreview';
import { MeetupProposalContent } from '@/components/main/MeetupProposalContent';
import { ProfileDetailHeader } from '@/components/main/ProfileDetailSections';
import { PillButton } from '@/components/onboarding/PillButton';
import type { ConfirmedMatch } from '@/constants/confirmedMatches';
import { getDiscoveryDisplayName } from '@/constants/discovery';
import {
  formatMeetupCountdown,
  getMatchProfile,
  getMeetupProposal,
} from '@/constants/meetup';

type MatchDetailSheetProps = {
  match: ConfirmedMatch | null;
  onClose: () => void;
};

export function MatchDetailSheet({ match, onClose }: MatchDetailSheetProps) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('00:00:00');

  useEffect(() => {
    if (!match) {
      return;
    }

    setCountdown(formatMeetupCountdown(match.expiresAt));
    const intervalId = window.setInterval(() => {
      setCountdown(formatMeetupCountdown(match.expiresAt));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [match]);

  if (!match) {
    return null;
  }

  const profile = getMatchProfile(match.profileId);
  const proposal = getMeetupProposal(match.profileId);

  if (!profile || !proposal) {
    return null;
  }

  const matchName = getDiscoveryDisplayName(profile);

  return (
    <div className="match-detail-sheet" role="presentation">
      <button type="button" className="match-detail-sheet__backdrop" aria-label="Close match details" onClick={onClose} />

      <section
        className="match-detail-sheet__panel profile-detail-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-detail-title">
        <div className="profile-detail-sheet__handle" aria-hidden="true" />

        <MeetupMapPreview
          matchPhotoUrl={profile.photoUrl}
          matchLabel={`${matchName}'s location`}
          className="match-detail-sheet__map"
        />

        <ProfileDetailHeader profile={profile} titleId="match-detail-title" onClose={onClose} />

        <div className="profile-detail-sheet__body">
          <p className="match-detail-sheet__expiry" aria-live="polite">
            Match expires in <strong>{countdown}</strong>
          </p>

          <MeetupProposalContent profile={profile} proposal={proposal} />
        </div>

        <div className="match-detail-sheet__footer">
          <PillButton
            label="Meet up complete"
            onClick={() => {
              onClose();
              navigate('/meetup-complete');
            }}
            aria-label={`Mark meetup with ${matchName} as complete`}
          />
        </div>
      </section>
    </div>
  );
}
