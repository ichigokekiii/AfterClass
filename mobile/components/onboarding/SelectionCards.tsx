import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

export type SelectionCardOption = {
  value: string;
  label: string;
  description?: string;
};

type SelectionCardsBaseProps = {
  label?: string;
  options: readonly string[] | readonly SelectionCardOption[];
  variant?: 'grid' | 'list';
  helper?: string;
  error?: string;
  hideLabel?: boolean;
};

type SingleSelectProps = SelectionCardsBaseProps & {
  value?: string;
  onChange: (value: string) => void;
  values?: never;
  onValuesChange?: never;
  max?: never;
};

type MultiSelectProps = SelectionCardsBaseProps & {
  values: string[];
  onValuesChange: (values: string[]) => void;
  max: number;
  value?: never;
  onChange?: never;
};

export type SelectionCardsProps = SingleSelectProps | MultiSelectProps;

function normalizeOptions(options: readonly string[] | readonly SelectionCardOption[]): SelectionCardOption[] {
  return options.map((option) =>
    typeof option === 'string' ? { value: option, label: option } : option,
  );
}

function isMultiSelect(props: SelectionCardsProps): props is MultiSelectProps {
  return 'values' in props && props.values !== undefined;
}

export function SelectionCards(props: SelectionCardsProps) {
  const { label, options, variant = 'list', helper, error, hideLabel = false } = props;

  const normalized = normalizeOptions(options);
  const multi = isMultiSelect(props);
  const selectedValues = multi ? props.values : props.value ? [props.value] : [];
  const countLabel = multi ? `${props.values.length}/${props.max}` : undefined;

  const handleSelect = (value: string) => {
    if (multi) {
      if (props.values.includes(value)) {
        props.onValuesChange(props.values.filter((entry) => entry !== value));
        return;
      }

      if (props.values.length >= props.max) {
        return;
      }

      props.onValuesChange([...props.values, value]);
      return;
    }

    props.onChange(value);
  };

  const isDisabled = (value: string) => {
    if (!multi) {
      return false;
    }

    return !props.values.includes(value) && props.values.length >= props.max;
  };

  return (
    <View style={styles.wrapper}>
      {label && !hideLabel ? (
        <View style={styles.header}>
          <Text style={styles.label}>{label}</Text>
          {countLabel ? <Text style={styles.count}>{countLabel}</Text> : null}
        </View>
      ) : null}
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
      <View
        style={variant === 'grid' ? styles.grid : styles.list}
        accessibilityRole={multi ? 'list' : 'radiogroup'}
        accessibilityLabel={label}>
        {normalized.map((option) => {
          const selected = selectedValues.includes(option.value);
          const disabled = isDisabled(option.value);

          return (
            <Pressable
              key={option.value}
              accessibilityRole={multi ? 'button' : 'radio'}
              accessibilityState={{ selected, disabled }}
              disabled={disabled}
              onPress={() => handleSelect(option.value)}
              style={[
                styles.card,
                variant === 'grid' ? styles.cardGrid : styles.cardList,
                selected ? styles.cardSelected : null,
                disabled ? styles.cardDisabled : null,
              ]}>
              {variant === 'grid' ? (
                <View style={styles.initial}>
                  <Text style={[styles.initialLabel, selected ? styles.initialLabelSelected : null]}>
                    {option.label.charAt(0)}
                  </Text>
                </View>
              ) : null}
              <View style={styles.text}>
                <Text style={[styles.title, selected ? styles.titleSelected : null]}>{option.label}</Text>
                {option.description ? (
                  <Text style={[styles.description, selected ? styles.descriptionSelected : null]}>
                    {option.description}
                  </Text>
                ) : null}
              </View>
              {multi && selected ? <Text style={styles.check}>✓</Text> : null}
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
  },
  count: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  helper: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  list: {
    gap: theme.spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.background,
  },
  cardList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    minHeight: 56,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
  },
  cardGrid: {
    width: '48%',
    minHeight: 96,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  cardSelected: {
    borderColor: theme.colors.coralBrand,
    backgroundColor: 'rgba(251, 167, 151, 0.18)',
  },
  cardDisabled: {
    opacity: 0.45,
  },
  initial: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 167, 151, 0.2)',
  },
  initialLabel: {
    ...typeScale.subhead,
    fontWeight: '700',
    color: theme.colors.coralBrand,
  },
  initialLabelSelected: {
    color: theme.colors.text,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.text,
  },
  titleSelected: {
    color: theme.colors.coralBrand,
  },
  description: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  descriptionSelected: {
    color: theme.colors.text,
  },
  check: {
    ...typeScale.subhead,
    fontWeight: '700',
    color: theme.colors.coralBrand,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
