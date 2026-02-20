---
trigger: model_decision
description: project versioning rules based on SemVer and Conventional Commits
---

# Versioning Rules

This project follows **Semantic Versioning (SemVer)** and pairs it with **Conventional Commits** to automate and standardize version management.

## Semantic Versioning (X.Y.Z)

- **MAJOR (X)**: Incompatible API changes or breaking changes.
- **MINOR (Y)**: New functionality in a backwards compatible manner.
- **PATCH (Z)**: Backwards compatible bug fixes.

## Integration with Conventional Commits

Commit messages directly influence versioning:

- `feat:` -> MINOR increment.
- `fix:` -> PATCH increment.
- `BREAKING CHANGE:` or `!` after the type (e.g., `feat!:`) -> MAJOR increment.
- `chore:`, `docs:`, `style:`, `refactor:`, `test:` -> No version increment (usually).

## Branching Strategy

We follow a structured branching model to ensure stability and organization.

### Main Branches
- **`main`**: Contains production-ready code. No direct commits allowed. All changes must come via `develop`.
- **`develop`**: The main integration branch for features.

### Supporting Branches
- **Feature (`feature/`)**: For new features. Base: `develop`, Merge to: `develop`.
- **Bugback (`fix/`)**: For bug fixes on `develop`. Base: `develop`, Merge to: `develop`.
- **Hotfix (`hotfix/`)**: For critical production fixes. Base: `main`, Merge to: `main` and `develop`.
- **Release (`release/`)**: Preparing for a new production release. Base: `develop`, Merge to: `main` and `develop`.

## Naming Conventions

Branch names should be lowercase and use `/` to separate type and name:
- `feature/task-management`
- `fix/login-button-contrast`
- `hotfix/security-patch-v1.1`

## Merging & Protection

1. **Main Protection**: Never push directly to `main` or `develop`.
2. **Pull Requests**: All merges to `main` and `develop` MUST go through a PR and be reviewed.
3. **Linear History**: Prefer `rebase` or `squash and merge` to keep a clean history.

## Tags & Releases

Tags are used to mark specific points in the project's history as being important, typically for releases.

### Tag Naming
- All tags **MUST** follow the `vX.Y.Z` format (e.g., `v1.0.0`, `v2.1.3`).
- Increments follow the [SemVer rules](#semantic-versioning-xyz) defined above.

### Release Process
1. **Production Tags**: Tags must only be applied to commits on the `main` branch.
2. **Creation**: Tags are typically created after a `release/` or `hotfix/` branch is merged into `main`.
3. **Documentation**: Each tag should be accompanied by a GitHub Release containing automated release notes generated from the Conventional Commits.

## Breaking Changes

Any breaking change **MUST** be explicitly noted in the commit message:
1. Use the `!` suffix: `feat!: change return type of login API`
2. Include a `BREAKING CHANGE:` footer for detailed explanation.
