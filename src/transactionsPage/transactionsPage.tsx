import React from "react";
import * as protos from "@cockroachlabs/crdb-protobuf-client";
import { RouteComponentProps } from "react-router-dom";
import { TransactionsPageHeader } from "./transactionsPageHeader";
import { TransactionsTable } from "../transactionsTable";
import { TransactionDetails } from "../transactionDetails";
import { ISortedTablePagination } from "../sortedtable";
import { SortSetting } from "../sortabletable";
import { Pagination } from "../pagination";
import { TransactionsPageStatistic } from "./transactionsPageStatistic";
import { statisticsClasses } from "./transactionsPageClasses";
import { getTrxAppFilterOptions } from "./utils";
import {
  searchTransactionsData,
  filterTransactions,
  getStatementsById,
} from "./utils";
import { forIn } from "lodash";
import { getSearchParams } from "src/util";

type IStatementsResponse = protos.cockroach.server.serverpb.IStatementsResponse;

export interface Filters {
  app?: string;
  transactionsType?: string;
  timeNumber?: string;
  timeUnit?: string;
  fullScans?: boolean;
  distributed?: boolean;
}

const defaultFilters = {
  app: "All",
  timeNumber: "0",
  timeUnit: "seconds",
};

interface TState {
  sortSetting: SortSetting;
  pagination: ISortedTablePagination;
  search?: string;
  filters?: Filters;
  statementIds: string[] | null;
}

interface TransactionsPageProps {
  data: IStatementsResponse;
  refreshData: () => void;
}

export class TransactionsPage extends React.Component<
  RouteComponentProps & TransactionsPageProps
> {
  trxSearchParams = getSearchParams(this.props.history.location.search);

  state: TState = {
    sortSetting: {
      sortKey: 3,
      ascending: false,
    },
    pagination: {
      pageSize: 10,
      current: 1,
    },
    search: this.trxSearchParams("q", ""),
    filters: {
      app: this.trxSearchParams("app", defaultFilters.app),
      timeNumber: this.trxSearchParams("timeNumber", defaultFilters.timeNumber),
      timeUnit: this.trxSearchParams("timeUnit", defaultFilters.timeUnit),
    },
    statementIds: null,
  };

  componentDidMount() {
    this.props.refreshData();
  }
  componentDidUpdate() {
    this.props.refreshData();
  }

  syncHistory = (params: Record<string, string | undefined>) => {
    const { history } = this.props;
    const currentSearchParams = new URLSearchParams(history.location.search);

    forIn(params, (value, key) => {
      if (!value) {
        currentSearchParams.delete(key);
      } else {
        currentSearchParams.set(key, value);
      }
    });

    history.location.search = currentSearchParams.toString();
    history.replace(history.location);
  };

  onChangeSortSetting = (ss: SortSetting) => {
    this.setState({
      sortSetting: ss,
    });
    this.syncHistory({
      sortKey: ss.sortKey,
      ascending: Boolean(ss.ascending).toString(),
    });
  };

  onChangePage = (current: number) => {
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, current } });
  };

  resetPagination = () => {
    this.setState((prevState: TState) => {
      return {
        pagination: {
          current: 1,
          pageSize: prevState.pagination.pageSize,
        },
      };
    });
  };

  onClearSearchField = () => {
    this.setState({ search: "" });
    this.syncHistory({
      q: undefined,
    });
  };

  onSubmitSearchField = (search: string) => {
    this.setState({ search });
    this.resetPagination();
    this.syncHistory({
      q: search,
    });
  };

  onSubmitFilters = (filters: Filters) => {
    this.setState({
      filters: {
        ...this.state.filters,
        ...filters,
      },
    });
    this.resetPagination();
    this.syncHistory({
      app: filters.app,
      timeNumber: filters.timeNumber,
      timeUnit: filters.timeUnit,
    });
  };

  onClearFilters = () => {
    this.setState({
      filters: {
        ...defaultFilters,
      },
    });
    this.resetPagination();
    this.syncHistory({
      app: undefined,
      timeNumber: undefined,
      timeUnit: undefined,
    });
  };

  handleDetails = (statementIds: string[] | null) => {
    this.setState({ statementIds });
  };

  render() {
    if (!this.props.data) return <pre>loading</pre>;
    const {
      statements,
      transactions,
      last_reset,
      internal_app_name_prefix,
    } = this.props.data;
    const { pagination, search, filters, statementIds } = this.state;

    const lastReset = new Date(Number(last_reset.seconds) * 1000);
    const appNames = getTrxAppFilterOptions(
      transactions,
      internal_app_name_prefix,
    );

    const transactionDetails =
      statementIds && getStatementsById(statementIds, statements);

    const searchedAndFilteredData = filterTransactions(
      searchTransactionsData(search, transactions, statements),
      filters,
    );
    const { current, pageSize } = pagination;

    return !statementIds ? (
      <div>
        <TransactionsPageHeader
          onSubmit={this.onSubmitSearchField}
          onClear={this.onClearSearchField}
          search={search}
          filters={filters}
          activeFilters={searchedAndFilteredData.activeFilters}
          onSubmitFilters={this.onSubmitFilters}
          appNames={appNames}
        />
        <section className={statisticsClasses.tableContainerClass}>
          <TransactionsPageStatistic
            pagination={pagination}
            lastReset={lastReset}
            search={search}
            totalCount={searchedAndFilteredData.transactions.length}
            arrayItemName="transactions"
            activeFilters={searchedAndFilteredData.activeFilters}
            onClearFilters={this.onClearFilters}
          />
          <TransactionsTable
            transactions={searchedAndFilteredData.transactions}
            statements={statements}
            sortSetting={this.state.sortSetting}
            onChangeSortSetting={this.onChangeSortSetting}
            handleDetails={this.handleDetails}
            search={search}
            pagination={pagination}
          />
        </section>
        <Pagination
          pageSize={pageSize}
          current={current}
          total={searchedAndFilteredData.transactions.length}
          onChange={this.onChangePage}
        />
      </div>
    ) : (
      <TransactionDetails
        statements={transactionDetails}
        lastReset={lastReset}
        handleDetails={this.handleDetails}
      />
    );
  }
}
