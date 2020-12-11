import { assert } from "chai";
import { Filters } from ".";
import { data } from "./transactions.fixture";
import { filterTransactions } from "./utils";
import * as protos from "@cockroachlabs/crdb-protobuf-client";

type Transaction = protos.cockroach.server.serverpb.StatementsResponse.IExtendedCollectedTransactionStatistics;

const txData = (data.transactions as any) as Transaction[];

describe("Filter transactions", () => {
  it("show all if no filters applied", () => {
    const filter: Filters = {
      app: "All",
      timeNumber: "0",
      timeUnit: "seconds",
    };
    assert.equal(filterTransactions(txData, filter).transactions.length, 10);
  });

  it("filters by app", () => {
    const filter: Filters = {
      app: "$ TEST",
      timeNumber: "0",
      timeUnit: "seconds",
    };
    assert.equal(filterTransactions(txData, filter).transactions.length, 3);
  });

  it("filters by internal prefix", () => {
    const filter: Filters = {
      app: data.internal_app_name_prefix,
      timeNumber: "0",
      timeUnit: "seconds",
    };
    assert.equal(filterTransactions(txData, filter).transactions.length, 7);
  });

  it("filters by time", () => {
    const filter: Filters = {
      app: "All",
      timeNumber: "40",
      timeUnit: "miliseconds",
    };
    assert.equal(filterTransactions(txData, filter).transactions.length, 8);
  });
});
