# @cockroachlabs/icons

> a package containing Cockroach Labs icons as SVG for consumption by other components

This package serves as a store for SVG icons that are converted and published as React components.

## Usage

_While any icon in the collection of this package can be imported individually, **in practice**, for use in Cockroach Labs applications a number of components are exported from [ui-components](../ui-components/src/Icon/index.ts) that provide types for intended Icon usages (sizes and fills). See [below](#icon-sets-and-components) for examples._

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

<EditMessage icon={Icons.Pencil} />;
```

Each Icon component will render an `<svg />` element with an unbounded size and may not have a default fill color. These properties can be passed in as `props`.

```jsx

  import { CheckCircleFilled } from "@cockroachlabs/icons";

  <CheckCircleFilled fill="green" height="24px" width="24px" />

  // or

  <CheckCircleFilled style={{ fill: "green", height: "24px", width: "24px" }} />
```

### Icon sets and components

Icons with common attributes are grouped together into an exported collection, and generally have an associated [component](../ui-components/src/Icon/index.ts) to render an icon from the set. The exported sets are,

- **System Icons** - Used as visual representations of common actions and commands to provide additional context and enhance usability. These icons can be scaled up or down in size if necessary. They should only be used as 1 color.
- **Pictograms** - Pictogram icons contain more than 1 color value and are larger in size than system icons. They are used to add personality, visual interest and branding into the UI where space is available.
- **Third Party Icons** - Used to represent 3rd party logos within the UI. These icons can be scaled up or down in size if necessary and inherit the 3rd party brand colors.
- **Credit Cards** - Credit card icons are used to represent credit card brands. They can be scaled up or down and can consist of colors outside our design system palette.
- **Flags** - Flag icons are used to represent a region or country. They can be scaled up or down and can consist of colors outside our design system palette.
- **Illustrations** - Illustrations are used at a large scale, typically in areas with a lot of space like empty states or 404 pages. They add personality, visual interest and branding into the UI.

These sets can be rendered using their associated component,

```tsx
import { Icon, Pictogram, ThirdPartyIcon, CreditCard, Flag, Illustration } from "@cockroachlabs/ui-components";

/*
   ...snip
*/

<Icon iconName="Gear" size="small" fill="info" />

<Pictogram pictogramName="Email" size="medium" />

<ThirdParty iconName="Gcp" size="large" />

{/* Flag icons can be referenced by "flagName" or "countryCode" prop  */}
<Flag flagName="Canada" size="medium" />
<Flag countryCode="can" size="small" />

<CreditCard creditCardName="Visa" size="tiny" />

<Illustration illustrationName="SleepMoon" />
```

### SVG prop pass through

The components that render icons all extend `SVGElement` props and so any component can take [common HTML element attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes). For example,

```tsx
  <Icon iconName="Pencil" size="small" className="edit-icon" aria-label="Edit field icon" id="edit-icon">
```

### How do I contribute new icons?

See [CONTRIBUTING.md](./CONTRIBUTING.md) for instructions on adding new icons and publishing new versions of the icons package.
