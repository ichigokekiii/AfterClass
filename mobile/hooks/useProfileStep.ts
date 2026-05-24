import { useState } from 'react';
import { router } from 'expo-router';

import { getNextProfilePath } from '@/constants/profile';
import { getProfileDraft, updateProfileDraft } from '@/constants/profileFlow';

export function useProfileStep(stepId: Parameters<typeof getNextProfilePath>[0]) {
  const [loading, setLoading] = useState(false);
  const draft = getProfileDraft();

  const goToNext = (stepId: Parameters<typeof getNextProfilePath>[0]) => {
    const nextPath = getNextProfilePath(stepId);
    if (nextPath === '/done') {
      router.replace('/(tabs)');
      return;
    }
    router.push(nextPath);
  };

  const continueToNext = async (patch: Parameters<typeof updateProfileDraft>[0]) => {
    updateProfileDraft(patch);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    goToNext(stepId);
  };

  const skipStep = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(false);
    goToNext(stepId);
  };

  return {
    draft,
    loading,
    continueToNext,
    skipStep,
    goBack: () => router.back(),
  };
}
