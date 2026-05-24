import { useEffect, useState, useSyncExternalStore } from 'react';

import {
  getConfirmedMatches,
  removeExpiredMatches,
  subscribeConfirmedMatches,
} from '@/constants/confirmedMatches';

export function useConfirmedMatches() {
  const matches = useSyncExternalStore(subscribeConfirmedMatches, getConfirmedMatches, getConfirmedMatches);
  const [, setTick] = useState(0);

  useEffect(() => {
    removeExpiredMatches();

    const intervalId = window.setInterval(() => {
      removeExpiredMatches();
      setTick((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return matches;
}
