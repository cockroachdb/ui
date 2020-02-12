[back to components](../README.md)

# Badge

A Badge is a styled text element used to highlight informative elements or act as a label for other visual elements.

```javascript
import React from "react";
import { Badge } from "@cockroachlabs/ui-components";

export const SomeExampleReact = () => (
  <Badge content="Sample 1" />
  <Badge>Sample 2</Badge>
  <Badge content="Successful sample" intent="success" />
  <Badge content="Dangerous sample" intent="danger" />
  <Badget transformCase="none">Meaningful Case Sample v10.3.7-Alpha.0876b</Badge>
);
```

## Properties

These are the properties that can be provided to the `Badge` component.

### `children?: ReactNode`

The content displayed inside the Badge.

This prop is **optional**.

### `content?: String`

A shorthand property used to display content inside the sample

This prop is **optional**.

### `intent?: Enum("neutral", "success", "warning", "danger")`

**default value: `neutral`**

Intent will alter the visual style of the Badge by changing the `background-color` and `color` properties of the rendered element.

This prop is **optional**.

### `transformCase?: Enum("uppercase", "none")`

**default value: `uppercase`**

This prop alters the letter case of the content of the Badge. The default value is uppercase, but can be set to `none` if the case of content is meaningful and should not be transformed.

This prop is **optional**.
