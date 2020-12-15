import { combineReducers } from "redux";
import { StatementsState, reducer as statements } from "./statements";
import { LocalStorageState, reducer as localStorage } from "./localStorage";
import {
  StatementDiagnosticsState,
  reducer as statementDiagnostics,
} from "./statementDiagnostics";

export type DBConsoleState = {
  statements: StatementsState;
  statementDiagnostics: StatementDiagnosticsState;
  localStorage: LocalStorageState;
};

export type AppState = {
  dbConsole: DBConsoleState;
};

export const rootReducer = combineReducers<DBConsoleState>({
  localStorage,
  statementDiagnostics,
  statements,
});
