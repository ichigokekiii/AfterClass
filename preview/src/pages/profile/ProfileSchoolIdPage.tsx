import { useMemo, useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { schoolIdToYearLevel } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileSchoolIdPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('school-id');
  const [schoolId, setSchoolId] = useState(draft.schoolId ?? '');
  const [error, setError] = useState<string | undefined>();
  const yearLevel = useMemo(() => schoolIdToYearLevel(schoolId), [schoolId]);

  const handleContinue = () => {
    const trimmed = schoolId.trim();
    if (!trimmed) {
      setError('Enter your school ID.');
      return;
    }

    if (!yearLevel) {
      setError('Use a school ID that starts with your enrollment year (e.g. 2024…).');
      return;
    }

    setError(undefined);
    void continueToNext({ schoolId: trimmed, yearLevel });
  };

  return (
    <ProfileStepLayout
      stepId="school-id"
      headline="What is your school ID?"
      subhead="We use this to estimate your year level on campus."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <LabeledInput
        label="School ID"
        inputMode="numeric"
        autoComplete="off"
        value={schoolId}
        onChange={(event) => setSchoolId(event.target.value)}
        error={error}
      />
      {yearLevel ? <p className="profile-hint profile-hint--success">Year level: {yearLevel}</p> : null}
    </ProfileStepLayout>
  );
}
