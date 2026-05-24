import type { JSX } from 'react';

import type { MainTabId } from '@/constants/discovery';

type FloatingTabBarProps = {
  activeTab: MainTabId;
  tabs?: { id: MainTabId; label: string }[];
  onTabChange?: (tab: MainTabId) => void;
};

function HeartIcon() {
  return (
    <svg className="floating-tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20.25c-.19 0-.38-.07-.53-.2C8.24 17.82 2 13.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 4.78-6.24 9.32-9.47 11.55-.15.13-.34.2-.53.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="floating-tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 2 12h3v8h6v-5h2v5h6v-8h3L12 3Z" fill="currentColor" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg className="floating-tab-bar__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-4.28 0-7.75 2.14-7.75 4.78V21h15.5v-1.97c0-2.64-3.47-4.78-7.75-4.78Z"
        fill="currentColor"
      />
    </svg>
  );
}

const TAB_ICONS: Record<MainTabId, () => JSX.Element> = {
  matches: HeartIcon,
  home: HomeIcon,
  profile: PersonIcon,
};

export function FloatingTabBar({ activeTab, tabs, onTabChange }: FloatingTabBarProps) {
  const tabItems = tabs ?? [
    { id: 'matches' as const, label: 'Matches' },
    { id: 'home' as const, label: 'Home' },
    { id: 'profile' as const, label: 'Profile' },
  ];

  return (
    <nav className="floating-tab-bar" aria-label="Main navigation">
      {tabItems.map((tab) => {
        const Icon = TAB_ICONS[tab.id];
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            type="button"
            className={`floating-tab-bar__item${isActive ? ' floating-tab-bar__item--active' : ''}`}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onTabChange?.(tab.id)}>
            <Icon />
            <span className="floating-tab-bar__label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
