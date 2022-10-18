# How to contribute

## Clone the repo

```
> git clone https://github.com/cockroachdb/ui/
```

The UI repo is a monorepo managed by [Lerna](https://lerna.js.org/). Once you clone the repo, be sure to [bootstrap](https://github.com/lerna/lerna/tree/master/commands/bootstrap). _In the following examples, I'm using `npx`. If you do this very often you may consider installing Lerna globally (`npm i -g lerna`)._

```
> cd path/to/ui
> npx lerna bootstrap
```

## Fork and Develop

When contributing, we suggest contributors make a [personal fork](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks) to work with before submitting a [pull-request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests).

## Style guidelines

### Class name prefixing

Since CSS modules provides the ability to scope class names to a particular module while also avoiding global classes we recommend composing class names in the most semantic and straigtforward manner possible, in particular avoiding repo- or package-prefixing.

```
// Good
.button { // ... }

// Bad
.crl-button { // ... }

.ui-components-button { // ... }
```

For more context on how we compose class names in general, see the [objectToClassNames](https://github.com/cockroachdb/ui/blob/master/packages/ui-components/src/utils/objectToClassnames.ts) utility function which expresses how we perform our mappings between component properties that are intended to impact the rendered visual and the module class names which support those visual changes.

## Publishing

When work has been merged to master, use [Lerna to publish](https://lerna.js.org/#command-publish). Since you are working on a fork, you most likely want to publish to the `upstream` [remote](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) by providing [`--git-remote`](https://github.com/lerna/lerna/tree/master/commands/version#--git-remote-name) switch to the `publish` command.

```text
> cd path/to/ui
> npx lerna publish --git-remote upstream
```

Lerna will ask you about how you would like to increase the version. We try to stick to [semantic versioning](https://semver.org/), so if you have questions about what the next version should be ask one of the [code owners](https://github.com/cockroachdb/ui/blob/master/CODEOWNERS).

```text
  > npx lerna publish --git-remote upstream
lerna notice cli v3.20.2
lerna info versioning independent
lerna info Assuming all packages changed
? Select a new version for @cockroachlabs/ui-components (currently 0.1.0-prerelease.3) (Use arrow keys)
❯ Patch (0.1.0)
  Minor (0.1.0)
  Major (1.0.0)
  Prepatch (0.1.1-prerelease.3)
  Preminor (0.2.0-prerelease.3)
  Premajor (1.0.0-prerelease.3)
  Custom Prerelease
  Custom Version
```

If you have permission to publish, Lerna will

- publish the package to npm
- commit the version increase to github and push the change
- add a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the published version

### Prerelease publishing

If you have changes that are experimental that you would like to publish to npm, you should publish these changes using a [prerelease version](https://semver.org/#spec-item-9). You can do this with Lerna by choosing `Custom Prerelease` when publishing. For simplicity's sake you should use the prerelease identifier `prerelease` if possible. If you are publishing a prerelease version you should also use the `--dist-tag next` option when invoking `lerna publish` (see [here](https://medium.com/@mbostock/prereleases-and-npm-e778fc5e2420) for details).

```text
> npx lerna publish --dist-tag next
lerna notice cli v3.20.2
lerna info versioning independent
lerna info Assuming all packages changed
? Select a new version for @cockroachlabs/ui-components (currently 0.1.0-prerelease.3) (Use arrow keys)
  Patch (0.1.0)
  Minor (0.1.0)
  Major (1.0.0)
  Prepatch (0.1.1-prerelease.3)
  Preminor (0.2.0-prerelease.3)
  Premajor (1.0.0-prerelease.3)
❯ Custom Prerelease
  Custom Version

? Enter a prerelease identifier (default: "prerelease", yielding 0.1.0-prerelease.1) [type "prerelease" or press Enter]
```
