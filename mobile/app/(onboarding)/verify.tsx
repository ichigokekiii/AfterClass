import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { OnboardingAuthIntent } from '@/constants/auth';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function VerifyScreen() {
  const { email, intent } = useLocalSearchParams<{ email?: string; intent?: string }>();
  const normalizedEmail = typeof email === 'string' ? email.trim() : '';
  const authIntent: OnboardingAuthIntent = intent === 'register' ? 'register' : 'sign-in';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const validate = () => {
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from your email.');
      return false;
    }

    setError(undefined);
    return true;
  };

  const handleVerify = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);

    if (authIntent === 'register') {
      router.push({
        pathname: '/create-password',
        params: normalizedEmail ? { email: normalizedEmail } : undefined,
      });
      return;
    }

    router.replace('/(tabs)');
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setResending(false);
  };

  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <OnboardingFlowTopBar onBack={() => router.back()} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Verify your email</Text>
          <Text style={styles.subhead}>
            {normalizedEmail ? (
              <>
                We sent a 6-digit code to <Text style={styles.subheadStrong}>{normalizedEmail}</Text>. Enter it below
                to continue.
              </>
            ) : (
              'We sent a 6-digit code to your school email. Enter it below to continue.'
            )}
          </Text>
        </View>

        <View style={styles.form}>
          <LabeledInput
            label="Verification code"
            value={code}
            onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))}
            keyboardType="number-pad"
            autoComplete="one-time-code"
            textContentType="oneTimeCode"
            maxLength={6}
            error={error}
            placeholder="000000"
          />
          <PillButton label="Verify" onPress={handleVerify} loading={loading} />
        </View>

        <Pressable
          onPress={handleResend}
          disabled={resending}
          accessibilityRole="button"
          accessibilityLabel="Resend verification code"
          style={styles.textButton}>
          <Text style={styles.textButtonLabel}>{resending ? 'Sending…' : 'Resend code'}</Text>
        </Pressable>
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
  subheadStrong: {
    fontWeight: '600',
    color: theme.colors.text,
  },
  form: {
    gap: theme.spacing.md,
  },
  textButton: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  textButtonLabel: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
});
