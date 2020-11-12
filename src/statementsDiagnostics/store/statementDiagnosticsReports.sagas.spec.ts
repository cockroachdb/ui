import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import Long from "long";
import {
  createDiagnosticsReportSaga,
  requestStatementsDiagnosticsSaga,
} from "./statementDiagnosticsReports.sagas";
import {
  createStatementDiagnosticsReportAction,
  createStatementDiagnosticsReportCompleteAction,
  createStatementDiagnosticsReportFailedAction,
  requestStatementDiagnostics,
  requestStatementDiagnosticsFailed,
  requestStatementDiagnosticsReceived,
  StatementDiagnosticsState,
  statementsDiagnosticsReducer,
} from "./statementDiagnosticsReports.reducer";
import {
  createStatementDiagnosticsReport,
  getStatementDiagnosticsReports,
} from "../api/statementsDiagnosticsApi";

const CreateStatementDiagnosticsReportResponse =
  cockroach.server.serverpb.CreateStatementDiagnosticsReportResponse;

describe("statementsDiagnostics sagas", () => {
  describe("createDiagnosticsReportSaga", () => {
    const statementFingerprint = "SELECT * FROM table";

    const report = new CreateStatementDiagnosticsReportResponse({
      report: {
        completed: false,
        id: Long.fromNumber(Date.now()),
        statement_fingerprint: statementFingerprint,
      },
    });

    const reportsResponse = new cockroach.server.serverpb.StatementDiagnosticsReportsResponse(
      { reports: [] },
    );

    it("successful request", () => {
      expectSaga(
        createDiagnosticsReportSaga,
        createStatementDiagnosticsReportAction(statementFingerprint),
      )
        .provide([
          [
            call(createStatementDiagnosticsReport, statementFingerprint),
            report,
          ],
          [call(getStatementDiagnosticsReports), reportsResponse],
        ])
        .put(createStatementDiagnosticsReportCompleteAction())
        .put(requestStatementDiagnostics())
        .withReducer(statementsDiagnosticsReducer)
        .hasFinalState<StatementDiagnosticsState>({
          data: null,
          lastError: null,
          valid: true,
        })
        .run();
    });

    it("failed request", () => {
      expectSaga(
        createDiagnosticsReportSaga,
        createStatementDiagnosticsReportAction(statementFingerprint),
      )
        .provide([
          [
            call(createStatementDiagnosticsReport, statementFingerprint),
            throwError(new Error("Failed request")),
          ],
          [call(getStatementDiagnosticsReports), reportsResponse],
        ])
        .put(createStatementDiagnosticsReportFailedAction())
        .run();
    });
  });

  describe("requestStatementsDiagnosticsSaga", () => {
    const statementFingerprint = "SELECT * FROM table";
    const reportsResponse = new cockroach.server.serverpb.StatementDiagnosticsReportsResponse(
      { reports: [{ statement_fingerprint: statementFingerprint }] },
    );

    it("successfully requests diagnostics reports", () => {
      expectSaga(requestStatementsDiagnosticsSaga)
        .provide([[call(getStatementDiagnosticsReports), reportsResponse]])
        .put(requestStatementDiagnosticsReceived(reportsResponse))
        .withReducer(statementsDiagnosticsReducer)
        .hasFinalState<StatementDiagnosticsState>({
          data: reportsResponse,
          lastError: null,
          valid: true,
        })
        .run();
    });

    it("fails to request diagnostics reports", () => {
      const error = new Error("Failed request");
      expectSaga(requestStatementsDiagnosticsSaga)
        .provide([[call(getStatementDiagnosticsReports), throwError(error)]])
        .put(requestStatementDiagnosticsFailed(error))
        .withReducer(statementsDiagnosticsReducer)
        .hasFinalState<StatementDiagnosticsState>({
          data: null,
          lastError: error,
          valid: false,
        })
        .run();
    });
  });
});
