import { combineReducers, ReducersMapObject } from "redux";
import { all, fork } from "redux-saga/effects";
import {
  StatementDiagnosticsState,
  statementsDiagnosticsReducer,
  statementsDiagnosticsSagas,
} from "../../statementsDiagnostics/store";
import statementsReducer, { StatementsState } from "./statementsPage.reducer";
import {
  localStorageReducer,
  localStorageSaga,
  LocalStorageState,
} from "../../store/localStorage";
import { statementsSaga } from "./statementsPage.sagas";

export * from "./statementsPage.reducer";
export * from "./statementsPage.sagas";
export * from "./statementsPage.selectors";

export interface StateWithStatements {
  adminUI: {
    statements: StatementsState;
    statementDiagnosticsReports: StatementDiagnosticsState;
    localStorage: LocalStorageState;
  };
}

export const statementsReducersMap: ReducersMapObject<StateWithStatements["adminUI"]> = {
  statements: statementsReducer,
  statementDiagnosticsReports: statementsDiagnosticsReducer,
  localStorage: localStorageReducer,
};

export const statementsReducers = combineReducers(statementsReducersMap);

export function* statementsSagas() {
  yield all([
    fork(localStorageSaga),
    fork(statementsSaga),
    fork(statementsDiagnosticsSagas),
  ]);
}
