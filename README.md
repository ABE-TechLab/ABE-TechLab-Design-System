# ABE TechLab Design System

A shared design foundation for ABE TechLab products. The package extracts the CSS theme palettes and Tailwind CSS v4 semantic token mappings used by ABE Client Control so compatible applications can share the same visual language without copying theme files between repositories.

## Current scope

- Ten theme palettes with light and dark token sets.
- CSS custom properties for common application surfaces, text, borders, inputs, rings, charts, sidebars, radii, shadows, fonts, and spacing.
- Tailwind CSS v4 `@theme inline` mappings for semantic utilities.
- A machine-readable theme catalog and a check that verifies all catalogued styles are present.
- GitHub Packages configuration and tag-based publishing workflow.

This first package release is deliberately CSS-first. React providers, theme selector UI, `next-themes` integration, downloaded fonts, and cross-domain preference synchronization are not included yet. Applications retain their own layouts, component library, app behavior, and global reset styles.

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

## Install

The package is private and intended to be distributed through GitHub Packages.

1. Configure the consuming repository's `.npmrc` as described in [Installation](./docs/installation.md).
2. Make `GITHUB_PACKAGES_TOKEN` available to your local environment or CI install step. Do not commit credentials.
3. Install a specific version:

```bash
npm install @godtech-ctl-create/abe-techlab-design-system@0.1.0
```

4. Import the stylesheet after Tailwind CSS v4:

```css
@import 'tailwindcss';
@import '@godtech-ctl-create/abe-techlab-design-system/styles.css';
```

5. Set a valid `data-theme` on the root HTML element, for example `data-theme="vercel"`. To use a palette's dark values, also apply the `dark` class to that element.

## Local validation

This package has no runtime or build dependencies. With Node.js 22 or newer:

```bash
npm run check
npm pack --dry-run
```

The same checks run in GitHub Actions.

## Releasing

See [Release process](./docs/releasing.md). Pushing a version tag such as `v0.1.0` triggers the GitHub Actions workflow to publish the corresponding package version to GitHub Packages.

## Contributing a theme

Follow [Theme authoring](./docs/theme-authoring.md). Prefer semantic theme utilities such as `bg-background`, `text-foreground`, `bg-card`, `border-border`, and `ring-ring` in consuming applications.

## License and attribution

This package preserves the MIT license and upstream copyright notice for CSS adapted from the [Next Shadcn Dashboard Starter](https://github.com/Kiranism/next-shadcn-dashboard-starter). See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md).
