# Release process

The package is published to GitHub Packages by **Publish design system**.

1. Confirm the package version in `package.json`, package contents, licensing, and integration instructions.
2. Merge release-ready changes into `main` and confirm **Validate design system** passes.
3. Open **Actions → Create release tag → Run workflow** on `main` and enter the matching tag (for the first release, `v0.1.0`).
4. The tag workflow validates the version and either creates the tag or safely reuses an existing tag whose package version matches. It then explicitly dispatches **Publish design system**. This is necessary because a tag push made with GitHub's built-in `GITHUB_TOKEN` does not automatically trigger a second workflow.
5. Check the Actions tab for a successful publish run. The publish workflow checks out the requested tag, validates and builds that exact version, and publishes it to GitHub Packages. It skips an exact version already in the registry and fails on unexpected registry errors.

If a tag already exists from an earlier tag-workflow run, run **Create release tag** again using the same version; it will not move or overwrite the tag and will dispatch publishing. A tag pushed locally also triggers **Publish design system** automatically:

```bash
git checkout main
git pull origin main
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin v0.1.0
```

The publish workflow uses the repository-scoped `GITHUB_TOKEN` with `packages: write`; no long-lived publishing token is stored in the repository. Consuming projects need a supported GitHub Packages read credential if the published package is private. Package visibility is separate from repository visibility.

Do not publish a version until its package contents, licensing, and consuming-app integration path have been reviewed.
