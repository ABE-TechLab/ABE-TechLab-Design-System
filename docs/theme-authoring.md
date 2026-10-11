# Adding a theme

1. Add `styles/themes/<theme-id>.css`.
2. Use a stable kebab-case identifier in the root selector:
   `[data-theme='<theme-id>']`.
3. Define the semantic tokens used by consuming applications, including
   foreground tokens for backgrounds, cards, popovers, primary/secondary,
   muted, accent, destructive, borders, inputs, rings, charts, and sidebar.
4. Define corresponding values under `[data-theme='<theme-id>'].dark`.
5. Include the Tailwind CSS v4 `@theme inline` mappings used by the existing
   palettes, or refactor these mappings centrally in a separately reviewed
   change.
6. Import the new file in `styles/index.css`.
7. Document the display name and ID in the theme catalog.
8. Test the palette in both light and dark modes, with keyboard focus,
   disabled controls, form validation, charts, and sidebars.

Prefer semantic utility classes such as `bg-background`, `text-foreground`,
`bg-card`, `border-border`, and `ring-ring`. Hard-coded utility colors and
inline color values will not change automatically with the selected theme.
