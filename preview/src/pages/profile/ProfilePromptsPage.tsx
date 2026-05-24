import { useState } from 'react';

import { ProfilePromptComposer } from '@/components/onboarding/ProfilePromptComposer';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import type { ProfilePrompt } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfilePromptsPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('prompts');
  const [prompts, setPrompts] = useState<ProfilePrompt[]>(draft.prompts ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (prompts.length < 3) {
      setError('Add 3 prompts to continue.');
      return;
    }

    setError(undefined);
    void continueToNext({ prompts });
  };

  return (
    <ProfileStepLayout
      stepId="prompts"
      headline="Answer 3 prompts"
      subhead="Pick questions that show your personality on campus."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <ProfilePromptComposer
        prompts={prompts}
        onChange={(next) => {
          setPrompts(next);
          setError(undefined);
        }}
        max={3}
        error={error}
      />
    </ProfileStepLayout>
  );
}
