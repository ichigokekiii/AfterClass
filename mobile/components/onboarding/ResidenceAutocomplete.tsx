import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { filterResidenceSuggestions } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type ResidenceAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions: readonly string[];
  error?: string;
  placeholder?: string;
};

export function ResidenceAutocomplete({
  label,
  value,
  onChange,
  suggestions,
  error,
  placeholder = 'Search your area or dorm',
}: ResidenceAutocompleteProps) {
  const [isFocused, setIsFocused] = useState(false);
  const matches = useMemo(() => filterResidenceSuggestions(value, suggestions), [suggestions, value]);
  const showSuggestions = isFocused && matches.length > 0;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        value={value}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[styles.input, error ? styles.inputError : null]}
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
              onPress={() => {
                onChange(entry);
                setIsFocused(false);
              }}
              style={styles.option}>
              <Text style={styles.optionLabel}>{entry}</Text>
            </Pressable>
          ))}
        </ScrollView>
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
  label: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.text,
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
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
