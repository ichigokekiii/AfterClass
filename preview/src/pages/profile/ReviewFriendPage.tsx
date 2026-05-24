import { useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';

export function ReviewFriendPage() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <OnboardingFlowTopBar onBack={() => navigate(-1)} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">Review a Friend</h1>
          <p className="sign-in-page__subhead">
            Soon you will be able to answer a few questions about a friend who already uses After Class.
          </p>
        </div>

        <div className="profile-placeholder">
          <p className="profile-placeholder__body">This flow is coming soon.</p>
          <PillButton label="Back" variant="secondary" onClick={() => navigate('/profile-chooser')} />
        </div>
      </div>
    </OnboardingScreen>
  );
}
