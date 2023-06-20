# ui
Published assets for Cockroach Labs user interfaces

This repository is a monorepo of published packages under the `@cockroachlabs`
namespace on [npm](https://www.npmjs.com/). It contains code for packages:

package | source
--------|--------
[@cockroachlabs/eslint-config](https://www.npmjs.com/package/@cockroachlabs/eslint-config) | [`/packages/eslint-config`](https://github.com/cockroachdb/ui/tree/master/packages/design-tokens)
[@cockroachlabs/design-tokens](https://www.npmjs.com/package/@cockroachlabs/design-tokens) | [`/packages/design-tokens`](https://github.com/cockroachdb/ui/tree/master/packages/design-tokens)
[@cockroachlabs/icons](https://www.npmjs.com/package/@cockroachlabs/icons) | [`/packages/icons`](https://github.com/cockroachdb/ui/tree/master/packages/icons)
[@cockroachlabs/ui-components](https://www.npmjs.com/package/@cockroachlabs/ui-components) | [`/packages/ui-components`](https://github.com/cockroachdb/ui/tree/master/packages/ui-components)

## Development setup
This repo is currently managed with [Lerna](https://lerna.js.org/) (version 5.x) which handles symlinking package dependencies for local developement. Each package has local npm scripts for management (`build`, `test`, etc). Before you begin working in the repo you should run `yarn init` from the root of the project.
Other tasks can be found as npm scripts,

```
---
yarn init    - `yarn install && yarn lerna run build` -- Install dependencies and build all packages.
yarn start   - `lerna run start --parallel` -- Start all packages in watch mode (this can be quite heavy)
yarn release - `auto shipit` -- Used to publish new versions of packages. (Not required for local development)
---
```
