import React, { useMemo } from "react";
import classnames from "classnames/bind";

import styles from "./Text.module.scss";
import objectToClassNames from "../utils/objectToClassnames";

interface OwnTextProps {
  type?: TextType;
  noWrap?: boolean;
}

export type TextProps = React.HTMLAttributes<HTMLSpanElement> & OwnTextProps;

export type TextType =
  | "body"
  | "body-strong"
  | "caption"
  | "caption-strong"
  | "code";

const cx = classnames.bind(styles);

export const Text = ({
  type = "body",
  noWrap = false,
  className,
  children,
  ...rest
}: TextProps) => {
  const classNames = useMemo(
    () => cx(objectToClassNames({ type }), { ".no-wrap": noWrap }, className),
    [type, noWrap, className],
  );

  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  );
};
