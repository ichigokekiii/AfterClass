import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function ProfileChooserScreen() {
  return (
    <OnboardingScreen
      showHeader={false}
      footer={
        <>
          <PillButton label="Make Profile" onPress={() => router.replace('/profile-name')} />
          <PillButton
            label="Review a Friend"
            variant="secondary"
            onPress={() => router.push('/review-friend')}
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
            <Text style={styles.headline}>What would you like to do?</Text>
            <Text style={styles.body}>Build your profile or review someone you know on campus.</Text>
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
});
