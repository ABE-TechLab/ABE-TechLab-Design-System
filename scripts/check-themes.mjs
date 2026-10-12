import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const toPath = (url) => fileURLToPath(url);
const catalogUrl = new URL('styles/themes.json', root);
const styleEntryUrl = new URL('styles/index.css', root);
const configUrl = new URL('src/react/theme-config.ts', root);
const packageUrl = new URL('package.json', root);
const catalog = JSON.parse(readFileSync(catalogUrl, 'utf8'));
const stylesheet = readFileSync(styleEntryUrl, 'utf8');
const themeConfig = readFileSync(configUrl, 'utf8');
const packageJson = JSON.parse(readFileSync(packageUrl, 'utf8'));

const imports = [...stylesheet.matchAll(/@import\s+['"]\.\/themes\/([^'"]+)['"]\s*;/g)]
  .map((match) => match[1]);
const configuredIds = [...themeConfig.matchAll(/value:\s*'([^']+)'/g)].map((match) => match[1]);
const catalogIds = catalog.map((theme) => theme.id);
const errors = [];

if (catalog.length === 0) errors.push('Theme catalog must not be empty.');

for (const theme of catalog) {
  if (!theme.id || !theme.name) {
    errors.push('Each theme must have an id and display name.');
    continue;
  }

  const fileName = `${theme.id}.css`;
  const themeUrl = new URL(`styles/themes/${fileName}`, root);

  if (!existsSync(toPath(themeUrl))) {
    errors.push(`Missing theme stylesheet: styles/themes/${fileName}`);
  }

  if (!imports.includes(fileName)) {
    errors.push(`Theme stylesheet is not imported by styles/index.css: ${fileName}`);
  }
}

for (const importedFile of imports) {
  if (!catalog.some((theme) => `${theme.id}.css` === importedFile)) {
    errors.push(`Imported stylesheet is missing from styles/themes.json: ${importedFile}`);
  }
}

if (JSON.stringify(configuredIds) !== JSON.stringify(catalogIds)) {
  errors.push('React theme configuration does not match styles/themes.json (IDs or order differ).');
}

if (!packageJson.exports?.['./react'] || !packageJson.exports?.['./next-themes']) {
  errors.push('Expected both ./react and ./next-themes package exports.');
}

if (errors.length > 0) {
  console.error('Theme validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${catalog.length} theme palettes, ${imports.length} stylesheet imports, and React theme exports.`);
}
