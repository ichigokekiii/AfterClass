import { useState } from 'react';

import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { ARCHETYPE_DESCRIPTIONS, ARCHETYPE_OPTIONS, withDescriptions } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileArchetypePage() {
  const { draft, loading, continueToNext, skipStep, goBack } = useProfileStep('archetype');
  const [archetype, setArchetype] = useState(draft.archetype ?? '');

  const handleContinue = () => {
    void continueToNext({ archetype: archetype || undefined });
  };

  return (
    <ProfileStepLayout
      stepId="archetype"
      headline="School archetype"
      subhead="Pick the campus vibe that fits you best. Optional."
      onBack={goBack}
      onContinue={handleContinue}
      onSkip={skipStep}
      loading={loading}>
      <SelectionCards
        label="Archetype"
        variant="grid"
        options={withDescriptions(ARCHETYPE_OPTIONS, ARCHETYPE_DESCRIPTIONS)}
        value={archetype}
        onChange={setArchetype}
      />
    </ProfileStepLayout>
  );
}
