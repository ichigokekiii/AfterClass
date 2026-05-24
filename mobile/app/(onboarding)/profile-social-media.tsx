import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { SOCIAL_PLATFORMS, type SocialMediaEntry } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileSocialMediaScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('social-media');
  const initial = draft.socialMedia ?? [];
  const [platforms, setPlatforms] = useState<string[]>(initial.map((entry) => entry.platform));
  const [handles, setHandles] = useState<Record<string, string>>(
    Object.fromEntries(initial.map((entry) => [entry.platform, entry.handle])),
  );
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (platforms.length === 0) {
      setError('Add at least one social account.');
      return;
    }

    const entries: SocialMediaEntry[] = platforms.map((platform) => ({
      platform,
      handle: handles[platform]?.trim() ?? '',
    }));

    if (entries.some((entry) => !entry.handle)) {
      setError('Enter a handle for each selected platform.');
      return;
    }

    setError(undefined);
    void continueToNext({ socialMedia: entries });
  };

  return (
    <ProfileStepLayout
      stepId="social-media"
      headline="Add your socials"
      subhead="Share up to 3 accounts people can find you on."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <SelectionCards
        label="Platforms"
        variant="grid"
        options={SOCIAL_PLATFORMS}
        values={platforms}
        onValuesChange={setPlatforms}
        max={3}
        helper="Pick up to 3 platforms."
        error={error && platforms.length === 0 ? error : undefined}
      />
      {platforms.map((platform) => (
        <LabeledInput
          key={platform}
          label={`${platform} handle`}
          value={handles[platform] ?? ''}
          onChangeText={(value) => setHandles((current) => ({ ...current, [platform]: value }))}
          autoCapitalize="none"
          error={error && platforms.length > 0 && !handles[platform]?.trim() ? error : undefined}
        />
      ))}
    </ProfileStepLayout>
  );
}
