import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import {
  createStatementDiagnosticsReportCompleteAction,
  createStatementDiagnosticsReportFailedAction,
  CreateStatementsDiagnosticsReport,
  requestStatementDiagnostics,
  requestStatementDiagnosticsFailed,
  requestStatementDiagnosticsReceived,
  diagnosticsActionsMap,
} from "./statementDiagnosticsReports.reducer";
import {
  createStatementDiagnosticsReport,
  getStatementDiagnosticsReports,
} from "../api/statementsDiagnosticsApi";
import { CACHE_INVALIDATION_PERIOD } from "../../store";

export function* createDiagnosticsReportSaga(
  action: CreateStatementsDiagnosticsReport,
) {
  try {
    yield call(createStatementDiagnosticsReport, action.payload);
    yield put(createStatementDiagnosticsReportCompleteAction());
    // request diagnostics reports to reflect changed state for newly
    // requested statement.
    yield put(requestStatementDiagnostics());
  } catch (e) {
    yield put(createStatementDiagnosticsReportFailedAction());
  }
}

export function* refreshStatementsDiagnosticsSaga() {
  yield put(requestStatementDiagnostics());
}

export function* requestStatementsDiagnosticsSaga() {
  try {
    const response = yield call(getStatementDiagnosticsReports);
    yield put(requestStatementDiagnosticsReceived(response));
  } catch (e) {
    yield put(requestStatementDiagnosticsFailed(e));
  }
}

export function* statementsDiagnosticsSagas(
  delayMs: number = CACHE_INVALIDATION_PERIOD,
) {
  yield all([
    throttle(
      delayMs,
      diagnosticsActionsMap.refresh,
      refreshStatementsDiagnosticsSaga,
    ),
    takeLatest(diagnosticsActionsMap.request, requestStatementsDiagnosticsSaga),
    takeEvery(diagnosticsActionsMap.createReport, createDiagnosticsReportSaga),
  ]);
}
