import React, { useMemo } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Logos } from "@cockroachlabs/icons";
import objectToClassNames from "../utils/objectToClassnames";
import ucc from "../utils/upperCamelCase";

import { LogoColor, LogoBackground } from "./Logo";
import styles from "./LogoMark.module.scss";

export type LogoMarkSize = "default" | "medium" | "small";

type OwnLogoMarkProps = {
  size?: LogoMarkSize;
  color?: LogoColor;
  background?: LogoBackground;
};

type NativeLogoMarkProps = Omit<
  React.SVGProps<SVGSVGElement>,
  keyof OwnLogoMarkProps
>;
type LogoMarkProps = NativeLogoMarkProps & OwnLogoMarkProps;

const cx = classnames.bind(styles);

export const LogoMark = ({
  size = "default",
  color = "full",
  background = "light",
  className,
  ...props
}: LogoMarkProps) => {
  const classNames = useMemo(
    () => cx("logo-mark", objectToClassNames({ size }), className),
    [className, size],
  );

  const logoMarkName = `CockroachMark${ucc(background)}${ucc(color)}`;

  const Element = get(Logos, logoMarkName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
