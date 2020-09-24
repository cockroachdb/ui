import d3 from "d3";
import Long from "long";
import { FixLong } from "src/util/fixLong";
import * as protos from "@cockroachlabs/crdb-protobuf-client";

type StatementStatistics = protos.cockroach.server.serverpb.StatementsResponse.ICollectedStatementStatistics;
type Transaction = protos.cockroach.server.serverpb.StatementsResponse.IExtendedCollectedTransactionStatistics;

export const longToInt = (d: number | Long) =>
  Long.fromValue(FixLong(d)).toInt();

export const clamp = (i: number) => (i < 0 ? 0 : i);

export const formatTwoPlaces = d3.format(".2f");

export function bar(
  name: string,
  value: (d: StatementStatistics | Transaction) => number,
) {
  return { name, value };
}

export const SCALE_FACTORS: { factor: number; key: string }[] = [
  { factor: 1000000000, key: "b" },
  { factor: 1000000, key: "m" },
  { factor: 1000, key: "k" },
];

export function approximify(value: number) {
  for (let i = 0; i < SCALE_FACTORS.length; i++) {
    const scale = SCALE_FACTORS[i];
    if (value > scale.factor) {
      return "" + Math.round(value / scale.factor) + scale.key;
    }
  }

  return "" + Math.round(value);
}
