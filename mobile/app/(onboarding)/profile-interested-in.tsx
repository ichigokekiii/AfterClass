import { useState } from 'react';

import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { INTERESTED_IN_DESCRIPTIONS, INTERESTED_IN_OPTIONS, withDescriptions } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileInterestedInScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('interested-in');
  const [interestedIn, setInterestedIn] = useState<string[]>(draft.interestedIn ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (interestedIn.length === 0) {
      setError('Select at least one option.');
      return;
    }

    setError(undefined);
    void continueToNext({ interestedIn });
  };

  return (
    <ProfileStepLayout
      stepId="interested-in"
      headline="Who are you interested in?"
      subhead="Choose one or more."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <SelectionCards
        label="Interested in"
        variant="list"
        options={withDescriptions(INTERESTED_IN_OPTIONS, INTERESTED_IN_DESCRIPTIONS)}
        values={interestedIn}
        onValuesChange={setInterestedIn}
        max={INTERESTED_IN_OPTIONS.length}
        error={error}
      />
    </ProfileStepLayout>
  );
}
