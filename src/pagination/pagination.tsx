import * as React from "react";
import AntPagination from "antd/lib/pagination";
import Icon from "antd/lib/icon";

export interface PaginationSettings {
  pageSize?: number;
  current: number;
  total?: number;
}
export interface PaginationProps {
  pagination: PaginationSettings;
  onChange: (current: number) => void;
  hideOnSinglePage?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  pagination = { pageSize: 20, total: 0, current: undefined },
  hideOnSinglePage,
  onChange,
}) => {
  const renderPage = (
    _page: number,
    type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
    originalElement: React.ReactNode,
  ) => {
    switch (type) {
      case "jump-prev":
        return (
          <div className="_pg-jump">
            <Icon type="left" />
            <span className="_jump-dots">•••</span>
          </div>
        );
      case "jump-next":
        return (
          <div className="_pg-jump">
            <Icon type="right" />
            <span className="_jump-dots">•••</span>
          </div>
        );
      default:
        return originalElement;
    }
  };
  return (
    <AntPagination
      size="small"
      itemRender={
        renderPage as (
          page: number,
          type: "page" | "prev" | "next" | "jump-prev" | "jump-next",
        ) => React.ReactNode
      }
      pageSize={pagination.pageSize}
      current={pagination.current}
      total={pagination.total}
      onChange={onChange}
      hideOnSinglePage={hideOnSinglePage}
    />
  );
};

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
