import React, { useMemo } from "react";
import classNames from "classnames/bind";

import styles from "./InlineAlert.module.scss";
import { Icon, IconTint } from "../Icon/Icon";

export type InlineAlertIntent = "info" | "error" | "success" | "warning";

const cx = classNames.bind(styles);

interface InlineAlertBaseProps {
  intent?: InlineAlertIntent;
  className?: string;
}

interface InlineAlertWithTitleProps {
  title: React.ReactNode;
  description?: React.ReactNode;
}

interface InlineAlertWithDescriptionProps {
  title?: React.ReactNode;
  description: React.ReactNode;
}

export type InlineAlertProps = InlineAlertBaseProps &
  (InlineAlertWithTitleProps | InlineAlertWithDescriptionProps);

export const InlineAlert: React.FC<InlineAlertProps> = ({
  title,
  description,
  intent = "info",
  className,
}) => {
  const iconName = useMemo(() => {
    switch (intent) {
      case "error":
        return "ErrorCircleFilled";
      case "success":
        return "CheckCircleFilled";
      case "warning":
        return "Caution";
      case "info":
      default:
        return "InfoCircleFilled";
    }
  }, [intent]);

  const iconTint = useMemo<IconTint>(() => {
    switch (intent) {
      case "error":
        return "red";
      case "success":
        return "green";
      case "warning":
        return "orange";
      case "info":
      default:
        return "blue";
    }
  }, [intent]);

  return (
    <div className={cx("root", `intent-${intent}`, className)}>
      <div className={cx("icon-container")}>
        <Icon iconName={iconName} size="default" tint={iconTint} />
      </div>
      <div className={cx("container")}>
        {title && <div className={cx("title")}>{title}</div>}
        {description && <div className={cx("description")}>{description}</div>}
      </div>
    </div>
  );
};
