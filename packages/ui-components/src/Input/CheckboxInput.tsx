import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export type CheckboxInputProps = CommonInputProps & CheckboxProps;

export const CheckboxInput: React.FC<CheckboxInputProps> = props => {
  const {
    id,
    classes,
    disabled,
    error,
    invalid,
    label,
    ariaLabel,
    checked,
    onChange,
    onBlur,
    onFocus,
    required,
    ...rest
  } = props;
  const inputProps = {
    id: id,
    className: classNames("crl-input", classes, {
      invalid: error || invalid,
    }),
    name: name,
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    disabled: disabled,
    checked: checked,
    onChange: onChange,
    onBlur: onBlur,
    onFocus,
    ...rest,
  };

  // this is the input field rendered by CommonInput
  const fieldInput = (
    <div className="checkbox-container">
      <input {...inputProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );

  return <CommonInput classes={classes} {...props} fieldInput={fieldInput} />;
};
