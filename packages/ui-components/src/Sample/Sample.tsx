import React, { FunctionComponent } from "react";
import classNames from "classnames/bind";
import isUndefined from "lodash/isUndefined";

import styles from "./Sample.module.scss";

interface SampleProps {
  content: string;
  tint?: "default" | "red" | "green" | "blue";
}

const cx = classNames.bind(styles);

const Sample: FunctionComponent<SampleProps> = props => {
  const { content, tint, children } = props;
  const classnames = cx("sample", tint);

  if (!isUndefined(children)) {
    return <div className={classnames}>{children}</div>;
  }

  return <div className={classnames}>{content}</div>;
};

Sample.defaultProps = {
  tint: "default",
};

export default Sample;
