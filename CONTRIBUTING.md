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

# Troubleshooting

## Trouble installing Sass

`ui-components` uses `node-sass` to preprocess our css modules. `node-sass` adds requirements for additional tools beyond `npm` and `yarn`. All of these tools can be installed using `xcode-select`.

### _Do I have `xcode-select` installed?_

Trying running this command,

```
> gcc --version
```

You have xcode-select installed if you see something like this,

```
Configured with: --prefix=/Library/Developer/CommandLineTools/usr --with-gxx-include-dir=/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/usr/include/c++/4.2.1
Apple clang version 11.0.3 (clang-1103.0.32.62)
Target: x86_64-apple-darwin19.6.0
Thread model: posix
InstalledDir: /Library/Developer/CommandLineTools/usr/bin
```

... then you have it installed!!

### _How do I install `xcode-select`?_

To install, run this command and follow the prompts ...

```
> xcode-select --install
```

### _I have Xcode installed, but I get an error when trying to build ui-components._

If you do not have XCode installed, or if you have updated your Macbook recently, you may see an error about certain tools being missing ...

```
...
gyp info spawn args   '--generator-output',
gyp info spawn args   'build',
gyp info spawn args   '-Goutput_dir=.'
gyp info spawn args ]
No receipt for 'com.apple.pkg.CLTools_Executables' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLILeo' found at '/'.

No receipt for 'com.apple.pkg.DeveloperToolsCLI' found at '/'.

gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/Users/nathanstilwell/Code/ui/packages/ui-components/node_modules/node-gyp/lib/configure.js:345:16)
gyp ERR! stack     at ChildProcess.emit (events.js:314:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:276:12)
...
```

This may mean you need to re-install `xcode-select` with the following commands,

```shell
> sudo rm -rf $(xcode-select --print-path); # this will delete xcode-select
> xcode-select --install; # this will reinstall the latest version
```

### I get an error that Sass doesn't support my environment

If you see an error like this ...

```
ERROR in ./src/Avatar/Avatar.module.scss (./node_modules/css-loader/dist/cjs.js?modules=true!./node_modules/sass-loader/dist/cjs.js!./src/Avatar/Avatar.module.scss)
Module build failed (from ./node_modules/sass-loader/dist/cjs.js):

Error: Node Sass does not yet support your current environment: OS X 64-bit with Unsupported runtime (83)

For more information on which environments are supported please see:
https://github.com/sass/node-sass/releases/tag/v4.13.1
```

that's our fault. Please file an issue with the error and label it as a bug please. In the meantime, you may need to downgrade your version of Node.
