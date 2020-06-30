[back to components](../README.md)

# Icon

An icon is a graphic element to quickly communicate a concept without or in partnership with text content. An Icon is an SVG element intended to be used individualy to render an SVG graphic or consumed by other components to render icons.

```javascript
import React from "react";
import { Badge } from "@cockroachlabs/ui-components";

export SomeExampleElement = () => (
  <Icon iconName="CheckCircle" />
  <Icon iconName="ErrorCircle" tint="red" />
  <Icon iconName="Caution" size="small" />
  <Icon iconName="World" tint="blue" size="large" />
);
```
