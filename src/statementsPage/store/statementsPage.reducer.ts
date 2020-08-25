import { Action, Reducer } from "redux";
import { cockroach } from "@cockroachlabs/crdb-protobuf-client";
import { AggregateStatistics } from "../../statementsTable";
import { ActionWithPayload, getActionsMap } from "../../store";

export type StatementsResponse = cockroach.server.serverpb.StatementsResponse;

const actionKeys = [
  "refresh",
  "request",
  "invalidated",
  "received",
  "failed",
  "searchCompleted",
  "paginationChanged",
  "sortingChanged",
] as const;

export const statementsActionsMap = getActionsMap("statements")(actionKeys);

type RefreshStatementsAction = Action<typeof statementsActionsMap.refresh>;

type RequestStatementsAction = Action<typeof statementsActionsMap.request>;

type InvalidatedStatementsAction = Action<
  typeof statementsActionsMap.invalidated
>;

type ReceivedStatementsAction = ActionWithPayload<
  typeof statementsActionsMap.received,
  StatementsResponse
>;

type FailedStatementsAction = ActionWithPayload<
  typeof statementsActionsMap.failed,
  Error
>;

type StatementsSearchCompleteAction = ActionWithPayload<
  typeof statementsActionsMap.searchCompleted,
  AggregateStatistics[]
>;

type StatementsPaginationChangedAction = ActionWithPayload<
  typeof statementsActionsMap.paginationChanged,
  number
>;

type StatementsSortingChangedAction = ActionWithPayload<
  typeof statementsActionsMap.sortingChanged,
  {
    tableName: string;
    columnName: string;
    ascending?: boolean;
  }
>;

export type StatementsActions =
  | RefreshStatementsAction
  | RequestStatementsAction
  | InvalidatedStatementsAction
  | ReceivedStatementsAction
  | FailedStatementsAction
  | StatementsPaginationChangedAction
  | StatementsSortingChangedAction;

export interface StatementsState {
  data: StatementsResponse;
  lastError: Error;
  valid: boolean;
}

const initialState: StatementsState = {
  data: null,
  lastError: null,
  valid: true,
};

const statementsReducer: Reducer<StatementsState, StatementsActions> = (
  state = initialState,
  action,
): StatementsState => {
  switch (action.type) {
    case statementsActionsMap.received: {
      return {
        ...state,
        data: action.payload,
        valid: true,
        lastError: null,
      };
    }
    case statementsActionsMap.failed: {
      return {
        ...state,
        lastError: action.payload,
        valid: false,
      };
    }
    case statementsActionsMap.invalidated: {
      return {
        ...state,
        valid: false,
      };
    }
    default:
      return state;
  }
};

export const refreshStatements = (): RefreshStatementsAction => ({
  type: statementsActionsMap.refresh,
});

export const requestStatements = (): RequestStatementsAction => ({
  type: statementsActionsMap.request,
});

export const invalidateStatements = (): InvalidatedStatementsAction => ({
  type: statementsActionsMap.invalidated,
});

export const statementsReceived = (
  payload: StatementsResponse,
): ReceivedStatementsAction => ({
  type: statementsActionsMap.received,
  payload,
});

export const statementsRequestFailed = (
  payload: Error,
): FailedStatementsAction => ({
  type: statementsActionsMap.failed,
  payload,
});

export const statementsSearchComplete = (
  payload: AggregateStatistics[],
): StatementsSearchCompleteAction => ({
  type: statementsActionsMap.searchCompleted,
  payload,
});

export function statementsPaginationChanged(
  nextPage: number,
): StatementsPaginationChangedAction {
  return {
    type: statementsActionsMap.paginationChanged,
    payload: nextPage,
  };
}

export function statementsSortingChanged(
  tableName: string,
  columnName: string,
  ascending?: boolean,
): StatementsSortingChangedAction {
  return {
    type: statementsActionsMap.sortingChanged,
    payload: {
      tableName,
      columnName,
      ascending,
    },
  };
}

export default statementsReducer;
