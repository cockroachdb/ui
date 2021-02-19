# ui
Published assets for Cockroach Labs user interfaces

## Development setup
- Install all dependencies with Yarn (it resolves dependencies for nested workspaces and links them if necessary)
- Run `build` command for all packages to have generated assets in place (needed for `icons` and `design-tokens` workspaces)
```shell
yarn install && yarn lerna run build
```