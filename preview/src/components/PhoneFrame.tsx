import type { ReactNode } from 'react';

import { HomeIndicator } from '@/components/HomeIndicator';
import { StatusBar } from '@/components/PhoneStatusBar';

type PhoneFrameProps = {
  children: ReactNode;
  label?: string;
};

export function PhoneFrame({ children, label = 'After Class onboarding preview' }: PhoneFrameProps) {
  return (
    <div className="preview-shell">
      <p className="preview-shell__label">{label}</p>
      <div className="phone-frame" role="region" aria-label="iPhone preview with status bar">
        <div className="phone-frame__screen">
          <div className="phone-frame__viewport">{children}</div>
          <div className="phone-chrome phone-chrome--top">
            <StatusBar />
          </div>
          <div className="phone-chrome phone-chrome--bottom">
            <HomeIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
