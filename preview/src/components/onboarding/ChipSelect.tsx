type ChipSelectProps = {
  label: string;
  options: readonly string[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
};

export function ChipSelect({ label, options, value, onChange, error }: ChipSelectProps) {
  return (
    <div className="chip-select">
      <p className="chip-select__label">{label}</p>
      <div className="chip-select__grid" role="listbox" aria-label={label}>
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={selected}
              className={`chip-select__chip${selected ? ' chip-select__chip--selected' : ''}`}
              onClick={() => onChange(option)}>
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
