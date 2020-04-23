# @cockroachlabs/icons
> a package containing Cockroach Labs icons as SVG for consumption by other components

This package serves as a store for SVG icons utilizing [@svgr/webpack](https://github.com/gregberge/svgr/tree/master/packages/webpack) to export them as React components.
The SVGs are stored in the [/svg](https://github.com/cockroachdb/ui/tree/master/packages/icons/svg) directory and exported from [src/index.ts](https://github.com/cockroachdb/ui/blob/master/packages/icons/src/index.ts).

*Example Usage*

```jsx
  import { Time } from "@cockroachlabs/icons";
  
  const TimeButton = ({ timestamp }) => (
    <button>
      <Time /> {timestamp}
    </button>
  );
```

```jsx
  import * as Icons from "@cockroachlabs/icons";

// ...

  <EditMessage icon={Icons.Pencil} />
```

Each Icon component will render an `<svg />` element with an unbounded size and may not have a default fill color. These properties can be passed in as `props`.

```jsx

  import { CheckCircleFilled } from "@cockroachlabs/icons";
  
  <CheckCircleFilled fill="green" height="24px" width="24px" />
  
  // or
  
  <CheckCircleFilled style={{ fill: "green", height: "24px", width: "24px" }} />
```
