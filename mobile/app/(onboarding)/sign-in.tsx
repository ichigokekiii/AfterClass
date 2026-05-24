import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { OnboardingFlowTopBar } from '@/components/onboarding/OnboardingFlowTopBar';
import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      nextErrors.email = 'Enter your school email address.';
    } else if (!email.includes('@')) {
      nextErrors.email = 'Use a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Enter your password.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goToVerify = (verifiedEmail?: string) => {
    router.push({
      pathname: '/verify',
      params: verifiedEmail ? { email: verifiedEmail, intent: 'sign-in' } : { intent: 'sign-in' },
    });
  };

  const handleSignIn = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setLoading(false);
    goToVerify(email.trim());
  };

  const handleGoogleSignIn = async () => {
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
          <Text style={styles.headline}>Welcome Back</Text>
          <Text style={styles.subhead}>Sign in with your verified .edu account.</Text>
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
            error={errors.email}
          />
          <LabeledInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
            textContentType="password"
            error={errors.password}
          />
          <PillButton label="Sign in" onPress={handleSignIn} loading={loading} />
        </View>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.alternatives}>
          <PillButton
            label="Sign in with Google"
            variant="secondary"
            onPress={handleGoogleSignIn}
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
