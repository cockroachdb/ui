import React, { FunctionComponent, ReactElement } from "react";
import RCtooltip from "rc-tooltip";

import "./Tooltip.scss";

type TooltipPosition =
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

interface BadgeProps {
  position?: TooltipPosition;
  content: ReactElement | string;
}

const Tooltip: FunctionComponent<BadgeProps> = ({
  position = "bottom",
  children,
  content,
  ...props
}) => {
  if (!content) {
    return null;
  }

  return (
    <RCtooltip
      {...props}
      prefixCls={"tooltip"}
      placement={position}
      overlay={content}
    >
      {typeof children === "string" ? (
        <span>{children}</span>
      ) : (
        (children as ReactElement)
      )}
    </RCtooltip>
  );
};

export default Tooltip;
