import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";
import get from "lodash/get";

import * as Icons from "@cockroachlabs/icons";
import styles from "./Icon.module.scss";

import objectToClassnames from "../utils/objectToClassnames";

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
  const classnames = cx("icon", objectToClassnames({ size, tint }));
  const Element = get(Icons, iconName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classnames} {...unhandledProps} />;
};

export default Icon;
