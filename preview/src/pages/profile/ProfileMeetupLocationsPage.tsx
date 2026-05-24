import { useMemo, useState } from 'react';

import { MeetupLocationPicker } from '@/components/onboarding/MeetupLocationPicker';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { getMeetupLocationSuggestions } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileMeetupLocationsPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('meetup-locations');
  const suggestions = useMemo(
    () => getMeetupLocationSuggestions(draft.schoolDomain, draft.schoolName),
    [draft.schoolDomain, draft.schoolName],
  );
  const [meetupLocations, setMeetupLocations] = useState<string[]>(draft.meetupLocations ?? []);
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    if (meetupLocations.length === 0) {
      setError('Add at least one meetup spot.');
      return;
    }

    setError(undefined);
    void continueToNext({ meetupLocations });
  };

  return (
    <ProfileStepLayout
      stepId="meetup-locations"
      headline="Where do you want to meet up?"
      subhead="Add up to 3 campus-friendly spots for first dates."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <MeetupLocationPicker
        label="Meetup locations"
        values={meetupLocations}
        onChange={setMeetupLocations}
        suggestions={suggestions}
        max={3}
        error={error}
      />
    </ProfileStepLayout>
  );
}
