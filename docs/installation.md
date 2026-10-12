# Installation and integration

## Package registry access

The package is private and is intended to be installed from GitHub Packages. Follow GitHub's guidance for a classic personal access token with package read access or another credential supported by your organization. The identity installing the package must have access to this private repository/package.

In the consuming repository, configure a local `.npmrc`:

```ini
@godtech-ctl-create:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Set `GITHUB_PACKAGES_TOKEN` in the shell or CI secret environment. Add `.npmrc` to `.gitignore`; never commit a real token. In Vercel, add the token as a sensitive environment variable and use its supported npm registry configuration for private dependencies.

## Install the published package

Only use a version that exists in GitHub Packages:

```bash
npm install @godtech-ctl-create/abe-techlab-design-system@0.1.0
```

## Import CSS

For Tailwind CSS v4:

```css
@import 'tailwindcss';
@import '@godtech-ctl-create/abe-techlab-design-system/styles.css';
```

The application still owns global resets, layout CSS, component styles, and Tailwind configuration. Import the shared stylesheet once in its root global CSS file.

## Apply a theme

Set the theme ID on the root element:

```html
<html lang="en" data-theme="vercel">
```

Available IDs are listed in `styles/themes.json`. The dark token set is applied when the same element also has the `dark` class.

## React provider and selector

```tsx
import {
  ActiveThemeProvider,
  ThemeSelector
} from '@godtech-ctl-create/abe-techlab-design-system/react';

export function ThemeSettings({ initialTheme = 'vercel' }) {
  return (
    <ActiveThemeProvider initialTheme={initialTheme} storage="cookie">
      <ThemeSelector label="Theme" />
    </ActiveThemeProvider>
  );
}
```

The selector uses native HTML elements and can be styled with `labelClassName` and `selectClassName`. It does not introduce a UI component library.

### Persistence settings

- `storage="cookie"` (default): saves the selected palette in a cookie; the default cookie name is `active_theme`.
- `storage="localStorage"`: saves the palette in browser local storage under `active_theme`.
- `storage="none"`: does not persist the choice.

For server rendering, read the cookie using your framework's request API and pass its validated value as `initialTheme`. This lets the server render the correct `data-theme` from the start. The provider validates values against the theme catalog and will not apply unsupported IDs.

The provider controls the visual palette only. It intentionally does not override your app's light/dark mode system.

## Optional next-themes toggle

If the application already depends on `next-themes`, it can use:

```tsx
import { NextThemeModeToggle } from '@godtech-ctl-create/abe-techlab-design-system/next-themes';

<NextThemeModeToggle />
```

That separate entry point is optional and requires the app to install `next-themes` independently. Existing apps that already have a mode toggle may keep it.

## Integration checklist

- Confirm the consuming app uses Tailwind CSS v4 if relying on the included `@theme inline` mappings.
- Keep app-specific layout and UI primitives in the app.
- Replace hard-coded colors with semantic utilities where a theme-aware component is desired.
- Test every active theme in both light and dark mode, including forms, focus rings, charts, sidebars, dialogs, and disabled controls.
- For apps using Next.js, test a fresh session and a returning session so the server-rendered initial theme matches the saved preference.
