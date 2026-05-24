import { useState } from 'react';

import { LabeledInput } from '@/components/onboarding/LabeledInput';
import { SelectionCards } from '@/components/onboarding/SelectionCards';
import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { OPENING_MOVE_DESCRIPTIONS, OPENING_MOVE_OPTIONS, withDescriptions } from '@/constants/profile';
import { useProfileStep } from '@/hooks/useProfileStep';

const OPENING_MOVE_CARD_OPTIONS = [
  ...withDescriptions(OPENING_MOVE_OPTIONS, OPENING_MOVE_DESCRIPTIONS),
  { value: 'Custom', label: 'Custom', description: 'Write your own opener' },
];

export default function ProfileOpeningMoveScreen() {
  const { draft, loading, continueToNext, skipStep, goBack } = useProfileStep('opening-move');
  const [openingMove, setOpeningMove] = useState(draft.openingMove ?? '');
  const [customMove, setCustomMove] = useState('');

  const handleContinue = () => {
    const resolved = openingMove === 'Custom' ? customMove.trim() : openingMove.trim();
    void continueToNext({ openingMove: resolved || undefined });
  };

  return (
    <ProfileStepLayout
      stepId="opening-move"
      headline="Opening move"
      subhead="How you like to start a conversation. Optional."
      onBack={goBack}
      onContinue={handleContinue}
      onSkip={skipStep}
      loading={loading}>
      <SelectionCards
        label="Opening move"
        variant="list"
        options={OPENING_MOVE_CARD_OPTIONS}
        value={openingMove}
        onChange={setOpeningMove}
      />
      {openingMove === 'Custom' ? (
        <LabeledInput label="Your opening move" value={customMove} onChangeText={setCustomMove} />
      ) : null}
    </ProfileStepLayout>
  );
}
