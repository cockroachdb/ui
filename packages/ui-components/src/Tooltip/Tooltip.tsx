import React, { FunctionComponent, ReactElement, useState } from "react";
// import { usePopperTooltip } from "react-popper-tooltip";
import classNames from "classnames/bind";
import css from "./Tooltip.module.scss";
import { createPopper } from "@popperjs/core/lib/createPopper";

export type TooltipPosition =
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end";

export type TooltipStyle = "default" | "light" | "dark";

export interface TooltipProps {
  placement?: TooltipPosition;
  style?: TooltipStyle;
  content: ReactElement | string;
  visible?: boolean;
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  placement = "bottom",
  style = "default",
  children,
  content,
  visible = false,
}) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes }: any = createPopper(
    referenceElement,
    popperElement,
    {
      placement,
      modifiers: [
        { name: "arrow", options: { element: arrowElement } },
        { name: "offset", options: { offset: [0, 10] } },
        {
          name: "computeStyles",
          options: {
            gpuAcceleration: false, // true by default
          },
        },
      ],
    },
  );

  if (!content) {
    return <>{children}</>;
  }

  const classnames = classNames(css[style], css.Tooltip);
  if (visible && popperElement) {
    popperElement.setAttribute("data-show", "");
  }

  const wrappedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(
      typeof children === "string" ? (
        <span>{child}</span>
      ) : (
        (child as ReactElement)
      ),
      {
        ref: setReferenceElement,
        onMouseOver: () => {
          popperElement.setAttribute("data-show", "");
        },
        onMouseOut: () => {
          if (visible) return;
          popperElement.removeAttribute("data-show");
        },
      },
    );
  });

  return (
    <>
      {wrappedChildren}

      <div
        className={classnames}
        ref={setPopperElement}
        style={styles.popper}
        data-jest="tooltip"
        {...attributes.popper}
      >
        {content}
        <div className={css.arrow} ref={setArrowElement} style={styles.arrow} />
        <div className={css.arrowInner} style={styles.arrow} />
      </div>
    </>
  );
};

export default Tooltip;
