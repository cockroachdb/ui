import React, { useState, useEffect } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";

import {
  SingleLineTextInput,
  TextInputProps,
  NumberInput,
  NumberProps,
  MultilineTextInput,
  MultilineTextInputProps,
} from "./TextTypeInput";
import {
  EmailInput,
  PasswordInput,
  PasswordProps,
  EmailProps,
} from "./EmailPasswordInput";
import { CheckboxInput, CheckboxInputProps } from "./CheckboxInput";

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

type PasswordInputFieldProps = Omit<
  FieldProps<string, FieldRenderProps<string, HTMLElement>, HTMLElement> &
    PasswordProps,
  "type"
>;

type InternalFieldProps =
  | ({ InputFieldComponent: React.FunctionComponent } & TextInputFieldProps)
  | CheckboxInputFieldProps
  | EmailInputFieldProps
  | PasswordInputFieldProps;

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

export const MultilineTextField = (props: MultilineTextInputProps) => {
  return (
    <InputField
      type="text"
      InputFieldComponent={MultilineTextInput}
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

export const PasswordField = (props: PasswordInputFieldProps) => {
  return (
    <InputField
      InputFieldComponent={PasswordInput}
      {...props}
    />
  );
};
