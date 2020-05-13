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

## Properties

These are the properties that can be provided to the `Icon` component.

### `iconName: string`

The `iconName` prop should be a valid icon name from the [icons package](https://github.com/cockroachdb/ui/tree/master/packages/icons#icons). If an invalid iconName is supplied, the component will return `null`.

### `size?: Enum("large", "medium", "small", "tiny")`

The `size` prop will alter the pixel dimensions of the icon. The default size is `16 x 16` pixels. Other size options are

value | size
----- | ----
`large` | `64 x 64`
`medium` | `24 x 24`
`small` | `12 x 12 `
`tiny` | `8 x 8`

### `tint?: Enum("blue", "green", "purple", "red", "white", "neutral", "inherit")`

The `tint` prop will alter the fill color of the rendered icon. The color values of the possible tint property values are,

tint     | fill color
-------- | ----------
`blue`   | `#0788ff`
`green`  | `#37a806`
`purple` | `#542abd`
`red`    | `#ff3b4e`
`white`  | `#fff`
`neutral`| `#242a35`
`inherit`| [`currentcolor`](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color)
