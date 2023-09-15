# Ax Protocol Widgets

![Static Badge](https://img.shields.io/badge/license-MIT-yellow)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Ax-Protocol/widgets/ci.yml?label=tests)
[![Latest npm version](https://img.shields.io/npm/v/%40ax-protocol%2Fwidgets?logo=npm&label=latest&color=blue)](https://www.npmjs.com/package/@ax-protocol/widgets)

## Overview

The `@ax-protocol/widgets` Node.js package is a set of React components that facilitate integration of Ax Protocol features in compact, adjustable UI elements.
The output package is framework-agnostic, which means it can be used by third-party apps, regardless of the React framework used (Create-React-App, Next.js, etc.).

The output package is published as [@ax-protocol/widgets](https://www.npmjs.com/package/@ax-protocol/widgets).

## UsxTransferWidget

The `UsxTransferWidget` is a configurable React component that enables third-party apps to facilitate USX cross-chain transfers direclty within their user interface.

## Installation

Install the widgets library via `npm` or `yarn`.

```
npm i --save @ax-protocol/widgets
```

or

```
yarn add @ax-protocol/widgets
```

## Required Configuration

| Property       | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `evmRpcUrlMap` | Mapping of EVM JSON-RPC endpoint URL strings, indexed by chain ID. |

## Optional Configuration

| Property   | Description                                 |
| ---------- | ------------------------------------------- |
| `theme`    | Object of properties to set custom styling. |
| `maxWidth` | Number to define custom width, in pixels.   |

## Usage Example

This snippet demonstrates how to implement the UsxTransferWidget component in a React application.

**Note:** The minimum width of the widget is `300px`.

```jsx
import { UsxTransferWidget } from "@ax-protocol/widgets";

const YourAppComponent = () => {
	// Must have length >= 1
	const evmRpcUrlMap = {
		1: "https://ethereum-rpc-example",
		137: "https://polygon-rpc-example",
		// ... more Ax-supported chains
	};

	// Properties not defined will be set to default values
	const theme = {
		primaryColor: "#ffc46b",
		primaryTextColor: "#ffffff",
		secondaryTextColor: "#b5b5b5",
		buttonTextColor: "#252930",
		containerBackgroundColor: "#0F1114",
		containerOutlineColor: "#191c21",
		inputBackgroundColor: "#191c21",
		inputOutlineColor: "#252930",
		dropdownBackgroundColor: "#191c21",
		optionSelectedColor: "#252930",
		optionActiveColor: "#35383d",
		fontFamily: "sans-serif",
	};

	return (
		<div>
			<UsxTransferWidget
				evmRpcUrlMap={evmRpcUrlMap}
				maxWidth={360} // pixels
				theme={theme}
			/>
		</div>
	);
};

export default YourAppComponent;
```

## Contributing

-   On a new branch, open a PR for a particular set of changes.
-   Name the PR according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   All commits must be related to the PR name and commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.
-   To make the enforcement of these guidelines easier, husky, commitlint, commitizen, and GitHub Actions have been configured for this project.
-   All PRs must be squashed and merged to keep a clean history on the main branch.

**When commiting to GitHub, instead of using `git commit`, run the folowing command and follow the instrucitons.**

```sh
npm run commit
```

## Publishing

This project is set up to publish the package via GitHub Actions after a push or merge to the `main` branch. The following is an example step-by-step process for publishing new releases.

**NOTE:** `NPM_TOKEN` must be obtained from your npm account and added to the repo's GitHub Actions secrets. `WIDGETS_REPO_TOKEN` needs to be generated in your GitHub settings and added to the repo's GitHub Actions secrets. `GITHUB_TOKEN` is a special secret that is automatically created for the repo, so there is no need to explicitely define it anywhere.

Ensure that only the following scopes are checked when creating `WIDGETS_REPO_TOKEN`:

-   [x] repo
    -   [x] repo:status
    -   [x] repo_deployment
    -   [x] public_repo
    -   [x] repo:invite
    -   [x] security_events
-   [x] workflow
-   [x] write:packages
    -   [x] read:packages

1. On your local machine, create a new local branch - for example, `fix_for_the_bug`.

```sh
git checkout -b fix_for_the_bug
```

2. Make code changes and commit as necessary.

```sh
git add -A
```

```sh
npm run commit
```

Follow the commitizen prompts, and the final commit message should be something like `fix: "address part 1 of 5 of the bug"`

3. Push the branch to the remote GitHub repo.

```sh
git push origin fix_for_the_bug
```

4. Create a new pull request from the `fix_for_the_bug` branch, review the code, and address any changes necessary. Make sure the pull request name follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/#specification) guidelines.

5. After the changes have been reviewed, the PR can be squashed and merged to the main branch. This will trigger the GitHub Action workflow that publishes the new release, based on the prefix used on the PR name.

The process above ensures that the code in the main branch always reflects that latest package version, and also keeps package versions consistent between npm and GitHub Packages.

## Semantic Versioning

The default values for these prefixes are defined in the [.releaserc.js](https://github.com/Ax-Protocol/widgets/blob/main/.releaserc.js) file.

| Prefix     | Version Bump | Description                                                                                                                                                             |
| ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `feat`     | Minor        | A new feature is introduced to the application (e.g., version bump from 1.0.0 to 1.1.0).                                                                                |
| `fix`      | Patch        | A bug fix in the codebase (e.g., version bump from 1.0.0 to 1.0.1).                                                                                                     |
| `docs`     | No bump      | Documentation only changes, no version bump.                                                                                                                            |
| `style`    | No bump      | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc), no version bump.                                                |
| `refactor` | No bump      | A code change that neither fixes a bug nor adds a feature, no version bump.                                                                                             |
| `perf`     | Patch        | A code change that improves performance (e.g., version bump from 1.0.0 to 1.0.1).                                                                                       |
| `test`     | No bump      | Adding missing tests or correcting existing tests, no version bump.                                                                                                     |
| `build`    | No bump      | Changes that affect the build system or external dependencies (e.g., gulp, broccoli, npm), no version bump.                                                             |
| `ci`       | No bump      | Changes to CI configuration files and scripts (e.g., Travis, Circle, BrowserStack, SauceLabs), no version bump.                                                         |
| `chore`    | No bump      | Other changes that don't modify src or test files, no version bump.                                                                                                     |
| `revert`   | Varied       | Reverts a previous commit, the bump depends on the reverted change (e.g., if a feature is reverted, a minor version bump down). The default bump for `revert` is Minor. |

## License

This project is released under the MIT License - see the [LICENSE.md](https://github.com/Ax-Protocol/widgets/blob/main/LICENSE.md) file for details.
