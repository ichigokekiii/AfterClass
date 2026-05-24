import { useCallback, useState } from 'react';

import { MainTopBar } from '@/components/main/MainTopBar';
import { ProfileDetailSheet } from '@/components/main/ProfileDetailSheet';
import { SwipeableCardStack } from '@/components/main/SwipeableCardStack';
import { useMatchOverlay } from '@/contexts/MatchOverlayContext';
import { MOCK_DISCOVERY_PROFILES, type DiscoveryProfile, type SwipeAdvance } from '@/constants/discovery';

export function HomeTabPage() {
  const { pendingMatch, showMatch, advanceDeckSignal } = useMatchOverlay();
  const [deckKey, setDeckKey] = useState(0);
  const [detailProfile, setDetailProfile] = useState<DiscoveryProfile | null>(null);

  const handleSwipe = useCallback(
    (profile: DiscoveryProfile, direction: 'like' | 'pass'): SwipeAdvance | void => {
      if (direction === 'like') {
        showMatch(profile);
        return 'hold';
      }
    },
    [showMatch],
  );

  const handleReset = useCallback(() => {
    setDeckKey((value) => value + 1);
    setDetailProfile(null);
  }, []);

  return (
    <>
      <MainTopBar />

      <div className="main-page__body">
        <SwipeableCardStack
          key={deckKey}
          profiles={MOCK_DISCOVERY_PROFILES}
          detailOpen={Boolean(detailProfile) || Boolean(pendingMatch)}
          advanceSignal={advanceDeckSignal}
          onSwipe={handleSwipe}
          onReset={handleReset}
          onProfileTap={setDetailProfile}
        />
      </div>

      <ProfileDetailSheet profile={detailProfile} onClose={() => setDetailProfile(null)} />
    </>
  );
}
