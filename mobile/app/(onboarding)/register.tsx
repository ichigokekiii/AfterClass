import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | undefined>();

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Enter your school email address.');
      return false;
    }

    if (!email.includes('@')) {
      setEmailError('Use a valid email address.');
      return false;
    }

    if (!email.includes('.edu')) {
      setEmailError('Use your approved school .edu email address.');
      return false;
    }

    setEmailError(undefined);
    return true;
  };

  const goToVerify = (verifiedEmail?: string) => {
    router.push({
      pathname: '/verify',
      params: verifiedEmail ? { email: verifiedEmail, intent: 'register' } : { intent: 'register' },
    });
  };

  const handleContinue = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    goToVerify(email.trim());
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setGoogleLoading(false);
    goToVerify();
  };

  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <OnboardingFlowTopBar onBack={() => router.back()} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Create Account</Text>
          <Text style={styles.subhead}>Sign up with your approved .edu email to get started.</Text>
        </View>

        <View style={styles.form}>
          <LabeledInput
            label="School email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            error={emailError}
          />
          <PillButton label="Continue" onPress={handleContinue} loading={loading} />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.alternatives}>
          <PillButton
            label="Continue with Google"
            variant="secondary"
            onPress={handleGoogleSignUp}
            loading={googleLoading}
          />
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    ...typeScale.body,
    color: theme.colors.textMuted,
  },
  alternatives: {
    alignItems: 'center',
    width: '100%',
  },
});
