import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { filterPromptSuggestions, SCHOOL_PROMPTS, type ProfilePrompt } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';

type ProfilePromptComposerProps = {
  prompts: ProfilePrompt[];
  onChange: (prompts: ProfilePrompt[]) => void;
  max?: number;
  error?: string;
};

export function ProfilePromptComposer({
  prompts,
  onChange,
  max = 3,
  error,
}: ProfilePromptComposerProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [composeError, setComposeError] = useState<string | undefined>();

  const usedQuestions = useMemo(() => prompts.map((prompt) => prompt.question), [prompts]);
  const availablePrompts = useMemo(
    () => SCHOOL_PROMPTS.filter((entry) => !usedQuestions.includes(entry)),
    [usedQuestions],
  );
  const matches = useMemo(
    () => filterPromptSuggestions(question, availablePrompts),
    [availablePrompts, question],
  );
  const showSuggestions = isFocused && prompts.length < max && matches.length > 0;
  const atMax = prompts.length >= max;

  const removePrompt = (index: number) => {
    onChange(prompts.filter((_, idx) => idx !== index));
    setComposeError(undefined);
  };

  const addPrompt = () => {
    const trimmedQuestion = question.trim();
    const trimmedAnswer = answer.trim();

    if (!trimmedQuestion) {
      setComposeError('Choose a prompt first.');
      return;
    }

    if (!availablePrompts.includes(trimmedQuestion as (typeof SCHOOL_PROMPTS)[number])) {
      setComposeError('Pick one of the suggested prompts.');
      return;
    }

    if (!trimmedAnswer) {
      setComposeError('Write your answer before adding.');
      return;
    }

    onChange([...prompts, { question: trimmedQuestion, answer: trimmedAnswer }]);
    setQuestion('');
    setAnswer('');
    setComposeError(undefined);
    setIsFocused(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>Your prompts</Text>
        <Text style={styles.count}>
          {prompts.length}/{max}
        </Text>
      </View>

      {prompts.length > 0 ? (
        <View style={styles.stack} accessibilityLabel="Added prompts">
          {prompts.map((prompt, index) => (
            <View key={`${prompt.question}-${index}`} style={styles.stackItem}>
              <View style={styles.initial}>
                <Text style={styles.initialLabel}>{index + 1}</Text>
              </View>
              <View style={styles.stackText}>
                <Text style={styles.stackTitle}>{prompt.question}</Text>
                <Text style={styles.stackDescription} numberOfLines={3}>
                  {prompt.answer}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Remove prompt ${index + 1}`}
                onPress={() => removePrompt(index)}
                style={styles.removeButton}>
                <Text style={styles.removeLabel}>×</Text>
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {!atMax ? (
        <View style={styles.compose}>
          <Text style={styles.fieldLabel}>Choose a prompt</Text>
          <TextInput
            accessibilityLabel="Choose a prompt"
            placeholder="Search campus prompts"
            placeholderTextColor={theme.colors.textMuted}
            value={question}
            onChangeText={(value) => {
              setQuestion(value);
              setComposeError(undefined);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={styles.input}
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
                    setQuestion(entry);
                    setIsFocused(false);
                    setComposeError(undefined);
                  }}
                  style={styles.option}>
                  <Text style={styles.optionLabel}>{entry}</Text>
                </Pressable>
              ))}
            </ScrollView>
          ) : null}

          <Text style={styles.fieldLabel}>Your answer</Text>
          <TextInput
            accessibilityLabel="Your answer"
            placeholder="Keep it short and personal"
            placeholderTextColor={theme.colors.textMuted}
            value={answer}
            multiline
            textAlignVertical="top"
            onChangeText={(value) => {
              setAnswer(value);
              setComposeError(undefined);
            }}
            style={styles.textarea}
          />

          <Pressable accessibilityRole="button" onPress={addPrompt} style={styles.addButton}>
            <Text style={styles.addLabel}>Add prompt</Text>
          </Pressable>

          <Text style={styles.helper}>
            Add {max - prompts.length} more prompt{max - prompts.length === 1 ? '' : 's'} to continue.
          </Text>
        </View>
      ) : null}

      {composeError ? (
        <Text style={styles.error} accessibilityRole="alert">
          {composeError}
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
  stack: {
    gap: theme.spacing.sm,
  },
  stackItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    marginTop: 2,
  },
  initialLabel: {
    ...typeScale.subhead,
    fontWeight: '700',
    color: theme.colors.text,
  },
  stackText: {
    flex: 1,
    gap: 4,
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
  compose: {
    gap: theme.spacing.sm,
  },
  fieldLabel: {
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
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  optionLabel: {
    ...typeScale.body,
    color: theme.colors.text,
  },
  textarea: {
    minHeight: 112,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    ...typeScale.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  addButton: {
    alignSelf: 'center',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },
  addLabel: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.coralBrand,
  },
  helper: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
