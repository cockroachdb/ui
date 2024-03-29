import React from "react";
import classNames from "classnames";
import { CommonInputProps, CommonInput } from "./CommonInput";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export type CheckboxInputProps = CommonInputProps & CheckboxProps;

export const CheckboxInput = ({
  id,
  className,
  error,
  invalid,
  label,
  ariaLabel,
  required,
  ...rest
}: CheckboxInputProps) => {
  const inputProps = {
    id: id,
    className: classNames("crl-input", className, {
      invalid: error || invalid,
    }),
    ["aria-label"]: ariaLabel,
    ["aria-invalid"]: !!error || invalid,
    ["aria-required"]: required,
    ...rest,
  };

  // this is the input field rendered by CommonInput
  const fieldInput = (
    <div className="checkbox-container">
      <input {...inputProps} />
      <label htmlFor={id}>{label}</label>
    </div>
  );

  return (
    <CommonInput
      className={className}
      error={error}
      invalid={invalid}
      label={label}
      ariaLabel={ariaLabel}
      {...rest}
      fieldInput={fieldInput}
    />
  );
};
