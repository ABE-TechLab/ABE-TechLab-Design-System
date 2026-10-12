'use client';

import { useId, type ReactNode, type SelectHTMLAttributes, type LabelHTMLAttributes } from 'react';

import { useThemeConfig } from './active-theme';
import { THEMES, isThemeId, type ThemeId } from './theme-config';

export interface ThemeSelectorProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'defaultValue' | 'onChange'> {
  label?: ReactNode;
  labelClassName?: LabelHTMLAttributes<HTMLLabelElement>['className'];
  selectClassName?: SelectHTMLAttributes<HTMLSelectElement>['className'];
  onThemeChange?: (theme: ThemeId) => void;
}

/** Accessible native select; it does not depend on any component library. */
export function ThemeSelector({
  id,
  label = 'Theme',
  labelClassName,
  className,
  selectClassName,
  onThemeChange,
  ...selectProps
}: ThemeSelectorProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <label htmlFor={selectId} className={labelClassName}>
      {label}
      <select
        {...selectProps}
        id={selectId}
        className={selectClassName ?? className}
        value={activeTheme}
        onChange={(event) => {
          const value = event.currentTarget.value;
          if (!isThemeId(value)) return;
          setActiveTheme(value);
          onThemeChange?.(value);
        }}
      >
        {THEMES.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.name}
          </option>
        ))}
      </select>
    </label>
  );
}
