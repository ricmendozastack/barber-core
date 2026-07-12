import { colorScheme, useColorScheme } from 'nativewind';
import { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';

import { colors, type ColorScheme, type ColorToken } from './tokens/colors';
import { radii } from './tokens/radii';
import { spacing } from './tokens/spacing';
import { typography } from './tokens/typography';

const theme = { spacing, typography, radii };

interface ThemeContextValue {
  scheme: ColorScheme;
  colors: Record<ColorToken, string>;
  spacing: typeof spacing;
  typography: typeof typography;
  radii: typeof radii;
  setScheme: (scheme: ColorScheme | 'system') => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const { colorScheme: scheme } = useColorScheme();
  const resolved: ColorScheme = scheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    colorScheme.set('system');
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      scheme: resolved,
      colors: colors[resolved],
      ...theme,
      setScheme: colorScheme.set,
    }),
    [resolved],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
