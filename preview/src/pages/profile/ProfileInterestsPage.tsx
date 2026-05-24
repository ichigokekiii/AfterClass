import { useState } from 'react';

import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { INTEREST_OPTIONS } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileInterestsPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('interests');
  const [interests, setInterests] = useState<string[]>(draft.interests ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (interests.length === 0) {
      setError('Pick at least one interest.');
      return;
    }

    setError(undefined);
    void continueToNext({ interests });
  };

  return (
    <ProfileStepLayout
      stepId="interests"
      headline="What are you into?"
      subhead="Choose up to 5 interests to show on your profile."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <SelectionCards
        label="Interests"
        variant="grid"
        options={INTEREST_OPTIONS}
        values={interests}
        onValuesChange={setInterests}
        max={5}
        helper="Pick up to 5 interests."
        error={error}
      />
    </ProfileStepLayout>
  );
}
