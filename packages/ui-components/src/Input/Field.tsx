import React, { useState } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";

import {
  SingleLineTextInput,
  TextInputProps,
  NumberInput,
  NumberProps,
} from "./TextTypeInput";
import {
  EmailInput,
  NewPasswordInput,
  ExistingPasswordInput,
  EmailProps,
  NewPasswordProps,
  ExistingPasswordProps,
  PasswordInputType,
} from "./EmailPasswordInput";
import { CheckboxInput, CheckboxInputProps } from "./CheckboxInput";
import Icon from "../Icon/Icon";

// the following omit statements can be removed
// once type better limits what props can be passed in
type TextInputFieldProps = Omit<
  FieldProps<string, FieldRenderProps<string, HTMLElement>, HTMLElement> &
    TextInputProps,
  "type"
>;

type NumberInputFieldProps = Omit<
  FieldProps<number, FieldRenderProps<number, HTMLElement>, HTMLElement> &
    NumberProps,
  "type"
>;

type CheckboxInputFieldProps = Omit<
  FieldProps<boolean, FieldRenderProps<boolean, HTMLElement>, HTMLElement> &
    CheckboxInputProps,
  "type"
>;

type EmailInputFieldProps = Omit<
  FieldProps<string, FieldRenderProps<string, HTMLElement>, HTMLElement> &
    EmailProps,
  "type"
>;

type NewPasswordInputFieldProps = Omit<
  FieldProps<string, FieldRenderProps<string, HTMLElement>, HTMLElement> &
    NewPasswordProps,
  "type"
>;

type ExistingPasswordInputFieldProps = Omit<
  FieldProps<string, FieldRenderProps<string, HTMLElement>, HTMLElement> &
    ExistingPasswordProps,
  "type"
>;

type InternalFieldProps =
  | ({ InputFieldComponent: React.FunctionComponent } & TextInputFieldProps)
  | CheckboxInputFieldProps
  | EmailInputFieldProps
  | NewPasswordInputFieldProps
  | ExistingPasswordInputFieldProps;

const InputField = ({
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  InputFieldComponent,
  ...inputProps
}: InternalFieldProps) => {
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
          <InputFieldComponent
            meta={meta}
            {...input}
            {...inputProps}
            error={meta.touched && meta.error}
          />
        );
      }}
    />
  );
};

// It's not necessary to pass the type prop for a Field
// This is to prevent passing a type for which the input component
// isn't defined

export const TextField = (props: TextInputFieldProps) => {
  return (
    <InputField
      type="text"
      InputFieldComponent={SingleLineTextInput}
      {...props}
    />
  );
};

export const NumberField = (props: NumberInputFieldProps) => {
  return (
    <InputField type="number" InputFieldComponent={NumberInput} {...props} />
  );
};

export const CheckboxField = (props: CheckboxInputFieldProps) => {
  return (
    <InputField
      type="checkbox"
      InputFieldComponent={CheckboxInput}
      {...props}
    />
  );
};

export const EmailField = (props: EmailInputFieldProps) => {
  return (
    <InputField type="email" InputFieldComponent={EmailInput} {...props} />
  );
};

export const NewPasswordField = (props: NewPasswordInputFieldProps) => {
  const { meta } = props;
  const [type, setType] = useState<PasswordInputType>(
    PasswordInputType.Password,
  );

  const toggleType = () => {
    setType(
      type === PasswordInputType.Password
        ? PasswordInputType.Text
        : PasswordInputType.Password,
    );
  };

  const suffixIcon = (
    <div style={{ display: "inline-flex" }}>
      <Icon
        iconName={type === PasswordInputType.Password ? "Eye" : "EyeOff"}
        size="medium"
        fill={meta && meta.active ? "info" : "default"}
        onClick={toggleType}
      />
    </div>
  );

  // hidden password will render a password field
  // open password will render a text field
  // the hidden/open state is toggled by the suffix icon
  return (
    <InputField
      type={type}
      suffix={suffixIcon}
      InputFieldComponent={NewPasswordInput}
      {...props}
    />
  );
};

export const ExistingPasswordField = (
  props: ExistingPasswordInputFieldProps,
) => {
  return (
    <InputField
      type="password"
      InputFieldComponent={ExistingPasswordInput}
      {...props}
    />
  );
};
