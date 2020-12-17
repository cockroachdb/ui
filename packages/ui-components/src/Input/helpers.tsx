import React from "react";
import classNames from "classnames/bind";
import styles from "./styles.module.scss";
import { CommonInputProps } from "./CommonInput";

const cx = classNames.bind(styles);

export type InputWrapperProps = Pick<CommonInputProps, "invalid" | "className">;

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
  className,
  invalid,
}) => {
  const wrapperClassName = cx(
    "container",
    {
      active: !invalid,
      invalid: invalid,
    },
    className,
  );
  return <div className={wrapperClassName}>{children}</div>;
};
