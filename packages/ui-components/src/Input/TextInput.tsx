import React from "react";
import { BaseInput, InputProps } from "./BaseInput";
import { InputPrefix, InputWrapper } from "./helpers";

export type TextInputProps = Omit<InputProps<string>, "type">;

export const TextInput: React.FC<TextInputProps> = props => {
  const { prefixIcon, disabled, invalid } = props;
  return (
    <InputWrapper disabled={disabled} invalid={invalid}>
      <InputPrefix>{prefixIcon}</InputPrefix>
      <BaseInput {...props} type="text" />
    </InputWrapper>
  );
};
