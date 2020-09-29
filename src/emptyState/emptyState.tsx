import React from "react";
import classNames from "classnames/bind";
import styles from "./emptyState.module.scss";
import { Text, TextTypes } from "src";

export interface EmptyStateProps {
  icon?: string;
  title?: React.ReactNode;
  message?: React.ReactNode;
  footer?: React.ReactNode;
}

const cx = classNames.bind(styles);

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "No data loaded",
  message,
  footer,
}: EmptyStateProps) => (
  <div className={cx("root")}>
    {icon && (
      <div className={cx("icon-container")}>
        <img src={icon} className={cx("icon")} />
      </div>
    )}
    <Text textType={TextTypes.Heading3} className={cx("title")}>
      {title}
    </Text>
    {message && (
      <Text textType={TextTypes.Body} className={cx("message")}>
        {message}
      </Text>
    )}
    {footer && <div className={cx("footer")}>{footer}</div>}
  </div>
);
