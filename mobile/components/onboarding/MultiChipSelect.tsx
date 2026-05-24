import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type MultiChipSelectProps = {
  label: string;
  options: readonly string[];
  values: string[];
  onChange: (values: string[]) => void;
  max: number;
  error?: string;
  helper?: string;
};

export function MultiChipSelect({ label, options, values, onChange, max, error, helper }: MultiChipSelectProps) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((value) => value !== option));
      return;
    }

    if (values.length >= max) {
      return;
    }

    onChange([...values, option]);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.count}>
          {values.length}/{max}
        </Text>
      </View>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      <View style={styles.grid} accessibilityLabel={label}>
        {options.map((option) => {
          const selected = values.includes(option);
          const disabled = !selected && values.length >= max;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => toggle(option)}
              style={[
                styles.chip,
                selected ? styles.chipSelected : null,
                disabled ? styles.chipDisabled : null,
              ]}>
              <Text
                style={[
                  styles.chipLabel,
                  selected ? styles.chipLabelSelected : null,
                  disabled ? styles.chipLabelDisabled : null,
                ]}>
                {option}
              </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  label: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  count: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  helper: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
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
  chipDisabled: {
    opacity: 0.45,
  },
  chipLabel: {
    ...typeScale.subhead,
    color: theme.colors.text,
  },
  chipLabelSelected: {
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
  chipLabelDisabled: {
    color: theme.colors.textMuted,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
