'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

import { DEFAULT_THEME, isThemeId, type ThemeId } from './theme-config';

export type ThemePreferenceStorage = 'cookie' | 'localStorage' | 'none';

export interface ActiveThemeProviderProps {
  children: ReactNode;
  /** Set this from the request cookie when server-rendering to avoid a theme flash. */
  initialTheme?: ThemeId;
  /** Used when no valid saved preference exists. */
  defaultTheme?: ThemeId;
  /** Cookie persistence works well with SSR frameworks such as Next.js. */
  storage?: ThemePreferenceStorage;
  storageKey?: string;
  cookieName?: string;
  cookieMaxAge?: number;
}

interface ThemeConfigContextValue {
  activeTheme: ThemeId;
  setActiveTheme: (theme: ThemeId) => void;
}

const ThemeConfigContext = createContext<ThemeConfigContextValue | undefined>(undefined);

function readCookie(name: string): string | undefined {
  const prefix = `${encodeURIComponent(name)}=`;
  const entry = document.cookie.split('; ').find((cookie) => cookie.startsWith(prefix));
  if (!entry) return undefined;

  try {
    return decodeURIComponent(entry.slice(prefix.length));
  } catch {
    return undefined;
  }
}

function readSavedTheme(storage: ThemePreferenceStorage, storageKey: string, cookieName: string) {
  try {
    if (storage === 'localStorage') return window.localStorage.getItem(storageKey) ?? undefined;
    if (storage === 'cookie') return readCookie(cookieName);
  } catch {
    // Storage may be disabled by browser privacy settings. The default remains usable.
  }

  return undefined;
}

function persistTheme(
  theme: ThemeId,
  storage: ThemePreferenceStorage,
  storageKey: string,
  cookieName: string,
  cookieMaxAge: number
) {
  try {
    if (storage === 'localStorage') {
      window.localStorage.setItem(storageKey, theme);
    } else if (storage === 'cookie') {
      const secure = window.location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(theme)}; Path=/; Max-Age=${cookieMaxAge}; SameSite=Lax${secure}`;
    }
  } catch {
    // Theme switching should still work when persistence is unavailable.
  }
}

export function ActiveThemeProvider({
  children,
  initialTheme,
  defaultTheme = DEFAULT_THEME,
  storage = 'cookie',
  storageKey = 'active_theme',
  cookieName = 'active_theme',
  cookieMaxAge = 31_536_000
}: ActiveThemeProviderProps) {
  const safeDefault = isThemeId(defaultTheme) ? defaultTheme : DEFAULT_THEME;
  const safeInitial = initialTheme && isThemeId(initialTheme) ? initialTheme : safeDefault;
  const [activeThemeState, setActiveThemeState] = useState<ThemeId>(safeInitial);
  const [hydrated, setHydrated] = useState(false);

  const setActiveTheme = useCallback((theme: ThemeId) => {
    if (isThemeId(theme)) setActiveThemeState(theme);
  }, []);

  useEffect(() => {
    const saved = readSavedTheme(storage, storageKey, cookieName);
    if (saved && isThemeId(saved)) setActiveThemeState(saved);
    setHydrated(true);
  }, [storage, storageKey, cookieName]);

  useEffect(() => {
    if (!hydrated) return;

    document.documentElement.setAttribute('data-theme', activeThemeState);
    persistTheme(activeThemeState, storage, storageKey, cookieName, cookieMaxAge);
  }, [activeThemeState, hydrated, storage, storageKey, cookieName, cookieMaxAge]);

  const value = useMemo(
    () => ({ activeTheme: activeThemeState, setActiveTheme }),
    [activeThemeState, setActiveTheme]
  );

  return <ThemeConfigContext.Provider value={value}>{children}</ThemeConfigContext.Provider>;
}

export function useThemeConfig(): ThemeConfigContextValue {
  const context = useContext(ThemeConfigContext);
  if (!context) {
    throw new Error('useThemeConfig must be used within an ActiveThemeProvider');
  }

  return context;
}
