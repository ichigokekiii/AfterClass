import { getPasswordCriteria } from '@/constants/auth';

type RequirementItemProps = {
  met: boolean;
  label: string;
};

function CheckIcon() {
  return (
    <svg className="password-requirements__icon" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M2 6.2 4.8 9 10 3.6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <li
      className={`password-requirements__item${met ? ' password-requirements__item--met' : ''}`}
      aria-label={met ? `${label} met` : `${label} not met`}>
      <span className="password-requirements__marker" aria-hidden="true">
        {met ? <CheckIcon /> : null}
      </span>
      <span>{label}</span>
    </li>
  );
}

type PasswordRequirementsProps = {
  password: string;
};

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const criteria = getPasswordCriteria(password);

  return (
    <ul className="password-requirements" aria-label="Password requirements" aria-live="polite">
      <RequirementItem met={criteria.length} label="8–10 characters" />
      <RequirementItem met={criteria.capital} label="One capital letter" />
      <RequirementItem met={criteria.number} label="One number" />
    </ul>
  );
}
