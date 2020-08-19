import React, { FunctionComponent, HTMLAttributes } from "react";
import classnames from "classnames/bind";

import { fuzzy } from "./util";
import styles from "./FuzzyTime.module.scss";

type OwnFuzzyProps = {
  timestamp: Date;
};

export type FuzzyTimeProps = OwnFuzzyProps &
  React.HTMLAttributes<HTMLSpanElement>;

const cx = classnames.bind(styles);

export const FuzzyTime: FunctionComponent<FuzzyTimeProps> = ({
  timestamp,
  ...rest
}) => {
  const timeago = fuzzy(timestamp);
  const classnames = cx("fuzzy-time");

  return (
    <span className={classnames} {...rest}>
      {timeago}
    </span>
  );
};

export * from "./util";
export default FuzzyTime;
