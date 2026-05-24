import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileNameScreen() {
  const { draft, loading, continueToNext } = useProfileStep('name');
  const [name, setName] = useState(draft.displayName ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Enter the name you want on your profile.');
      return;
    }

    setError(undefined);
    void continueToNext({ displayName: trimmed });
  };

  return (
    <ProfileStepLayout
      stepId="name"
      headline="What should we call you?"
      subhead="This is the name people will see on your profile."
      showBack={false}
      onContinue={handleContinue}
      loading={loading}>
      <LabeledInput
        label="Display name"
        autoComplete="name"
        textContentType="name"
        value={name}
        onChangeText={setName}
        error={error}
      />
    </ProfileStepLayout>
  );
}
