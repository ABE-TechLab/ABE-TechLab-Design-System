# Adoption plan

This package is the shared source for the theme CSS and reusable React controls. Migrations should be app-by-app, not a single cross-repository replacement.

## Stage 1 — Package readiness

- Keep the theme catalog, CSS palettes, and React theme IDs in sync.
- Pass typechecking and package build validation.
- Review the packed file list so source files and generated bundles are included, but no credentials are included.
- Publish a version to GitHub Packages only after checks are green.
- Configure package-read access for each consumer and provide credentials to local development and Vercel builds through environment/registry configuration. Never commit tokens.

## Stage 2 — ABE Client Control pilot

Repository: [ABE Client Control](https://github.com/gODtECH-Ctl-Create/ABE-Client-Control).

- Replace the local theme palette imports with the package CSS import.
- Replace the local theme selector/provider with the package's `ActiveThemeProvider` and `ThemeSelector`.
- Keep the existing `next-themes` provider and current mode toggle during the first migration; the package's optional `NextThemeModeToggle` is available later, but it should not replace the app's animated toggle without a deliberate UX decision.
- Preserve server-side reading and validation of the `active_theme` cookie so the root HTML starts with the saved palette.
- Test all ten palettes in light and dark mode, plus dialogs, forms, charts, sidebars, focus states, and mobile breakpoints.
- Do not change auth, client data, routes, or business behavior as part of the styling migration.

## Stage 3 — ABE Mail and ABE TechLab Operations

For each app separately:

1. Verify its React, Tailwind, and dark-mode setup.
2. Install the same pinned package version.
3. Import the shared CSS once in the global stylesheet.
4. Integrate the theme selector/provider only if it fits the app's existing state and persistence model.
5. Run its own build and smoke checks before merging.
6. Pin the package version and upgrade intentionally.

## Stage 4 — Other products

Projects with a different stack can still adopt the shared CSS tokens when their build tool supports the stylesheet. React controls are optional. Do not introduce React or Tailwind into an application that does not already use them just to consume this package.

## Release policy

- Use semantic versioning after the first stable release.
- Keep each consuming application pinned to an exact version for production.
- Document breaking token or component API changes.
- A shared package update must not automatically deploy every application.
- Preference sync across different domains is not supplied by this package; it needs an account-level preference API or another explicit synchronization mechanism.
