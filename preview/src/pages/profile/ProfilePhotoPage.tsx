import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';

import { ProfileStepLayout } from '@/components/onboarding/ProfileStepLayout';
import { useProfileStep } from '@/hooks/useProfileStep';

export function ProfilePhotoPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('photo');
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState(draft.photoName ?? '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPhotoName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
    setError(undefined);
  };

  const handleContinue = () => {
    if (!photoName) {
      setError('Add one profile photo to continue.');
      return;
    }

    setError(undefined);
    void continueToNext({ photoName });
  };

  return (
    <ProfileStepLayout
      stepId="photo"
      headline="Add your photo"
      subhead="One clear photo of you — face visible, campus-friendly."
      onBack={goBack}
      onContinue={handleContinue}
      loading={loading}>
      <button type="button" className="profile-photo-upload" onClick={() => inputRef.current?.click()}>
        {previewUrl ? (
          <img src={previewUrl} alt="Profile preview" className="profile-photo-upload__preview" />
        ) : (
          <span className="profile-photo-upload__placeholder">Tap to add photo</span>
        )}
      </button>
      <input ref={inputRef} type="file" accept="image/*" className="profile-photo-upload__input" onChange={handleFileChange} />
      {photoName ? <p className="profile-hint">{photoName}</p> : null}
      {error ? (
        <p className="labeled-input__error" role="alert">
          {error}
        </p>
      ) : null}
    </ProfileStepLayout>
  );
}
