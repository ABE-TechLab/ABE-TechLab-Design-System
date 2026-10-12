'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

export interface NextThemeModeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  children?: ReactNode;
  lightLabel?: string;
  darkLabel?: string;
}

/**
 * Optional adapter for applications already using next-themes.
 * Kept on its own entry point so other apps do not need next-themes installed.
 */
export function NextThemeModeToggle({
  children,
  lightLabel = 'Switch to light mode',
  darkLabel = 'Switch to dark mode',
  'aria-label': ariaLabel,
  ...buttonProps
}: NextThemeModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
  const label = mounted ? (nextTheme === 'light' ? lightLabel : darkLabel) : 'Toggle color mode';

  return (
    <button
      {...buttonProps}
      type='button'
      aria-label={ariaLabel ?? label}
      aria-pressed={mounted ? resolvedTheme === 'dark' : undefined}
      onClick={() => setTheme(nextTheme)}
    >
      {children ?? label}
    </button>
  );
}
