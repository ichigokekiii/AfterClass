export const TAGLINE =
  'Match with verified students. We plan the daytime date. You just show up.';

export type OnboardingSlide = {
  id: string;
  headline: string;
  body?: string;
};

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: 'welcome',
    headline: 'Meet Your Campus Match Today',
    body: TAGLINE,
  },
  {
    id: 'campus',
    headline: 'Verified Students on Your Campus',
    body: TAGLINE,
  },
  {
    id: 'meet',
    headline: 'Start Meeting After Class!',
    body: TAGLINE,
  },
];
