import d3 from "d3";
import { stdDevLong } from "src/util/appStats";
import { formatTwoPlaces } from "./utils";
import * as protos from "@cockroachlabs/crdb-protobuf-client";

type StatementStatistics = protos.cockroach.server.serverpb.StatementsResponse.ICollectedStatementStatistics;

export function rowsBreakdown(s: StatementStatistics) {
  const mean = s.stats.num_rows.mean;
  const sd = stdDevLong(s.stats.num_rows, s.stats.count);

  const scale = d3.scale
    .linear()
    .domain([0, mean + sd])
    .range([0, 100]);

  return {
    rowsBarChart(meanRow?: boolean) {
      const spread = scale(sd + (sd > mean ? mean : sd));
      if (meanRow) {
        return formatTwoPlaces(mean);
      } else {
        return spread;
      }
    },
  };
}
