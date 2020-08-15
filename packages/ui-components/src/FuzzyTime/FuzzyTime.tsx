import React, { FunctionComponent } from "react";
import classnames from "classnames/bind";

import { fuzzy } from "./util";
import styles from "./FuzzyTime.module.scss";

export interface FuzzyTimeProps {
  timestamp: Date;
}

const cx = classnames.bind(styles);

export const FuzzyTime: FunctionComponent<FuzzyTimeProps> = ({ timestamp }) => {
  const timeago = fuzzy(timestamp);
  const classnames = cx("fuzzy-time");

  return <span className={classnames}>{timeago}</span>;
};

export * from "./util";
export default FuzzyTime;
