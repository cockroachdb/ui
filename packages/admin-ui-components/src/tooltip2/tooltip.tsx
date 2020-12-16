import * as React from "react";
import {
  default as AntTooltip,
  TooltipProps as AntTooltipProps,
} from "antd/lib/tooltip";
import classNames from "classnames/bind";
import styles from "./tooltip.module.scss";

export interface TooltipProps {
  children: React.ReactNode;
  theme?: "default" | "blue";
}

const cx = classNames.bind(styles);

export const Tooltip = (props: TooltipProps & AntTooltipProps) => {
  const { children, theme, overlayClassName } = props;
  const classes = cx(
    "tooltip-overlay",
    `crl-tooltip--theme-${theme}`,
    overlayClassName,
  );
  return (
    <AntTooltip {...props} mouseEnterDelay={0.5} overlayClassName={classes}>
      {children}
    </AntTooltip>
  );
};

Tooltip.defaultProps = {
  theme: "default",
  placement: "top",
};
