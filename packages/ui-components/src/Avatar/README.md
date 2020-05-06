[back to components](../README.md)

# Avatar

## Properties
#### children?: string
Content of `Avatar`, can be any arbitrary text.
The length of the text is not limited by component itself.
It has to be truncated by user.
### size?: AvatarSize
Available options: `"xs" | "s" | "m" | "l"`

Default option: `"l"`

Changes the size of avatar

### intent?: AvatarIntent
Available options: `"default" | "active" | "pending" | "invalid"`

Default option: `"default"`

Changes the color palette of avatar

### disabled?: boolean
Default option: `false`

Disable avatar interaction, events handlers on click, and prevents discards `selectable` option

### selectable?: boolean
Default option: `false`
Applies visual styling when mouse hovering on Avatar 

### onClick?: () => void
Callback function to be called when click on Avatar.
It can be called if `disabled` option isn't set to true.