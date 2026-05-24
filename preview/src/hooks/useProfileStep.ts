import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getNextProfilePath } from '@/constants/profile';
import { getProfileDraft, updateProfileDraft } from '@/constants/profileFlow';

export function useProfileStep(stepId: Parameters<typeof getNextProfilePath>[0]) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const draft = getProfileDraft();

  const continueToNext = async (patch: Parameters<typeof updateProfileDraft>[0]) => {
    updateProfileDraft(patch);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoading(false);
    navigate(getNextProfilePath(stepId));
  };

  const skipStep = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(false);
    navigate(getNextProfilePath(stepId));
  };

  return {
    draft,
    loading,
    continueToNext,
    skipStep,
    goBack: () => navigate(-1),
  };
}
