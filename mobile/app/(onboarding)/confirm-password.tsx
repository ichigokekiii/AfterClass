import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { isPasswordValid } from '@/constants/auth';
import { clearPendingRegistration, getPendingRegistration } from '@/constants/authFlow';
import { initProfileFromEmail } from '@/constants/profileFlow';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function ConfirmPasswordScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const normalizedEmail = typeof email === 'string' ? email.trim() : getPendingRegistration()?.email?.trim();
  const password = getPendingRegistration()?.password ?? '';
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!isPasswordValid(password)) {
      router.replace({
        pathname: '/create-password',
        params: normalizedEmail ? { email: normalizedEmail } : undefined,
      });
    }
  }, [normalizedEmail, password]);

  const validate = () => {
    if (!confirmPassword) {
      setError('Confirm your password.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    setError(undefined);
    return true;
  };

  const handleContinue = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    clearPendingRegistration();
    initProfileFromEmail(normalizedEmail);
    router.replace('/profile-chooser');
  };

  if (!isPasswordValid(password)) {
    return null;
  }

  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <OnboardingFlowTopBar onBack={() => router.back()} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Confirm your password</Text>
          <Text style={styles.subhead}>Enter your password again to finish setting up your account.</Text>
        </View>

        <View style={styles.form}>
          <LabeledInput
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            error={error}
          />
          <PillButton label="Continue" onPress={handleContinue} loading={loading} />
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
  form: {
    gap: theme.spacing.md,
  },
});
