import type { ReactNode } from 'react';

import { AppHeader } from './AppHeader';

type OnboardingScreenProps = {
  children: ReactNode;
  footer?: ReactNode;
  showHeader?: boolean;
};

export function OnboardingScreen({ children, footer, showHeader = true }: OnboardingScreenProps) {
  return (
    <div className="onboarding-screen">
      <div className="onboarding-screen__body">
        {showHeader ? <AppHeader /> : null}
        <main className="onboarding-screen__main">{children}</main>
      </div>
      {footer ? <footer className="onboarding-screen__footer">{footer}</footer> : null}
    </div>
  );
}
