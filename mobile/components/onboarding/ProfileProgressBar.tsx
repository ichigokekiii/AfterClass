import { StyleSheet, View } from 'react-native';

import { theme } from '@/constants/theme';

type ProfileProgressBarProps = {
  current: number;
  total: number;
};

export function ProfileProgressBar({ current, total }: ProfileProgressBarProps) {
  return (
    <View
      style={styles.bar}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: current }}
      accessibilityLabel={`Profile step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const segmentStyle =
          step === current
            ? [styles.segment, styles.segmentActive]
            : step < current
              ? [styles.segment, styles.segmentComplete]
              : styles.segment;

        return <View key={step} style={segmentStyle} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    maxWidth: theme.layout.logoSize + 100,
  },
  segment: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: theme.colors.dotInactive,
  },
  segmentActive: {
    width: 10,
    height: 4,
    backgroundColor: theme.colors.coralBrand,
  },
  segmentComplete: {
    backgroundColor: 'rgba(251, 167, 151, 0.55)',
  },
});
