import type { FormEvent } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PasswordRequirements } from '@/components/onboarding/PasswordRequirements';
import { PillButton } from '@/components/onboarding/PillButton';
import { isPasswordValid, validateNewPassword, type CreatePasswordLocationState } from '@/constants/auth';

export function CreatePasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as CreatePasswordLocationState | null)?.email?.trim();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isPasswordValid(password)) {
      setError(validateNewPassword(password));
      return;
    }

    setError(undefined);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    navigate('/confirm-password', { state: { email, password } });
  };

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <OnboardingFlowTopBar onBack={() => navigate(-1)} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">Create your password</h1>
          <p className="sign-in-page__subhead">Choose a password to secure your After Class account.</p>
        </div>

        <form className="sign-in-page__form" onSubmit={handleSubmit} noValidate>
          <div className="sign-in-page__field-group">
            <LabeledInput
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={error}
            />
            <PasswordRequirements password={password} />
          </div>
          <PillButton label="Continue" type="submit" loading={loading} />
        </form>
      </div>
    </OnboardingScreen>
  );
}
