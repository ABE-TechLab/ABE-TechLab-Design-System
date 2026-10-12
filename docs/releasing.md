# Release process

The package is published to GitHub Packages when a version tag beginning with `v` is pushed.

1. Confirm the package version in `package.json`, the package contents, licensing, and integration instructions.
2. Merge the release-ready changes into `main` and confirm the **Validate design system** workflow passes.
3. Open **Actions → Create release tag → Run workflow** on the `main` branch. Enter the matching tag, for example `v0.1.0`.
4. The release-tag workflow validates the tag format, verifies it matches `package.json`, refuses an existing tag, and pushes an annotated tag. This triggers **Publish design system**.
5. Check the **Actions** tab for a successful publish run and verify the package appears in GitHub Packages.

You can also create a tag locally when preferred:

```bash
git checkout main
git pull origin main
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

The publish workflow uses the repository-scoped `GITHUB_TOKEN` with `packages: write`; no long-lived publishing token is stored in the repository. Consuming projects need a supported GitHub Packages read credential if the published package is private. Package visibility is separate from repository visibility.

Do not publish a version until its package contents, licensing, and consuming-app integration path have been reviewed.
