import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileFavoriteSpotsScreen() {
  const { draft, loading, continueToNext, skipStep, goBack } = useProfileStep('favorite-spots');
  const [favoriteSpots, setFavoriteSpots] = useState(draft.favoriteSpots?.join(', ') ?? '');

  const handleContinue = () => {
    const list = favoriteSpots
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
    void continueToNext({ favoriteSpots: list.length ? list : undefined });
  };

  return (
    <ProfileStepLayout
      stepId="favorite-spots"
      headline="Favorite spots"
      subhead="Campus or nearby places you love. Optional."
      onBack={goBack}
      onContinue={handleContinue}
      onSkip={skipStep}
      loading={loading}
      continueLabel="Finish">
      <LabeledInput
        label="Favorite spots"
        placeholder="e.g. Main library cafe, north quad, ramen spot"
        value={favoriteSpots}
        onChangeText={setFavoriteSpots}
      />
    </ProfileStepLayout>
  );
}
