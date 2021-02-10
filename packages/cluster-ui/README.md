# Cluster UI Components

This library contains components used by the CockroachDB Console and CockroachCloud to display cluster-level information. 

```
  npm install --save-dev @cockroachlabs/cluster-ui
```

Components are exported individually from the package,

```javascript
import { Drawer } from "@cockroachlabs/cluster-ui";

export default props => (
  <div>
    <Drawer />
  </div>
);
```
# Development Workflow with CRDB or CockroachCloud

If you would like changes in this package to be reflected in a locally running DB Console instance, you will need to locally link the library to your DB Console project like this:

In `packages/cluster-ui` run:

```
> yarn
> yarn link
> yarn run build:watch
```

Then in `pkg/ui` in CRDB repo run:

```
> yarn link "@cockroachlabs/cluster-ui"
> yarn
> cd ../../
> make ui-watch TARGET=http://localhost:8080
```

While running a local CRDB cluster. This will link your DB Console code to the local copy of `cluster-ui` and the `build:watch` task in `cluster-ui` will update the build with any changes you make which will get picked up in the `ui-watch` job on the DB side.

# Storybook

Learn more about Storybook here: https://storybook.js.org/

You can run storybook for this project using:
```
> yarn run storybook
```
And opening http://localhost:6006/ in your browser.

The use of storybook in this project is to provide a controlled environment where compontents can be rendered or showcased for testing and sharing purposes outside of the entire DB Console or CockroachCloud app. 

Often we build a component that behaves or looks differently in different scenarios with different inputs. Storybook lets us render the component in all the "interesting configurations" we define so that we can quickly get visual feedback on our work and ensure that we're not breaking functionality when editing code. Otherwise we waste lots of time getting our app in the "right state" to try and see if some random feature works or not.

Components and page developers are encouraged to use Storybook to showcase components and pages in many common states to be able to quickly review their  work visually and to aid others in understanding what the various states pages and components we want to support.

Storybook stories **should** use the CSF format as described here: https://storybook.js.org/docs/react/api/csf in order to facilitate writing unit tests with the storybook components.

# Updating Protobuf definitions from CRDB

The `cluster-ui` components rely on protobuf types and code from CRDB in order to know what data shapes they should expect and how to query them. Sometimes you might need to develop components using updated definitions that were merged recently or are in progress.

The protobuf definitions are currently manually published from the CRDB repo into this package: https://www.npmjs.com/package/@cockroachlabs/crdb-protobuf-client

### How to publish protobuf client updates to npm

Once you have updated definitions locally, run `make ui-lint` to generate them and make sure typescript is run, then modify the `pkg/ui/src/js/package.json` file with a new version (if your work isn't merged yet, use `0.0.<next>-beta.<integer>) like `0.0.23` if the latest one is `0.0.22` and run:

```
> npm publish --access public
```

This will push a new version to npm and you can bump the dependency in `pkg/ui` in this repo to use it.

If you'd like permission to do this, please ask in #_cc-observability on Slack. Otherwise, Observability team is happy to publish a

We're hoping to move this into an automated workflow to publish on all merges to `master` on CRDB to remove this pain point.

### Expert Level

You can use the same `yarn link` workflow described above to link the `crdb-protobuf-client` to `cluster-ui` locally if you'd like to live on the fully bleeding edge :sunglasses: 

