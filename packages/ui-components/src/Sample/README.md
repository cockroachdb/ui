[back to components](../README.md)

# Sample

Sample component is an example component to provide the general structure of components in this project. It exists to demonstrate a component styled with CSS Modules, an API with user specified props, and unit tests for its core functionality.

```javascript
import React from "react";
import { Sample } from "@cockroachlabs/ui-components";

export const SomeExampleReact = () => (
  <Sample content="sample 1" />
  <Sample>sample 2</Sample>
  <Sample content="red sample 3" tint="red" />
);
```

## Properties

These are the properties that can be provided to the `Sample` component. Other properties, not documented, will be passed along to the root element.

### `children: ReactNode`

The content displayed inside the Sample.

### `content: String`

A shorthand property used to display content inside the sample

### `tint: Enum("default", "red", "green", "blue")`

Tint will alter the visual style of the Sample by changing the `background-color` and `color` properties of the rendered element.
