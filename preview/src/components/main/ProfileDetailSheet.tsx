import type { DiscoveryProfile } from '@/constants/discovery';
import { ProfileDetailHeader, ProfileDetailSections } from '@/components/main/ProfileDetailSections';
import { PillButton } from '@/components/onboarding/PillButton';

type ProfileDetailSheetProps = {
  profile: DiscoveryProfile | null;
  onClose: () => void;
  onNotInterested?: () => void;
  onInterested?: () => void;
};

export function ProfileDetailSheet({
  profile,
  onClose,
  onNotInterested,
  onInterested,
}: ProfileDetailSheetProps) {
  if (!profile) {
    return null;
  }

  return (
    <div className="profile-detail-sheet" role="presentation">
      <button type="button" className="profile-detail-sheet__backdrop" aria-label="Close profile" onClick={onClose} />

      <div
        className="profile-detail-sheet__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-detail-title">
        <div className="profile-detail-sheet__handle" aria-hidden="true" />

        <ProfileDetailHeader profile={profile} titleId="profile-detail-title" onClose={onClose} />

        <div className="profile-detail-sheet__body">
          <ProfileDetailSections profile={profile} />
        </div>

        <div className="profile-detail-sheet__footer profile-detail-sheet__footer--split">
          <PillButton
            label="Not Interested"
            variant="secondary"
            onClick={onNotInterested}
            aria-label="Not interested in this profile"
          />
          <PillButton
            label="Interested"
            onClick={onInterested}
            aria-label="Interested in this profile"
          />
        </div>
      </div>
    </div>
  );
}
