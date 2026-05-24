import { useEffect, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { detectSchoolFromEmail } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileSchoolScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('school');
  const detected = useMemo(() => detectSchoolFromEmail(draft.email), [draft.email]);

  useEffect(() => {
    if (!detected) {
      router.replace('/profile-school-edit');
    }
  }, [detected]);

  const handleYes = () => {
    if (!detected) {
      return;
    }

    void continueToNext({
      schoolConfirmed: true,
      schoolName: detected.name,
      schoolDomain: detected.domain,
    });
  };

  const handleNo = () => {
    router.push('/profile-school-edit');
  };

  if (!detected) {
    return null;
  }

  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <PillButton label="Yes, its correct" onPress={handleYes} loading={loading} />
          <PillButton
            label="No, Its wrong"
            variant="secondary"
            onPress={handleNo}
            disabled={loading}
          />
        </>
      }>
      <View style={styles.page}>
        <ProfileFlowTopBar stepId="school" onBack={goBack} />

        <View style={styles.content}>
          <View style={styles.intro}>
            <Text style={styles.headline}>Is this your school?</Text>
            <Text style={styles.subhead}>We found this school from your email.</Text>
          </View>

          <View style={styles.schoolDisplay} accessibilityLabel="Detected school">
            <Text style={styles.schoolName}>{detected.name}</Text>
          </View>
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: 20,
  },
  content: {
    flex: 1,
    gap: 20,
  },
  intro: {
    gap: theme.spacing.sm,
  },
  headline: {
    ...typeScale.title1,
    color: theme.colors.text,
  },
  subhead: {
    ...typeScale.subhead,
    color: theme.colors.textMuted,
  },
  schoolDisplay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.section,
  },
  schoolName: {
    ...typeScale.title2,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
});
