import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import statementsReducer, {
  invalidateStatements,
  requestStatements,
  statementsReceived,
  statementsRequestFailed,
  StatementsState,
} from "./statementsPage.reducer";
import {
  receivedStatementsSaga,
  refreshStatementsSaga,
  requestStatementsSaga,
} from "./statementsPage.sagas";
import { getStatements } from "../api/statementsApi";

describe("StatementsPage sagas", () => {
  const statements = new cockroach.server.serverpb.StatementsResponse({
    statements: [],
    last_reset: null,
  });

  describe("refreshStatementsSaga", () => {
    it("dispatches request statements action", () => {
      expectSaga(refreshStatementsSaga)
        .put(requestStatements())
        .run();
    });
  });

  describe("requestStatementsSaga", () => {
    it("successfully requests statements list", () => {
      expectSaga(requestStatementsSaga)
        .provide([[call(getStatements), statements]])
        .put(statementsReceived(statements))
        .withReducer(statementsReducer)
        .hasFinalState<StatementsState>({
          data: statements,
          lastError: null,
          valid: true,
        })
        .run();
    });

    it("returns error on failed request", () => {
      const error = new Error("Failed request");
      expectSaga(requestStatementsSaga)
        .provide([[call(getStatements), throwError(error)]])
        .put(statementsRequestFailed(error))
        .withReducer(statementsReducer)
        .hasFinalState<StatementsState>({
          data: null,
          lastError: error,
          valid: false,
        })
        .run();
    });
  });

  describe("receivedStatementsSaga", () => {
    it("sets valid status to false after specified period of time", () => {
      const timeout = 500;
      expectSaga(receivedStatementsSaga, timeout)
        .delay(timeout)
        .put(invalidateStatements())
        .withReducer(statementsReducer, {
          data: statements,
          lastError: null,
          valid: true,
        })
        .hasFinalState<StatementsState>({
          data: statements,
          lastError: null,
          valid: false,
        })
        .run(1000);
    });
  });
});
