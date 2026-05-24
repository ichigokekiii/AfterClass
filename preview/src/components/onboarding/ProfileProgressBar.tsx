type ProfileProgressBarProps = {
  current: number;
  total: number;
};

export function ProfileProgressBar({ current, total }: ProfileProgressBarProps) {
  return (
    <div
      className="profile-progress-bar"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Profile step ${current} of ${total}`}>
      {Array.from({ length: total }, (_, index) => {
        const step = index + 1;
        const state =
          step === current ? 'active' : step < current ? 'complete' : 'upcoming';

        return (
          <span
            key={step}
            className={`profile-progress-bar__segment profile-progress-bar__segment--${state}`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
