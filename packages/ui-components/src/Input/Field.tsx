import React, { FunctionComponent } from "react";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";

import { TextInput, TextProps} from "./TextTypeInput";
import { EmailInput, NewPasswordInput, ExistingPasswordInput, EmailNumberProps, NewPasswordProps, ExistingPasswordProps } from "./EmailPasswordInput";
import { CheckboxInput, CheckboxInputProps } from "./CheckboxInput";

type TextInputFieldProps = Omit<FieldProps<
  string,
  FieldRenderProps<string, HTMLElement>,
  HTMLElement
> &
TextProps, "type">;

type CheckboxInputFieldProps = Omit<FieldProps<
  boolean,
  FieldRenderProps<boolean, HTMLElement>,
  HTMLElement
> &
  CheckboxInputProps, "type">;

type EmailInputFieldProps = Omit<FieldProps<
  string,
  FieldRenderProps<string, HTMLElement>,
  HTMLElement
> &
 EmailNumberProps, "type">;

 type NewPasswordInputFieldProps = Omit<FieldProps<
 string,
 FieldRenderProps<string, HTMLElement>,
 HTMLElement
> &
NewPasswordProps, "type">;

type ExistingPasswordInputFieldProps = Omit<FieldProps<
string,
FieldRenderProps<string, HTMLElement>,
HTMLElement
> &
ExistingPasswordProps, "type">;

type InternalFieldProps = 
{inputFieldComponent: React.FunctionComponent} &
TextInputFieldProps | CheckboxInputFieldProps | EmailInputFieldProps | NewPasswordInputFieldProps | ExistingPasswordInputFieldProps;

const InputField: FunctionComponent<InternalFieldProps> = props => {
  const {
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
    inputFieldComponent,
    ...inputProps
  } = props;
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
        <inputFieldComponent 
        {...input}
          {...inputProps}
          textType={type}
          error={meta.touched && meta.error}
      />
      }}
    />
  );
};

// It's not necessary to pass the type prop for a Field
// This is to prevent passing a type for which the input component
// isn't defined

export const TextField: FunctionComponent<TextInputFieldProps>  = props => {
  return <InputField type="text" inputFieldComponent={TextInput} {...props} />;
};

export const CheckboxField: FunctionComponent<Number>  = props => {
  const fieldComponent = TextInput
  return <InputField type="checkbox" inputFieldComponent={CheckboxInput} {...props} />;
};

export const EmailField: FunctionComponent<EmailInputFieldProps>  = props => {
  return <InputField type="email" inputFieldComponent={EmailInput} {...props} />;
};

export const NewPasswordField: FunctionComponent<NewPasswordInputFieldProps>  = props => {
  return <InputField type="password" inputFieldComponent={NewPasswordInput} {...props} />;
};

export const ExistingPasswordField: FunctionComponent<ExistingPasswordInputFieldProps>  = props => {
  return <InputField type="password" inputFieldComponent={ExistingPasswordInput} {...props} />;
};
