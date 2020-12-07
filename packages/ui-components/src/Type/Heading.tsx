import React, { useMemo } from "react";
import classnames from "classnames/bind";

import styles from "./Heading.module.scss";
import objectToClassNames from "../utils/objectToClassnames";

interface OwnHeadingProps {
  type: HeadingType;
}

export type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  OwnHeadingProps;

export type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const cx = classnames.bind(styles);

export const Heading = ({
  type,
  className,
  children,
  ...props
}: HeadingProps) => {
  const classNames = useMemo(
    () => cx(objectToClassNames({ type }), className),
    [className, type],
  );

  return React.createElement(
    type,
    { className: classNames, ...props },
    children,
  );
};
