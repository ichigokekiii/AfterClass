import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ProfileFlowTopBar } from '@/components/onboarding/ProfileFlowTopBar';
import { OnboardingScreen } from '@/components/onboarding/OnboardingScreen';
import { PillButton } from '@/components/onboarding/PillButton';
import { theme } from '@/constants/theme';
import { typeScale } from '@/constants/typography';
import { useProfileStep } from '@/hooks/useProfileStep';

const DEFAULT_CENTER = { lat: 14.6548, lng: 121.0688 };

function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
}

export default function ProfileResidenceMapScreen() {
  const { draft, loading, continueToNext, goBack } = useProfileStep('residence');
  const initialLat = draft.residenceLatitude ?? DEFAULT_CENTER.lat;
  const initialLng = draft.residenceLongitude ?? DEFAULT_CENTER.lng;
  const [pin, setPin] = useState({ lat: initialLat, lng: initialLng });
  const [label, setLabel] = useState(draft.residence ?? '');
  const [error, setError] = useState<string | undefined>();

  const coordinateHint = useMemo(() => formatCoordinates(pin.lat, pin.lng), [pin.lat, pin.lng]);

  const nudgePin = (latDelta: number, lngDelta: number) => {
    setPin((current) => ({
      lat: current.lat + latDelta,
      lng: current.lng + lngDelta,
    }));
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
    <OnboardingScreen scrollable showHeader={false}>
      <View style={styles.page}>
        <ProfileFlowTopBar stepId="residence" onBack={goBack} />

        <View style={styles.intro}>
          <Text style={styles.headline}>Pin your area</Text>
          <Text style={styles.subhead}>Move the pin on the map. No exact address needed.</Text>
        </View>

        <View style={styles.canvas} accessibilityLabel="Map preview with location pin">
          <View style={styles.grid} />
          <View style={styles.pin}>
            <View style={styles.pinHead} />
            <View style={styles.pinTail} />
          </View>
          <Text style={styles.coords}>{coordinateHint}</Text>
          <View style={styles.nudgeRow}>
            <Pressable style={styles.nudgeButton} onPress={() => nudgePin(0.002, 0)}>
              <Text style={styles.nudgeLabel}>↑</Text>
            </Pressable>
            <Pressable style={styles.nudgeButton} onPress={() => nudgePin(-0.002, 0)}>
              <Text style={styles.nudgeLabel}>↓</Text>
            </Pressable>
            <Pressable style={styles.nudgeButton} onPress={() => nudgePin(0, -0.002)}>
              <Text style={styles.nudgeLabel}>←</Text>
            </Pressable>
            <Pressable style={styles.nudgeButton} onPress={() => nudgePin(0, 0.002)}>
              <Text style={styles.nudgeLabel}>→</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sheet}>
          <Text style={styles.label}>Location label</Text>
          <TextInput
            accessibilityLabel="Location label"
            placeholder="e.g. Near UP Sampaguita dorm"
            placeholderTextColor={theme.colors.textMuted}
            value={label}
            onChangeText={(value) => {
              setLabel(value);
              setError(undefined);
            }}
            style={[styles.input, error ? styles.inputError : null]}
          />
          {error ? (
            <Text style={styles.error} accessibilityRole="alert">
              {error}
            </Text>
          ) : null}
          <PillButton label="Use this location" onPress={handleConfirm} loading={loading} />
        </View>
      </View>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.section,
  },
  intro: {
    gap: theme.spacing.sm,
  },
  headline: {
    ...typeScale.title1,
    color: theme.colors.text,
  },
  subhead: {
    ...typeScale.subhead,
    color: theme.colors.textMuted,
  },
  canvas: {
    minHeight: 280,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    backgroundColor: '#EEF3EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.35,
    backgroundColor: '#DDE8D6',
  },
  pin: {
    alignItems: 'center',
    marginBottom: 24,
  },
  pinHead: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: theme.colors.coralBrand,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  pinTail: {
    width: 2,
    height: 12,
    marginTop: -2,
    backgroundColor: theme.colors.coralBrand,
  },
  coords: {
    ...typeScale.footnote,
    color: theme.colors.textMuted,
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  nudgeRow: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    gap: 6,
  },
  nudgeButton: {
    minWidth: 36,
    minHeight: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  nudgeLabel: {
    ...typeScale.subhead,
    color: theme.colors.text,
  },
  sheet: {
    gap: theme.spacing.sm,
  },
  label: {
    ...typeScale.subhead,
    fontWeight: '600',
    color: theme.colors.text,
  },
  input: {
    minHeight: theme.layout.buttonHeight,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.md,
    ...typeScale.body,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  inputError: {
    borderColor: '#C45C5C',
  },
  error: {
    ...typeScale.footnote,
    color: '#C45C5C',
  },
});
