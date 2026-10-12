# Release process

The package is published to GitHub Packages by **Publish design system**.

1. Confirm the package version in `package.json`, package contents, licensing, and integration instructions.
2. Merge release-ready changes into `main` and confirm **Validate design system** passes.
3. Create the matching version tag. Preferred: open **Actions → Create release tag → Run workflow** on `main` and enter `v0.1.0`. The workflow validates the tag and package version, then pushes an annotated tag.
4. **Important:** a tag pushed by a workflow using GitHub's built-in `GITHUB_TOKEN` does not automatically trigger another workflow. After **Create release tag** succeeds, open **Actions → Publish design system → Run workflow** on `main`, enter the existing tag (for example `v0.1.0`), and run it. The publish workflow checks out the tag, validates and builds that exact version, and publishes it.
5. A tag pushed locally also triggers **Publish design system** automatically. For local releases:

   ```bash
   git checkout main
   git pull origin main
   git tag -a v0.1.0 -m "Release v0.1.0"
   git push origin v0.1.0
   ```

The publish workflow uses the repository-scoped `GITHUB_TOKEN` with `packages: write`; no long-lived publishing token is stored in the repository. The workflow skips a version if it already exists, and fails if it cannot verify registry state. Consuming projects need a supported GitHub Packages read credential if the published package is private. Package visibility is separate from repository visibility.

Do not publish a version until its package contents, licensing, and consuming-app integration path have been reviewed.
