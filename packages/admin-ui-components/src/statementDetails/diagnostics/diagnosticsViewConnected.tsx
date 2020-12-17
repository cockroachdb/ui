import { connect } from "react-redux";

import { AppState } from "../../store";
import {
  selectDiagnosticsReportsByStatementFingerprint,
  selectDiagnosticsReportsCountByStatementFingerprint,
} from "../statementDetails.selectors";
import { actions } from "../../store/statementDiagnostics";
import {
  DiagnosticsView,
  DiagnosticsViewDispatchProps,
  DiagnosticsViewOwnProps,
  DiagnosticsViewProps,
  DiagnosticsViewStateProps,
} from "./diagnosticsView";

const mapStateToProps = (
  state: AppState,
  props: DiagnosticsViewProps,
): DiagnosticsViewStateProps => {
  const { statementFingerprint } = props;
  const hasData =
    selectDiagnosticsReportsCountByStatementFingerprint(
      state,
      statementFingerprint,
    ) > 0;
  const diagnosticsReports = selectDiagnosticsReportsByStatementFingerprint(
    state,
    statementFingerprint,
  );
  return {
    hasData,
    diagnosticsReports,
  };
};

const mapDispatchToProps: DiagnosticsViewDispatchProps = {
  activate: actions.createReport,
  // TODO (koorosh): fixit
  dismissAlertMessage: () => {
    // createStatementDiagnosticsAlertLocalSetting.set({ show: false }),
  },
};

export default connect<
  DiagnosticsViewStateProps,
  DiagnosticsViewDispatchProps,
  DiagnosticsViewOwnProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(DiagnosticsView);
