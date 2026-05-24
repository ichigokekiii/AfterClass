import { useMemo, useState } from 'react';

import { PromptAutocomplete } from '@/components/onboarding/PromptAutocomplete';
import { SCHOOL_PROMPTS, type ProfilePrompt } from '@/constants/profile';

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
  const [composeError, setComposeError] = useState<string | undefined>();

  const usedQuestions = useMemo(() => prompts.map((prompt) => prompt.question), [prompts]);
  const availablePrompts = useMemo(
    () => SCHOOL_PROMPTS.filter((entry) => !usedQuestions.includes(entry)),
    [usedQuestions],
  );
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
  };

  return (
    <div className="profile-prompt-composer">
      <div className="profile-prompt-composer__header">
        <p className="profile-prompt-composer__label">Your prompts</p>
        <p className="profile-prompt-composer__count">
          {prompts.length}/{max}
        </p>
      </div>

      {prompts.length > 0 ? (
        <div className="meetup-location-stack" aria-label="Added prompts">
          {prompts.map((prompt, index) => (
            <div key={`${prompt.question}-${index}`} className="meetup-location-stack__item">
              <span className="meetup-location-stack__initial" aria-hidden="true">
                {index + 1}
              </span>
              <div className="meetup-location-stack__text">
                <p className="meetup-location-stack__title">{prompt.question}</p>
                <p className="meetup-location-stack__description profile-prompt-composer__answer-preview">
                  {prompt.answer}
                </p>
              </div>
              <button
                type="button"
                className="meetup-location-stack__remove"
                aria-label={`Remove prompt ${index + 1}`}
                onClick={() => removePrompt(index)}>
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {!atMax ? (
        <div className="profile-prompt-composer__compose">
          <PromptAutocomplete
            label="Choose a prompt"
            value={question}
            onChange={(value) => {
              setQuestion(value);
              setComposeError(undefined);
            }}
            suggestions={availablePrompts}
            placeholder="Search campus prompts"
          />

          <div className="labeled-input">
            <label className="labeled-input__label" htmlFor="profile-prompt-answer">
              Your answer
            </label>
            <textarea
              id="profile-prompt-answer"
              className={`labeled-input__field labeled-input__field--textarea${composeError && !answer.trim() ? ' labeled-input__field--error' : ''}`}
              value={answer}
              placeholder="Keep it short and personal"
              rows={4}
              onChange={(event) => {
                setAnswer(event.target.value);
                setComposeError(undefined);
              }}
            />
          </div>

          <button type="button" className="text-button" onClick={addPrompt}>
            Add prompt
          </button>

          <p className="profile-prompt-composer__helper">
            Add {max - prompts.length} more prompt{max - prompts.length === 1 ? '' : 's'} to continue.
          </p>
        </div>
      ) : null}

      {composeError ? (
        <p className="labeled-input__error" role="alert">
          {composeError}
        </p>
      ) : null}
      {error ? (
        <p className="labeled-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
