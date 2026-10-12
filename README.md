# ABE TechLab Design System

A shared design foundation for ABE TechLab products. This package centralizes theme palettes and reusable React theme controls so compatible apps can share a visual language without copying implementation between repositories.

## What's included

- Ten CSS theme palettes with light and dark token sets.
- CSS custom properties and Tailwind CSS v4 semantic token mappings.
- A reusable React provider and accessible native theme selector.
- An optional `next-themes` adapter for apps that already use `next-themes`.
- A theme catalog check that verifies CSS files, imports, and React theme IDs stay aligned.
- GitHub Actions validation and tag-based GitHub Packages publishing workflow.

The package does not provide application layouts, a component library, or app business logic. Apps keep those locally and consume the theme styles and controls as needed.

## Themes

| ID | Display name |
| --- | --- |
| `claude` | Claude |
| `discord` | Discord |
| `supabase` | Supabase |
| `vercel` | Vercel |
| `mono` | Mono |
| `notebook` | Notebook |
| `light-green` | Light Green |
| `zen` | Zen |
| `astro-vista` | Astro Vista |
| `whatsapp` | WhatsApp |

Theme names identify visual inspirations only; this package is not affiliated with or endorsed by those companies.

## Distribution status

The source package is in active development. Its first version is configured for GitHub Packages, but it should not be considered published until a version tag succeeds in the repository's **Actions** tab.

## Install

The source repository is public. GitHub Packages package visibility is configured separately, so only publish after deciding whether the package itself should be public or restricted to ABE TechLab consumers.

1. Configure the consuming repository's `.npmrc` as described in [Installation](./docs/installation.md).
2. Make `GITHUB_PACKAGES_TOKEN` available to the local environment and Vercel build environment. Never commit a real token.
3. Install a pinned version after it has been published:

```bash
npm install @abe-techlab/abe-techlab-design-system@0.1.0
```

## Import the styles

For Tailwind CSS v4 applications:

```css
@import 'tailwindcss';
@import '@abe-techlab/abe-techlab-design-system/styles.css';
```

Set `data-theme` on the root HTML element, for example `data-theme="vercel"`. To activate a palette's dark values, also apply the `dark` class to the root element. Use a valid ID from [the theme catalog](./styles/themes.json).

## Use the React controls

The React entry point has no dependency on shadcn, Base UI, or a particular styling library:

```tsx
import {
  ActiveThemeProvider,
  ThemeSelector
} from '@abe-techlab/abe-techlab-design-system/react';

export function ThemeSettings() {
  return (
    <ActiveThemeProvider initialTheme="vercel" storage="cookie">
      <ThemeSelector label="Choose theme" />
    </ActiveThemeProvider>
  );
}
```

`ActiveThemeProvider` manages the `data-theme` attribute and stores the chosen palette. Its default persistence is a cookie named `active_theme`, suitable for SSR frameworks when the same cookie is read to initialize the root HTML attribute. For a client-only app, use `storage="localStorage"`. To disable persistence, use `storage="none"`.

For SSR, the application must set `data-theme` on its root HTML element from the validated saved cookie during server rendering. Passing `initialTheme` to the provider initializes React state but does not set the root HTML attribute in the server-rendered markup. See [Installation](./docs/installation.md).

## Optional next-themes integration

Apps already using `next-themes` can import a light/dark toggle from its separate optional entry point:

```tsx
import { NextThemeModeToggle } from '@abe-techlab/abe-techlab-design-system/next-themes';

export function AppearanceSettings() {
  return <NextThemeModeToggle />;
}
```

This entry point requires `next-themes` to be installed in the consuming app. The core `/react` entry point does not.

## Local validation

Requires Node.js 22 or newer:

```bash
npm install
npm run check
npm run build
npm pack --dry-run
```

The GitHub Actions validation workflow runs these checks automatically.

## Releasing

See [Release process](./docs/releasing.md). A version tag such as `v0.1.0` triggers GitHub Actions to publish to GitHub Packages. Do not tag a release until the version, build output, licensing, and consuming-app integration have been reviewed.

## Contributing a theme

Follow [Theme authoring](./docs/theme-authoring.md). Prefer semantic utilities like `bg-background`, `text-foreground`, `bg-card`, `border-border`, and `ring-ring` in consuming applications.

## License and attribution

This package preserves the MIT license and upstream copyright notice for CSS adapted from the [Next Shadcn Dashboard Starter](https://github.com/Kiranism/next-shadcn-dashboard-starter). See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md).
