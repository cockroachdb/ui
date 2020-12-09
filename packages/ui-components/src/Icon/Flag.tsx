import React, { useMemo, SVGProps } from "react";
import classnames from "classnames/bind";
import get from "lodash/get";

import { Flags } from "@cockroachlabs/icons";
import styles from "./card.module.scss";

import objectToClassNames from "../utils/objectToClassnames";

export type FlagSize = "tiny" | "small" | "medium" | "large";

type OwnFlagProps = {
  flagName: keyof typeof Flags;
  size?: FlagSize;
};

type FlagProps = SVGProps<SVGElement> & OwnFlagProps;

const cx = classnames.bind(styles);

export const Flag = ({
  flagName,
  size = "small",
  className,
  ...props
}: FlagProps) => {
  const classNames = useMemo(
    () => cx("card", objectToClassNames({ size }), className),
    [className, size],
  );
  const Element = get(Flags, flagName, null);

  if (Element === null) {
    return null;
  }

  return <Element className={classNames} {...props} />;
};
