import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Dispatch } from "redux";

import { AppState } from "src/store";
import { actions as statementActions } from "src/store/statements";
import { actions as resetSQLStatsActions } from "src/store/sqlStats";
import { TransactionsPage } from "./transactionsPage";
import {
  TransactionsPageProps,
  TransactionsPageDispatchProps,
} from "./transactionsPage";
import {
  selectTransactionsData,
  selectTransactionsLastError,
} from "./transactionsPage.selectors";
import { nodeRegionsByIDSelector } from "../store/nodes";

export const TransactionsPageConnected = withRouter(
  connect<
    TransactionsPageProps,
    TransactionsPageDispatchProps,
    RouteComponentProps
  >(
    (state: AppState) => ({
      data: selectTransactionsData(state),
      nodeRegions: nodeRegionsByIDSelector(state),
      error: selectTransactionsLastError(state),
    }),
    (dispatch: Dispatch) => ({
      refreshData: () => dispatch(statementActions.refresh()),
      resetSQLStats: () => dispatch(resetSQLStatsActions.request()),
    }),
  )(TransactionsPage),
);
