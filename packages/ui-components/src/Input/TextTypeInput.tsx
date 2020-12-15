import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";
import { isEmpty } from "lodash";
import { FieldMetaState } from "react-final-form";
import "./input.module.scss";

export interface TextAndNumberProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: JSX.Element;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
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
  prefixElement?: JSX.Element;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  forgotPasswordLinkElement?: JSX.Element;
  // this prop is only used for internal implementation
  // whether the password exists or not, should be indicated by New/Existing PasswordInput
  existingPassword?: boolean;
  //The actual type below as a parameter is called FieldValue
  // not exported by react-final-form, but by google protobuf
  // which would need to be added as a dependency
  // since this prop comes from the Field component of react-final-form
  // we can be fairly certain that the type won't be unexpected
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: FieldMetaState<any>;
}

export type TextInputProps = CommonInputProps & TextAndNumberProps;
export type MultilineTextInputProps = CommonInputProps & MultilineProps;
export type NumberProps = TextInputProps & CustomProps;

type InternalTextProps = TextInputProps & CustomProps;

export type AllProps = Omit<InternalTextProps, "existingPassword">;

export const BaseTextInput: React.FC<InternalTextProps> = props => {
  const {
    JSXInput,
    id,
    classes,
    disabled,
    error,
    invalid,
    label,
    ariaLabel,
    value,
    maxLength,
    onChange,
    suffix,
    onBlur,
    onFocus,
    placeholder,
    required,
    type = "text",
    prefixElement,
    ariaLabelledBy,
    autoFocus,
    tabIndex,
    existingPassword = false,
    forgotPasswordLinkElement,
    ...rest
  } = props;

  const inputProps = {
    id: id,
    className: classNames("crl-input", classes, {
      "crl-input--prefix": prefixElement,
      "crl-input--suffix": suffix,
      invalid: error || invalid,
    }),
    name: name,
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    ["aria-labelledby"]: ariaLabelledBy,
    maxLength: maxLength,
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    onChange: onChange,
    onBlur: onBlur,
    onFocus,
    type: type,
    autoFocus: autoFocus,
    tabIndex: tabIndex,
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

  return <CommonInput classes={classes} {...props} fieldInput={fieldInput} />;
};

export const SingleLineTextInput: React.FC<TextInputProps> = props => {
  return <BaseTextInput {...props} />;
};

export const MultilineTextInput: React.FC<MultilineTextInputProps> = props => {
  const inputProps = {
    id: props.id,
    className: classNames("crl-input", props.classes, {
      "crl-input--suffix": props.suffix,
      invalid: props.error || props.invalid,
    }),
    name: name,
    ["aria-label"]: props.ariaLabel,
    ["aria-invalid"]: !!props.error || props.invalid,
    ["aria-required"]: props.required,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    value: props.value,
    disabled: props.disabled,
    onChange: props.onChange,
    onBlur: props.onBlur,
    onFocus: props.onFocus,
    type: "text",
    autoFocus: props.autoFocus,
    tabIndex: props.tabIndex,
  };
  const JSXInput = <textarea {...inputProps} />;
  return (
    <BaseTextInput
      label={props.label}
      name={props.name}
      suffix={props.suffix}
      required={props.required}
      id={props.id}
      JSXInput={JSXInput}
    />
  );
};

export const NumberInput: React.FC<NumberProps> = props => {
  return <BaseTextInput type="number" {...props} />;
};
