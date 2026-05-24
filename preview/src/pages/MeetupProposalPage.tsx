import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { MeetupMapPreview } from '@/components/main/MeetupMapPreview';
import { MeetupProposalContent } from '@/components/main/MeetupProposalContent';
import { PillButton } from '@/components/onboarding/PillButton';
import { ProfileDetailHeader } from '@/components/main/ProfileDetailSections';
import { addConfirmedMatch } from '@/constants/confirmedMatches';
import { getDiscoveryDisplayName } from '@/constants/discovery';
import { getMatchProfile, getMeetupProposal } from '@/constants/meetup';

export function MeetupProposalPage() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();
  const profile = getMatchProfile(matchId);
  const proposal = getMeetupProposal(matchId);

  if (!profile || !proposal) {
    return <Navigate to="/home" replace />;
  }

  const matchName = getDiscoveryDisplayName(profile);

  const handleConfirm = () => {
    addConfirmedMatch(profile.id);
    navigate('/home');
  };

  return (
    <div className="meetup-page">
      <section className="meetup-page__map" aria-label="Suggested meetup map">
        <MeetupMapPreview
          matchPhotoUrl={profile.photoUrl}
          matchLabel={`${matchName}'s location`}
          className="meetup-page__map-frame"
        />

        <button
          type="button"
          className="meetup-page__back"
          aria-label="Go back"
          onClick={() => navigate('/home')}>
          ←
        </button>
      </section>

      <div className="meetup-page__sheet-host">
        <section
          className="meetup-page__panel profile-detail-sheet__panel"
          aria-labelledby="meetup-sheet-title">
          <div className="profile-detail-sheet__handle" aria-hidden="true" />

          <ProfileDetailHeader profile={profile} titleId="meetup-sheet-title" />

          <div className="profile-detail-sheet__body">
            <MeetupProposalContent profile={profile} proposal={proposal} showProfileSections />
          </div>

          <div className="meetup-page__footer">
            <PillButton
              label="Confirm Match"
              onClick={handleConfirm}
              aria-label={`Confirm meetup with ${matchName} at ${proposal.venueName}`}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
