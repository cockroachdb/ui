import React from "react";
import { SortedTable, ISortedTablePagination } from "../sortedtable";
import { Transaction } from "../transactionsPage";
// import {
//   transactionsRetryBarChart,
//   transactionsCountBarChart,
//   transactionsLatencyBarChart,
//   transactionsRowsBarChart,
// } from "./transactionsBarCharts";
import {
  transactionsRetryBarChart,
  transactionsCountBarChart,
  transactionsLatencyBarChart,
  transactionsRowsBarChart,
} from "../barCharts";
import { StatementTableTitle } from "../statementsTable/statementsTableContent";
import { longToInt, createLabel } from "./utils";
import { tableClasses } from "./transactionsTableClasses";
import { textCell } from "./transactionsCells";
import { FixLong } from "src/util";
import { SortSetting } from "../sortabletable";
import {
  getStatementsById,
  collectStatementsText,
} from "../transactionsPage/utils";

interface TransactionsTable {
  data: Transaction[];
  sortSetting: SortSetting;
  onChangeSortSetting: (ss: SortSetting) => void;
  handleDetails: (statementIds: string[] | null) => void;
  pagination: ISortedTablePagination;
  statements: any;
}

export class TransactionsSortedTable extends SortedTable<Transaction> {}

const { latencyClasses, RowsAffectedClasses } = tableClasses;

export const TransactionsTable: React.FC<TransactionsTable> = props => {
  const { data, handleDetails, statements } = props;
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const retryBar = transactionsRetryBarChart(data);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const countBar = transactionsCountBarChart(data);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const latencyBar = transactionsLatencyBarChart(data, latencyClasses.barChart);
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const rowsBar = transactionsRowsBarChart(data, RowsAffectedClasses.barChart);
  const columns = [
    {
      name: "transactions",
      title: "transactions",
      cell: (item: Transaction) =>
        textCell({
          transactionText: collectStatementsText(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            getStatementsById(item.stats_data.statement_ids, statements),
          ),
          transactionIds: item.stats_data.statement_ids,
          handleDetails,
        }),
      sort: (item: Transaction) => createLabel(item.transactionStatements),
    },
    {
      name: "statements",
      title: "statements",
      cell: (item: Transaction) => item.stats_data.statement_ids.length,
      sort: (item: Transaction) => item.stats_data.statement_ids.length,
    },
    {
      name: "retries",
      title: StatementTableTitle.retries,
      cell: retryBar,
      sort: (item: Transaction) =>
        longToInt(Number(item.stats_data.stats.max_retries)),
    },
    {
      name: "execution count",
      title: StatementTableTitle.executionCount,
      cell: countBar,
      sort: (item: Transaction) => FixLong(Number(item.stats_data.stats.count)),
    },
    {
      name: "rows affected",
      title: StatementTableTitle.rowsAffected,
      cell: rowsBar,
      className: RowsAffectedClasses.column,
      sort: (item: Transaction) => item.stats_data.stats.num_rows.mean,
    },
    {
      name: "latency",
      title: StatementTableTitle.latency,
      cell: latencyBar,
      className: latencyClasses.column,
      sort: (item: Transaction) => item.stats_data.stats.service_lat.mean,
    },
  ];

  return (
    <TransactionsSortedTable
      data={data}
      columns={columns as any}
      className="statements-table"
      {...props}
    />
  );
};

TransactionsTable.defaultProps = {};
