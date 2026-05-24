import { getPasswordCriteria } from '@/constants/auth';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { StyleSheet, Text, View } from 'react-native';

type RequirementItemProps = {
  met: boolean;
  label: string;
};

function RequirementMarker({ met }: { met: boolean }) {
  if (met) {
    return (
      <View style={[styles.marker, styles.markerMet]} aria-hidden>
        <View style={styles.checkShort} />
        <View style={styles.checkLong} />
      </View>
    );
  }

  return <View style={[styles.marker, styles.markerPending]} aria-hidden />;
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <View
      style={styles.item}
      accessibilityRole="text"
      accessibilityLabel={met ? `${label} met` : `${label} not met`}>
      <RequirementMarker met={met} />
      <Text style={[styles.label, met ? styles.labelMet : null]}>{label}</Text>
    </View>
  );
}

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const criteria = getPasswordCriteria(password);

  return (
    <View style={styles.list} accessibilityLabel="Password requirements">
      <RequirementItem met={criteria.length} label="8–10 characters" />
      <RequirementItem met={criteria.capital} label="One capital letter" />
      <RequirementItem met={criteria.number} label="One number" />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  marker: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerPending: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.textMuted,
    opacity: 0.45,
  },
  markerMet: {
    position: 'relative',
  },
  checkShort: {
    position: 'absolute',
    width: 2,
    height: 5,
    borderRadius: 1,
    backgroundColor: theme.colors.success,
    transform: [{ rotate: '-45deg' }, { translateX: -1 }, { translateY: 1 }],
  },
  checkLong: {
    position: 'absolute',
    width: 2,
    height: 9,
    borderRadius: 1,
    backgroundColor: theme.colors.success,
    transform: [{ rotate: '45deg' }, { translateX: 2 }, { translateY: -1 }],
  },
  label: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  labelMet: {
    color: theme.colors.success,
  },
});
