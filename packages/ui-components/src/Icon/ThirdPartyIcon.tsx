import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { ThirdParty } from "@cockroachlabs/icons";
import styles from "./ThirdPartyIcon.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type ThirdPartySize = "tiny" | "small" | "medium" | "large" | "x-large";

type OwnThirdPartyIconProps = {
  iconName: string;
  size?: ThirdPartySize;
};

type ThirdPartyIconProps = SVGProps<SVGElement> & OwnThirdPartyIconProps;

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
  const Element = get(ThirdParty, iconName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
