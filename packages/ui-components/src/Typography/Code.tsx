import React, { useMemo } from "react";
import classnames from "classnames/bind";

import styles from "./Code.module.scss";
import objectToClassNames from "../utils/objectToClassnames";

interface OwnCodeProps {
  weight?: CodeWeight;
}

export type CodeProps = React.HTMLAttributes<HTMLElement> & OwnCodeProps;

export type CodeWeight = "regular" | "medium" | "bold";

const cx = classnames.bind(styles);

export const Code = ({
  weight = "regular",
  className = "",
  children,
  ...rest
}: CodeProps) => {
  const classNames = useMemo(
    () => cx("code", objectToClassNames({ weight }), className),
    [className, weight],
  );

  return (
    <code className={classNames} {...rest}>
      {children}
    </code>
  );
};
