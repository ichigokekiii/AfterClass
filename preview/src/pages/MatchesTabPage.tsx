import { useEffect, useState } from 'react';

import { MainTopBar } from '@/components/main/MainTopBar';
import { MatchDetailSheet } from '@/components/main/MatchDetailSheet';
import { MatchListItem } from '@/components/main/MatchListItem';
import type { ConfirmedMatch } from '@/constants/confirmedMatches';
import { formatMeetupCountdown } from '@/constants/meetup';
import { useConfirmedMatches } from '@/hooks/useConfirmedMatches';

function useCountdown(expiresAt: string) {
  const [countdown, setCountdown] = useState(() => formatMeetupCountdown(expiresAt));

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCountdown(formatMeetupCountdown(expiresAt));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [expiresAt]);

  return countdown;
}

function MatchListSection({ matches, onOpen }: { matches: ConfirmedMatch[]; onOpen: (match: ConfirmedMatch) => void }) {
  return (
    <ul className="matches-tab__list">
      {matches.map((match) => (
        <li key={match.profileId}>
          <MatchListItemWrapper match={match} onOpen={() => onOpen(match)} />
        </li>
      ))}
    </ul>
  );
}

function MatchListItemWrapper({ match, onOpen }: { match: ConfirmedMatch; onOpen: () => void }) {
  const countdown = useCountdown(match.expiresAt);
  return <MatchListItem match={match} countdown={countdown} onOpen={onOpen} />;
}

export function MatchesTabPage() {
  const matches = useConfirmedMatches();
  const [selectedMatch, setSelectedMatch] = useState<ConfirmedMatch | null>(null);

  return (
    <>
      <MainTopBar />

      <div className="main-page__body matches-tab-page">
        <div className="matches-tab-page__header">
          <h1 className="matches-tab-page__title">Matches</h1>
          <p className="matches-tab-page__subtitle">
            {matches.length > 0
              ? 'Tap a match to see your meetup map and full date details.'
              : 'When you confirm a match, they show up here.'}
          </p>
        </div>

        {matches.length > 0 ? (
          <MatchListSection matches={matches} onOpen={setSelectedMatch} />
        ) : (
          <div className="matches-tab-page__empty">
            <p className="matches-tab__body">No confirmed matches yet.</p>
          </div>
        )}
      </div>

      <MatchDetailSheet match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </>
  );
}
