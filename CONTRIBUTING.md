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

This repo has [Auto]() installed which means that publishing is controlled via labels applied to Pull-Requests ...
