import { MEETUP_EXPIRY_HOURS } from '@/constants/meetup';

export type ConfirmedMatch = {
  profileId: string;
  confirmedAt: string;
  expiresAt: string;
};

let confirmedMatches: ConfirmedMatch[] = [];

const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeConfirmedMatches(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConfirmedMatches(): ConfirmedMatch[] {
  return [...confirmedMatches].sort(
    (left, right) => new Date(right.confirmedAt).getTime() - new Date(left.confirmedAt).getTime(),
  );
}

export function getConfirmedMatch(profileId: string): ConfirmedMatch | null {
  return confirmedMatches.find((match) => match.profileId === profileId) ?? null;
}

export function addConfirmedMatch(profileId: string): ConfirmedMatch {
  const existing = getConfirmedMatch(profileId);
  if (existing) {
    return existing;
  }

  const confirmedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + MEETUP_EXPIRY_HOURS * 60 * 60 * 1000).toISOString();
  const nextMatch: ConfirmedMatch = { profileId, confirmedAt, expiresAt };

  confirmedMatches = [nextMatch, ...confirmedMatches];
  emitChange();

  return nextMatch;
}

export function removeExpiredMatches(now = Date.now()): void {
  const next = confirmedMatches.filter((match) => new Date(match.expiresAt).getTime() > now);
  if (next.length !== confirmedMatches.length) {
    confirmedMatches = next;
    emitChange();
  }
}

export function resetConfirmedMatches() {
  confirmedMatches = [];
  emitChange();
}
