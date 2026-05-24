import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import {
  filterMeetupLocationSuggestions,
  getMeetupLocationDescription,
} from '@/constants/profile';

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
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
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
  const showSuggestions = isOpen && !atMax && matches.length > 0;

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

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
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const removeLocation = (index: number) => {
    onChange(values.filter((_, idx) => idx !== index));
    setInputError(undefined);
  };

  const selectSuggestion = (entry: string) => {
    addLocation(entry);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (showSuggestions && activeIndex >= 0) {
        selectSuggestion(matches[activeIndex]);
        return;
      }
      addLocation(query);
      return;
    }

    if (!showSuggestions) {
      if (event.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? matches.length - 1 : index - 1));
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="meetup-location-picker">
      <div className="meetup-location-picker__header">
        <p className="meetup-location-picker__label">{label}</p>
        <p className="meetup-location-picker__count">
          {values.length}/{max}
        </p>
      </div>

      <div className="course-autocomplete" ref={containerRef}>
        <input
          id={`${listId}-input`}
          className={`labeled-input__field course-autocomplete__input${inputError ? ' labeled-input__field--error' : ''}`}
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls={showSuggestions ? listId : undefined}
          aria-autocomplete="list"
          aria-label={label}
          value={query}
          placeholder={atMax ? 'Maximum spots added' : placeholder}
          disabled={atMax}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
            setInputError(undefined);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {showSuggestions ? (
          <ul className="course-autocomplete__list" id={listId} role="listbox">
            {matches.map((entry, index) => (
              <li key={entry} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`course-autocomplete__option${index === activeIndex ? ' course-autocomplete__option--active' : ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectSuggestion(entry)}>
                  {entry}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <p className="meetup-location-picker__helper">
        {atMax ? 'You can add up to 3 spots.' : 'Press Enter to add a custom spot.'}
      </p>

      {values.length > 0 ? (
        <div className="meetup-location-stack" aria-label="Selected meetup locations">
          {values.map((location, index) => (
            <div key={`${location}-${index}`} className="meetup-location-stack__item">
              <span className="meetup-location-stack__initial" aria-hidden="true">
                {location.charAt(0)}
              </span>
              <div className="meetup-location-stack__text">
                <p className="meetup-location-stack__title">{location}</p>
                <p className="meetup-location-stack__description">
                  {getMeetupLocationDescription(location)}
                </p>
              </div>
              <button
                type="button"
                className="meetup-location-stack__remove"
                aria-label={`Remove ${location}`}
                onClick={() => removeLocation(index)}>
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {inputError ? (
        <p className="labeled-input__error" role="alert">
          {inputError}
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
