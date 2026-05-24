import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import type { DiscoveryProfile } from '@/constants/discovery';

type MatchOverlayContextValue = {
  pendingMatch: DiscoveryProfile | null;
  showMatch: (profile: DiscoveryProfile) => void;
  clearMatch: () => void;
  advanceDeckSignal: number;
  requestDeckAdvance: () => void;
};

const MatchOverlayContext = createContext<MatchOverlayContextValue | null>(null);

export function MatchOverlayProvider({ children }: { children: ReactNode }) {
  const [pendingMatch, setPendingMatch] = useState<DiscoveryProfile | null>(null);
  const [advanceDeckSignal, setAdvanceDeckSignal] = useState(0);

  const showMatch = useCallback((profile: DiscoveryProfile) => {
    setPendingMatch(profile);
  }, []);

  const clearMatch = useCallback(() => {
    setPendingMatch(null);
  }, []);

  const requestDeckAdvance = useCallback(() => {
    setAdvanceDeckSignal((value) => value + 1);
  }, []);

  const value = useMemo(
    () => ({
      pendingMatch,
      showMatch,
      clearMatch,
      advanceDeckSignal,
      requestDeckAdvance,
    }),
    [pendingMatch, showMatch, clearMatch, advanceDeckSignal, requestDeckAdvance],
  );

  return <MatchOverlayContext.Provider value={value}>{children}</MatchOverlayContext.Provider>;
}

export function useMatchOverlay() {
  const context = useContext(MatchOverlayContext);
  if (!context) {
    throw new Error('useMatchOverlay must be used within MatchOverlayProvider');
  }
  return context;
}
