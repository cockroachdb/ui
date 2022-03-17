import React, { useMemo } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import { Logos } from "@cockroachlabs/icons";
import objectToClassNames from "../utils/objectToClassnames";

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

const cc = (s: string) => upperFirst(camelCase(s));

export const Logo = ({
  size = "default",
  brand = "cockroach-labs",
  color = "full",
  background = "light",
  className,
  ...props
}: LogoProps) => {
  const oTCNames = objectToClassNames({ size, brand });
  const classNames = useMemo(
    () => cx("logo", oTCNames, className),
    [className, oTCNames],
  );

  const logoName = `${cc(brand)}${cc(background)}${cc(color)}`;

  console.log(`brand: ${brand}, logoName: ${logoName}`);

  const Element = get(Logos, logoName, null);

  if (Element === null) {
    console.log("Element is null");
    return null;
  }

  return <Element className={classNames} {...props} />;
};
