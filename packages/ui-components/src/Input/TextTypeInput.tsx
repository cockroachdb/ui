import React, {
  ChangeEvent,
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
  FunctionComponent,
} from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";
import { generateContainerClassnames } from "../utils/objectToClassnames";
import { isEmpty } from "lodash";
import { FieldMetaState } from "react-final-form";
import "./input.scss";

export interface TextAndNumberProps<T = string | number> {
  initialValue?: T;
  value?: T;
  maxLength?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  suffix?: JSX.Element;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement> | undefined,
  ) => void;
  multiline?: boolean;
  placeholder?: string;
  // prop only used internally for implementation
  type?: "text" | "email" | "password" | "number";
  // this defines the input type rendered by this field
  // for multiline text types, this will be <textarea>
  // for text/email/password/number types this will be <input> with a type field
  JSXInput?: JSX.Element;
};

// the following props are used to implement {Email, Password, Number}Input
// it is recommended to use those components instead of passing an "email" type to TextInput
interface CustomProps {
  prefix?: JSX.Element;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onClick?: (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => void;
  forgotPasswordLinkDiv?: JSX.Element;
  // this prop is only used for internal implementation
  // whether the password exists or not, should be indicated by New/Existing PasswordInput
  existingPassword?: boolean;
  //The actual type below as a parameter is called FieldValue
  // not exported by react-final-form, but by google protobuf
  // which would need to be added as a dependency
  // since this prop comes from the Field component of react-final-form
  // we can be fairly certain that the type won't be unexpected
  meta?: FieldMetaState<any>;
};

export type TextProps = CommonInputProps & TextAndNumberProps<string>;
export type NumberProps = CommonInputProps & TextAndNumberProps<number>;
type InternalTextProps = TextProps & CustomProps;
export type AllProps = Omit<InternalTextProps, "existingPassword">;
type InternalTextOrNumberProps = NumberProps & CustomProps;

export const BaseTextInput: React.FC<InternalTextProps | InternalTextOrNumberProps> = props => {
  const {
    JSXInput,
    id,
  className,
  disabled,
  help,
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
  multiline,
  placeholder,
  required,
  type = "text",
  prefix,
  ariaLabelledBy,
  autoFocus,
  tabIndex,
  existingPassword = false,
  forgotPasswordLinkDiv,
  inline,
  ...rest
} = props;
  // For all class names passed to Input, map them onto crl-input-container
  // (of the form `${className}__container`) so the container can be easily
  // targeted seperately from the input itself
  const classes = generateContainerClassnames(className);

  const inputProps = {
    id: id,
    className: classNames("crl-input", className, {
      "crl-input--prefix": prefix,
      "crl-input--suffix": suffix,
      "crl-input--invalid": error || invalid,
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

  // if prefix is provided, the 
  const affixContainerClassname = prefix || suffix ? "crl-input__affix-container" : "";

  const labelDiv = 
  <>
    {!isEmpty(label) && (
      <label
        aria-label={name}
        className={classNames({
          "crl-input--required": required,
        })}
        htmlFor={id}
      >
        {label}
      </label>
    )}
    </>
  ;

  const labelElement = existingPassword ? 
  <div className="crl-existing-password-input__label">
          {labelDiv}
          {forgotPasswordLinkDiv}
        </div>
        : labelDiv;


  const fieldInput = 
    <>
    {labelElement}
    <div className={affixContainerClassname}>
      {prefix && <span className="crl-input__prefix">{prefix}</span>}
      {input}
      {suffix && <span className="crl-input__suffix">{suffix}</span>}
    </div>
    </>;
  
  return (
    <CommonInput classes={classes} {...props} fieldInput={fieldInput}/>
  );
};

export const TextInput: React.FC<TextProps> = props => {
  return <BaseTextInput {...props} />
};

export const NumberInput: React.FC<NumberProps> = props => {
  return <BaseTextInput {...props} />
};
  