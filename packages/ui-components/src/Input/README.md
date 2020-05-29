[back to components](../README.md)

# Input components

Provides `<TextInput />` and `<NumberInput />` realizations and `<BaseInput />`
unstyled base component to build own custom input components.

## Properties
### `initialValue?: string | number`
Value to be displayed if no `value` is provided or nothing is entered by user.
### `value?: string | number`
Value to be displayed in input element
### `onChange?: (value: string | number) => void;`
Handler to be called when input value is changed by user
### `placeholder?: string;`
Placeholder to be shown when no value is present
### `disabled?: boolean;`
Disable input
### `invalid?: boolean;`
Highlight input element with red borders to indicate that entered value is not acceptable.
### `prefixIcon?: ReactNode`
Expects one of SVG icons (`@cockroachlabs/icons`) to be provided.


