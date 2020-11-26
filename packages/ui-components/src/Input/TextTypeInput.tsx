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
import styles from "./styles.module.scss";
import { CommonInputProps, CommonInput } from "./BaseInput";
import { generateContainerClassnames } from "../utils/objectToClassnames";
import { isEmpty } from "lodash";

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
  // this defines the input type rendered by this field
  // for multiline text types, this will be <textarea>
  // for text/email/password/number types this will be <input> with a type field
  JSXInput?: JSX.Element;
};

// the following props are used to implement {Email, Password, Number}Input
// it is recommended to use those components instead of passing an "email" type to TextInput
interface CustomProps {
  textType?: "email" | "password" | "number";
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
  existingPassword: boolean;
  forgotPasswordLinkDiv?: JSX.Element;
};

export type TextProps = CommonInputProps & TextAndNumberProps<string>;
export type AllProps = CommonInputProps & TextAndNumberProps<string> & CustomProps;
export type NewPasswordProps = Omit<Omit<AllProps, "multiline">, "forgotPasswordLinkDiv">;
export type ExistingPasswordProps = Omit<AllProps, "multiline">;
export type EmailNumberProps = Omit<NewPasswordProps, "existingPassword">;

export const TextTypeInput: React.FC<AllProps> = props => {
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
  textType = "text",
  prefix,
  ariaLabelledBy,
  autoFocus,
  tabIndex,
  existingPassword,
  forgotPasswordLinkDiv,
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
    type: textType,
    autoFocus: autoFocus,
    tabIndex: tabIndex,
    ...rest,
  };

  const input = JSXInput || <input type={textType} {...inputProps} />;

  // if prefix is provided, the 
  const affixContainerClassname = prefix? "crl-input__affix-container" : "crl-input__suffix-container";

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
    <CommonInput fieldInput={fieldInput} classes={classes} {...props} />
  );
};

export const EmailInput: React.FC<EmailNumberProps> = ({
  ...props
}) => {
  return (
    <TextTypeInput type="email" existingPassword={false} {...props}/>
  );
};

export const NewPasswordInput: React.FC<NewPasswordProps> = ({
  ...props
}) => {
  return (
    <TextTypeInput type="password" existingPassword={false} {...props}/>
  );
};

export const ExistingPasswordInput: React.FC<ExistingPasswordProps> = ({
  ...props
}) => {
  return (
    <TextTypeInput type="password" existingPassword={true} {...props}/>
  );
};