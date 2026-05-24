import { useNavigate } from 'react-router-dom';

import logoSun from '@assets/logo-sun.png';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';

export function ProfileChooserPage() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <PillButton label="Make Profile" onClick={() => navigate('/profile-name', { replace: true })} />
          <PillButton label="Review a Friend" variant="secondary" onClick={() => navigate('/review-friend')} />
        </>
      }>
      <div className="auth-page">
        <div className="auth-page__center">
          <div className="auth-page__brand">
            <img src={logoSun} alt="" className="auth-page__logo" width={88} height={88} />
            <span className="auth-page__wordmark">After Class</span>
          </div>
          <div className="auth-page__copy">
            <h1 className="auth-page__headline">What would you like to do?</h1>
            <p className="auth-page__body">Build your profile or review someone you know on campus.</p>
          </div>
        </div>
      </div>
    </OnboardingScreen>
  );
}
