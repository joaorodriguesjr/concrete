---
description: Branch creation, commit, merge to develop, and cleanup workflow
---
# Branching Workflow

Follow this workflow to create a branch, commit changes, merge them back into `develop`, and delete the branch. This workflow strictly enforces the rules defined in `.agent/rules/versioning.md`.

## 1. Create a New Branch
Determine the appropriate branch type based on the rules (`feature/`, `fix/`, `hotfix/`, `release/`).
The branch name must be in lowercase and use hyphens for separation. Ensure you are branching off the correct base branch (usually `develop` for `feature` and `fix`).
```bash
git checkout develop
git checkout -b <type>/<name>
```

## 2. Commit Current Changes
Stage your modified files and commit them using **Conventional Commits** format.
Use types like `feat:`, `fix:`, `chore:`, `docs:`, etc. If there involves a breaking change, remember to use `!` after the type (e.g., `feat!:`) or add a `BREAKING CHANGE:` footer.
```bash
git add <files>
git commit -m "<type>: <description>"
```

## 3. Merge into Develop
Switch back to the `develop` branch and merge your changes.
```bash
git checkout develop
git merge <type>/<name>
```

## 4. Delete the Branch to Maintain Organization
After successfully merging, delete the feature/fix branch locally to keep the repository history and branch list clean.
```bash
git branch -d <type>/<name>
```
