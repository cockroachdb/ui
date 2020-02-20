# UI Component utils

## `objectToClassnames(object, delimiter?)`

`objectToClassnames` takes an object of strings and joins its keys and values using a provided delimiter (`-` by default) returning a single joined string. The base case here is to take a config object for creating CSS classnames.

```javascript
import { objectToClassnames } from "utils";

const properties = {
  tint: "exubrant",
  size: "medium",
};

const classnames = objectToClassnames(properties);
// classnames = "tint-exubrant size-medium"
```

## Params

### `object: { [key as string]: string }`

An object containing strings

### `delimiter?: string`

**default value: `-`**

A string delimiter to use when concatenating object key to object value

```javascript
const obj = {
  foo: "bar",
  baz: "bim",
};

const classnames = objectToClassnames(obj, "(ಠ_ಠ)");
// classnames is "foo(ಠ_ಠ)bar baz(ಠ_ಠ)bim"
```

This prop is **optional**.
