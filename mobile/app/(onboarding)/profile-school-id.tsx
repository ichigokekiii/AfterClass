import { useMemo, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { schoolIdToYearLevel } from '@/constants/profile';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { useProfileStep } from '@/hooks/useProfileStep';

export default function ProfileSchoolIdScreen() {
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
        keyboardType="number-pad"
        autoComplete="off"
        value={schoolId}
        onChangeText={setSchoolId}
        error={error}
      />
      {yearLevel ? <Text style={styles.hintSuccess}>Year level: {yearLevel}</Text> : null}
    </ProfileStepLayout>
  );
}

const styles = StyleSheet.create({
  hintSuccess: {
    ...typeScale.footnote,
    color: theme.colors.success,
  },
});
