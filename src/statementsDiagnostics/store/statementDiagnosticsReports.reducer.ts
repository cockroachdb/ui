import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { Action, Reducer } from "redux";
import { updateLocalStorage } from "../../store/localStorage";
import { ActionWithPayload, getActionsMap } from "../../store";

const actionKeys = [
  "refresh",
  "request",
  "invalidated",
  "received",
  "failed",
  "createReport",
  "createReportCompleted",
  "createReportFailed",
  "openNewDiagnosticsModal",
] as const;

export const diagnosticsActionsMap = getActionsMap("statementDiagnostics")(
  actionKeys,
);

export type StatementDiagnosticsReportsResponse = cockroach.server.serverpb.StatementDiagnosticsReportsResponse;

export type RefreshStatementsDiagnostics = Action<
  typeof diagnosticsActionsMap.refresh
>;

export type RequestStatementsDiagnostics = Action<
  typeof diagnosticsActionsMap.request
>;

export type RequestStatementsDiagnosticsFailed = ActionWithPayload<
  typeof diagnosticsActionsMap.failed,
  Error
>;

export type RequestStatementsDiagnosticsReceived = ActionWithPayload<
  typeof diagnosticsActionsMap.received,
  StatementDiagnosticsReportsResponse
>;

export type StatementDiagnosticsInvalidated = Action<
  typeof diagnosticsActionsMap.invalidated
>;

export type CreateStatementsDiagnosticsReport = ActionWithPayload<
  typeof diagnosticsActionsMap.createReport,
  string
>;

export type CreateStatementsDiagnosticsReportComplete = Action<
  typeof diagnosticsActionsMap.createReportCompleted
>;

export type CreateStatementsDiagnosticsReportFailed = Action<
  typeof diagnosticsActionsMap.createReportFailed
>;

export type OpenStatementsDiagnosticsModal = ActionWithPayload<
  typeof diagnosticsActionsMap.openNewDiagnosticsModal,
  string
>;

export type StatementsDiagnosticsActions =
  | RefreshStatementsDiagnostics
  | RequestStatementsDiagnostics
  | RequestStatementsDiagnosticsFailed
  | RequestStatementsDiagnosticsReceived
  | StatementDiagnosticsInvalidated
  | CreateStatementsDiagnosticsReport
  | OpenStatementsDiagnosticsModal
  | CreateStatementsDiagnosticsReportComplete
  | CreateStatementsDiagnosticsReportFailed;

export interface StatementDiagnosticsState {
  data: StatementDiagnosticsReportsResponse;
  lastError: Error;
  valid: boolean;
}

const initialState: StatementDiagnosticsState = {
  data: null,
  valid: true,
  lastError: null,
};

export const statementsDiagnosticsReducer: Reducer<
  StatementDiagnosticsState,
  StatementsDiagnosticsActions
> = (state = initialState, action) => {
  switch (action.type) {
    case diagnosticsActionsMap.received:
      return {
        ...state,
        data: action.payload,
        lastError: null,
        valid: true,
      };
    case diagnosticsActionsMap.failed:
      return {
        ...state,
        valid: false,
        lastError: action.payload,
      };
    default:
      return state;
  }
};

export const refreshStatementDiagnostics = (): RefreshStatementsDiagnostics => ({
  type: diagnosticsActionsMap.refresh,
});

export const requestStatementDiagnostics = (): RequestStatementsDiagnostics => ({
  type: diagnosticsActionsMap.request,
});

export const requestStatementDiagnosticsReceived = (
  data: StatementDiagnosticsReportsResponse,
): RequestStatementsDiagnosticsReceived => ({
  type: diagnosticsActionsMap.received,
  payload: data,
});

export const requestStatementDiagnosticsFailed = (
  error: Error,
): RequestStatementsDiagnosticsFailed => ({
  type: diagnosticsActionsMap.failed,
  payload: error,
});

export const createStatementDiagnosticsReportAction = (
  statementFingerprint: string,
): CreateStatementsDiagnosticsReport => {
  return {
    type: diagnosticsActionsMap.createReport,
    payload: statementFingerprint,
  };
};

export function createStatementDiagnosticsReportCompleteAction(): CreateStatementsDiagnosticsReportComplete {
  return {
    type: diagnosticsActionsMap.createReportCompleted,
  };
}

export function createStatementDiagnosticsReportFailedAction(): CreateStatementsDiagnosticsReportFailed {
  return {
    type: diagnosticsActionsMap.createReportFailed,
  };
}

export function createOpenDiagnosticsModalAction(
  statementFingerprint: string,
): OpenStatementsDiagnosticsModal {
  return {
    type: diagnosticsActionsMap.openNewDiagnosticsModal,
    payload: statementFingerprint,
  };
}

export const dismissStatementsDiagnosticsAlertMessage = () =>
  updateLocalStorage("adminUi/showDiagnosticsModal", false);
