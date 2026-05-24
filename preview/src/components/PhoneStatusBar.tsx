/** Classic Apple keynote status bar time for design previews */
const STATUS_TIME = '9:41';

function CellularIcon() {
  return (
    <svg className="phone-status-bar__icon" viewBox="0 0 18 12" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="0.5" fill="currentColor" />
      <rect x="10" y="3" width="3" height="9" rx="0.5" fill="currentColor" />
      <rect x="15" y="0" width="3" height="12" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg className="phone-status-bar__icon" viewBox="0 0 16 12" aria-hidden="true">
      <path
        d="M8 11.2a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2ZM3.2 6.4a6.8 6.8 0 0 1 9.6 0l-1.1 1.1a5.3 5.3 0 0 0-7.4 0L3.2 6.4Zm-2.2-2.2a9.7 9.7 0 0 1 13.6 0l-1.1 1.1a8.2 8.2 0 0 0-11.4 0L1 4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg className="phone-status-bar__icon phone-status-bar__icon--battery" viewBox="0 0 27 13" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="12" rx="3" stroke="currentColor" fill="none" />
      <rect x="2.5" y="2.5" width="17" height="8" rx="1.5" fill="currentColor" />
      <path d="M24 4.5v4c1-.3 1.7-1 1.7-2s-.7-1.7-1.7-2Z" fill="currentColor" />
    </svg>
  );
}

export function StatusBar() {
  return (
    <div className="phone-status-bar" aria-hidden="true">
      <div className="phone-status-bar__island">
        <div className="phone-status-bar__island-pill" />
      </div>
      <div className="phone-status-bar__row">
        <time className="phone-status-bar__time" dateTime="09:41">
          {STATUS_TIME}
        </time>
        <div className="phone-status-bar__trailing">
          <CellularIcon />
          <WifiIcon />
          <BatteryIcon />
        </div>
      </div>
    </div>
  );
}
