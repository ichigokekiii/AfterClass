import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function ReviewFriendScreen() {
  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <OnboardingFlowTopBar onBack={() => router.back()} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Review a Friend</Text>
          <Text style={styles.subhead}>
            Soon you will be able to answer a few questions about a friend who already uses After Class.
          </Text>
        </View>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderBody}>This flow is coming soon.</Text>
          <PillButton label="Back" variant="secondary" onPress={() => router.push('/profile-chooser')} />
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 20,
    paddingBottom: theme.spacing.section,
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
  placeholder: {
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  placeholderBody: {
    ...typeScale.body,
    color: theme.colors.textMuted,
    textAlign: 'center',
  },
});
