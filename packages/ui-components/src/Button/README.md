[back to components](../README.md)

# Button

A Button is a styled basic element to handle click-based user interactions. 

A Button can be rendered as any desired DOM or React element by passing in a tag or component name in the `as` prop. This allows it to be rendered as a common `button` element, an anchor, or a React Router `<Link>` component.

```javascript
import React from "react";
import { Button } from "@cockroachlabs/ui-components";

export const ButtonExample = () => (
<>
  <Button>Default button</Button>
  <Button intent="primary">Success button</Button>
  <Button intent="danger">Danger button</Button>
  <Button size="small">Small button</Button>
  <Button intent="danger" size="small">Minor danger</Button>
  <Button as="a" href="https://cockroachlabs.com">
    cockroachlabs.com
  </Button>
  <Button intent="tertiary" disabled>
    Tertiary
  </Button>  
</>
);
```

## Props

|Name   |Type   |Default   |Description   |
|---|---|---|---|
| `as`   | ElementType  | `"button"`  | Element to render as, could be "a", "div", "button", or a React Component  |
| `intent` | <code>"primary" <br />&#124; "success"<br /> &#124; "danger"<br /> &#124;"secondary"<br /> &#124;"tertiary"</code>  | `"secondary"`  | Controls general styling of button according to our color scheme.  |
| `size`  | <code>"standard"<br /> &#124; "small"</code>  | `"standard"`  | Controls size of button |
| `fluid`   | boolean  | `false`  | Determines whether button fills container width
