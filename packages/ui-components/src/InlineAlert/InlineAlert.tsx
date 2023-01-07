import React, { useMemo } from "react";
import classNames from "classnames/bind";

import styles from "./InlineAlert.module.scss";
import { Icon, IconFill } from "../Icon/Icon";
import { Text } from "../Typography";

const cx = classNames.bind(styles);

export type InlineAlertIntent = "danger" | "info" | "success" | "warning";

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
      case "danger":
        return "ErrorCircleFilled";
      case "success":
        return "CheckCircleFilled";
      case "warning":
        return "Caution";
      case "info":
        return "InfoCircleFilled";
    }
  }, [intent]);

  return (
    <div className={cx("root", `intent-${intent}`, className)}>
      <div className={cx("icon-container")}>
        <Icon
          iconName={iconName}
          size="default"
          fill={String(intent) as IconFill}
        />
      </div>
      <div className={cx("container")}>
        {title && (
          <Text type="body-strong" className={cx("title")}>
            {title}
          </Text>
        )}
        {description && (
          <Text type="body" className={cx("description")}>
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};
