import { useEffect, useSyncExternalStore } from 'react';

import {
  getConfirmedMatches,
  removeExpiredMatches,
  subscribeConfirmedMatches,
} from '@/constants/confirmedMatches';

export function useConfirmedMatches() {
  const matches = useSyncExternalStore(subscribeConfirmedMatches, getConfirmedMatches, getConfirmedMatches);

  useEffect(() => {
    removeExpiredMatches();

    const intervalId = window.setInterval(() => {
      removeExpiredMatches();
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return matches;
}
