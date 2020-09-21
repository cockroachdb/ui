import React, { ElementType } from "react";
import classnames from "classnames/bind";

import objectToClassnames from "../utils/objectToClassnames";

import styles from "./Button.module.scss";

export type ButtonIntent =
  | "primary"
  | "primary-danger"
  | "secondary"
  | "tertiary";

export type ButtonSize = "standard" | "small";

type ElementProps<Type extends ElementType> = Pick<
  React.ComponentProps<Type>,
  keyof React.ComponentProps<Type>
>;

type CombinedProps<OwnProps, NativeElementProps> = OwnProps &
  Omit<NativeElementProps, keyof OwnProps>;

type OwnButtonProps<Element> = {
  as: Element;
  intent?: ButtonIntent;
  size?: ButtonSize;
};

type ButtonProps<OwnProps, Type extends ElementType> = CombinedProps<
  OwnProps,
  ElementProps<Type>
>;

const cx = classnames.bind(styles);

export function Button<T extends ElementType = "button">({
  as,
  intent = "secondary",
  size = "standard",
  children,
  className,
  ...rest
}: ButtonProps<OwnButtonProps<T>, T>) {
  const Element: ElementType = as;
  const classNames = cx(
    "button",
    objectToClassnames({ intent, size }),
    className,
  );

  if (children !== undefined) {
    return (
      <Element className={classNames} {...rest}>
        {children}
      </Element>
    );
  }

  return null;
}

Button.defaultProps = {
  as: "button",
};

export default Button;
