export type ProfileStepId =
  | 'name'
  | 'school'
  | 'course'
  | 'school-id'
  | 'birthday'
  | 'gender'
  | 'interested-in'
  | 'residence'
  | 'meetup-locations'
  | 'interests'
  | 'social-media'
  | 'prompts'
  | 'photo'
  | 'organizations'
  | 'archetype'
  | 'opening-move'
  | 'favorite-spots';

export type SocialMediaEntry = {
  platform: string;
  handle: string;
};

export type ProfilePrompt = {
  question: string;
  answer: string;
};

export type ProfileData = {
  email?: string;
  displayName?: string;
  schoolConfirmed?: boolean;
  schoolName?: string;
  schoolDomain?: string;
  course?: string;
  schoolId?: string;
  yearLevel?: string;
  birthday?: string;
  gender?: string;
  interestedIn?: string[];
  residence?: string;
  residenceLatitude?: number;
  residenceLongitude?: number;
  residenceSource?: 'suggestion' | 'map' | 'custom';
  meetupLocations?: string[];
  interests?: string[];
  socialMedia?: SocialMediaEntry[];
  prompts?: ProfilePrompt[];
  photoName?: string;
  organizations?: string[];
  archetype?: string;
  openingMove?: string;
  favoriteSpots?: string[];
};

export const PROFILE_REQUIRED_STEPS: ProfileStepId[] = [
  'name',
  'school',
  'course',
  'school-id',
  'birthday',
  'gender',
  'interested-in',
  'residence',
  'meetup-locations',
  'interests',
  'social-media',
  'prompts',
  'photo',
];

export const PROFILE_OPTIONAL_STEPS: ProfileStepId[] = [
  'organizations',
  'archetype',
  'opening-move',
  'favorite-spots',
];

export const PROFILE_ALL_STEPS: ProfileStepId[] = [...PROFILE_REQUIRED_STEPS, ...PROFILE_OPTIONAL_STEPS];

export const PROFILE_STEP_PATHS: Record<ProfileStepId, string> = {
  name: '/profile-name',
  school: '/profile-school',
  course: '/profile-course',
  'school-id': '/profile-school-id',
  birthday: '/profile-birthday',
  gender: '/profile-gender',
  'interested-in': '/profile-interested-in',
  residence: '/profile-residence',
  'meetup-locations': '/profile-meetup-locations',
  interests: '/profile-interests',
  'social-media': '/profile-social-media',
  prompts: '/profile-prompts',
  photo: '/profile-photo',
  organizations: '/profile-organizations',
  archetype: '/profile-archetype',
  'opening-move': '/profile-opening-move',
  'favorite-spots': '/profile-favorite-spots',
};

export const GENDER_OPTIONS = ['Woman', 'Man', 'Non-binary', 'Prefer not to say'] as const;

export const INTERESTED_IN_OPTIONS = ['Women', 'Men', 'Everyone'] as const;

export const INTERESTED_IN_DESCRIPTIONS: Record<(typeof INTERESTED_IN_OPTIONS)[number], string> = {
  Women: 'Show me women on campus',
  Men: 'Show me men on campus',
  Everyone: 'Open to anyone',
};

export const DEFAULT_COURSES = [
  'Computer Science',
  'Business Administration',
  'Engineering',
  'Psychology',
  'Biology',
  'Communications',
  'Economics',
  'Political Science',
  'Nursing',
  'Education',
  'Accountancy',
  'Architecture',
  'Information Technology',
  'Marketing',
  'Finance',
  'Art & Design',
] as const;

/** @deprecated Use getCoursesForSchool instead */
export const COURSE_OPTIONS = DEFAULT_COURSES;

