import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    react: 'src/react/index.ts',
    'next-themes': 'src/react/next-themes.tsx'
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  external: ['react', 'next-themes'],
  treeshake: true
});
