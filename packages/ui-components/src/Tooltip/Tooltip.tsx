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

type TooltipStyle = "default" | "light" | "dark";

interface TooltipProps {
  position?: TooltipPosition;
  style?: TooltipStyle;
  content: ReactElement | string;
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  position = "bottom",
  style = "default",
  children,
  content,
  ...props
}) => {
  if (!content) {
    return <>{children}</>;
  }

  return (
    <RCtooltip
      {...props}
      prefixCls={"crl-tooltip"}
      placement={position}
      overlay={content}
      overlayClassName={style}
      arrowContent={<div className="crl-tooltip-arrow-inner" />}
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
