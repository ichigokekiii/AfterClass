import { useState } from 'react';

import { FreeTimePicker } from '@/components/onboarding/FreeTimePicker';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileFreeTimesPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('free-times');
  const [freeTimes, setFreeTimes] = useState<string[]>(draft.freeTimes ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (freeTimes.length === 0) {
      setError('Add at least one time when you are usually free.');
      return;
    }

    setError(undefined);
    void continueToNext({ freeTimes });
  };

  return (
    <ProfileStepLayout
      stepId="free-times"
      headline="What time are you usually free?"
      subhead="Daytime only — between 8:00 AM and 6:00 PM."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <FreeTimePicker label="Free times" values={freeTimes} onChange={setFreeTimes} max={3} error={error} />
    </ProfileStepLayout>
  );
}
