# storybook-ui-components

<a href="https://core-components.crdb.io/" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

A way to develop `@cockroachlabs/ui-components` in isolation.

## Deploy

The [live site](https://core-components.crdb.io/) is hosted on GCP in a [Cloud Storage bucket](https://cloud.google.com/storage/docs/hosting-static-website) that is managed by the dev-inf team.

When changes are merged into master it triggers a workflow that copies the `public` dir to the Cloud Storage bucket. The build and deploy workflow is managed with GitHub Actions. See [deploy-storybook.yml](../../.github/workflows/deploy-storybook.yml).
