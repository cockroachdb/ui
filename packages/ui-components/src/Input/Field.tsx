import React from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import { SingleLineTextInput, NumberInput } from "./TextTypeInput";
import { EmailInput, PasswordInput } from "./EmailPasswordInput";
import { CheckboxInput } from "./CheckboxInput";

type propTypes =
  | typeof PasswordInput
  | typeof EmailInput
  | typeof SingleLineTextInput
  | typeof NumberInput
  | typeof CheckboxInput;

export interface InputFieldProps<
  IComponent extends React.ComponentType<propTypes>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> extends FieldProps<any, FieldRenderProps<any, HTMLElement>, HTMLElement> {
  as: IComponent;
  type?: "text" | "email" | "password" | "number";
}

type FieldPropsTwo<
  IComponent extends React.ComponentType<propTypes>
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
}: FieldPropsTwo<propTypes>) {
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
