import logoSun from '@assets/logo-sun.png';

type OnboardingFlowTopBarProps = {
  onBack?: () => void;
  showBack?: boolean;
};

export function OnboardingFlowTopBar({ onBack, showBack = true }: OnboardingFlowTopBarProps) {
  return (
    <div className={`sign-in-page__topbar${showBack ? '' : ' sign-in-page__topbar--no-back'}`}>
      {showBack ? (
        <button type="button" className="back-button" onClick={onBack} aria-label="Go back">
          ←
        </button>
      ) : null}
      <div className="sign-in-page__brand">
        <img src={logoSun} alt="" className="sign-in-page__brand-logo" width={35} height={35} />
        <span className="sign-in-page__brand-wordmark">After Class</span>
      </div>
    </div>
  );
}
