# How to contribute

WIP

## Clone the repo

```
> git clone https://github.com/cockroachdb/ui/
```

The UI repo is a monorepo managed by [Lerna](https://lerna.js.org/). Once you clone the repo, be sure to [bootstrap](). _In the following examples, I'm using `npx`. If you do this very often you may consider installing Lerna globally (`npm i -g lerna`)._

```
> cd path/to/ui
> npx lerna bootstrap
```

## Branch and develop

Create a branch for your work. When you are ready, create a [pull-request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/proposing-changes-to-your-work-with-pull-requests) for your work.

```
> git checkout -b package-name--branch-name-describing-work
```

Branch names should contain the name of the package you are working on as well as a description of the work you are doing.

## Publishing

When work has been merged to master, use [Lerna to publish](https://lerna.js.org/#command-publish).

```
> cd path/to/ui
> lerna publish
```

Lerna will ask you about how you would like to increase the version. We try to stick to [semantic versioning](https://semver.org/), so if you have questions about what the next version should be ask one of the [code owners](https://github.com/cockroachdb/ui/blob/master/CODEOWNERS).

```
  > npx lerna publish
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

- publish the package with the chosen version to npm
- commit the version increase to github and push the change
- add a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for the published version

### Prerelease publishing

If you have changes that are experimental that you would like to publish to npm, you should publish these changes using a [prerelease version](https://semver.org/#spec-item-9). You can do this with Lerna by choosing `Custom Prerelease` when publishing. For simplicity's sake you should use the prerelease identifier `prerelease` if possible. If you are publishing a prerelease version you should also use the `--dist-tag next` option when invoking `lerna publish` (see [here](https://medium.com/@mbostock/prereleases-and-npm-e778fc5e2420) for details).

```
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
