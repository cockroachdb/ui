import React from "react";
import { AggregateStatistics } from "../statementsTable";
import { makeStatementsColumns } from "../statementsTable";
import { SortedTable, ISortedTablePagination } from "../sortedtable";
import { SortSetting } from "../sortabletable";
import { Pagination } from "../pagination";
import { TransactionsPageStatistic } from "../transactionsPage/transactionsPageStatistic";
import { baseHeadingClasses } from "../transactionsPage/transactionsPageClasses";
import { Button } from "../button";
import { collectStatementsText } from "src/transactionsPage/utils";
import { tableClasses } from "../transactionsTable/transactionsTableClasses";
import { BackIcon } from "../icon";
import { SqlBox } from "../sql";

const { containerClass } = tableClasses;

interface TransactionDetailsProps {
  statements?: AggregateStatistics[];
  lastReset?: string | Date;
  handleDetails: (statementIds: string[] | null) => void;
}

interface TState {
  sortSetting: SortSetting;
  pagination: ISortedTablePagination;
}

export class TransactionDetails extends React.Component<
  TransactionDetailsProps,
  TState
> {
  state: TState = {
    sortSetting: {
      sortKey: 2,
      ascending: false,
    },
    pagination: {
      pageSize: 10,
      current: 1,
    },
  };

  onChangeSortSetting = (ss: SortSetting) => {
    this.setState({
      sortSetting: ss,
    });
  };

  onChangePage = (current: number) => {
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, current } });
  };

  render() {
    const { statements, lastReset, handleDetails } = this.props;
    const { sortSetting, pagination } = this.state;
    const statementsSummary = collectStatementsText(statements);

    return statements ? (
      <div>
        <section className={baseHeadingClasses.wrapper}>
          <Button
            onClick={() => handleDetails(null)}
            type="unstyled-link"
            size="small"
            icon={BackIcon}
            iconPosition="left"
          >
            All transactions
          </Button>
          <h1 className={baseHeadingClasses.tableName}>Transaction Details</h1>
        </section>
        <section className={containerClass}>
          <SqlBox value={statementsSummary} />
          <TransactionsPageStatistic
            pagination={pagination}
            totalCount={statements.length}
            lastReset={lastReset}
            arrayItemName={"statements for this transaction"}
            activeFilters={0}
          />
          <SortedTable
            data={statements}
            columns={makeStatementsColumns(statements, "", "")}
            className="statements-table"
            sortSetting={sortSetting}
            onChangeSortSetting={this.onChangeSortSetting}
          />
        </section>
        <Pagination
          pageSize={pagination.pageSize}
          current={pagination.current}
          total={statements.length}
          onChange={this.onChangePage}
        />
      </div>
    ) : null;
  }
}
