import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ProfileProgressBar } from '@/components/onboarding/ProfileProgressBar';
import type { ProfileStepId } from '@/constants/profile';
import { getProfileStepProgress } from '@/constants/profile';

type ProfileFlowTopBarProps = {
  stepId: ProfileStepId;
  onBack?: () => void;
  showBack?: boolean;
};

export function ProfileFlowTopBar({ stepId, onBack, showBack = true }: ProfileFlowTopBarProps) {
  const { current, total } = getProfileStepProgress(stepId);

  return (
    <View style={styles.topBar}>
      {showBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}>
          <Text style={styles.backLabel}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.side} />
      )}
      <View style={styles.center}>
        <ProfileProgressBar current={current} total={total} />
      </View>
      <View style={styles.side} />
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
  side: {
    width: 44,
    flexShrink: 0,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    minWidth: 0,
  },
  backButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  backLabel: {
    fontSize: 28,
    color: '#000000',
    lineHeight: 32,
  },
});
