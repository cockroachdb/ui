import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { usePopper } from "react-popper";
import classNames from "classnames";
import css from "./Tooltip.module.scss";

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

export type TooltipStyle = "default" | "light" | "dark" | "tableTitle";

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

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, -25] } },
      {
        name: "computeStyles",
        options: {
          gpuAcceleration: false, // true by default
        },
      },
    ],
  });

  useEffect(() => {
    const onScroll = () => {
      popperElement?.removeAttribute("data-show");
    };
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll);
  }, [popperElement]);

  if (!content) {
    return <>{children}</>;
  }

  const classnames = classNames(css[style], css.Tooltip);
  if (visible && popperElement) {
    popperElement.setAttribute("data-show", "");
  }

  const wrappedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(
      typeof children === "string" ? <>{child}</> : (child as ReactElement),
    );
  });

  return (
    <div
      ref={setReferenceElement}
      onMouseOver={() => {
        popperElement.setAttribute("data-show", "");
      }}
      onMouseLeave={() => {
        popperElement.removeAttribute("data-show");
      }}
    >
      {wrappedChildren}

      <div
        className={classnames}
        ref={setPopperElement}
        style={styles.popper}
        data-jest="tooltip"
        onMouseLeave={() => {
          if (visible) return;
          popperElement.removeAttribute("data-show");
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        {...attributes.popper}
      >
        <div className={css.content}>
          <div
            className={css.arrow}
            ref={setArrowElement}
            style={styles.arrow}
          />
          <div className={css.arrowInner} style={styles.arrow} />
          <div className={css.text}>{content}</div>
        </div>
      </div>
    </div>
  );
};