const COURSES_BY_SCHOOL_DOMAIN: Record<string, readonly string[]> = {
  'up.edu.ph': [
    'BS Computer Science',
    'BS Business Administration',
    'BS Economics',
    'BA Political Science',
    'BS Psychology',
    'BS Biology',
    'BS Civil Engineering',
    'BS Electrical Engineering',
    'BS Industrial Engineering',
    'BA Communication',
    'BS Nursing',
    'BS Education',
    'BS Statistics',
    'BS Mathematics',
  ],
  'upd.edu.ph': [
    'BS Computer Science',
    'BS Business Administration',
    'BS Economics',
    'BA Political Science',
    'BS Psychology',
    'BS Biology',
    'BS Civil Engineering',
    'BS Electrical Engineering',
    'BS Industrial Engineering',
    'BA Communication',
    'BS Statistics',
    'BS Mathematics',
  ],
  'ust.edu.ph': [
    'BS Accountancy',
    'BS Architecture',
    'BS Civil Engineering',
    'BS Computer Science',
    'BS Information Technology',
    'BS Nursing',
    'BS Pharmacy',
    'BS Psychology',
    'AB Political Science',
    'BS Biology',
    'BS Marketing Management',
    'BS Medical Technology',
  ],
  'dlsu.edu.ph': [
    'BS Computer Science',
    'BS Information Systems',
    'BS Business Management',
    'BS Accountancy',
    'BS Psychology',
    'BS Biology',
    'BS Civil Engineering',
    'BS Industrial Engineering',
    'AB Communication Arts',
    'BS Economics',
    'BS Marketing Management',
  ],
  'ateneo.edu.ph': [
    'BS Computer Science',
    'BS Management Engineering',
    'BS Biology',
    'BS Psychology',
    'AB Economics',
    'AB Political Science',
    'BS Information Technology',
    'BS Health Sciences',
    'AB Communication',
    'BS Environmental Science',
  ],
  'admu.edu.ph': [
    'BS Computer Science',
    'BS Management Engineering',
    'BS Biology',
    'BS Psychology',
    'AB Economics',
    'AB Political Science',
    'BS Information Technology',
    'BS Health Sciences',
    'AB Communication',
    'BS Environmental Science',
  ],
  'feu.edu.ph': [
    'BS Accountancy',
    'BS Business Administration',
    'BS Computer Science',
    'BS Information Technology',
    'BS Nursing',
    'BS Psychology',
    'BS Tourism Management',
    'BS Architecture',
    'BS Civil Engineering',
  ],
  'pup.edu.ph': [
    'BS Computer Engineering',
    'BS Information Technology',
    'BS Business Administration',
    'BS Accountancy',
    'BS Civil Engineering',
    'BS Electrical Engineering',
    'BS Psychology',
    'BS Education',
    'BS Hospitality Management',
  ],
};

export function getCoursesForSchool(schoolDomain?: string, schoolName?: string): readonly string[] {
  if (schoolDomain) {
    const domain = schoolDomain.toLowerCase();
    const byDomain = COURSES_BY_SCHOOL_DOMAIN[domain];
    if (byDomain) {
      return byDomain;
    }

    const phSlug = domain.match(/^([a-z0-9-]+)\.edu\.ph$/)?.[1];
    if (phSlug) {
      const slugDomain = `${phSlug}.edu.ph`;
      const bySlug = COURSES_BY_SCHOOL_DOMAIN[slugDomain];
      if (bySlug) {
        return bySlug;
      }
    }
  }

  if (schoolName) {
    const normalized = schoolName.toLowerCase();
    if (normalized.includes('philippines') && !normalized.includes('diliman')) {
      return COURSES_BY_SCHOOL_DOMAIN['up.edu.ph'];
    }
    if (normalized.includes('santo tomas')) {
      return COURSES_BY_SCHOOL_DOMAIN['ust.edu.ph'];
    }
    if (normalized.includes('la salle')) {
      return COURSES_BY_SCHOOL_DOMAIN['dlsu.edu.ph'];
    }
    if (normalized.includes('ateneo')) {
      return COURSES_BY_SCHOOL_DOMAIN['ateneo.edu.ph'];
    }
  }

  return DEFAULT_COURSES;
}

