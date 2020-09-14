import React from "react";
import moment from "moment";
import { paginationPageCount } from "src";
import { DATE_FORMAT } from "src/util";
import { statisticsClasses } from "../transactionsPageClasses";
import { ISortedTablePagination } from "../../sortedtable";
import { Filters } from "../transactionsPage";
import { Button } from "src/button";

const { statistic, countTitle, lastCleared } = statisticsClasses;

interface TableStatistics {
  pagination: ISortedTablePagination;
  totalCount: number;
  lastReset: Date | string;
  arrayItemName: string;
  activeFilters: number;
  search?: string;
  onSubmitFilters?: (filters: Filters) => void;
}

const renderLastCleared = (lastReset: string | Date) => {
  return `Last cleared ${moment.utc(lastReset).format(DATE_FORMAT)}`;
};

export const TransactionsPageStatistic: React.FC<TableStatistics> = ({
  pagination,
  totalCount,
  lastReset,
  search,
  arrayItemName,
  onSubmitFilters,
  activeFilters,
}) => {
  const clearFilters = (): void =>
    onSubmitFilters({
      app: "All",
      timeNumber: "0",
    });
  const paginationCount = paginationPageCount(
    { ...pagination, total: totalCount },
    arrayItemName,
    // selectedApp,
    search,
  );
  const resultsCountAndClear = (
    <>
      {totalCount} {totalCount === 1 ? "result" : "results"}
      &nbsp;&nbsp;&nbsp;| &nbsp;
      <Button onClick={clearFilters} type="flat" size="small">
        clear filter
      </Button>
    </>
  );

  return (
    <div className={statistic}>
      <h4 className={countTitle}>
        {activeFilters ? resultsCountAndClear : paginationCount}
      </h4>
      <h4 className={lastCleared}>{renderLastCleared(lastReset)}</h4>
    </div>
  );
};
