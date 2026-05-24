import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type OnboardingFlowTopBarProps = {
  onBack?: () => void;
  showBack?: boolean;
};

export function OnboardingFlowTopBar({ onBack, showBack = true }: OnboardingFlowTopBarProps) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarSide}>
        {showBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}>
            <Text style={styles.backLabel}>←</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.brand}>
        <Image
          source={require('@/assets/images/logo-sun.png')}
          style={styles.brandLogo}
          accessibilityIgnoresInvertColors
        />
        <Text style={styles.brandWordmark}>After Class</Text>
      </View>
      <View style={styles.topBarSide} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    marginBottom: 4,
    marginHorizontal: -4,
  },
  topBarSide: {
    width: 44,
    flexShrink: 0,
  },
  backButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backLabel: {
    fontSize: 28,
    color: '#000000',
    lineHeight: 32,
  },
  brand: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    minWidth: 0,
    paddingLeft: 10,
  },
  brandLogo: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  brandWordmark: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FBA797',
  },
});
