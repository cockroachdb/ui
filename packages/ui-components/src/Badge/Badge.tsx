import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";

import objectToClassnames from "../utils/objectToClassnames";

import styles from "./Badge.module.scss";

export type BadgeCase = "none" | "uppercase";
export type BadgeIntent = "neutral" | "success" | "warning" | "danger" | "info";

interface OwnBadgeProps {
  intent?: BadgeIntent;
  transformCase?: BadgeCase;
  debug?: boolean;
}
type NativeDivProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  keyof OwnBadgeProps
>;

export type BadgeProps = NativeDivProps & OwnBadgeProps;

const cx = classNames.bind(styles);

export const Badge: FunctionComponent<BadgeProps> = ({
  intent = "neutral",
  transformCase = "uppercase",
  debug = false,
  children,
  className,
  ...props
}) => {
  const classnames = cx(
    "badge",
    objectToClassnames({ intent, transformCase }),
    className,
  );

  if (children !== undefined) {
    return (
      <div className={classnames} {...props}>
        {debug && (
          <pre>
            intent :: {intent}
            transformCase :: {transformCase}
          </pre>
        )}
        {children}
      </div>
    );
  }

  return null;
};

export default Badge;
