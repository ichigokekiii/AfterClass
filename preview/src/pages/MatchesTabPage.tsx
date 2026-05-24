import { MainTopBar } from '@/components/main/MainTopBar';

export function MatchesTabPage() {
  return (
    <>
      <MainTopBar />

      <div className="main-page__body main-page__body--centered">
        <div className="matches-tab">
          <h1 className="matches-tab__title">Matches</h1>
          <p className="matches-tab__body">When you accept a match, they show up here.</p>
        </div>
      </div>
    </>
  );
}
