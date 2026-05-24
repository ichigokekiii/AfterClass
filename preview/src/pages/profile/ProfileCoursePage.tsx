import { useMemo, useState } from 'react';

import { CourseAutocomplete } from '@/components/onboarding/CourseAutocomplete';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { getCoursesForSchool } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfileCoursePage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('course');
  const courses = useMemo(
    () => getCoursesForSchool(draft.schoolDomain, draft.schoolName),
    [draft.schoolDomain, draft.schoolName],
  );
  const [course, setCourse] = useState(draft.course ?? '');
  const [error, setError] = useState<string | undefined>();

  const handleContinue = () => {
    const trimmed = course.trim();
    if (!trimmed) {
      setError('Enter or select your course.');
      return;
    }

    setError(undefined);
    void continueToNext({ course: trimmed });
  };

  return (
    <ProfileStepLayout
      stepId="course"
      headline="What are you studying?"
      subhead="Start typing to see programs offered at your school."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <CourseAutocomplete
        label="Course"
        value={course}
        onChange={setCourse}
        courses={courses}
        error={error}
      />
    </ProfileStepLayout>
  );
}
