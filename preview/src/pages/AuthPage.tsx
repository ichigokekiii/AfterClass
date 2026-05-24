import { useNavigate } from 'react-router-dom';

import logoSun from '@assets/logo-sun.png';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { TAGLINE } from '@/constants/onboarding';

export function AuthPage() {
  const navigate = useNavigate();

  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <p className="auth-page__helper">
            Use your approved .edu email or Google with the same school identity.
          </p>
          <PillButton label="Create Account" onClick={() => navigate('/register')} />
          <PillButton label="Sign In" variant="secondary" onClick={() => navigate('/sign-in')} />
        </>
      }>
      <div className="auth-page">
        <div className="auth-page__center">
          <div className="auth-page__brand">
            <img src={logoSun} alt="" className="auth-page__logo" width={88} height={88} />
            <span className="auth-page__wordmark">After Class</span>
          </div>
          <div className="auth-page__copy">
            <h1 className="auth-page__headline">Start Meeting After Class!</h1>
            <p className="auth-page__body">{TAGLINE}</p>
          </div>
        </div>
      </div>
    </OnboardingScreen>
  );
}
