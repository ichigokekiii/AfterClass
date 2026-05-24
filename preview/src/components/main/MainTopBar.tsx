import logoSun from '@assets/logo-sun.png';

type MainTopBarProps = {
  onMenuClick?: () => void;
};

export function MainTopBar({ onMenuClick }: MainTopBarProps) {
  return (
    <header className="main-top-bar">
      <button
        type="button"
        className="main-top-bar__menu"
        aria-label="Open menu"
        onClick={onMenuClick}>
        <span className="main-top-bar__menu-line" />
        <span className="main-top-bar__menu-line" />
        <span className="main-top-bar__menu-line" />
      </button>

      <div className="main-top-bar__brand">
        <img src={logoSun} alt="" className="main-top-bar__logo" width={35} height={35} />
        <span className="main-top-bar__wordmark">After Class</span>
      </div>
    </header>
  );
}
