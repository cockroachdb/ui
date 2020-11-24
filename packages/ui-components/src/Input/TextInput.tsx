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

type inputType = "text" | "number" | "checkbox";

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
  prefixIcon?: React.ReactNode;
};

export type TextInputProps = CommonInputProps & TextAndNumberProps<string>;

export const TextInput: React.FC<TextInputProps> = props => {
  const {
    id,
  className,
  disabled,
  help,
  error,
  inline,
  invalid,
  label,
  ariaLabel,
  initialValue,
  value,
  maxLength,
  onChange,
  suffix,
  onBlur,
  onFocus,
  multiline,
  placeholder,
  prefixIcon,
  required,
  ...rest
} = props;
  // For all class names passed to Input, map them onto crl-input-container
  // (of the form `${className}__container`) so the container can be easily
  // targeted seperately from the input itself
  const classes = generateContainerClassnames(className);

  const inputProps = {
    id: id,
    className: classNames("crl-input", className, {
      "crl-input--suffix": suffix,
      "crl-input--invalid": error || invalid,
    }),
    name: name,
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    maxLength: maxLength,
    placeholder: placeholder,
    value: value,
    disabled: disabled,
    onChange: onChange,
    onBlur: onBlur,
    onFocus,
    ...rest,
  };

  const input = multiline ? (
    <textarea {...inputProps} />
  ) : (
    <input type="text" {...inputProps} />
  );

  const fieldInput = 
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
    <div className="crl-input__suffix-container">
      {input}
      {suffix && <span className="crl-input__suffix">{suffix}</span>}
    </div>
    </>;
  
  return (
    <CommonInput fieldInput={fieldInput} classes={classes} {...props} />
  );
};
