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
    <div className="chip-select">
      <div className="chip-select__header">
        <p className="chip-select__label">{label}</p>
        <p className="chip-select__count">
          {values.length}/{max}
        </p>
      </div>
      {helper ? <p className="chip-select__helper">{helper}</p> : null}
      <div className="chip-select__grid" role="listbox" aria-label={label} aria-multiselectable="true">
        {options.map((option) => {
          const selected = values.includes(option);
          const disabled = !selected && values.length >= max;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              disabled={disabled}
              className={`chip-select__chip${selected ? ' chip-select__chip--selected' : ''}`}
              onClick={() => toggle(option)}>
              {option}
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
