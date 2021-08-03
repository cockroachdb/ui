import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { usePopper } from "react-popper";
import classNames from "classnames/bind";
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
  timeout?: number;
}

export const Tooltip: FunctionComponent<TooltipProps> = ({
  placement = "bottom",
  style = "default",
  children,
  content,
  visible = false,
  timeout = 500,
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
      popperElement.removeAttribute("data-show");
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [popperElement]);

  if (!content) {
    return <>{children}</>;
  }

  const classnames = classNames(css[style], css.Tooltip);
  if (visible && popperElement) {
    popperElement.setAttribute("data-show", "");
  }

  const wrappedChildren = React.Children.map(children, child => {
    return React.cloneElement(
      typeof children === "string" ? <>{child}</> : (child as ReactElement),
    );
  });

  const timers: Array<ReturnType<typeof setTimeout>> = [];
  return (
    <div
      ref={setReferenceElement}
      onMouseOver={() => {
        const t = setTimeout(() => {
          popperElement.setAttribute("data-show", "");
        }, timeout);
        timers.push(t);
      }}
      onMouseLeave={() => {
        timers.forEach((t: ReturnType<typeof setTimeout>) => {
          clearTimeout(t);
          popperElement.removeAttribute("data-show");
        });
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
        onClick={e => {
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
