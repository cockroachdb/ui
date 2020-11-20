import React, { ElementType } from "react";
import classnames from "classnames/bind";

import objectToClassnames from "../utils/objectToClassnames";

import styles from "./Button.module.scss";

export type ButtonIntent =
  | "primary"
  | "success"
  | "danger"
  | "secondary"
  | "tertiary";

export type ButtonSize = "standard" | "small";

// OwnButtonProps contains all the props that the Button component holds
type OwnButtonProps<T extends ElementType> = {
  // `as` holds the name of the underlying Element that we'd like the Button to render as
  as: T;
  intent?: ButtonIntent;
  size?: ButtonSize;
  fluid?: boolean;
};

// ButtonProps is how we express the final type of Button by taking the union of `OwnButtonProps`
// and all the props in T which is provided by the `as` prop in `OwnButtonProps` and is constrained
// to be an Element. However, we also use `Omit` to remove any props that the element itself has if
// we override them in `OwnButtonProps`. This lets us proxy an props that we'd like to manage
// ourselves while keeping all the rest pure from the underlying element.
type ButtonProps<T extends ElementType> = OwnButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof OwnButtonProps<T>>;

const cx = classnames.bind(styles);

export function Button<T extends ElementType = "button">({
  as,
  intent = "secondary",
  size = "standard",
  fluid,
  children,
  className,
  ...rest
}: ButtonProps<T>) {
  const Element: ElementType = as;
  const classNames = cx(
    "button",
    objectToClassnames({ intent, size }),
    { fluid },
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
