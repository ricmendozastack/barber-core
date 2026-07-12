export const colors = {
  light: {
    bg: '#FFFFFF',
    text: '#0B0B0C',
    primary: '#111827',
    accent: '#D4A657',
    border: '#E5E7EB',
    muted: '#6B7280',
  },
  dark: {
    bg: '#0B0B0C',
    text: '#F5F5F5',
    primary: '#F5F5F5',
    accent: '#D4A657',
    border: '#27272A',
    muted: '#9CA3AF',
  },
} as const;

export type ColorScheme = keyof typeof colors;
export type ColorToken = keyof (typeof colors)['light'];
