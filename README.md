# ABE TechLab Design System

A shared design system for ABE TechLab products. It provides design tokens, theme styles, and reusable theme controls so compatible applications can share a consistent visual foundation without duplicating implementation.

## Status

Initial scaffold in progress. The first release will prioritize framework-neutral CSS tokens and Tailwind CSS v4 theme integration, followed by optional React theme controls.

## Planned packages

- `styles`: design tokens, light/dark palettes, and theme definitions
- `react`: theme provider, theme selector, and mode toggle for compatible React applications
- `docs`: installation, integration, theming, accessibility, and release guidance

## Principles

- Keep app-specific layouts and business logic inside consuming applications.
- Use semantic tokens instead of hard-coded colors wherever possible.
- Publish versioned releases and let each app upgrade deliberately.
- Do not require a consuming app to adopt every component in the package.

## License

License and attribution notices for any adapted third-party template code will be preserved. The package's licensing will be clarified before the first public or external distribution.
