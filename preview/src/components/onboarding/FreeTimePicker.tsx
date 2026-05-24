import { useId } from 'react';

import { DAYTIME_TIME_OPTIONS } from '@/constants/profile';

type FreeTimePickerProps = {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  max?: number;
  error?: string;
};

export function FreeTimePicker({ label, values, onChange, max = 3, error }: FreeTimePickerProps) {
  const selectId = useId();
  const atMax = values.length >= max;
  const availableOptions = DAYTIME_TIME_OPTIONS.filter((time) => !values.includes(time));

  const addTime = (time: string) => {
    if (!time || atMax || values.includes(time)) {
      return;
    }

    onChange([...values, time]);
  };

  const removeTime = (index: number) => {
    onChange(values.filter((_, idx) => idx !== index));
  };

  return (
    <div className="free-time-picker">
      <div className="meetup-location-picker__header">
        <p className="meetup-location-picker__label">{label}</p>
        <p className="meetup-location-picker__count">
          {values.length}/{max}
        </p>
      </div>

      <p className="meetup-location-picker__helper">
        Choose when you&apos;re usually free between 8:00 AM and 6:00 PM. Add up to {max}.
      </p>

      {values.length > 0 ? (
        <div className="meetup-location-stack" aria-label="Selected free times">
          {values.map((time, index) => (
            <div key={`${time}-${index}`} className="meetup-location-stack__item">
              <span className="meetup-location-stack__initial" aria-hidden="true">
                {index + 1}
              </span>
              <div className="meetup-location-stack__text">
                <p className="meetup-location-stack__title">{time}</p>
                <p className="meetup-location-stack__description">Daytime availability</p>
              </div>
              <button
                type="button"
                className="meetup-location-stack__remove"
                aria-label={`Remove ${time}`}
                onClick={() => removeTime(index)}>
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {!atMax ? (
        <div className="free-time-picker__add">
          <label className="labeled-input__label" htmlFor={selectId}>
            Add a time
          </label>
          <select
            id={selectId}
            className="free-time-picker__select"
            defaultValue=""
            onChange={(event) => {
              const next = event.target.value;
              if (!next) {
                return;
              }

              addTime(next);
              event.target.value = '';
            }}>
            <option value="" disabled>
              Select a time
            </option>
            {availableOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {error ? (
        <p className="labeled-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
