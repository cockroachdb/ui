import React from "react";
import classNames from "classnames/bind";
import { CommonInputProps, CommonInput } from "./CommonInput";

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
    error,
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
  const inputProps = {
    id: id,
    className: classNames("crl-input", className, {
      invalid: error || invalid,
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

  const fieldInput = (
    <div className="checkbox-container">
      <input checked={!!value} {...inputProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );

  return <CommonInput classes={className} {...props} fieldInput={fieldInput} />;
};
