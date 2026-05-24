import discoveryProfilePhoto from '@assets/discovery-profile-sample.png';
import type { ProfileData } from '@/constants/profile';

export type DiscoveryProfile = ProfileData & {
  id: string;
  photoUrl: string;
};

export type SwipeDirection = 'like' | 'pass';

export type SwipeAdvance = 'advance' | 'hold';

export const MATCH_ACCEPT_SECONDS = 30;

export type MainTabId = 'matches' | 'home' | 'profile';

export const MAIN_TABS: { id: MainTabId; label: string }[] = [
  { id: 'matches', label: 'Matches' },
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
];

export const MOCK_DISCOVERY_PROFILES: DiscoveryProfile[] = [
  {
    id: 'sofia',
    displayName: 'Sofia Reyes',
    schoolName: 'University of Santo Tomas',
    schoolDomain: 'ust.edu.ph',
    course: 'Nursing',
    yearLevel: '4th year',
    birthday: '2002-03-15',
    gender: 'Woman',
    interestedIn: ['Men'],
    residence: 'Sampaloc, Manila',
    meetupLocations: ['UST Main Building', 'SM Mall of Asia', 'Rizal Park'],
    interests: ['Coffee dates', 'Volunteering', 'Reading'],
    socialMedia: [
      { platform: 'Instagram', handle: '@sofiar' },
      { platform: 'TikTok', handle: '@sofi.study' },
    ],
    prompts: [
      {
        question: 'What is your go-to study spot on campus?',
        answer: 'The health sciences library — quiet corner by the windows.',
      },
      {
        question: 'How would your friends describe you?',
        answer: 'Warm, organized, and always down for a post-class coffee.',
      },
    ],
    organizations: ['Student Nurses Association', 'Campus outreach club'],
    archetype: 'Low-key',
    openingMove: 'Suggest a coffee spot near campus',
    favoriteSpots: ['UST Main Building', 'Mall of Asia food hall'],
    photoUrl: discoveryProfilePhoto,
  },
  {
    id: 'marco',
    displayName: 'Marco Santos',
    schoolName: 'De La Salle University',
    schoolDomain: 'dlsu.edu.ph',
    course: 'Computer Science',
    yearLevel: '2nd year',
    birthday: '2004-08-22',
    gender: 'Man',
    interestedIn: ['Women'],
    residence: 'Taft Avenue area',
    meetupLocations: ['DLSU Henry Sy Hall', 'Ayala Malls Manila Bay', 'Bonifacio High Street'],
    interests: ['Gaming', 'Live music', 'Food spots', 'Photography'],
    socialMedia: [
      { platform: 'Instagram', handle: '@marco.codes' },
      { platform: 'LinkedIn', handle: 'marco-santos' },
    ],
    prompts: [
      {
        question: 'Best class you have taken here?',
        answer: 'Intro to AI — finally understood why everyone talks about it.',
      },
      {
        question: 'What do you do after a long day of classes?',
        answer: 'Grab milk tea, queue ranked with friends, or find a new food spot.',
      },
    ],
    organizations: ['Programming guild', 'Esports club'],
    archetype: 'Creative',
    openingMove: 'Ask about their favorite campus food spot',
    favoriteSpots: ['Henry Sy Hall lobby', 'Starbucks Taft'],
    photoUrl: discoveryProfilePhoto,
  },
  {
    id: 'isabel',
    displayName: 'Isabel Cruz',
    schoolName: 'University of the Philippines Diliman',
    schoolDomain: 'upd.edu.ph',
    course: 'Psychology',
    yearLevel: '3rd year',
    birthday: '2003-01-09',
    gender: 'Woman',
    interestedIn: ['Everyone'],
    residence: 'Katipunan area',
    meetupLocations: ['UP Sunken Garden', 'Maginhawa food strip', 'UP Town Center'],
    interests: ['Museums', 'Hiking', 'Study sessions', 'Volunteering'],
    socialMedia: [{ platform: 'Instagram', handle: '@isa.cruz' }],
    prompts: [
      {
        question: 'Campus tradition you cannot miss?',
        answer: 'Lantern parade prep — even if I am just watching from the sidelines.',
      },
      {
        question: 'What is your ideal first meetup on campus?',
        answer: 'Walk around Sunken Garden, then coffee somewhere low-pressure.',
      },
      {
        question: 'How would your friends describe you?',
        answer: 'Curious, easy to talk to, and a little too good at reading the room.',
      },
    ],
    organizations: ['Psych society', 'Peer support volunteers'],
    archetype: 'Social butterfly',
    openingMove: 'Share a fun campus story',
    favoriteSpots: ['Sunken Garden', 'Maginhawa Street'],
    photoUrl: discoveryProfilePhoto,
  },
];

export function getDiscoveryDisplayName(profile: DiscoveryProfile): string {
  return profile.displayName?.trim() || 'Student';
}

export function getDiscoverySchool(profile: DiscoveryProfile): string {
  return profile.schoolName?.trim() || 'Verified campus';
}

export function getDiscoveryYear(profile: DiscoveryProfile): string {
  return profile.yearLevel?.trim() || 'Year level unavailable';
}

export function getDiscoveryCourse(profile: DiscoveryProfile): string {
  return profile.course?.trim() || 'Course unavailable';
}
