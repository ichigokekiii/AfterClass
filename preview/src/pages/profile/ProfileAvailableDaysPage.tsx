import { useState } from 'react';

import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { AVAILABLE_DAY_OPTIONS } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileAvailableDaysPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('available-days');
  const [availableDays, setAvailableDays] = useState<string[]>(draft.availableDays ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (availableDays.length === 0) {
      setError('Pick at least one day you are available.');
      return;
    }

    setError(undefined);
    void continueToNext({ availableDays });
  };

  return (
    <ProfileStepLayout
      stepId="available-days"
      headline="What days are you available?"
      subhead="Pick the weekdays when a daytime meetup could work for you."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <SelectionCards
        label="Available days"
        variant="grid"
        options={AVAILABLE_DAY_OPTIONS}
        values={availableDays}
        onValuesChange={setAvailableDays}
        max={AVAILABLE_DAY_OPTIONS.length}
        helper="Select every day that usually works."
        error={error}
      />
    </ProfileStepLayout>
  );
}
