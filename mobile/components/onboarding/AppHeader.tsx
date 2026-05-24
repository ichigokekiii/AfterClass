import { Image, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type AppHeaderProps = {
  variant?: 'brand' | 'inverse';
};

export function AppHeader({ variant = 'brand' }: AppHeaderProps) {
  const textColor = variant === 'inverse' ? theme.colors.textOnCoral : theme.colors.coralBrand;

  return (
    <View style={styles.container} accessibilityRole="header">
      <Image
        source={require('@/assets/images/logo-sun.png')}
        style={styles.logo}
        accessibilityLabel="After Class logo"
      />
      <Text style={[styles.wordmark, { color: textColor }]}>After Class</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    minHeight: theme.layout.logoSize,
  },
  logo: {
    width: theme.layout.logoSize,
    height: theme.layout.logoSize,
    borderRadius: theme.layout.logoSize / 2,
  },
  wordmark: {
    ...typeScale.title3,
    color: theme.colors.coralBrand,
  },
});
