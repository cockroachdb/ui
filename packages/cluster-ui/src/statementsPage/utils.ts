import { Filters } from "./";
import { AggregateStatistics } from "../statementsTable";

function getTimeValue(timeNumber: string, timeUnit: string): number | "empty" {
  if (arguments.length < 2 || timeNumber === "0") return "empty";
  return timeUnit === "seconds"
    ? Number(timeNumber)
    : Number(timeNumber) / 1000;
}

export const filterTransactions = (
  data: AggregateStatistics[],
  filters: Filters,
): { statements: AggregateStatistics[]; activeFilters: number } => {
  if (!filters)
    return {
      statements: data,
      activeFilters: 0,
    };
  const { timeNumber, timeUnit } = filters;
  const timeValue = getTimeValue(timeNumber, timeUnit);
  const filtersStatus = [
    timeValue && timeValue !== "empty",
    filters.app !== "All",
  ];
  const activeFilters = filtersStatus.filter(f => f).length;

  const filteredStatements = data.filter((t: AggregateStatistics) => {
    const filterIsSetToAll = filters.app === "All";
    const validateTransaction = [
      filterIsSetToAll,
      t.stats.service_lat.mean >= timeValue || timeValue === "empty",
    ];
    return validateTransaction.every(f => f);
  });

  return {
    statements: filteredStatements,
    activeFilters,
  };
};
