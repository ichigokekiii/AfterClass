import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { MatchAcceptOverlay } from '@/components/main/MatchAcceptOverlay';
import { FloatingTabBar } from '@/components/main/FloatingTabBar';
import { MatchOverlayProvider, useMatchOverlay } from '@/contexts/MatchOverlayContext';
import { MAIN_TABS, type MainTabId } from '@/constants/discovery';

const TAB_PATHS: Record<MainTabId, string> = {
  home: '/home',
  matches: '/matches',
  profile: '/profile',
};

function tabFromPath(pathname: string): MainTabId {
  if (pathname.startsWith('/matches')) {
    return 'matches';
  }
  if (pathname.startsWith('/profile')) {
    return 'profile';
  }
  return 'home';
}

function MainAppLayoutContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeTab = tabFromPath(location.pathname);
  const { pendingMatch, clearMatch, requestDeckAdvance } = useMatchOverlay();

  const finishMatch = () => {
    clearMatch();
    requestDeckAdvance();
  };

  return (
    <div className="main-page">
      <Outlet />

      {!pendingMatch ? (
        <FloatingTabBar
          activeTab={activeTab}
          onTabChange={(tab) => navigate(TAB_PATHS[tab])}
          tabs={MAIN_TABS}
        />
      ) : null}

      {pendingMatch ? (
        <MatchAcceptOverlay
          profile={pendingMatch}
          onAccept={() => {
            const matchId = pendingMatch.id;
            finishMatch();
            navigate(`/meetup/${matchId}`);
          }}
          onKeepSearching={finishMatch}
          onExpire={finishMatch}
        />
      ) : null}
    </div>
  );
}

export function MainAppLayout() {
  return (
    <MatchOverlayProvider>
      <MainAppLayoutContent />
    </MatchOverlayProvider>
  );
}
