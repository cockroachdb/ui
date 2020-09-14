import React from "react";
import AntPagination from "antd/lib/pagination";
import { Icon } from "antd";
import styles from "../statementsTable/statementsTable.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export interface PaginationSettings {
  pageSize?: number;
  current: number;
  total?: number;
}

interface PaginationProps {
  pageSize: number;
  current: number;
  total: number;
  onChange: (current: number) => void;
}

const customIcons = (
  _page: number,
  type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
  originalElement: React.ReactNode,
) => {
  switch (type) {
    case "jump-prev":
      return (
        <div className={cx("_pg-jump")}>
          <Icon type="left" />
          <span className={cx("_jump-dots")}>•••</span>
        </div>
      );
    case "jump-next":
      return (
        <div className={cx("_pg-jump")}>
          <span className={cx("_jump-dots")}>•••</span>
          <Icon type="right" />
        </div>
      );
    default:
      return originalElement;
  }
};

export const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  current,
  total,
  onChange,
}) => (
  <AntPagination
    size="small"
    itemRender={customIcons}
    pageSize={pageSize}
    current={current}
    total={total}
    onChange={onChange}
    hideOnSinglePage
  />
);

const getPageStart = (pageSize: number, current: number) => pageSize * current;

export const paginationPageCount = (
  pagination: PaginationSettings,
  pageName: string,
  selectedApp = "",
  search?: string,
) => {
  const { pageSize, current, total } = pagination;
  const start = Math.max(
    getPageStart(pageSize, current > 0 ? current - 1 : current),
    0,
  );
  const recountedStart = total > 0 ? start + 1 : start;
  const end = Math.min(getPageStart(pageSize, current), total);
  const label =
    (search && search.length > 0) || selectedApp.length > 0
      ? "results"
      : pageName;
  if (end === 0) {
    return `0 ${label}`;
  }
  return `${recountedStart}-${end} of ${total} ${label}`;
};
