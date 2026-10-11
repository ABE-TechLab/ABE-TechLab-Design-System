# Installation

The package is distributed through GitHub Packages as
`@godtech-ctl-create/abe-techlab-design-system`.

## 1. Configure the npm registry

In the consuming repository, add the following to `.npmrc`:

```ini
@godtech-ctl-create:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

Set `GITHUB_PACKAGES_TOKEN` in your local shell or CI environment. Use a
credential with package-read access and access to the private package. Never
commit a real token. The repository contains `.npmrc.example` as a safe
starting point.

## 2. Install a pinned version

```bash
npm install @godtech-ctl-create/abe-techlab-design-system@0.1.0
```

Pin a known version for reproducible builds. Upgrade applications intentionally
after reviewing release notes.

## 3. Import the stylesheet

For a Tailwind CSS v4 application, add the design-system import to the
application's global stylesheet after the Tailwind import:

```css
@import 'tailwindcss';
@import '@godtech-ctl-create/abe-techlab-design-system/styles.css';
```

Do not import Tailwind itself from this package; the consuming application owns
its Tailwind setup, global resets, layout styles, and component library.

## 4. Set a theme

Set `data-theme` on the root HTML element. For example:

```html
<html lang="en" data-theme="vercel">
```

Available theme identifiers:

- `claude`
- `discord`
- `supabase`
- `vercel`
- `mono`
- `notebook`
- `light-green`
- `zen`
- `astro-vista`
- `whatsapp`

For dark mode, add the `dark` class to the same root element. Each palette
defines its own dark-mode tokens using selectors such as
`[data-theme='vercel'].dark`.

## What this package does not do yet

This first CSS release supplies theme variables and Tailwind v4 token mappings.
It does not include a React provider, selector UI, next-themes integration,
font downloads, or cross-domain preference sync. Those are separate follow-up
steps so each application can adopt the styles without taking on UI-framework
dependencies.
