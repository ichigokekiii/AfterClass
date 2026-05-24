import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileSchoolEditScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('school');
  const [schoolName, setSchoolName] = useState(draft.schoolName ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    const trimmed = schoolName.trim();
    if (!trimmed) {
      setError('Enter your school name.');
      return;
    }

    setError(undefined);
    void continueToNext({
      schoolConfirmed: false,
      schoolName: trimmed,
      schoolDomain: undefined,
    });
  };

  return (
    <ProfileStepLayout
      stepId="school"
      headline="What's your school?"
      subhead="Enter the name of the school you attend."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <LabeledInput
        label="School name"
        value={schoolName}
        onChangeText={setSchoolName}
        error={error}
      />
    </ProfileStepLayout>
  );
}