export function filterCourseSuggestions(query: string, courses: readonly string[], limit = 8): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...courses].slice(0, limit);
  }

  return courses.filter((course) => course.toLowerCase().includes(normalized)).slice(0, limit);
}

export const RESIDENCE_OPTIONS = [
  'On campus — dorm',
  'On campus — apartment',
  'Off campus — near school',
  'Off campus — in the city',
  'Commuter',
] as const;

export const RESIDENCE_DESCRIPTIONS: Record<(typeof RESIDENCE_OPTIONS)[number], string> = {
  'On campus — dorm': 'Living in a campus residence hall',
  'On campus — apartment': 'On-campus apartment or suite',
  'Off campus — near school': 'Renting close to campus',
  'Off campus — in the city': 'Living farther from school',
  Commuter: 'I travel in for classes',
};

const COMMON_RESIDENCE_SUGGESTIONS = [
  ...RESIDENCE_OPTIONS,
  'Campus dorm — shared room',
  'Campus dorm — single room',
  'Fraternity / sorority house',
  'Family home nearby',
  'Shared apartment with roommates',
  'Studio apartment',
  'Condo near campus',
] as const;

const RESIDENCE_BY_SCHOOL_DOMAIN: Record<string, readonly string[]> = {
  'up.edu.ph': [
    'UP Diliman — Sampaguita Residence Hall',
    'UP Diliman — Ipil Residence Hall',
    'UP Diliman — Yakal Residence Hall',
    'UP Diliman — Kamia Residence Hall',
    'UP Diliman — Molave Residence Hall',
    'UP Diliman — Area 2',
    'UP Diliman — Area 17',
    'Katipunan area',
    'Maginhawa food street area',
  ],
  'upd.edu.ph': [
    'UP Diliman — Sampaguita Residence Hall',
    'UP Diliman — Ipil Residence Hall',
    'UP Diliman — Yakal Residence Hall',
    'UP Diliman — Area 2',
    'Katipunan area',
    'Maginhawa food street area',
  ],
  'ust.edu.ph': [
    'UST Central Seminary',
    'UST Santissimo Rosario Parish area',
    'Dapitan area',
    'Sampaloc district',
    'España Boulevard area',
  ],
  'dlsu.edu.ph': [
    'DLSU Br. Andrew Gonzalez Hall area',
    'Taft Avenue dormitories',
    'Vito Cruz area',
    'Malate district',
  ],
  'ateneo.edu.ph': [
    'Ateneo dormitories — Cervini Hall',
    'Ateneo dormitories — Eliazo Hall',
    'Katipunan area',
    'Loyola Heights',
  ],
  'admu.edu.ph': [
    'Ateneo dormitories — Cervini Hall',
    'Ateneo dormitories — Eliazo Hall',
    'Katipunan area',
    'Loyola Heights',
  ],
  'pup.edu.ph': ['PUP Main Campus dorm area', 'Santa Mesa', 'Mabini Campus area'],
};

