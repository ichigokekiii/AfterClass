import type { FormEvent } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { OnboardingAuthIntent } from '@/constants/auth';

export function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = 'Enter your school email address.';
    } else if (!email.includes('@')) {
      nextErrors.email = 'Use a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Enter your password.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToVerify = (verifiedEmail?: string) => {
    navigate('/verify', { state: { email: verifiedEmail, intent: 'sign-in' satisfies OnboardingAuthIntent } });
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

  const handleGoogleSignIn = async () => {
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
          <h1 className="sign-in-page__headline">Welcome Back</h1>
          <p className="sign-in-page__subhead">Sign in with your verified .edu account.</p>
        </div>

        <form className="sign-in-page__form" onSubmit={handleSubmit} noValidate>
          <LabeledInput
            label="School email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={errors.email}
          />
          <LabeledInput
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <PillButton label="Sign in" type="submit" loading={loading} />
        </form>

        <div className="divider">
          <span className="divider__line" />
          <span className="divider__text">or</span>
          <span className="divider__line" />
        </div>

        <div className="sign-in-page__alternatives">
          <PillButton
            label="Sign in with Google"
            variant="secondary"
            onClick={handleGoogleSignIn}
            loading={googleLoading}
          />
        </div>
      </div>
    </OnboardingScreen>
  );
}
