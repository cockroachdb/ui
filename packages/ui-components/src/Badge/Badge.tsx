import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";

import styles from "./Badge.module.scss";

interface BadgeProps {
  content: string;
  intent?: "default" | "success" | "warning" | "danger";
  noTransform?: boolean;
}

const cx = classNames.bind(styles);

const Badge: FunctionComponent<BadgeProps> = props => {
  const { content, intent, noTransform } = props;

  return (
    <div
      className={cx("badge", intent, {
        noTransform,
      })}
    >
      {content}
    </div>
  );
};

Badge.defaultProps = {
  intent: "default",
  noTransform: false,
};

export default Badge;
