import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PasswordRequirements } from '@/components/onboarding/PasswordRequirements';
import { PillButton } from '@/components/onboarding/PillButton';
import { isPasswordValid, validateNewPassword } from '@/constants/auth';
import { setPendingRegistration } from '@/constants/authFlow';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function CreatePasswordScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const normalizedEmail = typeof email === 'string' ? email.trim() : undefined;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = async () => {
    if (!isPasswordValid(password)) {
      setError(validateNewPassword(password));
      return;
    }

    setError(undefined);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);

    setPendingRegistration({ email: normalizedEmail, password });
    router.push({
      pathname: '/confirm-password',
      params: normalizedEmail ? { email: normalizedEmail } : undefined,
    });
  };

  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <OnboardingFlowTopBar onBack={() => router.back()} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Create your password</Text>
          <Text style={styles.subhead}>Choose a password to secure your After Class account.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.passwordFieldGroup}>
            <LabeledInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              textContentType="newPassword"
              error={error}
            />
            <PasswordRequirements password={password} />
          </View>
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
  passwordFieldGroup: {
    gap: theme.spacing.sm,
  },
  form: {
    gap: theme.spacing.md,
  },
});
