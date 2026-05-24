import type { ProfileData } from '@/constants/profile';

let profileDraft: ProfileData = {};

export function getProfileDraft(): ProfileData {
  return profileDraft;
}

export function updateProfileDraft(patch: Partial<ProfileData>) {
  profileDraft = { ...profileDraft, ...patch };
}

export function setProfileEmail(email?: string) {
  profileDraft = { ...profileDraft, email: email?.trim() };
}

export function resetProfileDraft() {
  profileDraft = {};
}

export function initProfileFromEmail(email?: string) {
  profileDraft = { ...profileDraft, email: email?.trim() };
}
