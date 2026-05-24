import type { ReactNode } from 'react';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { ProfileStepId } from '@/constants/profile';
import { isOptionalProfileStep } from '@/constants/profile';

type ProfileStepLayoutProps = {
  stepId: ProfileStepId;
  headline: string;
  subhead?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  loading?: boolean;
  continueLabel?: string;
  children: ReactNode;
};

export function ProfileStepLayout({
  stepId,
  headline,
  subhead,
  onBack,
  showBack = true,
  onContinue,
  onSkip,
  loading = false,
  continueLabel = 'Continue',
  children,
}: ProfileStepLayoutProps) {
  const skippable = isOptionalProfileStep(stepId);

  return (
    <OnboardingScreen showHeader={false}>
      <div className="sign-in-page">
        <ProfileFlowTopBar stepId={stepId} onBack={onBack} showBack={showBack} />

        <div className="sign-in-page__intro">
          <h1 className="sign-in-page__headline">{headline}</h1>
          {subhead ? <p className="sign-in-page__subhead">{subhead}</p> : null}
        </div>

        <div className="sign-in-page__form">{children}</div>

        <div className="profile-step__actions">
          <PillButton label={continueLabel} onClick={onContinue} loading={loading} />
          {skippable && onSkip ? (
            <button type="button" className="text-button" onClick={onSkip} disabled={loading}>
              Skip for now
            </button>
          ) : null}
        </div>
      </div>
    </OnboardingScreen>
  );
}
