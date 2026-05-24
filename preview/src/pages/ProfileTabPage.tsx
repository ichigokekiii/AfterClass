import { MainTopBar } from '@/components/main/MainTopBar';

export function ProfileTabPage() {
  return (
    <>
      <MainTopBar />

      <div className="main-page__body main-page__body--centered">
        <div className="matches-tab">
          <h1 className="matches-tab__title">Profile</h1>
          <p className="matches-tab__body">Your profile and settings will live here.</p>
        </div>
      </div>
    </>
  );
}
