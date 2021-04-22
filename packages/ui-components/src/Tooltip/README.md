[back to components](../README.md)

# Tooltip

A Tooltip is a styled popover element that can be shown on hover.

```javascript
import React from "react";
import { Tooltip } from "@cockroachlabs/ui-components";

export const SomeExampleReact = () => (
  <Tooltip content={"Tooltip content"}>
    <div id="hoverme">hover me</div>
  </Tooltip>
);
```

## Properties

These are the properties that can be provided to the `Tooltip` component.

### `children: ReactNode | text`

The content hover on what will trigger display of tooltip.

This prop is **required**.

### `position?: Enum("left", "left-start", "left-end", "right", "right-start", "right-end", "top", "top-start", "top-end", "bottom", "bottom-start","bottom-end")`

**default value: `bottom`**

Placement of tooltip around anchor content.

This prop is **optional**.

### `style?: Enum("default", "light", "dark", "tableTitle")`

**default value: `default`**

Will alter the visual style of the Tooltip by changing the `background-color`, `color`, `border-color` properties of the rendered element.

This prop is **optional**.

### `visible?: boolean`

**default value: `false`**

Force tooltip stay visible.

This prop is **optional**.