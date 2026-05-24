import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { detectSchoolFromEmail } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileSchoolPage() {
  const navigate = useNavigate();
  const { draft, loading, continueToNext, goBack } = useProfileStep('school');
  const detected = useMemo(() => detectSchoolFromEmail(draft.email), [draft.email]);

  useEffect(() => {
    if (!detected) {
      navigate('/profile-school-edit', { replace: true });
    }
  }, [detected, navigate]);

  const handleYes = () => {
    if (!detected) {
      return;
    }

    void continueToNext({
      schoolConfirmed: true,
      schoolName: detected.name,
      schoolDomain: detected.domain,
    });
  };

  const handleNo = () => {
    navigate('/profile-school-edit');
  };

  if (!detected) {
    return null;
  }

  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <PillButton label="Yes, its correct" onClick={handleYes} loading={loading} />
          <PillButton label="No, Its wrong" variant="secondary" onClick={handleNo} disabled={loading} />
        </>
      }>
      <div className="profile-step-page">
        <ProfileFlowTopBar stepId="school" onBack={goBack} />

        <div className="profile-school-page">
          <div className="sign-in-page__intro">
            <h1 className="sign-in-page__headline">Is this your school?</h1>
            <p className="sign-in-page__subhead">We found this school from your email.</p>
          </div>

          <div className="profile-school-display" aria-label="Detected school">
            <p className="profile-school-display__name">{detected.name}</p>
          </div>
        </div>
      </div>
    </OnboardingScreen>
  );
}
