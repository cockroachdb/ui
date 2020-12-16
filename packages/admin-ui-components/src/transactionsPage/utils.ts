import * as protos from "@cockroachlabs/crdb-protobuf-client";
import { Filters } from "./";
import { SelectOptions } from "./filter";
import { AggregateStatistics } from "../statementsTable";
import Long from "long";

type Statement = protos.cockroach.server.serverpb.StatementsResponse.ICollectedStatementStatistics;
type Transaction = protos.cockroach.server.serverpb.StatementsResponse.IExtendedCollectedTransactionStatistics;

export const getTrxAppFilterOptions = (
  transactions: Transaction[],
  prefix: string,
): SelectOptions[] => {
  const defaultAppFilters = ["All", prefix];
  const uniqueAppNames = new Set(
    transactions
      .filter(t => !t.stats_data.app.startsWith(prefix))
      .map(t => t.stats_data.app),
  );

  return defaultAppFilters
    .concat(Array.from(uniqueAppNames))
    .map(filterValue => ({
      label: filterValue,
      value: filterValue,
    }));
};

export const collectStatementsText = (statements: Statement[]): string =>
  statements.map(s => s.key.key_data.query).join("\n");

export const getStatementsById = (
  statementsIds: Long[],
  statements: Statement[],
): Statement[] => {
  return statements.filter(s => statementsIds.some(id => id.eq(s.id)));
};

export const aggregateStatements = (
  statements: Statement[],
): AggregateStatistics[] =>
  statements.map((s: Statement) => ({
    label: s.key.key_data.query,
    implicitTxn: false,
    stats: s.stats,
  }));

export const searchTransactionsData = (
  search: string,
  transactions: Transaction[],
  statements: Statement[],
): Transaction[] => {
  return transactions.filter((t: Transaction) =>
    search.split(" ").every(val =>
      collectStatementsText(
        getStatementsById(t.stats_data.statement_ids, statements),
      )
        .toLowerCase()
        .includes(val.toLowerCase()),
    ),
  );
};

function getTimeValue(timeNumber: string, timeUnit: string): number | "empty" {
  if (arguments.length < 2 || timeNumber === "0") return "empty";
  return timeUnit === "seconds"
    ? Number(timeNumber)
    : Number(timeNumber) / 1000;
}

export const filterTransactions = (
  data: Transaction[],
  filters: Filters,
): { transactions: Transaction[]; activeFilters: number } => {
  if (!filters)
    return {
      transactions: data,
      activeFilters: 0,
    };
  const { timeNumber, timeUnit } = filters;
  const timeValue = getTimeValue(timeNumber, timeUnit);
  const filtersStatus = [
    timeValue && timeValue !== "empty",
    filters.app !== "All",
  ];
  const activeFilters = filtersStatus.filter(f => f).length;

  const filteredTransactions = data.filter((t: Transaction) => {
    const validateTransaction = [
      t.stats_data.app.includes(filters.app) || filters.app === "All",
      t.stats_data.stats.service_lat.mean >= timeValue || timeValue === "empty",
    ];
    return validateTransaction.every(f => f);
  });

  return {
    transactions: filteredTransactions,
    activeFilters,
  };
};
