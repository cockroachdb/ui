import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import {
  StatementsPage,
  StatementsPageProps,
} from "../components/statementsPage";
import {
  selectApps,
  selectLastReset,
  selectStatements,
  selectStatementsLastError,
  selectTotalFingerprints,
  statementsPaginationChanged,
  statementsSortingChanged,
  statementsSearchComplete,
  refreshStatements,
  StateWithStatements,
} from "../store";
import {
  createOpenDiagnosticsModalAction,
  createStatementDiagnosticsReportAction,
  dismissStatementsDiagnosticsAlertMessage,
  refreshStatementDiagnostics,
} from "../../statementsDiagnostics";

type MapStateToProps = Pick<
  StatementsPageProps,
  "statements" | "statementsError" | "apps" | "totalFingerprints" | "lastReset"
>;

type MapDispatchToProps = Pick<
  StatementsPageProps,
  | "refreshStatements"
  | "refreshStatementDiagnosticsRequests"
  | "dismissAlertMessage"
  | "onActivateStatementDiagnostics"
  | "onDiagnosticsModalOpen"
  | "onSearchComplete"
  | "onPageChanged"
  | "onSortingChange"
>;

type OwnProps = Pick<
  StatementsPageProps,
  "basePath" | "onDiagnosticsReportDownload"
> &
  RouteComponentProps;

export const ConnectedStatementsPage = withRouter(
  connect<MapStateToProps, MapDispatchToProps, OwnProps>(
    (state: StateWithStatements, props: OwnProps) => ({
      statements: selectStatements(state, props),
      statementsError: selectStatementsLastError(state),
      apps: selectApps(state),
      totalFingerprints: selectTotalFingerprints(state),
      lastReset: selectLastReset(state),
    }),
    {
      refreshStatements,
      refreshStatementDiagnosticsRequests: refreshStatementDiagnostics,
      dismissAlertMessage: dismissStatementsDiagnosticsAlertMessage,
      onActivateStatementDiagnostics: createStatementDiagnosticsReportAction,
      onDiagnosticsModalOpen: createOpenDiagnosticsModalAction,
      onSearchComplete: statementsSearchComplete,
      onPageChanged: statementsPaginationChanged,
      onSortingChange: statementsSortingChanged,
    },
  )(StatementsPage),
);
