import { useMemo, useState, type MouseEvent } from 'react';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { useProfileStep } from '@/hooks/useProfileStep';

const DEFAULT_CENTER = { lat: 14.6548, lng: 121.0688 };

function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export function ProfileResidenceMapPage() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('residence');
  const initialLat = draft.residenceLatitude ?? DEFAULT_CENTER.lat;
  const initialLng = draft.residenceLongitude ?? DEFAULT_CENTER.lng;
  const [pin, setPin] = useState({ lat: initialLat, lng: initialLng });
  const [label, setLabel] = useState(draft.residence ?? '');
  const [error, setError] = useState<string | undefined>();

  const coordinateHint = useMemo(() => formatCoordinates(pin.lat, pin.lng), [pin.lat, pin.lng]);

  const handleMapClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left) / rect.width;
    const yRatio = (event.clientY - rect.top) / rect.height;

    setPin({
      lat: DEFAULT_CENTER.lat + (0.5 - yRatio) * 0.04,
      lng: DEFAULT_CENTER.lng + (xRatio - 0.5) * 0.04,
    });
    setError(undefined);
  };

  const handleConfirm = () => {
    const trimmed = label.trim();
    if (!trimmed) {
      setError('Add a label for this location.');
      return;
    }

    setError(undefined);
    void continueToNext({
      residence: trimmed,
      residenceLatitude: pin.lat,
      residenceLongitude: pin.lng,
      residenceSource: 'map',
    });
  };

  return (
    <OnboardingScreen showHeader={false}>
      <div className="residence-map-page">
        <ProfileFlowTopBar stepId="residence" onBack={goBack} />

        <div className="residence-map-page__intro">
          <h1 className="sign-in-page__headline">Pin your area</h1>
          <p className="sign-in-page__subhead">Tap the map to move the pin. No exact address needed.</p>
        </div>

        <div
          className="residence-map-canvas"
          role="button"
          tabIndex={0}
          aria-label="Map. Tap to move pin."
          onClick={handleMapClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
            }
          }}>
          <div className="residence-map-canvas__grid" aria-hidden="true" />
          <div className="residence-map-canvas__pin" aria-hidden="true">
            <span className="residence-map-canvas__pin-head" />
            <span className="residence-map-canvas__pin-tail" />
          </div>
          <p className="residence-map-canvas__coords">{coordinateHint}</p>
        </div>

        <div className="residence-map-sheet">
          <label className="labeled-input__label" htmlFor="residence-map-label">
            Location label
          </label>
          <input
            id="residence-map-label"
            className={`labeled-input__field${error ? ' labeled-input__field--error' : ''}`}
            value={label}
            placeholder="e.g. Near UP Sampaguita dorm"
            onChange={(event) => {
              setLabel(event.target.value);
              setError(undefined);
            }}
          />
          {error ? (
            <p className="labeled-input__error" role="alert">
              {error}
            </p>
          ) : null}
          <PillButton label="Use this location" onClick={handleConfirm} loading={loading} />
        </div>
      </div>
    </OnboardingScreen>
  );
}
