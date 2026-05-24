import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { OnboardingAuthIntent } from '@/constants/auth';

export function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Enter your school email address.');
      return false;
    }

    if (!email.includes('@')) {
      setEmailError('Use a valid email address.');
      return false;
    }

    if (!email.includes('.edu')) {
      setEmailError('Use your approved school .edu email address.');
      return false;
    }

    setEmailError(undefined);
    return true;
  };

  const goToVerify = (verifiedEmail?: string) => {
    navigate('/verify', { state: { email: verifiedEmail, intent: 'register' satisfies OnboardingAuthIntent } });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    goToVerify(email.trim());
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setGoogleLoading(false);
    goToVerify();
  };

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <OnboardingFlowTopBar onBack={() => navigate(-1)} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">Create Account</h1>
          <p className="sign-in-page__subhead">Sign up with your approved .edu email to get started.</p>
        </div>

        <form className="sign-in-page__form" onSubmit={handleSubmit} noValidate>
          <LabeledInput
            label="School email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError}
          />
          <PillButton label="Continue" type="submit" loading={loading} />
        </form>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__text">or</span>
          <span className="divider__line" />
        </div>

        <div className="sign-in-page__alternatives">
          <PillButton
            label="Continue with Google"
            variant="secondary"
            onClick={handleGoogleSignUp}
            loading={googleLoading}
          />
        </div>
      </div>
    </OnboardingScreen>
  );
}
