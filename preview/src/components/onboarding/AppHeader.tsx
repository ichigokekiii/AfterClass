import logoSun from '@assets/logo-sun.png';

export function AppHeader() {
  return (
    <header className="app-header">
      <img src={logoSun} alt="" className="app-header__logo" width={35} height={35} />
      <span className="app-header__wordmark">After Class</span>
    </header>
  );
}
