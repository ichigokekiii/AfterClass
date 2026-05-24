import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import {
  filterMeetupLocationSuggestions,
  getMeetupLocationDescription,
} from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type MeetupLocationPickerProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  suggestions: readonly string[];
  max?: number;
  error?: string;
  placeholder?: string;
};

export function MeetupLocationPicker({
  label,
  values,
  onChange,
  suggestions,
  max = 3,
  error,
  placeholder = 'Search or type a meetup spot',
}: MeetupLocationPickerProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [inputError, setInputError] = useState<string | undefined>();

  const atMax = values.length >= max;
  const availableSuggestions = useMemo(
    () =>
      suggestions.filter(
        (entry) => !values.some((value) => value.toLowerCase() === entry.toLowerCase()),
      ),
    [suggestions, values],
  );
  const matches = useMemo(
    () => filterMeetupLocationSuggestions(query, availableSuggestions),
    [availableSuggestions, query],
  );
  const showSuggestions = isFocused && !atMax && matches.length > 0;

  const addLocation = (location: string) => {
    const trimmed = location.trim();
    if (!trimmed || atMax) {
      return;
    }

    if (values.some((value) => value.toLowerCase() === trimmed.toLowerCase())) {
      setInputError('You already added this spot.');
      return;
    }

    onChange([...values, trimmed]);
    setQuery('');
    setInputError(undefined);
    setIsFocused(false);
  };

  const removeLocation = (index: number) => {
    onChange(values.filter((_, idx) => idx !== index));
    setInputError(undefined);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.count}>
          {values.length}/{max}
        </Text>
      </View>

      <TextInput
        accessibilityLabel={label}
        placeholder={atMax ? 'Maximum spots added' : placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={query}
        editable={!atMax}
        onChangeText={(value) => {
          setQuery(value);
          setInputError(undefined);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={() => addLocation(query)}
        returnKeyType="done"
        style={[styles.input, inputError ? styles.inputError : null, atMax ? styles.inputDisabled : null]}
      />

      {showSuggestions ? (
        <ScrollView
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          accessibilityRole="list">
          {matches.map((entry) => (
            <Pressable
              key={entry}
              accessibilityRole="button"
              onPress={() => addLocation(entry)}
              style={styles.option}>
              <Text style={styles.optionLabel}>{entry}</Text>
            </Pressable>
          ))}
        </ScrollView>
      ) : null}

      <Text style={styles.helper}>
        {atMax ? 'You can add up to 3 spots.' : 'Press done to add a custom spot.'}
      </Text>

      {values.length > 0 ? (
        <View style={styles.stack} accessibilityLabel="Selected meetup locations">
          {values.map((location, index) => (
            <View key={`${location}-${index}`} style={styles.stackItem}>
              <View style={styles.initial}>
                <Text style={styles.initialLabel}>{location.charAt(0)}</Text>
              </View>
              <View style={styles.stackText}>
                <Text style={styles.stackTitle}>{location}</Text>
                <Text style={styles.stackDescription}>{getMeetupLocationDescription(location)}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove ${location}`}
                onPress={() => removeLocation(index)}
                style={styles.removeButton}>
                <Text style={styles.removeLabel}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {inputError ? (
        <Text style={styles.error} accessibilityRole="alert">
          {inputError}
        </Text>
      ) : null}
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
    zIndex: 1,
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
  input: {
    minHeight: theme.layout.buttonHeight,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    ...typeScale.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: '#C45C5C',
  },
  inputDisabled: {
    opacity: 0.5,
  },
  list: {
    maxHeight: 220,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  option: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  optionLabel: {
    ...typeScale.body,
    color: theme.colors.text,
  },
  helper: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  stack: {
    gap: theme.spacing.sm,
  },
  stackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    minHeight: 56,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: theme.colors.coralBrand,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(251, 167, 151, 0.18)',
  },
  initial: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(251, 167, 151, 0.35)',
  },
  initialLabel: {
    ...typeScale.subhead,
    fontWeight: '700',
    color: theme.colors.text,
  },
  stackText: {
    flex: 1,
    gap: 2,
  },
  stackTitle: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
  stackDescription: {
    ...typeScale.footnote,
    color: theme.colors.text,
  },
  removeButton: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeLabel: {
    fontSize: 24,
    lineHeight: 28,
    color: theme.colors.coralBrand,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
