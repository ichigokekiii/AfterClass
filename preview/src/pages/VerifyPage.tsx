import type { FormEvent } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { VerifyLocationState } from '@/constants/auth';

export function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const verifyState = (location.state as VerifyLocationState | null) ?? {};
  const email = verifyState.email?.trim();
  const intent = verifyState.intent ?? 'sign-in';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validate = () => {
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from your email.');
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

    if (intent === 'register') {
      navigate('/create-password', { state: { email } });
      return;
    }

    navigate('/home');
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setResending(false);
  };

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <OnboardingFlowTopBar onBack={() => navigate(-1)} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">Verify your email</h1>
          <p className="sign-in-page__subhead">
            {email ? (
              <>
                We sent a 6-digit code to <strong>{email}</strong>. Enter it below to continue.
              </>
            ) : (
              'We sent a 6-digit code to your school email. Enter it below to continue.'
            )}
          </p>
        </div>

        <form className="sign-in-page__form" onSubmit={handleSubmit} noValidate>
          <LabeledInput
            label="Verification code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
            error={error}
            placeholder="000000"
          />
          <PillButton label="Verify" type="submit" loading={loading} />
        </form>

        <button type="button" className="text-button" onClick={handleResend} disabled={resending}>
          {resending ? 'Sending…' : 'Resend code'}
        </button>
      </div>
    </OnboardingScreen>
  );
}
