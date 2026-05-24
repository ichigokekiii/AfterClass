import { ProfileProgressBar } from '@/components/onboarding/ProfileProgressBar';
import type { ProfileStepId } from '@/constants/profile';
import { getProfileStepProgress } from '@/constants/profile';

type ProfileFlowTopBarProps = {
  stepId: ProfileStepId;
  onBack?: () => void;
  showBack?: boolean;
};

export function ProfileFlowTopBar({ stepId, onBack, showBack = true }: ProfileFlowTopBarProps) {
  const { current, total } = getProfileStepProgress(stepId);

  return (
    <div className={`profile-flow-topbar${showBack ? '' : ' profile-flow-topbar--no-back'}`}>
      {showBack ? (
        <button type="button" className="back-button" onClick={onBack} aria-label="Go back">
          ←
        </button>
      ) : (
        <span className="profile-flow-topbar__side" aria-hidden="true" />
      )}
      <div className="profile-flow-topbar__center">
        <ProfileProgressBar current={current} total={total} />
      </div>
      <span className="profile-flow-topbar__side" aria-hidden="true" />
    </div>
  );
}
