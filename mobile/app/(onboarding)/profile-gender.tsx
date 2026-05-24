import { useState } from 'react';

import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { GENDER_OPTIONS } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileGenderScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('gender');
  const [gender, setGender] = useState(draft.gender ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (!gender) {
      setError('Select your gender.');
      return;
    }

    setError(undefined);
    void continueToNext({ gender });
  };

  return (
    <ProfileStepLayout
      stepId="gender"
      headline="How do you identify?"
      subhead="This helps us show you to the right people."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <SelectionCards
        label="Gender"
        variant="grid"
        options={GENDER_OPTIONS}
        value={gender}
        onChange={setGender}
        error={error}
      />
    </ProfileStepLayout>
  );
}
