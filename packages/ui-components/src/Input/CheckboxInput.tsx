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
import { generateContainerClassnames } from "../utils/objectToClassnames";
import { CommonInputProps, CommonInput } from "./BaseInput";

interface CheckboxProps {
  value?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement> | undefined) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export type CheckboxInputProps = CommonInputProps & CheckboxProps;

const cx = classNames.bind(styles);

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

const fieldInput = 
  <div className="crl-input__checkbox-input">
    <input type="checkbox" checked={!!value} {...inputProps} />
    <label htmlFor={id}>{label}</label>
  </div>;
  
  return (
    <CommonInput fieldInput={fieldInput} classes={classes} {...props} />
  );
};
