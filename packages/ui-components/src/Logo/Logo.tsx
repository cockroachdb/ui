import React, { useMemo } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Logos } from "@cockroachlabs/icons";
import objectToClassNames from "../utils/objectToClassnames";
import ucc from "../utils/upperCamelCase";

import styles from "./Logo.module.scss";

export type LogoSize = "default" | "small";
export type LogoBrand =
  | "cockroach-labs"
  | "cockroachcloud"
  | "cockroachdb"
  | "cockroach-mark";
export type LogoColor = "full" | "reduced" | "mono";
export type LogoBackground = "dark" | "light";

type OwnLogoProps = {
  size?: LogoSize;
  brand?: LogoBrand;
  color?: LogoColor;
  background?: LogoBackground;
};

type NativeLogoProps = Omit<React.SVGProps<SVGSVGElement>, keyof OwnLogoProps>;
type LogoProps = NativeLogoProps & OwnLogoProps;

const cx = classnames.bind(styles);

export const Logo = ({
  size = "default",
  brand = "cockroach-labs",
  color = "full",
  background = "light",
  className,
  ...props
}: LogoProps) => {
  const classNames = useMemo(
    () => cx("logo", objectToClassNames({ size, brand }), className),
    [className, size, brand],
  );

  const logoName = `${ucc(brand)}${ucc(background)}${ucc(color)}`;

  const Element = get(Logos, logoName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
