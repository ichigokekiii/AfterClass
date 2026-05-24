import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from 'react';

import { filterResidenceSuggestions } from '@/constants/profile';

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
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = useMemo(() => filterResidenceSuggestions(value, suggestions), [suggestions, value]);
  const showSuggestions = isOpen && matches.length > 0;

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

  const selectSuggestion = (entry: string) => {
    onChange(entry);
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) {
      if (event.key === 'ArrowDown' || event.key === 'Enter') {
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

    if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectSuggestion(matches[activeIndex]);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="course-autocomplete" ref={containerRef}>
      <label className="labeled-input__label" htmlFor={`${listId}-input`}>
        {label}
      </label>
      <input
        id={`${listId}-input`}
        className={`labeled-input__field course-autocomplete__input${error ? ' labeled-input__field--error' : ''}`}
        role="combobox"
        aria-expanded={showSuggestions}
        aria-controls={showSuggestions ? listId : undefined}
        aria-autocomplete="list"
        aria-invalid={Boolean(error)}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
          setActiveIndex(-1);
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
      {error ? (
        <p className="labeled-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
