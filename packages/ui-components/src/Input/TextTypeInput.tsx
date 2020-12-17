import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";
import { isEmpty } from "lodash";
import "./input.module.scss";

export interface TextAndNumberProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: JSX.Element;
  prefixElement?: JSX.Element;
  // prop only used internally for implementation
  type?: "text" | "email" | "password" | "number";
  // this defines the input type rendered by this field
  // for multiline text types, this will be <textarea>
  // for text/email/password/number types this will be <input> with a type field
  JSXInput?: JSX.Element;
}

export interface MultilineProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  suffix?: JSX.Element;
}

// the following props are used to implement {Email, Password, Number}Input
// it is recommended to use those components instead of passing an "email" type to TextInput
interface CustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ariaLabel?: string;
  ariaLabelledBy?: string;
  forgotPasswordLinkElement?: JSX.Element;
  // this prop is only used for internal implementation
  // whether the password exists or not, should be indicated by New/Existing PasswordInput
  existingPassword?: boolean;
}

export type TextInputProps = CommonInputProps & TextAndNumberProps;
export type MultilineTextInputProps = CommonInputProps & MultilineProps;
export type NumberProps = TextInputProps & CustomProps;

type InternalTextProps = TextInputProps & CustomProps;

export type AllProps = Omit<InternalTextProps, "existingPassword">;

export const BaseTextInput: React.FC<InternalTextProps> = props => {
  const {
    id,
    JSXInput,
    className,
    error,
    invalid,
    label,
    ariaLabel,
    required,
    suffix,
    type = "text",
    prefixElement,
    ariaLabelledBy,
    existingPassword = false,
    forgotPasswordLinkElement,
    ...rest
  } = props;

  const inputProps = {
    className: classNames("crl-input", className, {
      "crl-input--prefix": prefixElement,
      "crl-input--suffix": suffix,
      invalid: error || invalid,
    }),
    name: name,
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    ["aria-labelledby"]: ariaLabelledBy,
    type: type,
    ...rest,
  };

  const input = JSXInput || <input {...inputProps} />;

  const labelDiv = (
    <>
      {!isEmpty(label) && (
        <label
          aria-label={name}
          className={classNames({
            required: required,
          })}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </>
  );

  const labelElement = existingPassword ? (
    <div className="existing-password-label">
      {labelDiv}
      {forgotPasswordLinkElement}
    </div>
  ) : (
    labelDiv
  );

  const fieldInput = (
    <>
      {labelElement}
      <div className="affix-container">
        {prefixElement && (
          <span className="crl-input__prefix">{prefixElement}</span>
        )}
        {input}
        {suffix && <span className="crl-input__suffix">{suffix}</span>}
      </div>
    </>
  );

  return <CommonInput {...props} fieldInput={fieldInput} />;
};

export const SingleLineTextInput = (props: TextInputProps) => {
  return <BaseTextInput {...props} />;
};

export const MultilineTextInput = (props: MultilineTextInputProps) => {
  const inputProps = {
    className: classNames("crl-input", props.className, {
      "crl-input--suffix": props.suffix,
      invalid: props.error || props.invalid,
    }),
    name: name,
    ["aria-label"]: props.ariaLabel,
    ["aria-invalid"]: !!props.error || props.invalid,
    ["aria-required"]: props.required,
    type: "text",
    ...props,
  };
  const JSXInput = <textarea {...inputProps} />;
  return (
    <BaseTextInput
      label={props.label}
      name={props.name}
      suffix={props.suffix}
      required={props.required}
      id={props.id}
      meta={props.meta}
      JSXInput={JSXInput}
    />
  );
};

export const NumberInput = (props: NumberProps) => {
  return <BaseTextInput type="number" {...props} />;
};
