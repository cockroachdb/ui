import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";

import styles from "./Badge.module.scss";

type BadgeCase = "none" | "uppercase";
type BadgeIntent = "neutral" | "success" | "warning" | "danger";

export interface BadgeProps {
  content?: string;
  intent?: BadgeIntent;
  transformCase?: BadgeCase;
}

const cx = classNames.bind(styles);

const Badge: FunctionComponent<BadgeProps> = ({
  content,
  intent = "neutral",
  transformCase = "uppercase",
  children,
  ...props
}) => {
  const classnames = cx("badge", {
    "intent--success": intent === "success",
    "intent--danger": intent === "danger",
    "intent--warning": intent === "warning",
    "intent--neutral": intent === "neutral",
    "transformCase--uppercase": transformCase === "uppercase",
    "transformCase--none": transformCase === "none",
  });

  if (children !== undefined) {
    return (
      <div className={classnames} {...props}>
        {children}
      </div>
    );
  }

  if (content !== undefined) {
    return (
      <div className={classnames} {...props}>
        {content}
      </div>
    );
  }

  return null;
};

export default Badge;
