import classNames from "classnames/bind";
import styles from "../barCharts/barCharts.module.scss";
import { stdDevLong } from "src/util/appStats";
import { Duration } from "src/util/format";
import * as protos from "@cockroachlabs/crdb-protobuf-client";
import {
  longToInt,
  makeBarChart,
  approximify,
  formatTwoPlaces,
} from "../barCharts";

type StatementStatistics = protos.cockroach.server.serverpb.StatementsResponse.ICollectedStatementStatistics;
const cx = classNames.bind(styles);

function bar(name: string, value: (d: StatementStatistics) => number) {
  return { name, value };
}

const retryBarT = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  bar("count-retry", d => longToInt(d.stats_data.stats.max_retries)),
];

const countBarT = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  bar("count-first-try", d => longToInt(d.stats_data.stats.count)),
];

const latencyBarT = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  bar("bar-chart__service-lat", d => d.stats_data.stats.service_lat.mean),
];
const latencyStdDevT = bar(cx("bar-chart__overall-dev"), d =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  stdDevLong(d.stats_data.stats.service_lat, d.stats_data.stats.count),
);
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const rowsBarT = [bar("rows", d => d.stats_data.stats.num_rows.mean)];
const rowsStdDevT = bar(cx("rows-dev"), d =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  stdDevLong(d.stats_data.stats.num_rows, d.stats_data.stats.count),
);

export const transactionsCountBarChart = makeBarChart(
  "grey",
  countBarT,
  approximify,
);
export const transactionsRetryBarChart = makeBarChart(
  "red",
  retryBarT,
  approximify,
);
export const transactionsRowsBarChart = makeBarChart(
  "grey",
  rowsBarT,
  approximify,
  rowsStdDevT,
  formatTwoPlaces,
);
export const transactionsLatencyBarChart = makeBarChart(
  "grey",
  latencyBarT,
  v => Duration(v * 1e9),
  latencyStdDevT,
);
