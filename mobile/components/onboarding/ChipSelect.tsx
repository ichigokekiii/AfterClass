import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type ChipSelectProps = {
  label: string;
  options: readonly string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
};

export function ChipSelect({ label, options, value, onChange, error }: ChipSelectProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.grid} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onChange(option)}
              style={[styles.chip, selected ? styles.chipSelected : null]}>
              <Text style={[styles.chipLabel, selected ? styles.chipLabelSelected : null]}>{option}</Text>
            </Pressable>
          );
        })}
      </View>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.sm,
  },
  label: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    minHeight: 44,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  chipSelected: {
    borderColor: theme.colors.coralBrand,
    backgroundColor: 'rgba(251, 167, 151, 0.18)',
  },
  chipLabel: {
    ...typeScale.subhead,
    color: theme.colors.text,
  },
  chipLabelSelected: {
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
