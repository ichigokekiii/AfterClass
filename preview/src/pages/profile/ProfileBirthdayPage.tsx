import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { calculateAge } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileBirthdayPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('birthday');
  const [birthday, setBirthday] = useState(draft.birthday ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (!birthday) {
      setError('Enter your birthday.');
      return;
    }

    const age = calculateAge(birthday);
    if (age === null) {
      setError('Enter a valid birthday.');
      return;
    }

    if (age < 18) {
      setError('You must be at least 18 to use After Class.');
      return;
    }

    setError(undefined);
    void continueToNext({ birthday });
  };

  return (
    <ProfileStepLayout
      stepId="birthday"
      headline="When is your birthday?"
      subhead="You must be 18 or older to join After Class."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <LabeledInput
        label="Birthday"
        type="date"
        value={birthday}
        onChange={(event) => setBirthday(event.target.value)}
        error={error}
      />
    </ProfileStepLayout>
  );
}
