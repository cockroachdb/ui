import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";
import get from "lodash/get";

import * as Icons from "@cockroachlabs/icons";
import styles from "./Icon.module.scss";

type IconSize = "large" | "medium" | "default" | "small" | "tiny";
type IconTint =
  | "blue"
  | "green"
  | "purple"
  | "red"
  | "white"
  | "neutral"
  | "inherit";

export interface IconProps {
  iconName: keyof typeof Icons;
  size?: IconSize;
  tint?: IconTint;
}

const cx = classNames.bind(styles);

const Icon: FunctionComponent<IconProps> = ({
  iconName,
  size = "default",
  tint = "neutral",
  ...unhandledProps
}) => {
  const classnames = cx("icon", {
    "size-large": size === "large",
    "size-medium": size === "medium",
    "size-default": size === "default",
    "size-small": size === "small",
    "size-tiny": size === "tiny",

    "tint-blue": tint === "blue",
    "tint-green": tint === "green",
    "tint-purple": tint === "purple",
    "tint-red": tint === "red",
    "tint-white": tint === "white",
    "tint-neutral": tint === "neutral",
    "tint-inherit": tint === "inherit",
  });
  const Element = get(Icons, iconName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classnames} {...unhandledProps} />;
};

export default Icon;
