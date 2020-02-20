import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";

import objectToClassnames from "../utils/objectToClassnames";

import styles from "./Badge.module.scss";

type BadgeCase = "none" | "uppercase";
type BadgeIntent = "neutral" | "success" | "warning" | "danger";

interface BadgeProps {
  intent?: BadgeIntent;
  transformCase?: BadgeCase;
}

const cx = classNames.bind(styles);

const Badge: FunctionComponent<BadgeProps> = ({
  intent = "neutral",
  transformCase = "uppercase",
  children,
  ...props
}) => {
  const classnames = cx("badge", objectToClassnames({ intent, transformCase }));

  if (children !== undefined) {
    return (
      <div className={classnames} {...props}>
        {children}
      </div>
    );
  }

  return null;
};

export default Badge;
