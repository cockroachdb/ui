import React, { FunctionComponent, ButtonHTMLAttributes } from "react";
import classnames from "classnames/bind";

import objectToClassnames from "../utils/objectToClassnames";

import styles from "./Button.module.scss";

export type ButtonIntent =
  | "primary-success"
  | "primary-danger"
  | "secondary";
export type ButtonSize = "standard" | "small";

type OwnButtonProps = {
  intent?: ButtonIntent;
  size?: ButtonSize;
  onClick?: () => void;
};

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof OwnButtonProps
>;

export type ButtonProps = OwnButtonProps & NativeButtonProps;

const cx = classnames.bind(styles);

export const Button: FunctionComponent<ButtonProps> = ({
  intent = "secondary",
  type = "button",
  size = "standard",
  children,
  ...props
}) => {
  const classNames = cx("button", objectToClassnames({ intent, size }));

  if (children !== undefined) {
    return (
      <button className={classNames} type={type} {...props}>
        {children}
      </button>
    );
  }

  return null;
};

export default Button;
