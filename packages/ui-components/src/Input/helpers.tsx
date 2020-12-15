import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { CommonInputProps } from "./CommonInput";

const cx = classNames.bind(styles);

export type InputWrapperProps = Pick<
  CommonInputProps,
  "disabled" | "invalid" | "classes"
>;

export interface InputPrefixProps {
  className?: string;
}

export const InputPrefix: React.FC<InputPrefixProps> = ({
  children,
  className,
}) => {
  if (!children) {
    return null;
  }
  const classes = cx("prefix", className);
  return <div className={classes}>{children}</div>;
};

export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  classes,
  invalid,
  disabled,
}) => {
  const wrapperClassName = cx(
    "container",
    {
      active: !invalid && !disabled,
      disabled: disabled,
      invalid: invalid,
    },
    classes,
  );
  return <div className={wrapperClassName}>{children}</div>;
};
