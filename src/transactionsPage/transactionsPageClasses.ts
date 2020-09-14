import classNames from "classnames/bind";
import statementsPageStyles from "../statementsPage/statementsPage.module.scss";
import sortedTableStyles from "../sortabletable/sortabletable.module.scss";

const pageCx = classNames.bind(statementsPageStyles);
const sortedTableCx = classNames.bind(sortedTableStyles);

export const baseHeadingClasses = {
  wrapper: pageCx("section"),
  tableName: pageCx("base-heading"),
};

export const statisticsClasses = {
  statistic: pageCx("cl-table-statistic"),
  countTitle: pageCx("cl-count-title"),
  lastCleared: pageCx("last-cleared-title"),
  tableContainerClass: sortedTableCx("cl-table-container"),
};
