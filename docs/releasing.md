# Release process

The package is published to GitHub Packages when a version tag beginning with `v` is pushed.

1. Update the `version` in `package.json`.
2. Update documentation or release notes if needed.
3. Merge the changes into `main` and confirm the validation workflow passes.
4. Ensure the tag matches the package version exactly. For version `0.1.0`:

   ```bash
   git checkout main
   git pull
   git tag v0.1.0
   git push origin v0.1.0
   ```

5. Check the **Actions** tab for the publish workflow and confirm the package appears under the repository/owner's GitHub Packages.

The workflow uses the repository-scoped `GITHUB_TOKEN` with `packages: write`; no long-lived publishing token is stored in the repository. Consuming projects still require an appropriately scoped read token to install this private package.

Do not publish a version until its package contents and integration steps have been reviewed.
