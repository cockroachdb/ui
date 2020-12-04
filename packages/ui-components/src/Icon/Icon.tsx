import React, { FunctionComponent, useMemo } from "react";
import classNames from "classnames/bind";
import get from "lodash/get";

import * as Icons from "@cockroachlabs/icons";
import styles from "./Icon.module.scss";

import objectToClassnames from "../utils/objectToClassnames";

export type IconSize =
  | "small"
  | "default"
  | "medium"
  | "large"
  | "x-large"
  | "xx-large";

export type IconStyle =
  | "danger"
  | "default"
  | "flag"
  | "info"
  | "primary"
  | "success"
  | "warning";

type OwnIconProps = {
  iconName: keyof typeof Icons;
  size?: IconSize;
  intent?: IconStyle;
};

const cx = classNames.bind(styles);

type NativeIconProps = Omit<React.SVGProps<SVGSVGElement>, keyof OwnIconProps>;

export type IconProps = NativeIconProps & OwnIconProps;

export const Icon: FunctionComponent<IconProps> = ({
  iconName,
  size = "default",
  intent = "default",
  className,
  ...props
}) => {


  const classnames = useMemo(
    () => cx("icon", objectToClassnames({ size, intent }), className),
    [className, size, intent],
  );

  const Element = get(Icons, iconName, null);

  if (Element === null) {
    return null;
  }

  return (
  <div className="icon__container">
    <Element {...props} className={classnames} />
  </div>);
};

export default Icon;
