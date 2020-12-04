import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";
import { generateContainerClassnames } from "../utils/objectToClassnames";

interface CheckboxProps {
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export type CheckboxInputProps = CommonInputProps & CheckboxProps;


export const CheckboxInput: React.FC<CheckboxInputProps> = props => {
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
  value,
  onChange,
  onBlur,
  onFocus,
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
      "crl-input--invalid": error || invalid,
    }),
    name: name,
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    disabled: disabled,
    onChange: onChange,
    onBlur: onBlur,
    onFocus,
    ...rest,
  };

const fieldInput = 
  <div className="crl-input__checkbox-input">
    <input checked={!!value} {...inputProps} />
    <label htmlFor={id}>{label}</label>
  </div>;
  
  return (
    <CommonInput classes={classes} {...props} fieldInput={fieldInput} />
  );
};
