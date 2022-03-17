import React, { useMemo } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Logos } from "@cockroachlabs/icons";
import objectToClassNames from "../utils/objectToClassnames";
import ucc from "../utils/upperCamelCase";

import styles from "./LogoShorthand.module.scss";

export type LogoShorthandSize =
  | "xxl"
  | "xl"
  | "large"
  | "medium"
  | "small"
  | "tiny";
export type LogoShorthandColor = "black" | "white" | "purple";

type OwnLogoShorthandProps = {
  size?: LogoShorthandSize;
  color?: LogoShorthandColor;
};

type NativeLogoShorthandProps = Omit<
  React.SVGProps<SVGSVGElement>,
  keyof OwnLogoShorthandProps
>;

type LogoShorthandProps = NativeLogoShorthandProps & OwnLogoShorthandProps;

const cx = classnames.bind(styles);

export const LogoShorthand = ({
  size = "large",
  color = "purple",
  className,
  ...props
}: LogoShorthandProps) => {
  const classNames = useMemo(
    () => cx("logo-shorthand", objectToClassNames({ size }), className),
    [className, size],
  );

  // Here we are constructing the name of the Component transformed
  // from the svg in @cockroachlabs/icons. For example the svg
  // "cockroach-shorthand-purple.svg" becomes "CockroachShorthandPurple.tsx"
  // To replicate the change in naming, we are using the utility function
  // "upperCamelCase" (see test cases for usage).
  const logoShorthandName = `CockroachShorthand${ucc(color)}`;

  const Element = get(Logos, logoShorthandName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
