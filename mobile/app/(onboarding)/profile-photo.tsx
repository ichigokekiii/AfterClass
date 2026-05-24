import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfilePhotoScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('photo');
  const [photoName, setPhotoName] = useState(draft.photoName ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleUpload = () => {
    setPhotoName('profile-photo.jpg');
    setError(undefined);
  };

  const handleContinue = () => {
    if (!photoName) {
      setError('Add one profile photo to continue.');
      return;
    }

    setError(undefined);
    void continueToNext({ photoName });
  };

  return (
    <ProfileStepLayout
      stepId="photo"
      headline="Add your photo"
      subhead="One clear photo of you — face visible, campus-friendly."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Tap to add photo"
        onPress={handleUpload}
        style={styles.upload}>
        <Text style={styles.placeholder}>{photoName ? 'Photo selected' : 'Tap to add photo'}</Text>
      </Pressable>
      {photoName ? <Text style={styles.hint}>{photoName}</Text> : null}
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </ProfileStepLayout>
  );
}

const styles = StyleSheet.create({
  upload: {
    minHeight: 200,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  placeholder: {
    ...typeScale.subhead,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
  hint: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