export function getResidenceSuggestions(schoolDomain?: string, schoolName?: string): readonly string[] {
  const suggestions = new Set<string>(COMMON_RESIDENCE_SUGGESTIONS);

  if (schoolDomain) {
    const domain = schoolDomain.toLowerCase();
    const byDomain = RESIDENCE_BY_SCHOOL_DOMAIN[domain];
    if (byDomain) {
      byDomain.forEach((entry) => suggestions.add(entry));
    }

    const phSlug = domain.match(/^([a-z0-9-]+)\.edu\.ph$/)?.[1];
    if (phSlug) {
      const bySlug = RESIDENCE_BY_SCHOOL_DOMAIN[`${phSlug}.edu.ph`];
      bySlug?.forEach((entry) => suggestions.add(entry));
    }
  }

  if (schoolName) {
    const normalized = schoolName.toLowerCase();
    if (normalized.includes('philippines')) {
      RESIDENCE_BY_SCHOOL_DOMAIN['up.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('santo tomas')) {
      RESIDENCE_BY_SCHOOL_DOMAIN['ust.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('la salle')) {
      RESIDENCE_BY_SCHOOL_DOMAIN['dlsu.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('ateneo')) {
      RESIDENCE_BY_SCHOOL_DOMAIN['ateneo.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
  }

  return [...suggestions];
}

export function filterResidenceSuggestions(
  query: string,
  suggestions: readonly string[],
  limit = 8,
): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return [...suggestions].slice(0, limit);
  }

  return suggestions.filter((entry) => entry.toLowerCase().includes(normalized)).slice(0, limit);
}

export const MEETUP_LOCATION_OPTIONS = [
  'Campus library',
  'Student union',
  'Campus cafe',
  'Quad / lawn',
  'Rec center',
  'Downtown near campus',
  'Coffee shop off campus',
  'Bookstore',
] as const;

export const MEETUP_LOCATION_DESCRIPTIONS: Record<(typeof MEETUP_LOCATION_OPTIONS)[number], string> = {
  'Campus library': 'Quiet and easy to find',
  'Student union': 'Central campus hangout',
  'Campus cafe': 'Casual coffee meetup',
  'Quad / lawn': 'Outdoor campus spot',
  'Rec center': 'Active, public campus space',
  'Downtown near campus': 'Off-campus but close by',
  'Coffee shop off campus': 'Neighborhood cafe vibe',
  Bookstore: 'Low-pressure browse-and-chat',
};

const MEETUP_BY_SCHOOL_DOMAIN: Record<string, readonly string[]> = {
  'up.edu.ph': [
    'Palma Hall lobby',
    'AS Steps',
    'UP Town Center',
    'Maginhawa cafes',
    'Sunken Garden',
  ],
  'upd.edu.ph': ['Palma Hall lobby', 'AS Steps', 'UP Town Center', 'Maginhawa cafes', 'Sunken Garden'],
  'ust.edu.ph': ['UST Plaza Mayor', 'España coffee shops', 'Dapitan food strip'],
  'dlsu.edu.ph': ['Henry Sy grounds', 'Agno strip', 'Vito Cruz cafes'],
  'ateneo.edu.ph': ['Bellarmine Field area', 'Katipunan cafes', 'JGSOM lobby'],
  'admu.edu.ph': ['Bellarmine Field area', 'Katipunan cafes', 'JGSOM lobby'],
  'pup.edu.ph': ['PUP Lagoon area', 'Santa Mesa food spots'],
};

export function getMeetupLocationSuggestions(schoolDomain?: string, schoolName?: string): readonly string[] {
  const suggestions = new Set<string>(MEETUP_LOCATION_OPTIONS);

  if (schoolDomain) {
    const domain = schoolDomain.toLowerCase();
    MEETUP_BY_SCHOOL_DOMAIN[domain]?.forEach((entry) => suggestions.add(entry));

    const phSlug = domain.match(/^([a-z0-9-]+)\.edu\.ph$/)?.[1];
    if (phSlug) {
      MEETUP_BY_SCHOOL_DOMAIN[`${phSlug}.edu.ph`]?.forEach((entry) => suggestions.add(entry));
    }
  }

  if (schoolName) {
    const normalized = schoolName.toLowerCase();
    if (normalized.includes('philippines')) {
      MEETUP_BY_SCHOOL_DOMAIN['up.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('santo tomas')) {
      MEETUP_BY_SCHOOL_DOMAIN['ust.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('la salle')) {
      MEETUP_BY_SCHOOL_DOMAIN['dlsu.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
    if (normalized.includes('ateneo')) {
      MEETUP_BY_SCHOOL_DOMAIN['ateneo.edu.ph']?.forEach((entry) => suggestions.add(entry));
    }
  }

  return [...suggestions];
}

export function getMeetupLocationDescription(location: string): string {
  return (
    MEETUP_LOCATION_DESCRIPTIONS[location as (typeof MEETUP_LOCATION_OPTIONS)[number]] ??
    'Your custom meetup spot'
  );
}

export function filterMeetupLocationSuggestions(
  query: string,
  suggestions: readonly string[],
  limit = 8,
): string[] {
  return filterResidenceSuggestions(query, suggestions, limit);
}

export const INTEREST_OPTIONS = [
  'Coffee dates',
  'Study sessions',
  'Live music',
  'Fitness',
  'Food spots',
  'Museums',
  'Hiking',
  'Gaming',
  'Photography',
  'Volunteering',
  'Sports',
  'Reading',
] as const;

export const SOCIAL_PLATFORMS = ['Instagram', 'Snapchat', 'TikTok', 'LinkedIn', 'X'] as const;

export const SCHOOL_PROMPTS = [
  'What is your go-to study spot on campus?',
  'Best class you have taken here?',
  'What do you do after a long day of classes?',
  'Campus tradition you cannot miss?',
  'How would your friends describe you?',
  'What is your ideal first meetup on campus?',
] as const;

export function filterPromptSuggestions(
  query: string,
  suggestions: readonly string[],
  limit = 6,
): string[] {
  return filterResidenceSuggestions(query, suggestions, limit);
}

export const ARCHETYPE_OPTIONS = [
  'Library regular',
  'Social butterfly',
  'Athlete',
  'Creative',
  'Overachiever',
  'Low-key',
  'Explorer',
] as const;

export const ARCHETYPE_DESCRIPTIONS: Record<(typeof ARCHETYPE_OPTIONS)[number], string> = {
  'Library regular': 'Quiet spots and study grind',
  'Social butterfly': 'Always at events and hangouts',
  Athlete: 'Gym, fields, and rec life',
  Creative: 'Arts, design, and side projects',
  Overachiever: 'Clubs, internships, all of it',
  'Low-key': 'Small circles, chill vibes',
  Explorer: 'New places and spontaneous plans',
};

export const OPENING_MOVE_OPTIONS = [
  'Ask about their favorite campus spot',
  'Suggest a coffee at the student union',
  'Compliment something on their profile',
  'Ask what they are studying',
  'Share a fun campus fact',
] as const;

export const OPENING_MOVE_DESCRIPTIONS: Record<(typeof OPENING_MOVE_OPTIONS)[number], string> = {
  'Ask about their favorite campus spot': 'Start with where they like to hang out',
  'Suggest a coffee at the student union': 'Low-pressure first meetup idea',
  'Compliment something on their profile': 'Warm and personal opener',
  'Ask what they are studying': 'Classic campus conversation starter',
  'Share a fun campus fact': 'Playful way to break the ice',
};

export function withDescriptions<T extends string>(
  options: readonly T[],
  descriptions: Record<T, string>,
) {
  return options.map((option) => ({
    value: option,
    label: option,
    description: descriptions[option],
  }));
}

const SCHOOLS_BY_DOMAIN: Record<string, string> = {
  'stanford.edu': 'Stanford University',
  'berkeley.edu': 'UC Berkeley',
  'ucla.edu': 'UCLA',
  'usc.edu': 'USC',
  'nyu.edu': 'New York University',
  'columbia.edu': 'Columbia University',
  'harvard.edu': 'Harvard University',
  'mit.edu': 'MIT',
  'umich.edu': 'University of Michigan',
  'utexas.edu': 'University of Texas at Austin',
  'up.edu.ph': 'University of the Philippines',
  'upd.edu.ph': 'University of the Philippines Diliman',
  'ups.edu.ph': 'University of the Philippines System',
  'ust.edu.ph': 'University of Santo Tomas',
  'ateneo.edu.ph': 'Ateneo de Manila University',
  'admu.edu.ph': 'Ateneo de Manila University',
  'dlsu.edu.ph': 'De La Salle University',
  'feu.edu.ph': 'Far Eastern University',
  'nu.edu.ph': 'National University',
  'mapua.edu.ph': 'Mapúa University',
  'pup.edu.ph': 'Polytechnic University of the Philippines',
  'adamson.edu.ph': 'Adamson University',
  'ue.edu.ph': 'University of the East',
  'usc.edu.ph': 'University of San Carlos',
  'msu.edu.ph': 'Mindanao State University',
};

/** Slug from x@[slug].edu.ph — used when full domain is not in SCHOOLS_BY_DOMAIN */
const SCHOOLS_BY_PH_SLUG: Record<string, string> = {
  up: 'University of the Philippines',
  upd: 'University of the Philippines Diliman',
  ups: 'University of the Philippines System',
  ust: 'University of Santo Tomas',
  ateneo: 'Ateneo de Manila University',
  admu: 'Ateneo de Manila University',
  dlsu: 'De La Salle University',
  feu: 'Far Eastern University',
  nu: 'National University',
  mapua: 'Mapúa University',
  pup: 'Polytechnic University of the Philippines',
  adamson: 'Adamson University',
  ue: 'University of the East',
  usc: 'University of San Carlos',
  msu: 'Mindanao State University',
};

function formatSchoolSlug(slug: string): string {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getPhilippineSchoolSlug(domain: string): string | null {
  const match = domain.match(/^([a-z0-9-]+)\.edu\.ph$/);
  return match?.[1] ?? null;
}

export function detectSchoolFromEmail(email?: string): { name: string; domain: string } | null {
  if (!email?.includes('@')) {
    return null;
  }

  const domain = email.split('@')[1]?.trim().toLowerCase();
  if (!domain) {
    return null;
  }

  const knownDomain = SCHOOLS_BY_DOMAIN[domain];
  if (knownDomain) {
    return { name: knownDomain, domain };
  }

  const phSlug = getPhilippineSchoolSlug(domain);
  if (phSlug) {
    const knownSlug = SCHOOLS_BY_PH_SLUG[phSlug];
    return {
      name: knownSlug ?? formatSchoolSlug(phSlug),
      domain,
    };
  }

  if (domain.endsWith('.edu') && !domain.endsWith('.edu.ph')) {
    const slug = domain.replace(/\.edu$/, '');
    const formatted = slug
      .split('.')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    return { name: formatted, domain };
  }

  return null;
}

export function schoolIdToYearLevel(schoolId: string, referenceYear = new Date().getFullYear()): string | null {
  const digits = schoolId.replace(/\D/g, '');
  if (digits.length < 4) {
    return null;
  }

  const yearMatch = digits.match(/^(20\d{2})/);
  if (!yearMatch) {
    return null;
  }

  const enrollYear = Number.parseInt(yearMatch[1], 10);
  const yearsIn = referenceYear - enrollYear;

  if (yearsIn <= 0) {
    return 'Freshman';
  }
  if (yearsIn === 1) {
    return 'Sophomore';
  }
  if (yearsIn === 2) {
    return 'Junior';
  }
  if (yearsIn === 3) {
    return 'Senior';
  }

  return 'Graduate';
}

export function getProfileStepPath(stepId: ProfileStepId): string {
  return PROFILE_STEP_PATHS[stepId];
}

export function getNextProfilePath(stepId: ProfileStepId): string {
  const index = PROFILE_ALL_STEPS.indexOf(stepId);
  const nextStep = PROFILE_ALL_STEPS[index + 1];
  return nextStep ? getProfileStepPath(nextStep) : '/home';
}

export function getProfileStepProgress(stepId: ProfileStepId): { current: number; total: number } {
  const index = PROFILE_ALL_STEPS.indexOf(stepId);
  return { current: index + 1, total: PROFILE_ALL_STEPS.length };
}

export function isOptionalProfileStep(stepId: ProfileStepId): boolean {
  return PROFILE_OPTIONAL_STEPS.includes(stepId);
}

export function calculateAge(birthday: string): number | null {
  const date = new Date(birthday);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const monthDelta = today.getMonth() - date.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && today.getDate() < date.getDate())) {
    age -= 1;
  }

  return age;
}
