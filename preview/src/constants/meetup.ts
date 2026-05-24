import type { DiscoveryProfile } from '@/constants/discovery';
import { MOCK_DISCOVERY_PROFILES } from '@/constants/discovery';

export type MatchAvailability = {
  dayLabel: string;
  startTime: string;
  endTime: string;
};

export type MeetupProposal = {
  matchId: string;
  radiusKm: number;
  areaLabel: string;
  venueName: string;
  venuePhotoUrl: string;
  venueDescription: string;
};

export const MEETUP_MIN_DURATION_MINUTES = 60;
export const MEETUP_EXPIRY_HOURS = 48;

export const MOCK_MATCH_AVAILABILITY: Record<string, MatchAvailability> = {
  sofia: {
    dayLabel: 'Sat',
    startTime: '2:30 PM',
    endTime: '3:30 PM',
  },
  marco: {
    dayLabel: 'Wed',
    startTime: '11:30 AM',
    endTime: '12:30 PM',
  },
  isabel: {
    dayLabel: 'Thu',
    startTime: '12:00 PM',
    endTime: '1:00 PM',
  },
};

export const MOCK_MEETUP_PROPOSALS: Record<string, MeetupProposal> = {
  sofia: {
    matchId: 'sofia',
    radiusKm: 10,
    areaLabel: 'Bonifacio Global City',
    venueName: 'The Coffee Academics',
    venuePhotoUrl: '',
    venueDescription: 'The best coffee date thats in between you',
  },
  marco: {
    matchId: 'marco',
    radiusKm: 10,
    areaLabel: 'Manila Bay area',
    venueName: 'Starbucks Reserve — MOA',
    venuePhotoUrl: '',
    venueDescription: 'A low-key spot halfway between your campuses',
  },
  isabel: {
    matchId: 'isabel',
    radiusKm: 10,
    areaLabel: 'Maginhawa food strip',
    venueName: 'Bo\'s Coffee — UP Town',
    venuePhotoUrl: '',
    venueDescription: 'Easy daytime coffee between Katipunan and your side of town',
  },
};

export function getMatchProfile(matchId: string | undefined): DiscoveryProfile | null {
  if (!matchId) {
    return null;
  }

  return MOCK_DISCOVERY_PROFILES.find((profile) => profile.id === matchId) ?? null;
}

export function getMeetupProposal(matchId: string | undefined): MeetupProposal | null {
  if (!matchId) {
    return null;
  }

  return MOCK_MEETUP_PROPOSALS[matchId] ?? null;
}

export function getMatchAvailability(matchId: string | undefined): MatchAvailability | null {
  if (!matchId) {
    return null;
  }

  return MOCK_MATCH_AVAILABILITY[matchId] ?? null;
}

export function formatMatchAvailability(availability: MatchAvailability): string {
  return `${availability.dayLabel}, ${availability.startTime} to ${availability.endTime}`;
}

export function formatMeetupCountdown(expiresAt: string, now = Date.now()): string {
  const remainingMs = Math.max(new Date(expiresAt).getTime() - now, 0);
  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
