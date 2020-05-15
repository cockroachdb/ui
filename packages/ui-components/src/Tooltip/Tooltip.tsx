import React, { FunctionComponent, ReactElement, useState } from "react";
import { usePopper } from "react-popper";
import classNames from "classnames/bind";
import css from "./Tooltip.module.scss";

type TooltipPosition =
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

type TooltipStyle = "default" | "light" | "dark";

interface TooltipProps {
  placement?: TooltipPosition;
  style?: TooltipStyle;
  content: ReactElement | string;
  visible?: boolean;
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  placement = "bottom",
  style = "default",
  children,
  content,
  visible = false,
  ...props
}) => {
  if (!content) {
    return <>{children}</>;
  }

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes, forceUpdate } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
      {
        name: 'computeStyles',
        options: {
          gpuAcceleration: false, // true by default
        },
      },
    ],
  });

  const classnames = classNames(css[style], css.Tooltip);
  if (visible && popperElement) {
    popperElement.setAttribute("data-show", "");
  }

  const wrappedChildren = React.Children.map(children, child => {
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
          setTimeout(() => {
            forceUpdate()
          }, 100);
        },
        onMouseOut: () => {
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
        {...attributes.popper}
      >
        {content}
        <div className={css.arrow} ref={setArrowElement} style={styles.arrow} />
      </div>
    </>
  );

  //return (
  // <RCtooltip
  //   {...props}
  //   prefixCls={"crl-tooltip"}
  //   placement={position}
  //   overlay={content}
  //   overlayClassName={style}
  //   arrowContent={<div className="crl-tooltip-arrow-inner" />}
  // >
  //   {typeof children === "string" ? (
  //     <span>{children}</span>
  //   ) : (
  //     (children as ReactElement)
  //   )}
  // </RCtooltip>
  //);
};

export default Tooltip;
