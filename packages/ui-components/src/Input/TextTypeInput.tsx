import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";
import { isEmpty } from "lodash";
import "./input.module.scss";

export interface TextAndNumberProps {
  suffix?: JSX.Element;
  prefixElement?: JSX.Element;
  // for multiline text types, this will be <textarea>
  // for text/email/password/number types this will be <input> with a type field
  JSXInput?: JSX.Element;
  forgotPasswordLinkElement?: boolean;
}

export type TextInputProps = CommonInputProps & TextAndNumberProps;
export type MultilineTextInputProps = CommonInputProps &
  Partial<
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >
  >;

export const BaseTextInput = (props: TextInputProps) => {
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
    forgotPasswordLinkElement,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    inline,
    ...rest
  } = props;

  const inputProps = {
    id: id,
    className: classNames("crl-input", className, {
      invalid: error || invalid,
    }),
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    ["aria-labelledby"]: ariaLabelledBy,
    type: type,
    ...rest,
  };

  const input = JSXInput || <input {...inputProps} />;

  const labelDiv = !isEmpty(label) && (
    <label
      aria-label={name}
      className={classNames({
        required: required,
      })}
      htmlFor={id}
    >
      {label}
    </label>
  );

  const fieldInput = (
    <>
      <div className="existing-password-label">
        {labelDiv}
        {forgotPasswordLinkElement}
      </div>
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
      invalid: props.error,
    }),
    ["aria-label"]: props.ariaLabel,
    ["aria-invalid"]: !!props.error,
    ["aria-required"]: props.required,
    ...props,
  };
  const JSXInput = <textarea {...inputProps} />;
  return <BaseTextInput {...props} JSXInput={JSXInput} />;
};

export const NumberInput = (props: TextInputProps) => {
  return <BaseTextInput type="number" {...props} />;
};
