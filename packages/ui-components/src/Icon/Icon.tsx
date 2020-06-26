import React, { FunctionComponent, useMemo } from "react";
import classNames from "classnames/bind";
import get from "lodash/get";

import * as Icons from "@cockroachlabs/icons";
import styles from "./Icon.module.scss";

import objectToClassnames from "../utils/objectToClassnames";

export type IconSize = "large" | "medium" | "default" | "small" | "tiny";

export type IconTint =
  | "blue"
  | "green"
  | "red"
  | "white"
  | "neutral"
  | "inherit";

type OwnIconProps = {
  iconName: keyof typeof Icons;
  size?: IconSize;
  tint?: IconTint;
};

type NativeIconProps = Omit<React.SVGProps<SVGSVGElement>, keyof OwnIconProps>;

export type IconProps = NativeIconProps & OwnIconProps;

const cx = classNames.bind(styles);

export const Icon: FunctionComponent<IconProps> = ({
  iconName,
  size = "default",
  tint = "neutral",
  className,
  ...props
}) => {
  const classnames = useMemo(
    () => cx("icon", objectToClassnames({ size, tint }), className),
    [className, size, tint],
  );
  const Element = get(Icons, iconName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classnames} {...props} />;
};

export default Icon;
