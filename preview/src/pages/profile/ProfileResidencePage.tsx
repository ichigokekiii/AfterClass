import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { ResidenceAutocomplete } from '@/components/onboarding/ResidenceAutocomplete';
import { getResidenceSuggestions } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileResidencePage() {
  const navigate = useNavigate();
  const { draft, loading, continueToNext, goBack } = useProfileStep('residence');
  const suggestions = useMemo(
    () => getResidenceSuggestions(draft.schoolDomain, draft.schoolName),
    [draft.schoolDomain, draft.schoolName],
  );
  const [residence, setResidence] = useState(draft.residence ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    const trimmed = residence.trim();
    if (!trimmed) {
      setError('Enter or select where you live.');
      return;
    }

    const matchedSuggestion = suggestions.some(
      (entry) => entry.toLowerCase() === trimmed.toLowerCase(),
    );

    setError(undefined);
    void continueToNext({
      residence: trimmed,
      residenceSource: matchedSuggestion ? 'suggestion' : 'custom',
      residenceLatitude: undefined,
      residenceLongitude: undefined,
    });
  };

  return (
    <ProfileStepLayout
      stepId="residence"
      headline="Where do you live?"
      subhead="Search for your dorm or area, or pin it on a map."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <ResidenceAutocomplete
        label="Location of residence"
        value={residence}
        onChange={setResidence}
        suggestions={suggestions}
        error={error}
      />
      <button
        type="button"
        className="text-button"
        onClick={() => navigate('/profile-residence-map')}
        disabled={loading}>
        Pin on map instead
      </button>
    </ProfileStepLayout>
  );
}
