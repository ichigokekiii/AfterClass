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
  const {
    label,
    options,
    variant = 'list',
    helper,
    error,
    hideLabel = false,
  } = props;

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
    <div className="selection-cards">
      {label && !hideLabel ? (
        <div className="selection-cards__header">
          <p className="selection-cards__label">{label}</p>
          {countLabel ? <p className="selection-cards__count">{countLabel}</p> : null}
        </div>
      ) : null}
      {helper ? <p className="selection-cards__helper">{helper}</p> : null}
      <div
        className={`selection-cards__${variant}`}
        role={multi ? 'listbox' : 'radiogroup'}
        aria-label={label}
        aria-multiselectable={multi || undefined}>
        {normalized.map((option) => {
          const selected = selectedValues.includes(option.value);
          const disabled = isDisabled(option.value);

          return (
            <button
              key={option.value}
              type="button"
              role={multi ? 'option' : 'radio'}
              aria-selected={selected}
              disabled={disabled}
              className={`selection-card selection-card--${variant}${selected ? ' selection-card--selected' : ''}`}
              onClick={() => handleSelect(option.value)}>
              {variant === 'grid' ? (
                <span className="selection-card__initial" aria-hidden="true">
                  {option.label.charAt(0)}
                </span>
              ) : null}
              <span className="selection-card__text">
                <span className="selection-card__title">{option.label}</span>
                {option.description ? (
                  <span className="selection-card__description">{option.description}</span>
                ) : null}
              </span>
              {multi && selected ? (
                <span className="selection-card__check" aria-hidden="true">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="labeled-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
