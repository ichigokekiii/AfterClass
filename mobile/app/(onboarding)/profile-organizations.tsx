import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileOrganizationsScreen() {
  const { draft, loading, continueToNext, skipStep, goBack } = useProfileStep('organizations');
  const [organizations, setOrganizations] = useState(draft.organizations?.join(', ') ?? '');

  const handleContinue = () => {
    const list = organizations
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    void continueToNext({ organizations: list.length ? list : undefined });
  };

  return (
    <ProfileStepLayout
      stepId="organizations"
      headline="School organizations"
      subhead="Clubs, teams, or groups you are part of. Optional."
      onBack={goBack}
      onContinue={handleContinue}
      onSkip={skipStep}
      loading={loading}>
      <LabeledInput
        label="Organizations"
        placeholder="e.g. Debate Club, Soccer, Film Society"
        value={organizations}
        onChangeText={setOrganizations}
      />
    </ProfileStepLayout>
  );
}
