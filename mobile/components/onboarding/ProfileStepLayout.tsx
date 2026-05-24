import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import type { ProfileStepId } from '@/constants/profile';
import { isOptionalProfileStep } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type ProfileStepLayoutProps = {
  stepId: ProfileStepId;
  headline: string;
  subhead?: string;
  onBack?: () => void;
  showBack?: boolean;
  onContinue: () => void;
  onSkip?: () => void;
  loading?: boolean;
  continueLabel?: string;
  children: ReactNode;
};

export function ProfileStepLayout({
  stepId,
  headline,
  subhead,
  onBack,
  showBack = true,
  onContinue,
  onSkip,
  loading = false,
  continueLabel = 'Continue',
  children,
}: ProfileStepLayoutProps) {
  const skippable = isOptionalProfileStep(stepId);

  return (
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.content}>
        <ProfileFlowTopBar stepId={stepId} onBack={onBack} showBack={showBack} />

        <View style={styles.intro}>
          <Text style={styles.headline}>{headline}</Text>
          {subhead ? <Text style={styles.subhead}>{subhead}</Text> : null}
        </View>

        <View style={styles.form}>{children}</View>

        <View style={styles.actions}>
          <PillButton label={continueLabel} onPress={onContinue} loading={loading} />
          {skippable && onSkip ? (
            <Pressable
              onPress={onSkip}
              disabled={loading}
              accessibilityRole="button"
              accessibilityLabel="Skip for now"
              style={styles.skipButton}>
              <Text style={styles.skipLabel}>Skip for now</Text>
            </Pressable>
          ) : null}
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
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  skipButton: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  skipLabel: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
});
