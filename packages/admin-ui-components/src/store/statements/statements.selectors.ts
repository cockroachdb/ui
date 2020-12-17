import { createSelector } from "reselect";
import { AppState } from "../reducers";

export const statementsSelector = createSelector(
  (state: AppState) => state.adminUI,
  state => state.statements,
);
