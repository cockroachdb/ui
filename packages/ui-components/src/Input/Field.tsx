import React from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import { SingleLineTextInput, NumberInput } from "./TextTypeInput";
import { EmailInput, PasswordInput } from "./EmailPasswordInput";
import { CheckboxInput } from "./CheckboxInput";

// not including multiline input as it depends on Figma designs
type InputTypes =
  | typeof PasswordInput
  | typeof EmailInput
  | typeof SingleLineTextInput
  | typeof NumberInput
  | typeof CheckboxInput;

// Extends field render props, which will be passed to the Field component in InputField
export interface InputFieldProps<
  IComponent extends React.ComponentType<InputTypes>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> extends FieldProps<any, FieldRenderProps<any, HTMLElement>, HTMLElement> {
  as: IComponent;  
  // should include types currently supported
  type?: "text" | "email" | "password" | "number" | "checkbox";
}

// remove any properties defined in InputFieldProps, so we can handle them exclusively.
type FieldPropsRefined<
  IComponent extends React.ComponentType<InputTypes>
> = InputFieldProps<IComponent> &
  Omit<
    React.ComponentPropsWithoutRef<IComponent>,
    keyof InputFieldProps<IComponent>
  >;

export function InputField({
  as: ComponentReturned,
  afterSubmit,
  allowNull = false,
  beforeSubmit,
  format,
  formatOnBlur,
  initialValue,
  isEqual,
  parse,
  subscription,
  type,
  validate,
  validateFields,
  name,
  ...rest
}: FieldPropsRefined<InputTypes>) {
  return (
    <Field
      afterSubmit={afterSubmit}
      allowNull={allowNull}
      beforeSubmit={beforeSubmit}
      format={format}
      formatOnBlur={formatOnBlur}
      initialValue={initialValue}
      isEqual={isEqual}
      parse={parse}
      subscription={subscription}
      type={type}
      validate={validate}
      validateFields={validateFields}
      name={name}
      render={({ input, meta }) => {
        return (
          <ComponentReturned
            meta={meta}
            {...input}
            {...rest}
            error={meta.touched && meta.error}
          />
        );
      }}
    />
  );
}
