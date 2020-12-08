import React, { FunctionComponent, useMemo } from "react";
import classNames from "classnames/bind";
import get from "lodash/get";

import * as Icons from "@cockroachlabs/icons";
import styles from "./Icon.module.scss";

import objectToClassnames from "../utils/objectToClassnames";

export type IconSize =
  | "tiny"
  | "small"
  | "default"
  | "medium"
  | "large"
  | "x-large";

export type IconIntent =
  | "danger"
  | "default"
  | "info"
  | "primary"
  | "success"
  | "warning";

// The fill of an icon can be:
//      intent based (types are defined in IconIntent)
//      inverted (when the icon appears against a dark background)
//      disabled (for when the background is neutral-2)
//      disabled-light (for when the background is neutral-0)
export type IconFill = IconIntent | "inverted" | "disabled" | "disabled-light";

type OwnIconProps = {
  iconName: keyof typeof Icons;
  size?: IconSize;
  fill?: IconFill;
};

const cx = classNames.bind(styles);

type NativeIconProps = Omit<React.SVGProps<SVGSVGElement>, keyof OwnIconProps>;

export type IconProps = NativeIconProps & OwnIconProps;

export const Icon: FunctionComponent<IconProps> = ({
  iconName,
  size = "default",
  fill = "default",
  className,
  ...props
}) => {
  const classnames = useMemo(
    () => cx("icon", objectToClassnames({ size, fill }), className),
    [className, size, fill],
  );

  const Element = get(Icons, iconName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classnames} {...props} />;
};

export default Icon;
