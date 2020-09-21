# design-tokens

Uses [style-dictionary](https://github.com/amzn/style-dictionary) to transform tokens defined in json into different formats.

## Install dependencies

```
yarn
```

## Generate tokens from json

```
npm run build
```

## Exported Tokens

### Sass

`_tokens.scss` contains exported token values as Sass variables.

```sass
@import "~@cockroachlabs/design-tokens/dist/web/tokens"

.example {
    background-color: $color-background-button-primary-success-base;
    color: $color-font-button-primary-success-base;
    border-width: 1px;
    border-style: solid;
    border-color: $color-border-button-primary-success-base;
}
```

### JavaScript

`tokens.js` contains exported token values as JavaScript constants.

```jsx
import {
  ColorFont1,
  ColorBaseBlue,
  ColorBasePurple,
} from "@cockroachlabs/design-tokens";

// ...

<SomeComponent
  fontColor={ColorFont1}
  interactionColor={ColorBaseBlue}
  progressColor={ColorBasePurple}
/>;
```

a `tokens.d.ts` file is also generated to act as types for tokens for TypeScript support.
