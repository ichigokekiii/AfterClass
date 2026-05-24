/**
 * After Class design tokens — from Figma "Pages that matter"
 * @see ui/tokens.css
 */
export const theme = {
  colors: {
    background: '#FFFFFF',
    coral: '#F9B3A6',
    coralBrand: '#FBA797',
    coralDark: '#E8A094',
    text: '#000000',
    textMuted: 'rgba(0, 0, 0, 0.65)',
    textOnCoral: '#FFFFFF',
    border: '#D9D9D9',
    dotInactive: '#D9D9D9',
    dotActive: '#F9B3A6',
    surfaceTint: '#FBCAC1',
    success: '#5A8F7B',
  },
  fonts: {
    /** SF Pro on iOS — omit fontFamily in styles to use system default */
    system: 'System',
  },
  fontSize: {
    brand: 20,
    headlineLg: 34,
    headlineMd: 28,
    body: 17,
    button: 17,
    badge: 15,
  },
  spacing: {
    screenX: 28,
    section: 24,
    md: 16,
    sm: 8,
  },
  layout: {
    buttonHeight: 62,
    buttonMaxWidth: 346,
    logoSize: 35,
    dotSize: 12,
    heroSize: 280,
  },
  radius: {
    pill: 48,
    card: 12,
    sheet: 19,
  },
} as const;

export type Theme = typeof theme;
