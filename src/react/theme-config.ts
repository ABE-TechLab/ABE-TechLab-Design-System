export const DEFAULT_THEME = 'vercel' as const;

export const THEMES = [
  { name: 'Claude', value: 'claude' },
  { name: 'Discord', value: 'discord' },
  { name: 'Supabase', value: 'supabase' },
  { name: 'Vercel', value: 'vercel' },
  { name: 'Mono', value: 'mono' },
  { name: 'Notebook', value: 'notebook' },
  { name: 'Light Green', value: 'light-green' },
  { name: 'Zen', value: 'zen' },
  { name: 'Astro Vista', value: 'astro-vista' },
  { name: 'WhatsApp', value: 'whatsapp' }
] as const;

export type ThemeId = (typeof THEMES)[number]['value'];
export type ThemeOption = (typeof THEMES)[number];

const themeIds = new Set<string>(THEMES.map((theme) => theme.value));

export function isThemeId(value: string): value is ThemeId {
  return themeIds.has(value);
}
