import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';

import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { ResidenceAutocomplete } from '@/components/onboarding/ResidenceAutocomplete';
import { getResidenceSuggestions } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileResidenceScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('residence');
  const suggestions = useMemo(
    () => getResidenceSuggestions(draft.schoolDomain, draft.schoolName),
    [draft.schoolDomain, draft.schoolName],
  );
  const [residence, setResidence] = useState(draft.residence ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    const trimmed = residence.trim();
    if (!trimmed) {
      setError('Enter or select where you live.');
      return;
    }

    const matchedSuggestion = suggestions.some(
      (entry) => entry.toLowerCase() === trimmed.toLowerCase(),
    );

    setError(undefined);
    void continueToNext({
      residence: trimmed,
      residenceSource: matchedSuggestion ? 'suggestion' : 'custom',
      residenceLatitude: undefined,
      residenceLongitude: undefined,
    });
  };

  return (
    <ProfileStepLayout
      stepId="residence"
      headline="Where do you live?"
      subhead="Search for your dorm or area, or pin it on a map."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <ResidenceAutocomplete
        label="Location of residence"
        value={residence}
        onChange={setResidence}
        suggestions={suggestions}
        error={error}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Pin on map instead"
        disabled={loading}
        onPress={() => router.push('/profile-residence-map')}
        style={styles.mapLink}>
        <Text style={styles.mapLinkLabel}>Pin on map instead</Text>
      </Pressable>
    </ProfileStepLayout>
  );
}

const styles = StyleSheet.create({
  mapLink: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  mapLinkLabel: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
});
