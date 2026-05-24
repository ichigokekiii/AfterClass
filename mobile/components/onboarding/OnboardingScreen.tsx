import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/onboarding/AppHeader';
import { theme } from '@/constants/theme';

type OnboardingScreenProps = {
  children: ReactNode;
  footer?: ReactNode;
  scrollable?: boolean;
  showHeader?: boolean;
};

export function OnboardingScreen({
  children,
  footer,
  scrollable = false,
  showHeader = true,
}: OnboardingScreenProps) {
  const content = (
    <View style={styles.content}>
      {showHeader ? (
        <View style={styles.header}>
          <AppHeader />
        </View>
      ) : null}
      <View style={styles.main}>{children}</View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      {scrollable ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        content
      )}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.screenX,
  },
  header: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
  },
  main: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: theme.spacing.screenX,
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.md,
    alignItems: 'center',
  },
});
