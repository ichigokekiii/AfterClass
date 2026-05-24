import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { isPasswordValid, type ConfirmPasswordLocationState } from '@/constants/auth';
import { initProfileFromEmail } from '@/constants/profileFlow';

export function ConfirmPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as ConfirmPasswordLocationState | null) ?? {};
  const email = state.email?.trim();
  const password = state.password ?? '';
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!isPasswordValid(password)) {
      navigate('/create-password', { replace: true, state: { email } });
    }
  }, [email, navigate, password]);

  const validate = () => {
    if (!confirmPassword) {
      setError('Confirm your password.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    setError(undefined);
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    initProfileFromEmail(email);
    navigate('/profile-chooser', { replace: true });
  };

  if (!isPasswordValid(password)) {
    return null;
  }

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <OnboardingFlowTopBar onBack={() => navigate(-1)} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">Confirm your password</h1>
          <p className="sign-in-page__subhead">Enter your password again to finish setting up your account.</p>
        </div>

        <form className="sign-in-page__form" onSubmit={handleSubmit} noValidate>
          <LabeledInput
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={error}
          />
          <PillButton label="Continue" type="submit" loading={loading} />
        </form>
      </div>
    </OnboardingScreen>
  );
}
