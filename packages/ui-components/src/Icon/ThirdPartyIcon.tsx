import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";

import { ThirdParty } from "@cockroachlabs/icons";
import styles from "./ThirdPartyIcon.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type ThirdPartySize = "tiny" | "small" | "medium" | "large" | "x-large";

type OwnThirdPartyIconProps = {
  iconName: keyof typeof ThirdParty;
  size?: ThirdPartySize;
};

export type ThirdPartyIconProps = SVGProps<SVGSVGElement> &
  OwnThirdPartyIconProps;

const cx = classnames.bind(styles);

export const ThirdPartyIcon = ({
  iconName,
  size = "large",
  className,
  ...props
}: ThirdPartyIconProps) => {
  const classNames = useMemo(
    () => cx("icon", objectToClassNames({ size }), className),
    [className, size],
  );
  const Element = ThirdParty[iconName];

  if (Element == null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
