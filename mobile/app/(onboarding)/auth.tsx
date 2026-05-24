import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { TAGLINE } from '@/constants/onboarding';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function AuthScreen() {
  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <Text style={styles.helper}>
            Use your approved .edu email or Google with the same school identity.
          </Text>
          <PillButton
            label="Create Account"
            onPress={() => router.push('/register')}
            accessibilityHint="Start creating a new After Class account"
          />
          <PillButton
            label="Sign In"
            variant="secondary"
            onPress={() => router.push('/sign-in')}
            accessibilityHint="Sign in to your existing account"
          />
        </>
      }>
      <View style={styles.page}>
        <View style={styles.center}>
          <View style={styles.brand}>
            <Image
              source={require('@/assets/images/logo-sun.png')}
              style={styles.logo}
              accessibilityLabel="After Class logo"
            />
            <Text style={styles.wordmark}>After Class</Text>
          </View>
          <View style={styles.copy}>
            <Text style={styles.headline}>Start Meeting After Class!</Text>
            <Text style={styles.body}>{TAGLINE}</Text>
          </View>
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.section,
  },
  brand: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  copy: {
    alignItems: 'center',
    gap: theme.spacing.md,
    maxWidth: 344,
  },
  logo: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  wordmark: {
    ...typeScale.title3,
    color: theme.colors.coralBrand,
  },
  headline: {
    ...typeScale.largeTitle,
    color: theme.colors.text,
    textAlign: 'center',
  },
  body: {
    ...typeScale.body,
    color: theme.colors.text,
    textAlign: 'center',
  },
  helper: {
    ...typeScale.subhead,
    color: theme.colors.textMuted,
    textAlign: 'center',
    maxWidth: theme.layout.buttonMaxWidth,
  },
});
