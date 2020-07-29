import React, { FunctionComponent } from "React";
import classnames from "classnames/bind";

import { fuzzy } from "./util";
import styles from "./FuzzyTime.module.scss";

export interface FuzzyTimeProps {
  timestamp: string | Date;
}

const cx = classnames.bind(styles);

export const FuzzyTime: FunctionComponent<FuzzyTimeProps> = ({ timestamp }) => {
  const timeago = fuzzy(new Date(timestamp));
  const classnames = cx("fuzzy-time");

  return <span className={classnames}>{timeago}</span>;
};

export default FuzzyTime;
