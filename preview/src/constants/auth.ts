export type OnboardingAuthIntent = 'register' | 'sign-in';

export type VerifyLocationState = {
  email?: string;
  intent?: OnboardingAuthIntent;
};

export type CreatePasswordLocationState = {
  email?: string;
};

export type ConfirmPasswordLocationState = {
  email?: string;
  password?: string;
};

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 10;

export type PasswordCriteria = {
  length: boolean;
  capital: boolean;
  number: boolean;
};

export function getPasswordCriteria(password: string): PasswordCriteria {
  return {
    length: password.length >= PASSWORD_MIN_LENGTH && password.length <= PASSWORD_MAX_LENGTH,
    capital: /[A-Z]/.test(password),
    number: /\d/.test(password),
  };
}

export function isPasswordValid(password: string): boolean {
  const criteria = getPasswordCriteria(password);
  return criteria.length && criteria.capital && criteria.number;
}

export function validateNewPassword(password: string): string | undefined {
  const criteria = getPasswordCriteria(password);

  if (!criteria.length) {
    return `Password must be ${PASSWORD_MIN_LENGTH}–${PASSWORD_MAX_LENGTH} characters.`;
  }

  if (!criteria.capital) {
    return 'Include at least one capital letter.';
  }

  if (!criteria.number) {
    return 'Include at least one number.';
  }

  return undefined;
}
