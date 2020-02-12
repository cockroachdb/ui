import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";

import styles from "./Sample.module.scss";

interface SampleProps {
  content: string;
  tint?: "default" | "red" | "green" | "blue";
}

const cx = classNames.bind(styles);

const Sample: FunctionComponent<SampleProps> = ({
  content,
  tint = "default",
  children,
}) => {
  const classnames = cx("sample", tint);

  if (children !== undefined) {
    return <div className={classnames}>{children}</div>;
  }

  return <div className={classnames}>{content}</div>;
};

export default Sample;
