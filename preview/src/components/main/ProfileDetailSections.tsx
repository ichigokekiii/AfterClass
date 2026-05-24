import type { ReactNode } from 'react';

import { calculateAge } from '@/constants/profile';
import type { DiscoveryProfile } from '@/constants/discovery';
import {
  getDiscoveryCourse,
  getDiscoveryDisplayName,
  getDiscoverySchool,
  getDiscoveryYear,
} from '@/constants/discovery';

function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="profile-detail-sheet__section">
      <h3 className="profile-detail-sheet__section-title">{title}</h3>
      {children}
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value?: string | null }) {
  if (!value?.trim()) {
    return null;
  }

  return (
    <div className="profile-detail-sheet__row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function ChipList({ items }: { items?: string[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className="profile-detail-sheet__chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

type ProfileDetailSectionsProps = {
  profile: DiscoveryProfile;
};

type ProfileDetailHeaderProps = ProfileDetailSectionsProps & {
  titleId?: string;
  onClose?: () => void;
};

export function ProfileDetailHeader({ profile, titleId, onClose }: ProfileDetailHeaderProps) {
  const name = getDiscoveryDisplayName(profile);
  const age = profile.birthday ? calculateAge(profile.birthday) : null;

  return (
    <header className="profile-detail-sheet__header">
      <div className="profile-detail-sheet__header-photo">
        <img src={profile.photoUrl} alt="" width={72} height={72} />
      </div>
      <div>
        <h2 id={titleId} className="profile-detail-sheet__title">
          {name}
          {age ? `, ${age}` : ''}
        </h2>
        <p className="profile-detail-sheet__subtitle">
          {getDiscoverySchool(profile)} · {getDiscoveryYear(profile)} · {getDiscoveryCourse(profile)}
        </p>
      </div>
      {onClose ? (
        <button type="button" className="profile-detail-sheet__close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      ) : null}
    </header>
  );
}

export function ProfileDetailSections({ profile }: ProfileDetailSectionsProps) {
  return (
    <>
      <DetailSection title="Basics">
        <dl className="profile-detail-sheet__list">
          <DetailRow label="Gender" value={profile.gender} />
          <DetailRow label="Interested in" value={profile.interestedIn?.join(', ')} />
          <DetailRow label="Birthday" value={profile.birthday} />
          <DetailRow label="School ID" value={profile.schoolId ? 'On file' : undefined} />
        </dl>
      </DetailSection>

      <DetailSection title="Campus">
        <dl className="profile-detail-sheet__list">
          <DetailRow label="Area" value={profile.residence} />
        </dl>
        {profile.meetupLocations?.length ? (
          <>
            <p className="profile-detail-sheet__label">Meetup spots</p>
            <ChipList items={profile.meetupLocations} />
          </>
        ) : null}
        {profile.favoriteSpots?.length ? (
          <>
            <p className="profile-detail-sheet__label">Favorite spots</p>
            <ChipList items={profile.favoriteSpots} />
          </>
        ) : null}
        {profile.organizations?.length ? (
          <>
            <p className="profile-detail-sheet__label">Organizations</p>
            <ChipList items={profile.organizations} />
          </>
        ) : null}
      </DetailSection>

      <DetailSection title="About">
        <dl className="profile-detail-sheet__list">
          <DetailRow label="Archetype" value={profile.archetype} />
          <DetailRow label="Opening move" value={profile.openingMove} />
        </dl>
        {profile.interests?.length ? (
          <>
            <p className="profile-detail-sheet__label">Interests</p>
            <ChipList items={profile.interests} />
          </>
        ) : null}
      </DetailSection>

      {profile.prompts?.length ? (
        <DetailSection title="Prompts">
          <ul className="profile-detail-sheet__prompts">
            {profile.prompts.map((prompt) => (
              <li key={prompt.question}>
                <p className="profile-detail-sheet__prompt-q">{prompt.question}</p>
                <p className="profile-detail-sheet__prompt-a">{prompt.answer}</p>
              </li>
            ))}
          </ul>
        </DetailSection>
      ) : null}
    </>
  );
}
